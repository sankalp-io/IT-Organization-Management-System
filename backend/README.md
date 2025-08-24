# IT Organization Backend API

FastAPI server for IT Organization interface with SQLite storage using SQLAlchemy ORM (async).

## Features

- **Health Check**: GET `/health`
- **Demo Authentication**: POST `/auth/login?email=...`
- **Projects CRUD**: Full CRUD operations for projects
- **Tickets CRUD**: Full CRUD operations for tickets  
- **Assets CRUD**: Full CRUD operations for assets
- **SQLite Integration**: Async SQLite operations with SQLAlchemy ORM

## Setup

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **SQLite**: No setup required. Data is stored in the file `itorg.db` in the backend directory by default.

3. **Environment**: Optionally, you can set the SQLite file path with the `SQLITE_URL` environment variable (default: `sqlite+aiosqlite:///itorg.db`).

## Running the Server

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

The server will start on port 8000 with auto-reload enabled.

## API Endpoints

### Health & Auth
- `GET /health` - Health check with SQLite ping
- `POST /auth/login?email=...` - Demo authentication (returns demo token)

### Projects
- `GET /projects` - List all projects
- `POST /projects` - Create new project
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project

### Tickets
- `GET /tickets` - List all tickets
- `POST /tickets` - Create new ticket
- `PUT /tickets/{id}` - Update ticket
- `DELETE /tickets/{id}` - Delete ticket

### Assets
- `GET /assets` - List all assets
- `POST /assets` - Create new asset
- `PUT /assets/{id}` - Update asset
- `DELETE /assets/{id}` - Delete asset

## Data Models

- **Projects**: name, description, status (planned/active/done)
- **Tickets**: title, description, priority (low/medium/high), status (open/in-progress/resolved), requester_email
- **Assets**: type (laptop/monitor/vm), make_model, serial, assigned_to, status (in-use/stock/retired)

## Development Notes

- CORS is open for local development (restrict in production)
- All timestamps use UTC
- Error handling includes proper HTTP status codes
