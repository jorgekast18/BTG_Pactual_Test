from abc import ABC, abstractmethod
from typing import List, Optional
from uuid import UUID

from domain.models.user import User
from domain.models.fund import Fund


class UserService(ABC):
    """User service interface"""
    
    @abstractmethod
    async def create_user(self, user_data: dict) -> User:
        pass
    
    @abstractmethod
    async def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        pass
    
    @abstractmethod
    async def get_users(self) -> List[User]:
        pass
    
    @abstractmethod
    async def update_user(self, user_id: UUID, user_data: dict) -> User:
        pass
    
    @abstractmethod
    async def delete_user(self, user_id: UUID) -> bool:
        pass
    
    @abstractmethod
    async def get_user_by_email(self, email: str) -> Optional[User]:
        pass

    @abstractmethod
    async def subscribe_to_fund(self, user_id: UUID, fund_data: dict) -> Optional[User]:
        pass

    @abstractmethod
    async def withdrawal_fund(self, user_id: UUID, fund_data: dict) -> Optional[User]:
        pass

class FundService(ABC):
    """Fund service interface"""

    @abstractmethod
    async def create_fund(self, fund_data: dict) -> Fund:
        pass


    @abstractmethod
    async def funds(self) -> List[Fund]:
        pass

    @abstractmethod
    async def get_fund_by_id(self, fund_id: UUID) -> Optional[Fund]:
        pass
