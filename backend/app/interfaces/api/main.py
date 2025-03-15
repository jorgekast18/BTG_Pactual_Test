from fastapi import APIRouter

from interfaces.api.routes import user_routes, funds_routes

api_router = APIRouter()

api_router.include_router(user_routes.router, prefix="/users", tags=["users"])
api_router.include_router(funds_routes.router, prefix="/funds", tags=["funds"])