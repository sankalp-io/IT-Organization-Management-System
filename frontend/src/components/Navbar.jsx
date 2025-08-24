import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import { isAuthed } from '../api'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(isAuthed())
  const link = (to, label) => (
    <NavLink to={to} className="hover:underline" onClick={()=>setOpen(false)}>{label}</NavLink>
  )
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/70 border-b border-slate-800">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold tracking-tight">IT Org</Link>
        <button className="sm:hidden p-2 border rounded-lg" onClick={()=>setOpen(o=>!o)} aria-label="Toggle Menu">☰</button>
        <ul className={`sm:flex gap-6 items-center ${open? 'block mt-3' : 'hidden sm:flex'}`}>
          <li>{link('/', 'Dashboard')}</li>
          <li>{link('/projects', 'Projects')}</li>
          <li>{link('/tickets', 'Tickets')}</li>
          <li>{link('/assets', 'Assets')}</li>
          <li>{link('/login', authed ? 'Logout' : 'Login')}</li>
        </ul>
      </nav>
    </header>
  )
}

