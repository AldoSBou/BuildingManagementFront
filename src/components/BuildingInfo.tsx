// src/features/building/BuildingInfo.tsx
import { useAuth } from '@/hooks/useAuth';
import { Building, MapPin, FileText, Users, User } from 'lucide-react';

interface BuildingData {
  name: string;
  address: string;
  description: string;
  totalUnits: number;
  adminName: string;
}

interface Props {
  building: BuildingData;
  onEdit?: () => void;
}

export default function BuildingInfo({ building, onEdit }: Props) {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-3">
          <Building className="text-blue-600" />
          <h2 className="text-xl font-semibold">{building.name}</h2>
        </div>
        {user?.role === 'ADMIN' && onEdit && (
          <button
            onClick={onEdit}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Editar
          </button>
        )}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
        <li className="flex items-center gap-2">
          <MapPin className="text-gray-500" size={16} />
          <strong>Dirección:</strong> {building.address}
        </li>
        <li className="flex items-center gap-2">
          <Users className="text-gray-500" size={16} />
          <strong>Unidades:</strong> {building.totalUnits}
        </li>
        <li className="flex items-center gap-2 col-span-2">
          <FileText className="text-gray-500" size={16} />
          <strong>Descripción:</strong> {building.description}
        </li>
        <li className="flex items-center gap-2">
          <User className="text-gray-500" size={16} />
          <strong>Administrador:</strong> {building.adminName}
        </li>
      </ul>
    </div>
  );
}
