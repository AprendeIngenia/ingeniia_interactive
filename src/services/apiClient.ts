// src/services/apiClient.ts
/**
 * Cliente API centralizado para manejar todas las solicitudes fetch.
 * Abstrae la lógica de construcción de URLs, manejo de headers,
 * parseo de JSON y gestión de errores de red.
 */
interface ApiClientOptions extends RequestInit {
    // TODO: add timeouts.
  }
  
  class ApiError extends Error {
    status: number;
    data: any;
  
    constructor(message: string, status: number, data: any) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.data = data;
    }
  }
  
  async function apiClient<T>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
    const { headers, body, ...customConfig } = options;
  
    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...customConfig,
    };
  
    if (body) {
      config.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(endpoint, config);
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: response.statusText }));
        throw new ApiError(
          `Error ${response.status}: ${errorData.detail || 'Ocurrió un error en la solicitud'}`,
          response.status,
          errorData
        );
      }
      
      if (response.status === 204) {
        return null as T;
      }
  
      return await response.json();
  
    } catch (error) {
      console.error('ApiClient Error:', error);
      // Re-lanzamos el error para que pueda ser capturado por el código que llama.
      // Si es un ApiError, lo pasamos tal cual. Si es otro tipo (ej. error de red), lo envolvemos.
      if (error instanceof ApiError) {
        throw error;
      }
      throw new Error(error instanceof Error ? error.message : 'Error de red o de configuración de la petición.');
    }
  }
  
  export default apiClient;