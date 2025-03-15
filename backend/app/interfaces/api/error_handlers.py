from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError, ResponseValidationError
from pydantic import ValidationError
from interfaces.exceptions import BaseAPIException, ConflictException


def register_exception_handlers(app: FastAPI):
    """Register exception handlers"""
    
    @app.exception_handler(RequestValidationError)
    async def handle_validation_exception(request: Request, exc: RequestValidationError):
        print("Validation Error:", exc.errors())
        errors = []
        for error in exc.errors():
            errors.append({
                "loc": error["loc"],
                "msg": error["msg"],
                "type": error["type"]
            })
        
        return JSONResponse(
            status_code=422,
            content={"detail": "Validation error", "errors": errors}
        )

    @app.exception_handler(ValidationError)
    async def handle_pydantic_validation_error(request: Request, exc: ValidationError):
        print("Handling Pydantic ValidationError...")
        errors = []
        for error in exc.errors():
            errors.append({
                "loc": error["loc"],
                "msg": error["msg"],
                "type": error["type"]
            })

        return JSONResponse(
            status_code=422,
            content={"detail": "Validation error", "errors": errors}
        )

    @app.exception_handler(ConflictException)
    async def handle_conflict_exception(request, exc: ConflictException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail}
        )

    @app.exception_handler(BaseAPIException)
    async def handle_base_api_exception(request: Request, exc: BaseAPIException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail}
        )

    @app.exception_handler(Exception)
    async def handle_general_exception(request: Request, exc: Exception):
        print("Handling general exception...")
        print(f"Exception type: {type(exc)}")
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"}
        )