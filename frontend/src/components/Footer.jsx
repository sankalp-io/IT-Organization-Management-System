export default function Footer(){
  return (
    <footer className="border-t border-slate-800">
      <div className="container mx-auto px-4 py-6 text-sm opacity-75">
        © {new Date().getFullYear()} IT Org · React + FastAPI
      </div>
    </footer>
  )
}

