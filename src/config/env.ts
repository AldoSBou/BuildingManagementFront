/**
 * Configuración centralizada de variables de entorno
 * con validación y valores por defecto
 */

// Función helper para convertir string a boolean
const toBoolean = (value: string | undefined): boolean => {
  return value === 'true' || value === '1';
};

// Función helper para obtener variable requerida
const getRequiredEnv = (key: string, fallback?: string): string => {
  const value = import.meta.env[key] || fallback;
  if (!value) {
    throw new Error(`Variable de entorno requerida no encontrada: ${key}`);
  }
  return value;
};

// Configuración de la aplicación
export const config = {
  // API
  api: {
    baseUrl: getRequiredEnv('VITE_API_BASE_URL', 'http://localhost:8080/api/v1'),
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),
  },
  
  // App
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Gestión de Edificios',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Sistema de gestión',
  },
  
  // Entorno
  environment: {
    mode: import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE || 'development',
    isDevelopment: import.meta.env.MODE === 'development',
    isProduction: import.meta.env.MODE === 'production',
    isStaging: import.meta.env.VITE_ENVIRONMENT === 'staging',
  },
  
  // Debugging
  debug: {
    enabled: toBoolean(import.meta.env.VITE_DEBUG_MODE),
    showApiLogs: toBoolean(import.meta.env.VITE_SHOW_API_LOGS),
    showConsoleLogs: toBoolean(import.meta.env.VITE_SHOW_CONSOLE_LOGS),
    devToolsEnabled: toBoolean(import.meta.env.VITE_DEV_TOOLS_ENABLED),
  },
  
  // Desarrollo (credenciales por defecto)
  dev: {
    email: import.meta.env.VITE_DEV_EMAIL || '',
    password: import.meta.env.VITE_DEV_PASSWORD || '',
  },
} as const;

// Validar configuración en desarrollo
if (config.environment.isDevelopment) {
  console.group('🔧 Configuración de la aplicación');
  console.log('API Base URL:', config.api.baseUrl);
  console.log('Entorno:', config.environment.mode);
  console.log('Debug habilitado:', config.debug.enabled);
  console.log('Versión:', config.app.version);
  console.groupEnd();
}

// Exportar tipos para TypeScript
export type Config = typeof config;