import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Hero3D from './components/Hero3D.jsx'

export default function App(){
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {isHome && <Hero3D />}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

