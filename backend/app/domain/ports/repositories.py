from abc import ABC, abstractmethod
from typing import List, Optional, TypeVar, Generic
from uuid import UUID
from domain.models.user import User
T = TypeVar('T')


class Repository(Generic[T], ABC):
    """Base repository interface"""
    
    @abstractmethod
    async def create(self, entity: T) -> T:
        pass
    
    @abstractmethod
    async def get_by_id(self, entity_id: UUID) -> Optional[T]:
        pass
    
    @abstractmethod
    async def get_all(self) -> List[T]:
        pass
    
    @abstractmethod
    async def update(self, entity: T) -> T:
        pass
    
    @abstractmethod
    async def delete(self, entity_id: UUID) -> bool:
        pass


class UserRepository(Repository["User"]):
    """User repository interface"""
    
    @abstractmethod
    async def get_by_email(self, email: str) -> Optional["User"]:
        pass
    
    @abstractmethod
    async def get_by_document_id(self, document_id: str) -> Optional["User"]:
        pass