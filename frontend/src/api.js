import axios from 'axios'

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'
})

export const isAuthed = () => !!localStorage.getItem('token')

export const setAuthHeader = () => {
  const t = localStorage.getItem('token')
  if (t) API.defaults.headers.common['Authorization'] = `Bearer ${t}`
  else delete API.defaults.headers.common['Authorization']
}

// call once on load
setAuthHeader()

