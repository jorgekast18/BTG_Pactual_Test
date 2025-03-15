from typing import List, Optional, Type, Generic
from uuid import UUID
from datetime import datetime

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorCollection

from domain.models.user import User
from domain.models.fund import Fund
from domain.ports.repositories import UserRepository, FundRepository, Repository, T
from infrastructure.db.db import get_database
from interfaces.exceptions import EntityNotFoundException


class MongoDBRepository(Repository[T], Generic[T]):
    """MongoDB repository implementation"""
    
    def __init__(self, collection_name: str, model_class: Type[T]):
        self.collection_name = collection_name
        self.model_class = model_class
        self._collection: AsyncIOMotorCollection = get_database()[collection_name]
    
    async def create(self, entity: T) -> T:
        entity_dict = entity.model_dump()
        entity_dict["_id"] = str(entity_dict.pop("id"))
        
        result = await self._collection.insert_one(entity_dict)
        if result.inserted_id:
            return entity
        raise Exception("Failed to create entity")
    
    async def get_by_id(self, entity_id: UUID) -> Optional[T]:
        result = await self._collection.find_one({"_id": str(entity_id)})
        if result:
            result["id"] = UUID(result.pop("_id"))
            return self.model_class(**result)
        return None
    
    async def get_all(self) -> List[T]:
        cursor = self._collection.find({})
        entities = []
        
        async for document in cursor:
            document["id"] = UUID(document.pop("_id"))
            entities.append(self.model_class(**document))
            
        return entities
    
    async def update(self, entity: T) -> T:
        entity_dict = entity.model_dump()
        entity_id = str(entity_dict.pop("id"))
        
        # Update the updated_at field
        entity_dict["updated_at"] = datetime.utcnow()
        
        result = await self._collection.update_one(
            {"_id": entity_id},
            {"$set": entity_dict}
        )
        
        if result.matched_count == 0:
            raise EntityNotFoundException(f"Entity with id {entity_id} not found")
        
        return await self.get_by_id(UUID(entity_id))
    
    async def delete(self, entity_id: UUID) -> bool:
        result = await self._collection.delete_one({"_id": str(entity_id)})
        return result.deleted_count > 0


class MongoDBUserRepository(MongoDBRepository[User], UserRepository):
    """MongoDB user repository implementation"""
    
    def __init__(self):
        super().__init__("users", User)
    
    async def get_by_email(self, email: str) -> Optional[User]:
        result = await self._collection.find_one({"email": email})
        if result:
            result["id"] = UUID(result.pop("_id"))
            return User(**result)
        return None
    
    async def get_by_document_id(self, document_id: str) -> Optional[User]:
        result = await self._collection.find_one({"document_id": document_id})
        if result:
            result["id"] = UUID(result.pop("_id"))
            return User(**result)
        return None


class MongoDBFundRepository(MongoDBRepository[Fund], FundRepository):
    """MongoDB fund repository implementation"""

    def __init__(self):
        super().__init__("funds", Fund)