import { useState, useCallback } from 'react';
import { useErrorHandler, AppError } from '@/utils/errorHandler';

interface UseAsyncStateReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (asyncFunction: () => Promise<T>) => Promise<T>;
  reset: () => void;
  setData: (data: T | null) => void;
}

/**
 * Hook para manejar estados asíncronos con error handling integrado
 */
export function useAsyncState<T>(): UseAsyncStateReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleError } = useErrorHandler();

  const execute = useCallback(async (asyncFunction: () => Promise<T>): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err: any) {
      const appError = handleError(err);
      setError(appError.message);
      throw appError;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    setData,
  };
}

/**
 * Hook simplificado para operaciones async con solo loading y error
 */
export function useAsyncOperation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleError } = useErrorHandler();

  const execute = useCallback(async <T>(asyncFunction: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await asyncFunction();
      return result;
    } catch (err: any) {
      const appError = handleError(err);
      setError(appError.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    reset,
  };
}