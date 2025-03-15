from typing import List, Optional
from uuid import UUID
from datetime import datetime

from domain.models.fund import Fund
from domain.ports.services import FundService
from domain.ports.repositories import FundRepository
from interfaces.exceptions import (
    EntityNotFoundException
)


class FundServiceImpl(FundService):
    """User service implementation"""

    def __init__(self, fund_repository: FundRepository):
        self.fund_repository = fund_repository

    async def create_fund(self, fund_data: dict) -> Fund:

        # Create fund
        fund = Fund(**fund_data)
        return await self.fund_repository.create(fund)

    async def get_fund_by_id(self, fund_id: UUID) -> Optional[Fund]:
        fund = await self.fund_repository.get_by_id(fund_id)
        if not fund:
            raise EntityNotFoundException(f"Fund with id {fund_id} not found")
        return fund

    async def funds(self) -> List[Fund]:
        return await self.fund_repository.get_all()