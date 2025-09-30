// src/services/contentService.ts
import apiClient from './apiClient';

// --- Tipos de Datos ---
export interface WhiteboardData {
  id: string;
  preview_url: string;
  file_url: string;
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  duration_minutes: number;
  whiteboard?: WhiteboardData;
}

export interface CodeSnippetData {
  id: string;
  title: string;
  language: string;
  github_url: string;
  code: string;
}

// --- Configuración del Servicio ---
const CONTENT_API_BASE = import.meta.env.VITE_API_CONTENT_SERVICE_URL;

// --- Funciones del Servicio ---
const getVideosByTopic = (topic: 'mlp' | 'cnn' | 'rnn'): Promise<VideoData[]> => {
  return apiClient<VideoData[]>(`${CONTENT_API_BASE}/videos/topic/${topic}`);
};

const getSnippetsByTopic = (topic: 'mlp' | 'cnn' | 'rnn'): Promise<CodeSnippetData[]> => {
  return apiClient<CodeSnippetData[]>(`${CONTENT_API_BASE}/snippets/topic/${topic}`);
};

// --- Exportación del Servicio ---
export const contentService = {
  getVideosByTopic,
  getSnippetsByTopic,
};