// src/components/home/DonationsSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CreditCard, Bot, X, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ==============================
// Componente de Tarjeta de Donación
// ==============================
interface DonationCardProps {
  method: DonationMethod;
  onCardClick: (method: DonationMethod) => void;
}

const DonationCard: React.FC<DonationCardProps> = ({ method, onCardClick }) => {
  const glowClass = `shadow-glow-${method.color}`;
  const borderClass = `border-neon-${method.color}`;

  return (
    <motion.div
      onClick={() => onCardClick(method)}
      className="group relative cursor-pointer"
      style={{ perspective: "1000px" }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className={`
          relative w-full h-full rounded-xl bg-card/80 backdrop-blur-sm
          border border-white/10 p-6 text-center
          transition-all duration-300
          group-hover:${glowClass} group-hover:border-white/20
        `}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ transform: "rotateY(10deg) rotateX(5deg)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className={`
              w-16 h-16 rounded-lg flex items-center justify-center mb-5
              bg-neon-${method.color}/10 border border-neon-${method.color}/30
              text-neon-${method.color}
            `}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            {method.icon}
          </motion.div>
          <h3 className="text-xl font-bold mb-2 text-foreground">{method.name}</h3>
          <p className="text-sm text-muted-foreground h-10">{method.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==============================
// Panel de Información Bancaria (para Colombia)
// ==============================
interface BancosInfoPanelProps {
  onClose: () => void;
}

const BancosInfoPanel: React.FC<BancosInfoPanelProps> = ({ onClose }) => {
  const { toast } = useToast();
  const nequiKey = "@SSR419";

  const handleCopy = () => {
    navigator.clipboard.writeText(nequiKey);
    toast({
      title: "¡Llave copiada!",
      description: `La llave ${nequiKey} ha sido copiada a tu portapapeles.`,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", stiffness: 250, damping: 30 }}
      className="fixed inset-x-0 bottom-0 z-50 p-4"
    >
      <div className="relative max-w-md mx-auto rounded-2xl border border-neon-orange/30 bg-card/95 backdrop-blur-lg shadow-glow-orange p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-neon-orange mb-2">Transferencia en Colombia</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Puedes enviar tu aporte a través de Nequi, Daviplata, Bancolombia u otros bancos de colombia con BRE-B a la siguiente llave:
        </p>
        <div className="flex items-center justify-between gap-3 rounded-lg bg-background p-3 border border-white/10">
          <span className="font-mono text-foreground text-lg">{nequiKey}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-neon-orange/10 text-neon-orange text-xs font-semibold rounded-md border border-neon-orange/30 hover:bg-neon-orange/20 transition-colors"
          >
            <Copy className="w-3 h-3" />
            Copiar
          </button>
        </div>
      </div>
    </motion.div>
  );
};


// ==============================
// Componente Principal de Donaciones
// ==============================
interface DonationMethod {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: "cyan" | "orange" | "green";
  action: () => void;
}

const DonationsSection = () => {
  const { toast } = useToast();
  const [showBancosInfo, setShowBancosInfo] = useState(false);

  const donationMethods: DonationMethod[] = [
    {
      name: "PayPal",
      description: "Aportes internacionales de forma segura y rápida.",
      icon: <Bot className="w-8 h-8" />,
      color: "cyan",
      action: () => window.open("https://www.paypal.me/santiagsanchezr", "_blank", "noopener,noreferrer"),
    },
    {
      name: "Tarjeta de Crédito",
      description: "Próximamente para Visa, Mastercard y Amex.",
      icon: <CreditCard className="w-8 h-8" />,
      color: "green",
      action: () => toast({
        title: "Estamos entrenando el modelo...",
        description: "Estamos trabajando profundamente en esta funcionalidad.",
        duration: 3200,
      }),
    },
    {
      name: "Bancos Colombia",
      description: "Desde Nequi, Nu, Daviplata, Bancolombia u otros.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M168 128a40 40 0 1 1-40-40a40 40 0 0 1 40 40Z"/><path fill="currentColor" d="M232 128a104 104 0 1 1-104-104a104.2 104.2 0 0 1 104 104ZM72 128a56 56 0 1 0 56-56a56 56 0 0 0-56 56Z"/></svg>, // Icono de Nequi
      color: "orange",
      action: () => setShowBancosInfo(true),
    },
  ];

  return (
    <section id="donations" className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden border-t border-white/5 p-6">
      {/* Fondo con efectos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-background" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,hsla(var(--brand-magenta)/0.15),transparent)]"
        />
      </div>

      <div className="container mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Columna de Texto Persuasivo */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-neon-orange/20 bg-neon-orange/10">
              <Heart className="w-4 h-4 text-neon-orange" />
              <span className="text-sm font-medium text-neon-orange">Impulsa esta Misión</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Tu Apoyo es <strong className="font-semibold text-neon-orange">Fundamental</strong>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-lg mx-auto lg:mx-0">
              Nuestra plataforma es <strong>gratuita y de código abierto</strong>. Tu contribución es el combustible que nos permite seguir adelante.
            </p>
            <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
              <li className="flex items-start gap-3">
                <span className="text-neon-cyan mt-1">✓</span>
                <span>Tus aportes financian <strong className="font-semibold text-neon-cyan">inferencias y entrenamientos</strong> en la nube para que veas los modelos en acción.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-green mt-1">✓</span>
                <span>Nos ayuda a <strong className="font-semibold text-neon-green">crear más cursos y demos interactivas</strong>, democratizando el acceso a la IA.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-neon-orange mt-1">✓</span>
                <span>Cada módulo nuevo <strong className="font-semibold text-neon-orange">abre puertas laborales.</strong> Donar es multiplicar oportunidades para más personas.</span>
              </li>
            </ul>
          </div>

          {/* Columna de Tarjetas de Donación */}
          <div className="flex flex-col gap-6">
            {donationMethods.map((method) => (
              <DonationCard key={method.name} method={method} onCardClick={() => method.action()} />
            ))}
          </div>
        </div>
      </div>

      {/* Panel deslizable para Bancos Colombia */}
      <AnimatePresence>
        {showBancosInfo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBancosInfo(false)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <BancosInfoPanel onClose={() => setShowBancosInfo(false)} />
          </>
        )}
      </AnimatePresence>
      
      {/* Indicador de scroll (opcional pero recomendado) */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="text-xs text-muted-foreground/80 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-background/70">
          <span>Nuestro fundador</span>
          <span className="inline-block animate-bounce">▾</span>
        </div>
      </div>
    </section>
  );
};

export default DonationsSection;