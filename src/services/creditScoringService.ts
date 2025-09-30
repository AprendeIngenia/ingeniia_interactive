// src/services/creditScoringService.ts
import apiClient from './apiClient';

// --- Tipos de Datos ---
export interface CreditRiskInput {
  Age: number;
  Sex: 'male' | 'female';
  Job: number; // 0-3
  Housing: 'own' | 'rent' | 'free';
  'Saving accounts': 'NA' | 'little' | 'moderate' | 'quite rich' | 'rich';
  'Checking account': 'NA' | 'little' | 'moderate' | 'rich';
  'Credit amount': number;
  Duration: number;
  Purpose: 'car' | 'furniture/equipment' | 'radio/TV' | 'domestic appliances' | 'repairs' | 'education' | 'business' | 'vacation/others';
}

export interface CreditRiskOutput {
  prediction: 'good' | 'bad';
  probability: number; // 0..1
}

// --- Configuración del Servicio ---
const CREDIT_API_BASE = import.meta.env.VITE_API_CREDIT_SCORING_SERVICE_URL;

// --- Funciones del Servicio ---
const postCreditRisk = (payload: CreditRiskInput): Promise<CreditRiskOutput> => {
  return apiClient<CreditRiskOutput>(`${CREDIT_API_BASE}/v1/predict`, {
    method: 'POST',
    body: payload as any,
  });
};

// --- Exportación del Servicio ---
export const creditScoringService = {
  postCreditRisk,
};