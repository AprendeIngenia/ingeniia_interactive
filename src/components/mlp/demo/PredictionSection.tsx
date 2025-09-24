// src/components/mlp/demo/PredictionSection.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import type { CreditRiskInput, CreditRiskOutput } from '@/lib/api';

// Reusamos la tarjeta visual del header (sin hover 3D para que sea estable)
const StaticCreditCard = () => (
  <div className="relative w-full max-w-sm h-56 rounded-2xl shadow-2xl bg-gradient-to-br from-[#1a112a] via-[#3a2d5a] to-[#1c162d] border border-white/10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-neon-magenta/15" />
    <div className="p-6 h-full text-white flex flex-col justify-between relative z-10">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold text-xl tracking-wider">BankIA</h3>
          <p className="text-xs text-neon-magenta font-mono">NEON EDITION</p>
        </div>
        <img src="/images/logo.png" alt="inGeniia Logo" className="w-8 h-8 rounded-lg opacity-90" />
      </div>
      <div className="w-12 h-9 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md border-2 border-yellow-600/50" />
      <div>
        <p className="font-mono text-xl tracking-widest">4109 82XX XXXX 6672</p>
        <div className="flex items-end justify-between mt-2">
          <p className="font-mono text-sm tracking-wider text-muted-foreground">USUARIO BANKIA</p>
          <p className="text-sm font-semibold font-mono">12/28</p>
        </div>
      </div>
      <div className="absolute bottom-12 right-6 flex items-center">
        <div className="w-7 h-7 rounded-full bg-red-500/80" />
        <div className="w-7 h-7 rounded-full bg-yellow-500/80 -ml-4" style={{ mixBlendMode: 'hard-light' }} />
      </div>
    </div>
  </div>
);

interface Props {
  result: CreditRiskOutput | null;
  payload: CreditRiskInput | null;
}

const PredictionSection: React.FC<Props> = ({ result, payload }) => {
  return (
    <section id="prediction-result" className="relative py-24 border-t border-white/5 bg-[#0A0A0A] overflow-hidden">
      {/* fondo suave */}
      <div className="absolute inset-0 -z-10 opacity-[0.08]" style={{ background: 'var(--gradient-neural)' }} />
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="text-center text-muted-foreground"
            >
              <p>Completa el formulario y verás aquí tu evaluación instantánea.</p>
            </motion.div>
          ) : result.prediction === 'good' ? (
            <motion.div
              key="good"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -24, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-neon-green/20 bg-neon-green/10">
                  <CheckCircle2 className="w-4 h-4 text-neon-green" />
                  <span className="text-sm font-medium text-neon-green">Aprobación preliminar</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  ¡Estás dentro! <span className="text-neon-green">Perfil solvente</span>
                </h3>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl">
                  Nuestro MLP estima una probabilidad de <strong className="text-foreground">
                  {(result.probability * 100).toFixed(1)}%</strong> de buen desempeño crediticio.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <li>• Decisión <strong>rápida</strong> y transparente.</li>
                  <li>• Beneficios iniciales pensados para construir historial.</li>
                  <li>• Sin letra chiquita, sin sustos.</li>
                </ul>
                <a
                  href="#application-form"
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 font-semibold text-background bg-neon-green rounded-lg hover:bg-white hover:text-black transition-colors"
                >
                  Completar registro <ArrowRight className="w-5 h-5" />
                </a>
                <p className="mt-3 text-xs text-muted-foreground">Simulación educativa. No se almacenan datos personales.</p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 16, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="flex justify-center"
              >
                <StaticCreditCard />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="bad"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-neon-orange/20 bg-neon-orange/10">
                <XCircle className="w-4 h-4 text-neon-orange" />
                <span className="text-sm font-medium text-neon-orange">Aún no, pero estás cerca</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold tracking-tighter">Construyamos tu aprobación</h3>
              <p className="mt-4 text-lg text-muted-foreground">
                Probabilidad actual: <strong className="text-foreground">{(result.probability * 100).toFixed(1)}%</strong>.
                Pequeños ajustes pueden cambiar el resultado.
              </p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-lg border border-white/10 bg-card/60">
                  <p className="text-sm">• Reduce el <strong>monto</strong> o la <strong>duración</strong> del crédito.</p>
                </div>
                <div className="p-4 rounded-lg border border-white/10 bg-card/60">
                  <p className="text-sm">• Mejora tu <strong>cuenta corriente</strong> y <strong>ahorros</strong> los próximos 2–3 meses.</p>
                </div>
                <div className="p-4 rounded-lg border border-white/10 bg-card/60">
                  <p className="text-sm">• Elige un <strong>propósito</strong> de menor riesgo (p. ej., equipamiento/repairs).</p>
                </div>
              </div>
              <a
                href="#application-form"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 font-semibold text-background bg-neon-orange rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                Ajustar solicitud <ArrowRight className="w-5 h-5" />
              </a>
              <p className="mt-3 text-xs text-muted-foreground">Simulación educativa. No almacenamos tu información.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PredictionSection;
