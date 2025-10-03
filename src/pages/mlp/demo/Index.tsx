// src/pages/mlp/demo/Index.tsx
import React, { useEffect, useState } from 'react';
import Header from '@/components/mlp/demo/Header';
import FormSection from '@/components/mlp/demo/FormSection';
import PredictionSection from '@/components/mlp/demo/PredictionSection';
import type { CreditRiskInput, CreditRiskOutput } from '@/services/creditScoringService';

const DemoMLPIndex = () => {
  const [result, setResult] = useState<CreditRiskOutput | null>(null);
  const [lastPayload, setLastPayload] = useState<CreditRiskInput | null>(null);

  useEffect(() => {
    if (result) {
      // Espera al siguiente frame para garantizar layout final
      requestAnimationFrame(() => {
        document
          .getElementById('prediction-result')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-background [scroll-snap-type:none]">
      <Header />
      <FormSection
        onPredicted={(payload, output) => {
          setLastPayload(payload);
          setResult(output);
        }}
      />
      <PredictionSection result={result} payload={lastPayload} />
    </div>
  );
};

export default DemoMLPIndex;
