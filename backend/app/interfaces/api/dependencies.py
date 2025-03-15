from typing import Annotated

from fastapi import Depends

from domain.ports.repositories import UserRepository
from domain.ports.services import UserService
from infrastructure.repositories.db_repository import MongoDBUserRepository
from application.services.user_service import UserServiceImpl


def get_user_repository() -> UserRepository:
    """Dependency for UserRepository"""
    return MongoDBUserRepository()


def get_user_service(
    user_repository: Annotated[UserRepository, Depends(get_user_repository)]
) -> UserService:
    """Dependency for UserService"""
    return UserServiceImpl(user_repository)