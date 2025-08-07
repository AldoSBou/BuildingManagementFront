import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from 'react-hot-toast';
import { toast } from '@/lib/toast';
import { Building2, Eye, EyeOff, TestTube } from 'lucide-react';
import { login } from '@/api/auth';
import { useAuth } from '@/hooks/useAuth';
import { useErrorHandler } from '@/utils/errorHandler';
import { config } from '@/config/env';

const loginSchema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' })
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: loginToContext, isAuthenticated } = useAuth();
  const { handleError } = useErrorHandler();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Función para llenar credenciales de desarrollo
  const fillDevCredentials = () => {
    if (config.dev.email && config.dev.password) {
      setValue('email', config.dev.email);
      setValue('password', config.dev.password);
      toast.info('Credenciales de desarrollo cargadas');
    } else {
      toast.warning('No hay credenciales de desarrollo configuradas');
    }
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const userData = await login(data);
      const { token, name, email, role, userId, buildingId } = userData;

      // Validamos que el rol sea uno de los esperados
      if (role !== 'ADMIN' && role !== 'USER') {
        throw new Error('Rol no válido');
      }

      loginToContext({ userId, name, email, role, buildingId }, token);

      toast.success(`¡Bienvenido ${name}!`);
      
      // Redirigir a la página que intentaba acceder o al dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err: any) {
      // Usar el error handler para manejo consistente
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100">
      <Toaster position="top-center" />
      <Card className="w-full max-w-md p-8 shadow-2xl rounded-2xl border-none bg-white">
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col items-center">
            <Building2 className="w-12 h-12 text-blue-600" />
            <h1 className="text-2xl font-semibold text-gray-800 mt-2">
              {config.app.name}
            </h1>
            <p className="text-sm text-gray-500">Inicia sesión para continuar</p>
            {config.environment.isDevelopment && (
              <span className="text-xs text-orange-500 mt-1">
                Modo desarrollo - v{config.app.version}
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Correo electrónico"
                disabled={loading}
                {...register('email')}
                className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                disabled={loading}
                {...register('password')}
                className={errors.password ? 'border-red-500 focus:border-red-500' : ''}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Ingresando...
                </div>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </form>

          {/* Botón de credenciales de desarrollo */}
          {config.environment.isDevelopment && config.dev.email && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fillDevCredentials}
              className="w-full text-xs"
            >
              <TestTube size={14} className="mr-2" />
              Usar credenciales de desarrollo
            </Button>
          )}

          {/* Información sobre el entorno */}
          <div className="text-center text-xs text-gray-400 border-t pt-4">
            <p>Entorno: {config.environment.mode}</p>
            <p>API: {config.api.baseUrl}</p>
            {config.environment.isDevelopment && (
              <p className="text-orange-500 mt-1">
                Modo desarrollo activo
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}