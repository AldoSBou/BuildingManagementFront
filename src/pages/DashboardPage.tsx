import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useBuilding } from '@/hooks/useBuilding';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Home,
  Car,
  Calendar,
  Bell,
  Activity,
  DollarSign,
  Wrench,
  Shield,
  ArrowRight,
  Plus,
  Eye
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Datos simulados para gráficos
const occupancyData = [
  { month: 'Ene', ocupacion: 85 },
  { month: 'Feb', ocupacion: 88 },
  { month: 'Mar', ocupacion: 92 },
  { month: 'Abr', ocupacion: 89 },
  { month: 'May', ocupacion: 94 },
  { month: 'Jun', ocupacion: 91 }
];

const paymentData = [
  { name: 'Al día', value: 78, color: '#10b981' },
  { name: 'Pendiente', value: 12, color: '#f59e0b' },
  { name: 'Vencido', value: 10, color: '#ef4444' }
];

export default function ModernDashboard() {
  const { user } = useAuth();
  const { building, loading } = useBuilding();

  if (!user) return null;

  // Datos simulados para demo
  const quickStats = {
    totalUnits: building?.totalUnits || 45,
    occupiedUnits: building?.occupiedUnits || 41,
    pendingMaintenance: 3,
    activeIncidents: 2,
    monthlyRevenue: 125400,
    pendingPayments: 5
  };

  const occupancyRate = ((quickStats.occupiedUnits / quickStats.totalUnits) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
            <p className="text-gray-600 mt-1">
              Resumen general del {building?.name || 'edificio'} - {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Sistema Operativo
            </Badge>
            <Button size="sm" className="flex items-center gap-2">
              <Plus size={16} />
              Acción Rápida
            </Button>
          </div>
        </div>

        {/* Welcome Card */}
        <Card className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">¡Bienvenido, {user.name}!</h2>
                <div className="flex items-center gap-4 text-blue-100">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {user.role}
                  </Badge>
                  <span className="text-sm">Última conexión: Hoy 09:15 AM</span>
                </div>
                <p className="text-blue-100 max-w-md">
                  Todo funcionando correctamente. {quickStats.activeIncidents} incidencias menores requieren tu atención.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Building2 size={40} className="text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{quickStats.occupiedUnits}</p>
                  <p className="text-sm text-gray-600">de {quickStats.totalUnits}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Ocupación</span>
                  <span className="text-sm font-semibold text-green-600">{occupancyRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{width: `${occupancyRate}%`}}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">S/ {quickStats.monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Ingresos este mes</p>
                <p className="text-xs text-green-600 mt-1">+12% vs mes anterior</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-orange-600" />
                </div>
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{quickStats.pendingMaintenance}</p>
                <p className="text-sm text-gray-600">Mantenimientos pendientes</p>
                <p className="text-xs text-orange-600 mt-1">2 urgentes</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-red-600" />
                </div>
                <Activity className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{quickStats.activeIncidents}</p>
                <p className="text-sm text-gray-600">Incidencias activas</p>
                <p className="text-xs text-gray-500 mt-1">Última: hace 2h</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Occupancy Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Tendencia de Ocupación
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="ocupacion" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    dot={{ fill: '#2563eb', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Estado de Pagos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {paymentData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{backgroundColor: item.color}}
                      />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between h-12">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Gestionar Residentes</span>
                </div>
                <ArrowRight size={16} />
              </Button>
              
              <Button variant="outline" className="w-full justify-between h-12">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span>Programar Mantenimiento</span>
                </div>
                <ArrowRight size={16} />
              </Button>
              
              <Button variant="outline" className="w-full justify-between h-12">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                  <span>Ver Reportes Financieros</span>
                </div>
                <ArrowRight size={16} />
              </Button>
              
              <Button variant="outline" className="w-full justify-between h-12">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>Registro de Visitantes</span>
                </div>
                <ArrowRight size={16} />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Pago recibido - Apt 301</p>
                    <p className="text-xs text-gray-500">Hace 15 minutos</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Reporte de fuga en piso 2</p>
                    <p className="text-xs text-gray-500">Hace 1 hora</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Mantenimiento de ascensor completado</p>
                    <p className="text-xs text-gray-500">Hace 3 horas</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nuevo residente registrado</p>
                    <p className="text-xs text-gray-500">Ayer</p>
                  </div>
                </div>
              </div>
              
              <Button variant="ghost" className="w-full mt-4">
                <Eye size={16} className="mr-2" />
                Ver toda la actividad
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Building Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Estado General del Edificio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-semibold text-green-600">Servicios</p>
                <p className="text-sm text-gray-600">Todos operativos</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Car className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-semibold text-blue-600">Estacionamiento</p>
                <p className="text-sm text-gray-600">85% ocupado</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="w-8 h-8 text-orange-600" />
                </div>
                <p className="font-semibold text-orange-600">Mantenimiento</p>
                <p className="text-sm text-gray-600">3 pendientes</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <p className="font-semibold text-purple-600">Seguridad</p>
                <p className="text-sm text-gray-600">Sistema activo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}