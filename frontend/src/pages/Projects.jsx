import { useEffect, useState } from 'react'
import { API, isAuthed } from '../api'

export default function Projects(){
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ name:'', description:'', status:'planned' })
  const authed = isAuthed()

  const load = async ()=> {
    const res = await API.get('/projects'); setItems(res.data)
  }
  useEffect(()=>{ load() }, [])

  const create = async (e)=> {
    e.preventDefault()
    await API.post('/projects', form); setForm({ name:'', description:'', status:'planned' }); load()
  }
  const update = async (id, status)=> {
    const item = items.find(x=>x.id===id)
    await API.put(`/projects/${id}`, { ...item, status }); load()
  }
  const remove = async (id)=> { await API.delete(`/projects/${id}`); load() }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="p-5 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-lg font-semibold">Create Project</h2>
        {authed ? (
          <form className="mt-3 space-y-3" onSubmit={create}>
            <input className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800"
              placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
            <textarea className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800"
              placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
            <select className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800"
              value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
              <option value="planned">Planned</option><option value="active">Active</option><option value="done">Done</option>
            </select>
            <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500">Create</button>
          </form>
        ) : <p className="mt-2 text-sm opacity-75">Login to create projects.</p>}
      </div>

      <div className="p-5 rounded-2xl border border-slate-800 shadow-lg">
        <h2 className="text-lg font-semibold">Projects</h2>
        <ul className="mt-3 space-y-3">
          {items.map(p=>(
            <li key={p.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm opacity-75">{p.description}</div>
                  <div className="text-xs mt-1 opacity-75">Status: {p.status}</div>
                </div>
                {authed && (
                  <div className="flex gap-2">
                    <button onClick={()=>update(p.id, 'active')} className="px-3 py-1 rounded-lg bg-blue-600">Active</button>
                    <button onClick={()=>update(p.id, 'done')} className="px-3 py-1 rounded-lg bg-green-600">Done</button>
                    <button onClick={()=>remove(p.id)} className="px-3 py-1 rounded-lg bg-rose-600">Delete</button>
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

