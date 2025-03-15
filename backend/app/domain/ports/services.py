from abc import ABC, abstractmethod
from typing import List, Optional
from uuid import UUID

from domain.models.user import User


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