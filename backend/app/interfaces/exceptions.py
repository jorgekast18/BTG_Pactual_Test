class BaseAPIException(Exception):
    """Base exception for API errors"""
    status_code: int = 500
    detail: str = "Internal server error"
    
    def __init__(self, detail: str = None):
        if detail:
            self.detail = detail
        super().__init__(self.detail)


class EntityNotFoundException(BaseAPIException):
    """Exception for entity not found"""
    status_code = 404
    detail = "Entity not found"


class ValidationException(BaseAPIException):
    """Exception for validation errors"""
    status_code = 400
    detail = "Validation error"


class ConflictException(BaseAPIException):
    """Exception for conflict errors"""
    status_code = 409
    detail = "Conflict error"


class UnauthorizedException(BaseAPIException):
    """Exception for unauthorized errors"""
    status_code = 401
    detail = "Unauthorized"


class ForbiddenException(BaseAPIException):
    """Exception for forbidden errors"""
    status_code = 403
    detail = "Forbidden"