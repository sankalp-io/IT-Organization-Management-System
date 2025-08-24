from datetime import datetime
from typing import List
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import SQLAlchemyError

from db import connect, disconnect, get_session
from models import (
    Project, ProjectIn, ProjectOut, ProjectStatus,
    Ticket, TicketIn, TicketOut, TicketPriority, TicketStatus,
    Asset, AssetIn, AssetOut, AssetType, AssetStatus
)

load_dotenv()

app = FastAPI(title="IT Org API", version="0.3.0")

# CORS (open for local dev; restrict in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def on_startup():
    await connect()

@app.on_event("shutdown")
async def on_shutdown():
    await disconnect()

# ---------- Mappers ----------

def project_to_out(p: Project) -> ProjectOut:
    return ProjectOut(
        id=p.id,
        name=p.name,
        description=p.description or "",
        status=p.status.value if isinstance(p.status, ProjectStatus) else p.status,
        created_at=p.created_at,
        updated_at=p.updated_at,
    )


def ticket_to_out(t: Ticket) -> TicketOut:
    return TicketOut(
        id=t.id,
        title=t.title,
        description=t.description or "",
        priority=t.priority.value if isinstance(t.priority, TicketPriority) else t.priority,
        status=t.status.value if isinstance(t.status, TicketStatus) else t.status,
        requester_email=t.requester_email or "",
        created_at=t.created_at,
        updated_at=t.updated_at,
    )


def asset_to_out(a: Asset) -> AssetOut:
    return AssetOut(
        id=a.id,
        type=a.type.value if isinstance(a.type, AssetType) else a.type,
        make_model=a.make_model or "",
        serial=a.serial or "",
        assigned_to=a.assigned_to or "",
        status=a.status.value if isinstance(a.status, AssetStatus) else a.status,
        created_at=a.created_at,
        updated_at=a.updated_at,
    )

# ------------- Health & Demo Auth -------------
@app.get("/health")
async def health(session: AsyncSession = Depends(get_session)):
    try:
        await session.execute(select(1))
        return {"status": "ok"}
    except SQLAlchemyError:
        return {"status": "degraded"}

@app.post("/auth/login")
async def login(email: str):
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Invalid email")
    return {"token": f"demo-token-{email}"}

# ------------- Projects CRUD -------------
@app.get("/projects", response_model=List[ProjectOut])
async def list_projects(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Project).order_by(Project.id))
    projects = result.scalars().all()
    return [project_to_out(p) for p in projects]

@app.post("/projects", response_model=ProjectOut)
async def create_project(data: ProjectIn, session: AsyncSession = Depends(get_session)):
    now = datetime.utcnow()
    project = Project(
        name=data.name,
        description=data.description,
        status=ProjectStatus(data.status),
        created_at=now,
        updated_at=now
    )
    session.add(project)
    await session.commit()
    await session.refresh(project)
    return project_to_out(project)

@app.put("/projects/{pid}", response_model=ProjectOut)
async def update_project(pid: int, data: ProjectIn, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Project).where(Project.id == pid))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(404, "Not found")
    project.name = data.name
    project.description = data.description
    project.status = ProjectStatus(data.status)
    project.updated_at = datetime.utcnow()
    await session.commit()
    await session.refresh(project)
    return project_to_out(project)

@app.delete("/projects/{pid}")
async def delete_project(pid: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Project).where(Project.id == pid))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(404, "Not found")
    await session.delete(project)
    await session.commit()
    return {"ok": True}

# ------------- Tickets CRUD -------------
@app.get("/tickets", response_model=List[TicketOut])
async def list_tickets(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Ticket).order_by(Ticket.id))
    tickets = result.scalars().all()
    return [ticket_to_out(t) for t in tickets]

@app.post("/tickets", response_model=TicketOut)
async def create_ticket(data: TicketIn, session: AsyncSession = Depends(get_session)):
    now = datetime.utcnow()
    ticket = Ticket(
        title=data.title,
        description=data.description,
        priority=TicketPriority(data.priority),
        status=TicketStatus(data.status),
        requester_email=data.requester_email,
        created_at=now,
        updated_at=now
    )
    session.add(ticket)
    await session.commit()
    await session.refresh(ticket)
    return ticket_to_out(ticket)

@app.put("/tickets/{tid}", response_model=TicketOut)
async def update_ticket(tid: int, data: TicketIn, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Ticket).where(Ticket.id == tid))
    ticket = result.scalar_one_or_none()
    if not ticket:
        raise HTTPException(404, "Not found")
    ticket.title = data.title
    ticket.description = data.description
    ticket.priority = TicketPriority(data.priority)
    ticket.status = TicketStatus(data.status)
    ticket.requester_email = data.requester_email
    ticket.updated_at = datetime.utcnow()
    await session.commit()
    await session.refresh(ticket)
    return ticket_to_out(ticket)

@app.delete("/tickets/{tid}")
async def delete_ticket(tid: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Ticket).where(Ticket.id == tid))
    ticket = result.scalar_one_or_none()
    if not ticket:
        raise HTTPException(404, "Not found")
    await session.delete(ticket)
    await session.commit()
    return {"ok": True}

# ------------- Assets CRUD -------------
@app.get("/assets", response_model=List[AssetOut])
async def list_assets(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Asset).order_by(Asset.id))
    assets = result.scalars().all()
    return [asset_to_out(a) for a in assets]

@app.post("/assets", response_model=AssetOut)
async def create_asset(data: AssetIn, session: AsyncSession = Depends(get_session)):
    now = datetime.utcnow()
    asset = Asset(
        type=AssetType(data.type),
        make_model=data.make_model,
        serial=data.serial,
        assigned_to=data.assigned_to,
        status=AssetStatus(data.status),
        created_at=now,
        updated_at=now
    )
    session.add(asset)
    await session.commit()
    await session.refresh(asset)
    return asset_to_out(asset)

@app.put("/assets/{aid}", response_model=AssetOut)
async def update_asset(aid: int, data: AssetIn, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Asset).where(Asset.id == aid))
    asset = result.scalar_one_or_none()
    if not asset:
        raise HTTPException(404, "Not found")
    asset.type = AssetType(data.type)
    asset.make_model = data.make_model
    asset.serial = data.serial
    asset.assigned_to = data.assigned_to
    asset.status = AssetStatus(data.status)
    asset.updated_at = datetime.utcnow()
    await session.commit()
    await session.refresh(asset)
    return asset_to_out(asset)

@app.delete("/assets/{aid}")
async def delete_asset(aid: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Asset).where(Asset.id == aid))
    asset = result.scalar_one_or_none()
    if not asset:
        raise HTTPException(404, "Not found")
    await session.delete(asset)
    await session.commit()
    return {"ok": True}
