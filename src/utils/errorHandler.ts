import { toast } from '@/lib/toast';
import { config } from '@/config/env';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public code?: string;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    code?: string
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    
    Object.setPrototypeOf(this, AppError.prototype);
    
    // Capturar stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

export const ErrorCodes = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

/**
 * Maneja errores de API y los convierte en AppError
 */
export const handleApiError = (error: any): AppError => {
  // Log del error en desarrollo
  if (config.debug.enabled) {
    console.error('API Error:', error);
  }

  // Error de red (sin respuesta del servidor)
  if (!error.response) {
    return new AppError(
      'Error de conexión. Verifica tu conexión a internet.',
      0,
      true,
      ErrorCodes.NETWORK_ERROR
    );
  }

  const { status, data } = error.response;
  const message = data?.message || error.message || 'Error desconocido';

  switch (status) {
    case 400:
      return new AppError(
        data?.message || 'Datos inválidos',
        400,
        true,
        ErrorCodes.VALIDATION_ERROR
      );

    case 401:
      return new AppError(
        'Credenciales inválidas o sesión expirada',
        401,
        true,
        ErrorCodes.UNAUTHORIZED
      );

    case 403:
      return new AppError(
        'No tienes permisos para realizar esta acción',
        403,
        true,
        ErrorCodes.FORBIDDEN
      );

    case 404:
      return new AppError(
        'Recurso no encontrado',
        404,
        true,
        ErrorCodes.NOT_FOUND
      );

    case 422:
      return new AppError(
        data?.message || 'Error de validación',
        422,
        true,
        ErrorCodes.VALIDATION_ERROR
      );

    case 500:
      return new AppError(
        'Error interno del servidor',
        500,
        false,
        ErrorCodes.SERVER_ERROR
      );

    case 502:
    case 503:
    case 504:
      return new AppError(
        'Servicio temporalmente no disponible',
        status,
        false,
        ErrorCodes.SERVER_ERROR
      );

    default:
      return new AppError(
        message,
        status,
        true
      );
  }
};

/**
 * Muestra toast según el tipo de error
 */
export const handleErrorDisplay = (error: AppError | Error) => {
  const isAppError = error instanceof AppError;
  
  if (isAppError) {
    switch (error.code) {
      case ErrorCodes.UNAUTHORIZED:
        toast.warning(error.message);
        // Opcional: redirigir a login si es necesario
        break;
        
      case ErrorCodes.VALIDATION_ERROR:
        toast.warning(error.message);
        break;
        
      case ErrorCodes.NETWORK_ERROR:
        toast.error(error.message);
        break;
        
      case ErrorCodes.SERVER_ERROR:
        toast.error(error.message);
        break;
        
      default:
        toast.error(error.message);
    }
  } else {
    // Error genérico
    toast.error(error.message || 'Ha ocurrido un error inesperado');
  }
  
  // Log en desarrollo
  if (config.debug.enabled) {
    console.error('Error displayed:', error);
  }
};

/**
 * Hook para manejo consistente de errores async
 */
export const useErrorHandler = () => {
  const handleError = (error: any) => {
    const appError = error instanceof AppError ? error : handleApiError(error);
    handleErrorDisplay(appError);
    return appError;
  };

  return { handleError };
};