import { useEffect, useState } from 'react'
import { API, isAuthed } from '../api'

export default function Tickets(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ title:'', description:'', priority:'low', status:'open', requester_email:'' })
  const authed = isAuthed()

  const load = async ()=> { const r = await API.get('/tickets'); setItems(r.data) }
  useEffect(()=>{ load() }, [])

  const create = async (e)=> { e.preventDefault(); await API.post('/tickets', form); setForm({ title:'', description:'', priority:'low', status:'open', requester_email:'' }); load() }
  const update = async (id, status)=> { const it = items.find(x=>x.id===id); await API.put(`/tickets/${id}`, { ...it, status }); load() }
  const remove = async (id)=> { await API.delete(`/tickets/${id}`); load() }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="p-5 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-lg font-semibold">Create Ticket</h2>
        {authed ? (
          <form className="mt-3 space-y-3" onSubmit={create}>
            <input className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
            <textarea className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
            <input className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" placeholder="Requester Email" value={form.requester_email} onChange={e=>setForm({...form, requester_email:e.target.value})}/>
            <div className="grid grid-cols-2 gap-3">
              <select className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" value={form.priority} onChange={e=>setForm({...form, priority:e.target.value})}>
                <option>low</option><option>medium</option><option>high</option>
              </select>
              <select className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
                <option>open</option><option>in-progress</option><option>resolved</option>
              </select>
            </div>
            <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500">Create</button>
          </form>
        ) : <p className="mt-2 text-sm opacity-75">Login to create tickets.</p>}
      </div>

      <div className="p-5 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-lg font-semibold">Tickets</h2>
        <ul className="mt-3 space-y-3">
          {items.map(t=>(
            <li key={t.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="font-semibold">{t.title} <span className="text-xs opacity-75">({t.priority})</span></div>
                  <div className="text-sm opacity-75">{t.description}</div>
                  <div className="text-xs mt-1 opacity-75">Status: {t.status} · {t.requester_email || '—'}</div>
                </div>
                {isAuthed() && (
                  <div className="flex gap-2">
                    <button onClick={()=>update(t.id, 'in-progress')} className="px-3 py-1 rounded-lg bg-blue-600">In‑Progress</button>
                    <button onClick={()=>update(t.id, 'resolved')} className="px-3 py-1 rounded-lg bg-green-600">Resolve</button>
                    <button onClick={()=>remove(t.id)} className="px-3 py-1 rounded-lg bg-rose-600">Delete</button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

