import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { User } from 'lucide-react';
import { Building2 } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Cargando usuario...</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">¡Bienvenido, {user.name}!</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-500">Rol:</span>
            <Badge variant="outline">{user.role}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Aquí verás un resumen de la gestión del edificio, accesos rápidos, reportes y más.
          </p>
        </div>
        <User size={48} className="text-blue-600" />
      </div>

      {/* Módulo futuro */}
      <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
        <Building2 className="text-blue-600" size={32} />
        <div>
          <h3 className="text-lg font-semibold">Módulo de Edificios</h3>
          <p className="text-sm text-gray-500">Gestión de edificios y unidades.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
