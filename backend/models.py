from typing import Optional, Literal
from datetime import datetime
from pydantic import BaseModel, Field
from sqlalchemy import Column, Integer, String, DateTime, Enum
from db import Base
import enum

# ---------- ORM Models ----------
class ProjectStatus(str, enum.Enum):
    planned = "planned"
    active = "active"
    done = "done"

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, default="")
    status = Column(Enum(ProjectStatus), default=ProjectStatus.planned)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

class TicketPriority(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"

class TicketStatus(str, enum.Enum):
    open = "open"
    in_progress = "in-progress"
    resolved = "resolved"

class Ticket(Base):
    __tablename__ = "tickets"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, default="")
    priority = Column(Enum(TicketPriority), default=TicketPriority.low)
    status = Column(Enum(TicketStatus), default=TicketStatus.open)
    requester_email = Column(String, default="")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

class AssetType(str, enum.Enum):
    laptop = "laptop"
    monitor = "monitor"
    vm = "vm"

class AssetStatus(str, enum.Enum):
    in_use = "in-use"
    stock = "stock"
    retired = "retired"

class Asset(Base):
    __tablename__ = "assets"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(AssetType), default=AssetType.laptop)
    make_model = Column(String, default="")
    serial = Column(String, default="")
    assigned_to = Column(String, default="")
    status = Column(Enum(AssetStatus), default=AssetStatus.stock)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)

# ---------- Pydantic Schemas ----------
class ProjectIn(BaseModel):
    name: str
    description: Optional[str] = ""
    status: Literal["planned","active","done"] = "planned"

class ProjectOut(ProjectIn):
    id: int
    created_at: datetime
    updated_at: datetime

class TicketIn(BaseModel):
    title: str
    description: Optional[str] = ""
    priority: Literal["low","medium","high"] = "low"
    status: Literal["open","in-progress","resolved"] = "open"
    requester_email: Optional[str] = ""

class TicketOut(TicketIn):
    id: int
    created_at: datetime
    updated_at: datetime

class AssetIn(BaseModel):
    type: Literal["laptop","monitor","vm"] = "laptop"
    make_model: Optional[str] = ""
    serial: Optional[str] = ""
    assigned_to: Optional[str] = ""
    status: Literal["in-use","stock","retired"] = "stock"

class AssetOut(AssetIn):
    id: int
    created_at: datetime
    updated_at: datetime
