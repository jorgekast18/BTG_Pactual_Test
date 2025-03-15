from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime


class UserCreateDTO(BaseModel):
    """DTO for user creation"""
    email: EmailStr
    document_id: str = Field(..., min_length=3, max_length=50)
    first_name: str = Field(..., min_length=1, max_length=50)
    last_name: str = Field(..., min_length=1, max_length=50)


class UserUpdateDTO(BaseModel):
    """DTO for user update"""
    email: Optional[EmailStr] = None
    document_id: Optional[str] = Field(None, min_length=3, max_length=50)
    first_name: Optional[str] = Field(None, min_length=1, max_length=50)
    last_name: Optional[str] = Field(None, min_length=1, max_length=50)
    is_active: Optional[bool] = None


class UserResponseDTO(BaseModel):
    """DTO for user response"""
    id: UUID
    email: EmailStr
    document_id: str
    first_name: str
    last_name: str
    balance: float
    created_at: datetime
    updated_at: Optional[datetime] = None