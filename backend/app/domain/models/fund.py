from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime
from uuid import UUID, uuid4


class Fund(BaseModel):
    """Fund domain model"""
    id: UUID = Field(default_factory=uuid4)
    name: str
    minimum_balance: float
    category: Literal['FPV', 'FIC']
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True