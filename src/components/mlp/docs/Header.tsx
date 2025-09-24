// src/components/mlp/Header.tsx
import { motion } from 'framer-motion';
import { BrainCircuit, PlayCircle, PenSquare, Code } from 'lucide-react';

// ======================================================
// Componente SVG para la visualización del MLP
// (Este componente no necesita cambios)
// ======================================================
const MLPGraph = () => {
  // ... (código del SVG sin cambios)
  const nodes = {
    input:   [{ cx: 50, cy: 75 }, { cx: 50, cy: 150 }, { cx: 50, cy: 225 }],
    hidden1: [{ cx: 150, cy: 50 }, { cx: 150, cy: 116 }, { cx: 150, cy: 182 }, { cx: 150, cy: 250 }],
    hidden2: [{ cx: 250, cy: 100 }, { cx: 250, cy: 200 }],
    output:  [{ cx: 350, cy: 150 }],
  };
  const connections = [
    ...nodes.input.flatMap(i => nodes.hidden1.map(h => ({ from: i, to: h }))),
    ...nodes.hidden1.flatMap(h1 => nodes.hidden2.map(h2 => ({ from: h1, to: h2 }))),
    ...nodes.hidden2.flatMap(h => nodes.output.map(o => ({ from: h, to: o }))),
  ];
  const svgVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8, ease: "easeInOut" } } };
  const nodeVariants = { hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.8 } } };
  return (
    <motion.svg viewBox="0 0 400 300" className="w-full h-auto max-w-md" variants={svgVariants} initial="hidden" animate="visible" aria-label="Gráfico de un Perceptrón Multicapa complejo">
      <defs>
        <filter id="mlpGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="hsl(var(--brand-cyan) / 0.2)" strokeWidth="1">
        {connections.map((c, i) => (
          <motion.line key={i} x1={c.from.cx} y1={c.from.cy} x2={c.to.cx} y2={c.to.cy} variants={itemVariants} />
        ))}
      </g>
      {Object.values(nodes).flat().map((node, i) => (
        <motion.circle key={i} cx={node.cx} cy={node.cy} r="10" fill="hsl(var(--background))" stroke="hsl(var(--brand-cyan))" strokeWidth="2" filter="url(#mlpGlow)" variants={nodeVariants} />
      ))}
    </motion.svg>
  );
};


// ======================================================
// Componente Principal del Header
// ======================================================
const Header = () => {
  return (
    // CAMBIO 1: Se ajustó la altura a 'h-svh' (screen viewport height) para que ocupe toda la pantalla de forma consistente en todos los dispositivos.
    <header className="relative h-svh flex items-center justify-center overflow-hidden border-b border-white/5">
      {/* Fondo con degradado y patrón de cuadrícula */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[#0A0A0A]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(var(--brand-cyan)/0.1),transparent_60%)]"
      />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna de Texto */}
          <motion.div
            className="text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }
              },
              hidden: { opacity: 0, x: -50 }
            }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-neon-cyan/20 bg-neon-cyan/10"
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 10 } }}
            >
              <BrainCircuit className="w-4 h-4 text-neon-cyan" />
              <span className="text-sm font-medium text-neon-cyan">El Origen</span>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground leading-tight"
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 10 } }}
            >
              Perceptrón
              <br />
              <span className="text-neon-cyan shadow-glow-cyan">Multicapa (MLP)</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0"
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 10 } }}
            >
              El <strong>pilar fundamental</strong> del Deep Learning. Descubre cómo estas redes neuronales, inspiradas en el cerebro humano, aprenden de los datos para clasificar, predecir y sentar las bases de la IA moderna.
            </motion.p>
            
            {/* Contenedor de botones de acción */}
            <motion.div
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
              variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 10 } }}
            >
              {/* CAMBIO 2: Se actualizaron los href para que coincidan con los IDs de las secciones */}
              <a href="#videos-explicativos" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-neon-green bg-neon-green/10 border border-neon-green/20 rounded-full hover:bg-neon-green/20 transition-colors duration-200">
                <PlayCircle className="w-4 h-4" />
                <span>Ver Videos</span>
              </a>
              <a href="#pizarra-interactiva" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-neon-orange bg-neon-orange/10 border border-neon-orange/20 rounded-full hover:bg-neon-orange/20 transition-colors duration-200">
                <PenSquare className="w-4 h-4" />
                <span>Pizarra Interactiva</span>
              </a>
              <a href="#codigo-demos" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-neon-magenta bg-neon-magenta/10 border border-neon-magenta/20 rounded-full hover:bg-neon-magenta/20 transition-colors duration-200">
                <Code className="w-4 h-4" />
                <span>Explorar Código</span>
              </a>
            </motion.div>

          </motion.div>

          {/* Columna de Visualización */}
          <div className="flex items-center justify-center">
            <MLPGraph />
          </div>

        </div>
      </div>
      
      {/* CAMBIO 3 (MEJORA): El indicador de scroll ahora es un enlace a la siguiente sección */}
      <a 
        href="#videos-explicativos" 
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        aria-label="Ir a la siguiente sección"
      >
        <div className="text-xs text-muted-foreground/80 inline-flex items-center gap-2 hover:text-neon-cyan transition-colors">
          <span>Explora los conceptos</span>
          <span className="inline-block animate-bounce text-neon-cyan">↓</span>
        </div>
      </a>
    </header>
  );
};

export default Header;