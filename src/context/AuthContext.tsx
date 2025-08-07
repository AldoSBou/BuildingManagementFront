import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface User {
  userId: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
  buildingId: number | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User, token: string, refreshToken?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userInfo = localStorage.getItem('user');
        
        if (token && userInfo) {
          const userData = JSON.parse(userInfo);
          setUser(userData);
          
          // Guardar datos adicionales en localStorage para compatibilidad
          localStorage.setItem('userName', userData.name);
          localStorage.setItem('userRole', userData.role);
          if (userData.buildingId) {
            localStorage.setItem('buildingId', userData.buildingId.toString());
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.clear();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData: User, token: string, refreshToken?: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Guardar datos adicionales para compatibilidad con el código existente
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userRole', userData.role);
    if (userData.buildingId) {
      localStorage.setItem('buildingId', userData.buildingId.toString());
    }
    
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    
    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    
    // Navegar al login solo si no estamos ya ahí
    if (location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}