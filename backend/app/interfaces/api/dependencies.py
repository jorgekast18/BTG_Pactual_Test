from typing import Annotated

from fastapi import Depends

from domain.ports.repositories import UserRepository, FundRepository
from domain.ports.services import UserService, FundService
from infrastructure.repositories.db_repository import MongoDBUserRepository, MongoDBFundRepository
from application.services.user_service import UserServiceImpl
from application.services.funds_service import FundServiceImpl


def get_user_repository() -> UserRepository:
    """Dependency for UserRepository"""
    return MongoDBUserRepository()

def get_fund_repository() -> FundRepository:
    """Dependency for FundRepository"""
    return MongoDBFundRepository()


def get_user_service(
    user_repository: Annotated[UserRepository, Depends(get_user_repository)]
) -> UserService:
    """Dependency for UserService"""
    return UserServiceImpl(user_repository)

def get_fund_service(
    fund_repository: Annotated[FundRepository, Depends(get_fund_repository)]
) -> FundService:
    """Dependency for UserService"""
    return FundServiceImpl(fund_repository)