// src/types/building.ts

// Respuesta directa de la API
export interface BuildingApiResponse {
  id: number;
  name: string;
  address: string;
  description: string;
  totalUnits: number;
  adminUserId: number;
  adminName: string;
  createdAt: string;
  updatedAt: string;
}

// Datos extendidos con información calculada
export interface ExtendedBuildingData extends BuildingApiResponse {
  occupiedUnits: number;
  availableUnits: number;
  occupancyRate: number;
  floors: number;
  parking: number;
  yearBuilt: number;
  phone: string;
  email: string;
}

// Estadísticas derivadas del edificio
export interface BuildingStats {
  // Métricas básicas
  totalUnits: number;
  occupiedUnits: number;
  availableUnits: number;
  occupancyRate: number;
  
  // Infraestructura
  floors: number;
  parking: number;
  parkingRatio: number;
  
  // Estados
  isHighOccupancy: boolean;
  isFullyOccupied: boolean;
  hasAvailableUnits: boolean;
  
  // Información temporal
  yearBuilt: number;
  age: number;
  isModernBuilding: boolean;
  
  // Contacto
  contact: {
    phone: string;
    email: string;
    admin: string;
  };
}

// Estados de servicios del edificio
export interface BuildingService {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance' | 'pending';
  icon: string;
  description?: string;
  schedule?: string;
}

// Amenidades del edificio
export interface BuildingAmenity {
  id: string;
  name: string;
  available: boolean;
  schedule?: string;
  requiresReservation: boolean;
  description?: string;
}

// Configuración del edificio
export interface BuildingConfig {
  id: number;
  buildingId: number;
  allowVisitors: boolean;
  visitingHours: {
    start: string;
    end: string;
  };
  parkingForVisitors: number;
  maintenanceDay: string;
  securityLevel: 'basic' | 'standard' | 'premium';
  amenities: BuildingAmenity[];
  services: BuildingService[];
  createdAt: string;
  updatedAt: string;
}

// Request para actualizar edificio
export interface UpdateBuildingRequest {
  name?: string;
  address?: string;
  description?: string;
  phone?: string;
  email?: string;
}

// Response wrapper de la API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  statusCode: number;
  message?: string;
}

// Estados de carga
export interface BuildingLoadingState {
  loading: boolean;
  error: string | null;
  refetching: boolean;
}

// Contexto del edificio
export interface BuildingContextType {
  building: ExtendedBuildingData | null;
  stats: BuildingStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  updateBuilding: (data: UpdateBuildingRequest) => Promise<void>;
}