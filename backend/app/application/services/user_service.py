from typing import List, Optional
from uuid import UUID
from datetime import datetime

from domain.models.user import User
from domain.ports.services import UserService
from domain.ports.repositories import UserRepository
from interfaces.exceptions import (
    EntityNotFoundException,
    ConflictException,
)


class UserServiceImpl(UserService):
    """User service implementation"""
    
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository
    
    async def create_user(self, user_data: dict) -> User:
        # Check if email or document_id already exists
        email = user_data.get("email")
        document_id = user_data.get("document_id")
        
        if await self.user_repository.get_by_email(email):
            raise ConflictException(f"User with email {email} already exists")
            
        if await self.user_repository.get_by_document_id(document_id):
            raise ConflictException(f"User with document id {document_id} already exists")
        
        # Create user
        user = User(**user_data)
        return await self.user_repository.create(user)
    
    async def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        user = await self.user_repository.get_by_id(user_id)
        if not user:
            raise EntityNotFoundException(f"User with id {user_id} not found")
        return user
    
    async def get_users(self) -> List[User]:
        return await self.user_repository.get_all()
    
    async def update_user(self, user_id: UUID, user_data: dict) -> User:
        # Get existing user
        user = await self.get_user_by_id(user_id)
        
        # Check if email or document_id already exists
        if "email" in user_data and user_data["email"] != user.email:
            existing_user = await self.user_repository.get_by_email(user_data["email"])
            if existing_user and existing_user.id != user_id:
                raise ConflictException(f"User with email {user_data['email']} already exists")
        
        if "document_id" in user_data and user_data["document_id"] != user.document_id:
            existing_user = await self.user_repository.get_by_document_id(user_data["document_id"])
            if existing_user and existing_user.id != user_id:
                raise ConflictException(f"User with document id {user_data['document_id']} already exists")
        
        # Update user fields
        for key, value in user_data.items():
            if hasattr(user, key) and value is not None:
                setattr(user, key, value)
        
        # Update timestamp
        user.updated_at = datetime.utcnow()
        
        # Save updated user
        return await self.user_repository.update(user)
    
    async def delete_user(self, user_id: UUID) -> bool:
        # Check if user exists
        await self.get_user_by_id(user_id)
        
        # Delete user
        return await self.user_repository.delete(user_id)
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        user = await self.user_repository.get_by_email(email)
        if not user:
            raise EntityNotFoundException(f"User with email {email} not found")
        return user