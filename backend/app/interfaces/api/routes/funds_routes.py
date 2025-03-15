from typing import Annotated, List
from uuid import UUID

from fastapi import APIRouter, Depends, status, Path, Query

from domain.ports.services import FundService
from application.dtos.funds_dto import FundResponseDTO, FundCreateDTO, FundUpdateDTO
from interfaces.api.dependencies import get_fund_service

router = APIRouter()

@router.post(
    "/",
    response_model=FundResponseDTO,
    status_code=status.HTTP_201_CREATED,
    summary="Create new fund",
    description="Create new fund",
)
async def create_fund(
        fund_data: FundCreateDTO,
        fund_service: Annotated[FundService, Depends(get_fund_service)]
):
    """Create a new fund"""
    fund = await fund_service.create_fund(fund_data.model_dump())
    return fund

@router.get(
    "/{fund_id}",
    response_model=FundResponseDTO,
    status_code=status.HTTP_200_OK,
    summary="Get fund",
    description="Get fund by id",
)
async def get_fund(
        fund_id: Annotated[UUID, Path(description="The Id of the fund to get")],
        fund_service: Annotated[FundService, Depends(get_fund_service)]
):
    """Get a fund by Id"""
    return await fund_service.get_fund_by_id(fund_id)

@router.get(
    "/",
    response_model=List[FundResponseDTO],
    status_code=status.HTTP_200_OK,
    summary="Get all funds",
    description="Get all funds",
)
async def get_all_funds(fund_service: Annotated[FundService, Depends(get_fund_service)]):
    """Get all funds"""
    return await fund_service.funds()