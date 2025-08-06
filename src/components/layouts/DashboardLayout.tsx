import type { ReactNode } from 'react';
import { Home, Building2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const navigate = useNavigate();

  const logout = () => {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (!confirmLogout) return;

    localStorage.clear();
    toast.success('Sesión cerrada correctamente');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-blue-600">Gestión</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
            <Home size={18} /> Dashboard
          </Link>
          <Link to="/edificios" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
            <Building2 size={18} /> Edificios
          </Link>
        </nav>
        <button
          onClick={logout}
          className="flex items-center justify-start gap-2 px-6 py-3 text-sm hover:bg-gray-100 border-t"
        >
          <LogOut size={16} /> Cerrar sesión
        </button>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
