from typing import List, Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, status, Path, Query

from domain.ports.services import UserService
from application.dtos.user_dto import UserCreateDTO, UserUpdateDTO, UserResponseDTO
from interfaces.api.dependencies import get_user_service

router = APIRouter()


@router.post(
    "/",
    response_model=UserResponseDTO,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new user",
    description="Create a new user with the provided data"
)
async def create_user(
    user_data: UserCreateDTO,
    user_service: Annotated[UserService, Depends(get_user_service)]
):
    """Create a new user"""
    user = await user_service.create_user(user_data.model_dump())
    return user


@router.get(
    "/{user_id}",
    response_model=UserResponseDTO,
    status_code=status.HTTP_200_OK,
    summary="Get user by ID",
    description="Get a user by their unique identifier"
)
async def get_user(
    user_id: Annotated[UUID, Path(description="The ID of the user to get")],
    user_service: Annotated[UserService, Depends(get_user_service)]
):
    """Get a user by ID"""
    return await user_service.get_user_by_id(user_id)


@router.get(
    "/",
    response_model=List[UserResponseDTO],
    status_code=status.HTTP_200_OK,
    summary="Get all users",
    description="Get a list of all users"
)
async def get_users(user_service: Annotated[UserService, Depends(get_user_service)]):
    """Get all users"""
    users = await user_service.get_users()
    return users


@router.put(
    "/{user_id}",
    response_model=UserResponseDTO,
    status_code=status.HTTP_200_OK,
    summary="Update user",
    description="Update a user with the provided data"
)
async def update_user(
    user_id: Annotated[UUID, Path(description="The ID of the user to update")],
    user_data: UserUpdateDTO,
    user_service: Annotated[UserService, Depends(get_user_service)]
):
    """Update a user"""
    return await user_service.update_user(user_id, user_data.model_dump(exclude_unset=True))


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete user",
    description="Delete a user by their unique identifier"
)
async def delete_user(
    user_id: Annotated[UUID, Path(description="The ID of the user to delete")],
    user_service: Annotated[UserService, Depends(get_user_service)]
):
    """Delete a user"""
    await user_service.delete_user(user_id)