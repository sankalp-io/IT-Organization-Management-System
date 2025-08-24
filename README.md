# IT Organization Management System

A modern, full-stack web application for managing IT projects, support tickets, and asset inventory. Built with FastAPI backend and React frontend, featuring a stunning 3D hero section and responsive design.

## 🚀 Tech Stack

### Backend
- **Framework**: FastAPI (Python 3.7+)
- **Database**: SQLite with SQLAlchemy ORM
- **Async Support**: SQLAlchemy async with aiosqlite
- **Validation**: Pydantic models for request/response validation
- **CORS**: Cross-origin resource sharing enabled for development
- **Environment**: python-dotenv for configuration management

### Frontend
- **Framework**: React 18 with Vite build tool
- **Styling**: TailwindCSS with custom dark theme
- **3D Graphics**: React Three Fiber + Three.js for interactive 3D hero
- **Routing**: React Router DOM v6 for SPA navigation
- **HTTP Client**: Axios for API communication
- **Fonts**: Google Fonts (Orbitron for display, JetBrains Mono for code)
- **Responsive**: Mobile-first design with Tailwind breakpoints

### Development Tools
- **Package Manager**: npm (Node.js)
- **Build Tool**: Vite for fast development and optimized builds
- **CSS Processing**: PostCSS with Autoprefixer
- **Code Quality**: ESLint and Prettier ready
- **Hot Reload**: Vite dev server with instant updates

## ✨ Features

### Core Functionality
- **Projects Management**: Create, read, update, delete projects with status tracking
- **Support Tickets**: Manage tickets with priority levels and status workflows
- **Asset Inventory**: Track IT equipment (laptops, monitors, VMs) with assignment status
- **User Authentication**: Demo login system with localStorage token management
- **Real-time Health**: Backend health monitoring and status display

### User Experience
- **3D Hero Section**: Interactive floating cubes with orbital controls
- **Responsive Design**: Optimized for all device sizes
- **Dark Theme**: Modern slate-based color scheme
- **Interactive UI**: Hover effects, smooth transitions, and intuitive navigation
- **Permission-based Access**: Read-only mode for unauthenticated users

### Technical Features
- **RESTful API**: Full CRUD operations for all entities
- **Async Operations**: Non-blocking database operations
- **Type Safety**: Strong typing with Pydantic and TypeScript-like validation
- **Error Handling**: Comprehensive HTTP status codes and error messages
- **CORS Support**: Cross-origin requests enabled for development

## 🏗️ Project Structure

```
it-org/
├── backend/                 # FastAPI backend application
│   ├── app.py              # Main FastAPI application with routes
│   ├── models.py           # SQLAlchemy ORM models and Pydantic schemas
│   ├── db.py               # Database connection and session management
│   ├── utils.py            # Utility functions and helpers
│   ├── requirements.txt    # Python dependencies
│   └── README.md           # Backend-specific documentation
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── Navbar.jsx  # Navigation component
│   │   │   ├── Footer.jsx  # Footer component
│   │   │   └── Hero3D.jsx  # 3D hero section
│   │   ├── pages/          # Application pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Tickets.jsx
│   │   │   ├── Assets.jsx
│   │   │   └── Login.jsx
│   │   ├── api.js          # API client configuration
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # Application entry point
│   │   └── index.css       # Global styles and Tailwind imports
│   ├── package.json        # Node.js dependencies and scripts
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # TailwindCSS configuration
│   └── postcss.config.js   # PostCSS configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.7+ with pip
- Node.js 16+ with npm
- Git

### Backend Setup

1. **Clone and navigate to backend**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the FastAPI server**
   ```bash
   uvicorn app:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Verify backend is running**
   - Health check: http://localhost:8000/health
   - API docs: http://localhost:8000/docs

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   echo "VITE_API_BASE=http://127.0.0.1:8000" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

## 📚 API Endpoints

### Authentication
- `POST /auth/login?email=...` - Demo login (returns token)

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

### Health
- `GET /health` - Backend health status

## 🎨 Design System

### Color Palette
- **Primary**: Slate-based dark theme
- **Accent**: Indigo for primary actions
- **Status Colors**: Blue (active), Green (success), Red (danger), Amber (warning)
- **Text**: High contrast white/slate for readability

### Typography
- **Display Font**: Orbitron (robotic, futuristic feel)
- **Monospace**: JetBrains Mono (for code and technical elements)
- **Responsive**: Fluid typography scaling from mobile to desktop

### Components
- **Cards**: Rounded borders with subtle shadows
- **Buttons**: Consistent padding, rounded corners, hover states
- **Forms**: Clean inputs with focus states and validation
- **Navigation**: Sticky header with backdrop blur effect

## 🔧 Development

### Backend Development
- **Database**: SQLite file (`itorg.db`) for easy development
- **Hot Reload**: Uvicorn with `--reload` flag
- **API Testing**: Interactive docs at `/docs` endpoint
- **Environment**: Configure via `.env` file

### Frontend Development
- **Hot Reload**: Vite dev server with instant updates
- **Tailwind**: Utility-first CSS with custom extensions
- **3D Graphics**: React Three Fiber for WebGL integration
- **State Management**: React hooks for local state

### Code Quality
- **Type Safety**: Pydantic models for API validation
- **Error Handling**: Comprehensive HTTP status codes
- **Responsive Design**: Mobile-first approach with Tailwind
- **Accessibility**: Semantic HTML and ARIA labels

## 🚀 Deployment

### Backend Deployment
- **Production Server**: Gunicorn with Uvicorn workers
- **Database**: PostgreSQL for production (update connection string)
- **Environment**: Set production environment variables
- **CORS**: Restrict origins for production

### Frontend Deployment
- **Build**: `npm run build` creates optimized production bundle
- **Hosting**: Deploy `dist/` folder to any static hosting service
- **Environment**: Update `VITE_API_BASE` for production API
- **CDN**: Consider CDN for global performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FastAPI** for the modern, fast web framework
- **React Three Fiber** for the amazing 3D integration
- **TailwindCSS** for the utility-first CSS framework
- **Vite** for the lightning-fast build tool
- **SQLAlchemy** for the powerful ORM


