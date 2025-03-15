from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime


class FundCreateDTO(BaseModel):
    """DTO for fund creation"""
    name: str = Field(..., min_length=1, max_length=100)
    minimum_balance: float
    category: str


class FundUpdateDTO(BaseModel):
    """DTO for fund update"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    minimum_balance: Optional[float]
    category: Optional[str]


class FundResponseDTO(BaseModel):
    """DTO for fund response"""
    id: UUID
    name: str
    minimum_balance: float
    category: str
    created_at: datetime
    updated_at: Optional[datetime] = None