from fastapi import FastAPI
from src.routers import all_router
from contextlib import asynccontextmanager
from src.libs.database import DBSessionManager
from fastapi.middleware.cors import CORSMiddleware


def init_routers():
    for router in all_router:
        app.include_router(router)

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_routers()
    db_manager = DBSessionManager()
    db_manager.create_db_and_tables()
    yield
    

app = FastAPI(lifespan=lifespan)

def configure_app():
    origins = [
        "http://localhost:5173",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_methods=["*"],
        allow_headers=["*"],
    )

configure_app()






