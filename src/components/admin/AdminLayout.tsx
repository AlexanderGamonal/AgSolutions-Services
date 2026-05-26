import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, LogOut } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export function AdminLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
      isActive
        ? 'bg-blue-600 text-white'
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-5 border-b border-gray-800">
          <h1 className="text-white font-bold text-base">AG Solutions</h1>
          <p className="text-gray-500 text-xs mt-0.5">Panel de administración</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavLink to="/admin" end className={navClass}>
            <LayoutDashboard size={17} />
            Dashboard
          </NavLink>
          <NavLink to="/admin/clients" className={navClass}>
            <Users size={17} />
            Clientes
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <p className="text-gray-600 text-xs mb-2 truncate">{user?.email}</p>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <LogOut size={15} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
