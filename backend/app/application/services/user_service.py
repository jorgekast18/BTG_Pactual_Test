from typing import List, Optional
from uuid import UUID
from datetime import datetime

from domain.models import fund
from domain.models.user import User
from domain.models.fund import Fund
from domain.ports.services import UserService
from domain.ports.repositories import UserRepository, FundRepository
from interfaces.exceptions import (
    EntityNotFoundException,
    ConflictException,
)


class UserServiceImpl(UserService):
    """User service implementation"""
    
    def __init__(self, user_repository: UserRepository, fund_repository: FundRepository):
        self.user_repository = user_repository
        self.fund_repository = fund_repository
    
    async def create_user(self, user_data: dict) -> User:
        # Check if email or document_id already exists
        email = user_data.get("email")
        document_id = user_data.get("document_id")
        
        if await self.user_repository.get_by_email(email):
            raise ConflictException(f"El email {email} ya existe")

        # Set funds available
        available_funds = await self.fund_repository.get_all()
        user_data["available_funds"] = [
            { "id": str(fund.id), "name": fund.name, "minimum_balance": fund.minimum_balance, "category": fund.category }
            for fund in available_funds
        ]
        
        # Create user
        user = User(**user_data)
        return await self.user_repository.create(user)
    
    async def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        user = await self.user_repository.get_by_id(user_id)
        if not user:
            raise EntityNotFoundException(f"Usuario con id {user_id} no encontrado")
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
                raise ConflictException(f"El email {user_data['email']} ya existe")
        
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
            raise EntityNotFoundException(f"El email {email} no fue encontrado")
        return user

    async def subscribe_to_fund(self, user_id: UUID, fund_data: Fund) -> Optional[User]:
        user_in_db = await self.get_user_by_id(user_id)
        fund_id = fund_data['id']

        # Check if user exist
        if not user_in_db:
            raise EntityNotFoundException(f"Usuario con id {user_id} no encontrado")

        # Check if fund id exist
        if not fund_id:
            raise ConflictException(f"El id para el fondo {fund_data.name} es obligatorio")

        fund_in_db = await self.fund_repository.get_by_id(fund_id)

        # Check if fund exist in db
        if not fund_in_db:
            raise EntityNotFoundException(f"Fondo con id {fund_id} no encontrado")

        new_user_balance = user_in_db.balance - fund_data['minimum_balance']

        if new_user_balance < 0:
            raise ConflictException(f"No tiene saldo disponible para vincularse al fondo {fund_data['name']}")


        # Add fund in registered funds
        user_in_db.registered_funds.append({
            "id": str(fund_id),
            "name": fund_data['name'],
            "minimum_balance": fund_data['minimum_balance'],
            "category": fund_data['category'],
        })

        # Delete fund of available funds
        user_in_db.available_funds = [
            available_fund for available_fund in user_in_db.available_funds if str(available_fund['id']) != str(fund_id)
        ]

        # Update user balance
        user_in_db.balance = new_user_balance

        # Update user
        updated_user = await self.user_repository.update(user_in_db)

        return updated_user

    async def withdrawal_fund(self, user_id: UUID, fund_data: Fund) -> Optional[User]:
        user_in_db = await self.get_user_by_id(user_id)
        fund_id = fund_data['id']

        # Check if user exist
        if not user_in_db:
            raise EntityNotFoundException(f"Usuario con id {user_id} no encontrado")

        # Check if fund id exist
        if not fund_id:
            raise ConflictException(f"El id para el fondo {fund_data.name} es obligatorio")

        fund_in_db = await self.fund_repository.get_by_id(fund_id)

        # Check if fund exist in db
        if not fund_in_db:
            raise EntityNotFoundException(f"Fondo con id {fund_id} no encontrado")

        new_user_balance = user_in_db.balance + fund_data['minimum_balance']


        # Add fund in available funds
        user_in_db.available_funds.append({
            "id": str(fund_id),
            "name": fund_data['name'],
            "minimum_balance": fund_data['minimum_balance'],
            "category": fund_data['category'],
        })

        # Delete fund of available funds
        user_in_db.registered_funds = [
            registered_fund for registered_fund in user_in_db.registered_funds if str(registered_fund['id']) != str(fund_id)
        ]

        # Update user balance
        user_in_db.balance = new_user_balance

        # Update user
        updated_user = await self.user_repository.update(user_in_db)

        return updated_user
