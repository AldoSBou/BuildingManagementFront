// src/pages/BuildingsPage.tsx
import { useBuilding } from "@/hooks/useBuilding";
import BuildingInfo from "@/components/BuildingInfo";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "@/lib/toast";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuildingsPage() {
  const { building, loading, error, refetch } = useBuilding();

  if (loading) {
    return <LoadingSpinner text="Cargando información del edificio..." />;
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error al cargar edificio</h2>
          <p className="text-gray-600 mb-6 max-w-md">{error}</p>
          <div className="flex gap-3">
            <Button onClick={refetch} className="flex items-center gap-2">
              <RefreshCw size={16} />
              Reintentar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Recargar página
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!building) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No se encontró información</h2>
          <p className="text-gray-600 mb-4">No se pudo cargar la información del edificio.</p>
          <Button onClick={refetch}>
            Reintentar
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const handleEdit = () => {
    toast.info('Función de edición próximamente');
    // TODO: Implementar modal de edición
  };

  return (
    <DashboardLayout>
      <BuildingInfo
        building={building}
        onEdit={handleEdit}
      />
    </DashboardLayout>
  );
}