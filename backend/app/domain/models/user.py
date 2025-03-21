from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict
from datetime import datetime
from uuid import UUID, uuid4


class User(BaseModel):
    """User domain model"""
    id: UUID = Field(default_factory=uuid4)
    email: EmailStr
    document_id: str
    first_name: str
    last_name: str
    balance: float = 500000
    registered_funds: List[Dict] = Field(default_factory=lambda: [])
    available_funds: List[Dict] = Field(default_factory=lambda: [{}])
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True