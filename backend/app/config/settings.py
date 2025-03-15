from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application settings"""
    APP_NAME: str = "BTG Pactual Test"
    APP_VERSION: str = "0.1.0"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = Field(default=False)
    
    # MongoDB Settings
    MONGODB_URL: str = Field(default="mongodb://localhost:27017")
    MONGODB_DB_NAME: str = Field(default="BTG_Pactual_test")
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()