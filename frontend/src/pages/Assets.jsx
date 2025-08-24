import { useEffect, useState } from 'react'
import { API, isAuthed } from '../api'

export default function Assets(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ type:'laptop', make_model:'', serial:'', assigned_to:'', status:'stock' })
  const authed = isAuthed()

  const load = async ()=> { const r = await API.get('/assets'); setItems(r.data) }
  useEffect(()=>{ load() }, [])

  const create = async (e)=> { e.preventDefault(); await API.post('/assets', form); setForm({ type:'laptop', make_model:'', serial:'', assigned_to:'', status:'stock' }); load() }
  const update = async (id, status)=> { const it = items.find(x=>x.id===id); await API.put(`/assets/${id}`, { ...it, status }); load() }
  const remove = async (id)=> { await API.delete(`/assets/${id}`); load() }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="p-5 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-lg font-semibold">Add Asset</h2>
        {authed ? (
          <form className="mt-3 space-y-3" onSubmit={create}>
            <div className="grid grid-cols-2 gap-3">
              <select className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
                <option>laptop</option><option>monitor</option><option>vm</option>
              </select>
              <select className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
                <option>stock</option><option>in-use</option><option>retired</option>
              </select>
            </div>
            <input className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" placeholder="Make & Model" value={form.make_model} onChange={e=>setForm({...form, make_model:e.target.value})}/>
            <input className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" placeholder="Serial" value={form.serial} onChange={e=>setForm({...form, serial:e.target.value})}/>
            <input className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800" placeholder="Assigned To (optional)" value={form.assigned_to} onChange={e=>setForm({...form, assigned_to:e.target.value})}/>
            <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500">Save</button>
          </form>
        ) : <p className="mt-2 text-sm opacity-75">Login to add assets.</p>}
      </div>

      <div className="p-5 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-lg font-semibold">Assets</h2>
        <ul className="mt-3 space-y-3">
          {items.map(a=>(
            <li key={a.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="font-semibold capitalize">{a.type} · {a.make_model}</div>
                  <div className="text-sm opacity-75">SN: {a.serial} · Assigned: {a.assigned_to || '—'}</div>
                  <div className="text-xs mt-1 opacity-75">Status: {a.status}</div>
                </div>
                {authed && (
                  <div className="flex gap-2">
                    <button onClick={()=>update(a.id, 'in-use')} className="px-3 py-1 rounded-lg bg-blue-600">In‑Use</button>
                    <button onClick={()=>update(a.id, 'retired')} className="px-3 py-1 rounded-lg bg-amber-600">Retire</button>
                    <button onClick={()=>remove(a.id)} className="px-3 py-1 rounded-lg bg-rose-600">Delete</button>
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

