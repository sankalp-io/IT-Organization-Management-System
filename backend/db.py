import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("SQLITE_URL", "sqlite+aiosqlite:///itorg.db")

engine = create_async_engine(DATABASE_URL, echo=True, future=True)
SessionLocal = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()

async def connect():
    # Ensure models are imported so that Base.metadata is populated
    import models  # noqa: F401
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def disconnect():
    await engine.dispose()

async def get_session():
    async with SessionLocal() as session:
        yield session
