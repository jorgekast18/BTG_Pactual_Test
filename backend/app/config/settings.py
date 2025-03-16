import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from pydantic import Field, validator

# Cargar variables de entorno desde el archivo .env
load_dotenv()

class Settings(BaseSettings):
    """Configuraciones de la aplicación"""

    # Configuración general de la aplicación
    APP_NAME: str = "BTG Pactual Test"
    APP_VERSION: str = "0.1.0"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = Field(default=False)

    # Configuración de MongoDB
    mongoUser: str = Field(default=os.getenv("MONGO_USER"))
    mongoPassword: str = Field(default=os.getenv("MONGO_PASS"))
    MONGODB_DB_NAME: str = Field(default=os.getenv("MONGO_DB_NAME"))
    MONGODB_URL: str = ""

    class Config:
        env_file = "../.env"  # Archivo .env
        case_sensitive = True

    @validator('MONGODB_URL', pre=True, always=True)
    def construct_mongodb_url(cls, v, values):
        """Construye la URL de conexión a MongoDB si las variables necesarias están presentes,
        de lo contrario usa una URI local predeterminada"""
        mongoUser = values.get('mongoUser')
        mongoPassword = values.get('mongoPassword')
        MONGODB_DB_NAME = values.get('MONGODB_DB_NAME')

        if mongoUser and mongoPassword and MONGODB_DB_NAME:
            return f"mongodb+srv://{mongoUser}:{mongoPassword}@btgpactualtest.gbc5x.mongodb.net/?retryWrites=true&w=majority&appName={MONGODB_DB_NAME}"
        else:
            print("Variables de entorno no completas, usando URI local.")
            return "mongodb://localhost:27017/local_db"


# Instanciar la configuración
settings = Settings()

# Imprimir valores de prueba
print(f"App Name: {settings.APP_NAME}")
