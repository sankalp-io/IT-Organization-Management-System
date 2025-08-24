import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Projects from './pages/Projects.jsx'
import Tickets from './pages/Tickets.jsx'
import Assets from './pages/Assets.jsx'
import Login from './pages/Login.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'projects', element: <Projects /> },
      { path: 'tickets', element: <Tickets /> },
      { path: 'assets', element: <Assets /> },
      { path: 'login', element: <Login /> },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
)

