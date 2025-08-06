import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster, toast } from 'react-hot-toast';
import { Building2 } from 'lucide-react';
import { login } from '@/api/auth';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email({ message: 'Correo inválido' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' })
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: loginToContext } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const userData = await login(data);
      const { token, name, email, role, userId, buildingId } = userData

      // Validamos que el rol sea uno de los esperados
      if (role !== 'ADMIN' && role !== 'USER') {
        throw new Error('Rol no válido');
      }


      loginToContext({userId, name, email, role, buildingId },token);

      toast.success(`Bienvenido ${name}`);
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al iniciar sesión');
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
            <h1 className="text-2xl font-semibold text-gray-800 mt-2">Gestión de Edificios</h1>
            <p className="text-sm text-gray-500">Inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Correo electrónico"
                {...register('email')}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Contraseña"
                {...register('password')}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}