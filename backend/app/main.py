import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.settings import settings
from interfaces.api.main import api_router
from infrastructure.db.db import init_db, close_db
from interfaces.api.error_handlers import register_exception_handlers


def create_app() -> FastAPI:
    """Create and configure FastAPI application"""
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        debug=settings.DEBUG,
    )
    
    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Register startup and shutdown events
    app.add_event_handler("startup", init_db)
    app.add_event_handler("shutdown", close_db)

    # Register routes
    app.include_router(api_router, prefix=settings.API_PREFIX)


    # Register error handlers
    register_exception_handlers(app)
    
    return app


app = create_app()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)