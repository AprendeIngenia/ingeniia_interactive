// useFetchData.ts
import { useState, useEffect, useCallback } from 'react';

interface UseFetchDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Un hook reutilizable para hacer fetching de datos de forma declarativa.
 * Maneja los estados de carga, error y datos automáticamente.
 * * @param serviceCall - La función del servicio API que se debe ejecutar.
 * @param params - Un array de parámetros para pasar a la función del servicio.
 * @returns Un objeto con { data, isLoading, error }.
 */
export function useFetchData<T, P extends any[]>(
  serviceCall: (...args: P) => Promise<T>, 
  ...params: P
): UseFetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Usamos useCallback para memorizar la función de fetching.
  // JSON.stringify en las dependencias asegura que se re-ejecute solo si los parámetros cambian.
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await serviceCall(...params);
      setData(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Un error inesperado ocurrió.";
      setError(errorMessage);
      console.error("Error en useFetchData:", err);
    } finally {
      setIsLoading(false);
    }
  }, [serviceCall, JSON.stringify(params)]); // Dependencia clave

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Se ejecuta cuando fetchData cambia (es decir, cuando los parámetros cambian)

  return { data, isLoading, error };
}