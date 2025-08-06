import { useEffect, useState } from "react";
import { getBuilding } from "@/api/buildings";
import BuildingInfo from "@/components/BuildingInfo";
import { toast } from "react-hot-toast";

export default function BuildingsPage() {
  const [building, setBuilding] = useState<any>(null);

useEffect(() => {
  async function fetchBuilding() {
    try {
      const id = localStorage.getItem('buildingId');
      if (!id) throw new Error('Edificio no definido');
      const data = await getBuilding(Number(id));
      setBuilding(data);
    } catch (err) {
      toast.error("Error al cargar edificio");
    }
  }

  fetchBuilding();
}, []);

  if (!building) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Información del Edificio</h1>
      <BuildingInfo
        building={building}
        onEdit={() => console.log('editar edificio')}
        />
    </div>
  );
}
