import { useAuth } from '@/hooks/useAuth';
import { 
  Building, MapPin, Users, User, Edit, Eye, AlertCircle, 
  CheckCircle, Clock, Wifi, Car, Shield, Home, TrendingUp, 
  Activity, Phone, Mail, MoreHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BuildingData {
  id: number;
  name: string;
  address: string;
  description: string;
  totalUnits: number;
  adminName: string;
  adminUserId?: number;
  occupiedUnits?: number;
  floors?: number;
  parking?: number;
  yearBuilt?: number;
  phone?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  building: BuildingData;
  onEdit?: () => void;
}

export default function BuildingInfo({ building, onEdit }: Props) {
  const { user } = useAuth();
  
  // Calcular datos derivados con valores por defecto
  const occupiedUnits = building.occupiedUnits || Math.floor(building.totalUnits * 0.9);
  const occupancyRate = (occupiedUnits / building.totalUnits) * 100;
  const availableUnits = building.totalUnits - occupiedUnits;
  const floors = building.floors || 8;
  const parking = building.parking || Math.floor(building.totalUnits * 0.75);
  const yearBuilt = building.yearBuilt || 2015;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{building.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Construido en {yearBuilt}</span>
                <span>•</span>
                <span>{floors} pisos</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Sistema activo
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Eye size={16} />
              Vista rápida
            </Button>
            {user?.role === 'ADMIN' && onEdit && (
              <Button onClick={onEdit} size="sm" className="flex items-center gap-2">
                <Edit size={16} />
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="px-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{building.totalUnits}</div>
            <div className="text-sm text-gray-600">Total Unidades</div>
            <div className="text-xs text-gray-500 mt-2">{availableUnits} disponibles</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex items-center gap-1">
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600">{occupancyRate.toFixed(0)}%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{occupiedUnits}</div>
            <div className="text-sm text-gray-600">Unidades Ocupadas</div>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-3">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                style={{width: `${occupancyRate}%`}}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{floors}</div>
            <div className="text-sm text-gray-600">Pisos</div>
            <div className="text-xs text-gray-500 mt-2">{floors} niveles residenciales</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <Car className="w-6 h-6 text-orange-600" />
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{parking}</div>
            <div className="text-sm text-gray-600">Estacionamientos</div>
            <div className="text-xs text-green-600 mt-2">Disponibles 24/7</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Building Details */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Detalles del Edificio</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Ubicación</label>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900">{building.address}</p>
                        <p className="text-sm text-gray-500 mt-1">Lima, Perú</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Administrador</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">{building.adminName}</p>
                        <p className="text-sm text-gray-500">{building.email || 'admin@edificio.com'}</p>
                        {building.phone && (
                          <p className="text-sm text-gray-500">{building.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-3 block">Servicios Activos</label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">Seguridad 24/7</span>
                        </div>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Wifi className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Internet Wi-Fi</span>
                        </div>
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-orange-800">Mantenimiento</span>
                        </div>
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Descripción</label>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {building.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Estado General</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Ocupación</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{occupancyRate.toFixed(0)}%</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mantenimiento</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-orange-600">Pendiente</span>
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pagos</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-green-600">Al día</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Incidencias</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">2 abiertas</span>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Info */}
            {user?.role === 'ADMIN' && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Administrador</h4>
                    <p className="text-sm text-blue-700">Acceso completo</p>
                  </div>
                </div>
                <p className="text-xs text-blue-700 leading-relaxed">
                  Tienes permisos para modificar toda la información del edificio y gestionar residentes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}