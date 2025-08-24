import { useEffect, useState } from 'react'
import { API } from '../api'

export default function Dashboard(){
  const [health, setHealth] = useState('checking...')
  useEffect(()=>{
    API.get('/health').then(r=> setHealth(r.data.status)).catch(()=> setHealth('offline'))
  }, [])
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="p-5 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-lg font-semibold">Backend Health</h2>
        <p className="mt-1 text-sm opacity-80">{health}</p>
      </div>
      <div className="p-5 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-lg font-semibold">Usage</h2>
        <p className="mt-1 text-sm opacity-80">Demo KPIs go here.</p>
      </div>
      <div className="p-5 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-lg font-semibold">Announcements</h2>
        <ul className="mt-2 list-disc list-inside text-sm opacity-80">
          <li>Welcome to the IT Org portal.</li>
          <li>3D hero is fully responsive.</li>
        </ul>
      </div>
    </div>
  )
}

