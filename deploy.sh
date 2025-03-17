#!/bin/bash
set -e

# Variables
AWS_REGION="us-east-1"  # Cambiar según tu región
STACK_NAME="BTG-Pactual-Test-Stack"
VPC_ID=$(aws secretsmanager get-secret-value --secret-id "/app/vpc-id" --query SecretString --output text)
SUBNET_IDS=$(aws secretsmanager get-secret-value --secret-id "/app/subnet-ids" --query SecretString --output text)
MONGO_USER=$(aws secretsmanager get-secret-value --secret-id "MONGO_USER" --query SecretString --output text)
MONGO_PASS=$(aws secretsmanager get-secret-value --secret-id "MONGO_PASS" --query SecretString --output text)
MONGO_DB_NAME=$(aws secretsmanager get-secret-value --secret-id "MONGO_DB_NAME" --query SecretString --output text)

# Nombres de los repositorios
BACKEND_REPO_NAME="backend-repository-fullstack-app"
FRONTEND_REPO_NAME="frontend-repository-fullstack-app"

# Crear los ECR repositories si no existen
create_repository() {
    local repo_name=$1
    if ! aws ecr describe-repositories --repository-names $repo_name --region $AWS_REGION &> /dev/null; then
        echo "Creando repositorio $repo_name..."
        aws ecr create-repository --repository-name $repo_name --region $AWS_REGION
    else
        echo "El repositorio $repo_name ya existe"
    fi
}

create_repository "$BACKEND_REPO_NAME"
create_repository "$FRONTEND_REPO_NAME"

# Obtener el URI de los repositorios
BACKEND_REPO_URI=$(aws ecr describe-repositories --repository-names $BACKEND_REPO_NAME --region $AWS_REGION --query 'repositories[0].repositoryUri' --output text)
FRONTEND_REPO_URI=$(aws ecr describe-repositories --repository-names $FRONTEND_REPO_NAME --region $AWS_REGION --query 'repositories[0].repositoryUri' --output text)

# Iniciar sesión en ECR
echo "Iniciando sesión en ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $(echo $BACKEND_REPO_URI | cut -d'/' -f1)

# Construir y subir la imagen del backend
echo "Construyendo imagen del backend..."
cd backend/app  # Directorio donde está el Dockerfile del backend
docker build --platform linux/amd64 -t backend-image .
docker tag backend-image:latest $BACKEND_REPO_URI:latest
echo "Subiendo imagen del backend a ECR..."
docker push $BACKEND_REPO_URI:latest
cd ../..

# Construir y subir la imagen del frontend
# echo "Construyendo imagen del frontend..."
# cd frontend  # Directorio donde está el Dockerfile del frontend
# docker build --platform linux/amd64 -t frontend-image .
# docker tag frontend-image:latest $FRONTEND_REPO_URI:latest
# echo "Subiendo imagen del frontend a ECR..."
# docker push $FRONTEND_REPO_URI:latest
# cd ..

# Desplegar con CloudFormation
echo "Desplegando infraestructura con CloudFormation..."
aws cloudformation deploy \
  --template-file cloudformation.yaml \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_IAM \
  --parameter-overrides \
    VpcId=$VPC_ID \
    SubnetIds=$SUBNET_IDS \
    BackendRepositoryName=$BACKEND_REPO_NAME \
    FrontendRepositoryName=$FRONTEND_REPO_NAME \
    mongoUser=$MONGO_USER \
    mongoPass=$MONGO_PASS \
    mongoDbName=$MONGO_DB_NAME 

# Obtener salidas de CloudFormation
ALB_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='LoadBalancerUrl'].OutputValue" --output text --region $AWS_REGION)
DYNAMODB_TABLE=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --query "Stacks[0].Outputs[?OutputKey=='DynamoDBTableName'].OutputValue" --output text --region $AWS_REGION)

echo "====================================================="
echo "Despliegue completado!"
echo "La aplicación está disponible en: $ALB_URL"
echo "Tabla DynamoDB creada: $DYNAMODB_TABLE"
echo "====================================================="