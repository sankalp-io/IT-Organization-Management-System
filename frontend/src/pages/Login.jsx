import { useState } from 'react'
import { API, setAuthHeader } from '../api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try{
      const res = await API.post('/auth/login', null, { params: { email } })
      localStorage.setItem('token', res.data.token)
      setAuthHeader()
      setMsg('Logged in (demo). You can now create/update/delete.')
    }catch(e){ setMsg('Login failed') }
  }

  const logout = () => {
    localStorage.removeItem('token'); setAuthHeader(); setMsg('Logged out.')
  }

  return (
    <div className="max-w-md mx-auto p-5 rounded-2xl border border-slate-800 shadow-lg">
      <h2 className="text-lg font-semibold">Login (Demo)</h2>
      <form onSubmit={submit} className="mt-3 space-y-3">
        <input className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800"
               placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500">Login</button>
          <button type="button" onClick={logout} className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600">Logout</button>
        </div>
      </form>
      {msg && <p className="mt-3 text-sm opacity-80">{msg}</p>}
    </div>
  )
}

