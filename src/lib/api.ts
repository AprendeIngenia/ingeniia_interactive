// src/lib/api.ts
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
  
  const CREDIT_API_BASE = import.meta.env.VITE_API_CREDIT_SCORING_SERVICE_URL;
  
  export async function postCreditRisk(payload: CreditRiskInput): Promise<CreditRiskOutput> {
    const res = await fetch(`${CREDIT_API_BASE}/mlp_demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const msg = await res.text().catch(() => '');
      throw new Error(`API error ${res.status}: ${msg || 'Fallo al predecir'}`);
    }
    return res.json();
  }
  