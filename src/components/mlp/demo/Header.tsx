// src/components/mlp/demo/Header.tsx

import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// ======================================================
// Componente Reutilizable: Tarjeta de Crédito Dinámica
// ======================================================
const CreditCard = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Lógica para el movimiento 3D dinámico basado en el cursor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-15, 15]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    mx.set(xPct);
    my.set(yPct);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="relative w-full max-w-sm h-56 rounded-2xl shadow-2xl cursor-pointer bg-gradient-to-br from-[#1a112a] via-[#3a2d5a] to-[#1c162d]"
    >
      {/* Fondo y Brillo Morado */}
      <div className="absolute inset-0 rounded-2xl border border-white/10" />
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "url('/public/globe.svg')" }} // Patrón sutil
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-neon-magenta/15 rounded-2xl" />

      {/* Contenido de la tarjeta */}
      <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
        
        {/* Encabezado de la tarjeta: Logo inGeniia */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-xl tracking-wider">BankIA</h3>
            <p className="text-xs text-neon-magenta font-mono">NEON EDITION</p>
          </div>
          <img 
            src="/images/logo.png" 
            alt="inGeniia Logo" 
            className="w-8 h-8 rounded-lg opacity-90"
          />
        </div>

        {/* Chip (simulado con div) */}
        <div className="w-12 h-9 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-md border-2 border-yellow-600/50" />
        
        {/* Número y Nombre */}
        <div>
          <p className="font-mono text-xl tracking-widest">
            4109 82XX XXXX 6672
          </p>
          <div className="flex items-end justify-between mt-2">
            <p className="font-mono text-sm tracking-wider text-muted-foreground">
              TU NOMBRE AQUÍ
            </p>
            <div className="text-right">
              
              <p className="text-sm font-semibold font-mono">12/28</p>
            </div>
          </div>
        </div>

        {/* Logo de MasterCard (simulado) */}
        <div className="absolute bottom-12 right-6 flex items-center">
            <div className="w-7 h-7 rounded-full bg-red-500/80" />
            <div className="w-7 h-7 rounded-full bg-yellow-500/80 -ml-4" style={{ mixBlendMode: 'hard-light' }}/>
        </div>
      </div>
    </motion.div>
  );
};

// ======================================================
// Componente Principal del Header del Demo (sin cambios en la lógica)
// ======================================================
const Header = () => {
  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative min-h-svh flex items-center justify-center overflow-hidden border-b border-white/5">
      {/* Fondo con efectos visuales mejorados */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[#0A0A0A]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Usamos el degradado neural para el brillo morado */}
      <div 
        className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_60%)] opacity-100"
        style={{ background: "var(--gradient-neural)" }}
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Columna de Texto Persuasivo */}
          <motion.div
            className="text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {},
            }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground leading-tight"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              El Futuro del Crédito 
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-magenta to-orange-400">
                es Instantáneo.
              </span>
            </motion.h1>

            <motion.p 
              className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.1 } } }}
            >
              Bienvenido a <strong>BankIA</strong>. Estás a punto de ver cómo un <strong>Perceptrón Multicapa</strong> analiza perfiles para aprobar tarjetas de crédito en tiempo real.
              <span className="block mt-2 text-sm text-neon-cyan/100">
                (Esta es una simulación educativa. Tus datos no se guardan.)
              </span>
            </motion.p>
            
            <motion.button
              onClick={scrollToForm}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 font-semibold text-background bg-neon-magenta rounded-lg shadow-[0_0_20px_hsl(var(--neon-orange)/0.4)] hover:bg-white hover:text-black hover:shadow-[0_0_30px_white] transition-all duration-300 transform hover:scale-105"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2 } } }}
            >
              Postularme Ahora
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Columna de la Tarjeta de Crédito */}
          <div className="flex justify-center items-center" style={{ perspective: "1000px" }}>
            <CreditCard />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;