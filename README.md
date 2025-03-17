# BTG Pactual Test


Este proyecto está creado con las siguientes tecnologías.


## Frontend:

Proyecto creado con React. El proyecto está construido con patrones de diseño de software como MVC, Singleton y Factory. Para ejecutar el proyecto seguir estos pasos.

1. Clonar el proyecto
2. Dirigirse a la carpeta de frontend ```cd frontend```
3. Intalar las dependencias con el comando ```npm i```
4. Correr el proyecto con ```npm run dev```

## Backend:

Proyecto creado con FastAPI. El proyecto está diseñado bajo una arquitectura hexagonal, que permite tener los microservicios para el manejo de la lógica del usuario y las acciones de inscribirse o retirarse de un fondo. Para ejecutar el proyecto seguir estos pasos.

1. Clonar el proyecto
2. Dirigirse a la carpeta de frontend ```cd backend```
3. Crear un ambiente python si lo desea ```python3 -m venv <nombre_del_entorno>```
4. Activar el ambiente creado.

- En windows ```.\nombre_del_entorno\Scripts\activate```
- En Mac ```source nombre_del_entorno/bin/activate```

5. Intalar las dependencias ```pip install -r requirements.txt```
6. Puede correr el proyecto con ```python3 main.py```

Tener en cuenta que si desea correr el proyecto con una base de datos local. Puede descargar una imagen de mongoDB con docker (o cualquier base de datos)
y configurar la conexión en el archivo que se encuentra en /app/config/settings.py

## Deploy:

Para realizar el despliégue de la app en CloudFormation se deben seguir estos pasos.

1. Se sugiere crear un nuevo usuario para que pueda realizas los despliegues. Ingrese a la consola de AWS y cree un nuevo usuario de IAM. Este usuario debe tener los siguientes permisos:

- AmazonDynamoDBFullAccess
- AmazonEC2ContainerRegistryFullAccess
- AmazonECS_FullAccess
- AmazonVPCFullAccess
- AWSAppRunnerServicePolicyForECRAccess
- AWSCloudFormationFullAccess
- CloudWatchLogsFullAccess
- ElasticLoadBalancingFullAccess
- IAMFullAccess
- SecretsManagerReadWrite


2. Instale el CLI de AWS en su máquina y configure el CLI con los access key y secret key del usuario creado anteriormente.
3. Acceder a la raíz del proyecto, dónde se encuentra el scrip "deploy.sh"
4. Puede ejecutar el script que realiza el despliegue, especificandola profile configurado en el CLI de AWS para el usuario creado anteriormente. ```AWS_PROFILE=<nombre_del_perfil> ./deploy.sh``` 







