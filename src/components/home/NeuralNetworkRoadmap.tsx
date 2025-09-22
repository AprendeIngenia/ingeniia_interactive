// ==============================
// src/components/home/NeuralNetworkRoadmap.tsx
// ==============================
import React, { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Brain, Layers, Network, Zap, Play, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Tipos
interface StopMeta {
  id: string;
  name: string;
  description: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado" | "Experto";
  color: "cyan" | "orange" | "green" | "magenta";
  icon: React.ReactNode;
  pos: { x: number; y: number }; // en viewBox 1000x600
  connections?: string[];
  est?: string;
}

// Data
const STOPS: StopMeta[] = [
  { id: "mlp", name: "MLP", description: "Multi-Layer Perceptron — tu primera red neuronal", difficulty: "Principiante", color: "cyan", icon: <Brain className="w-6 h-6" />, pos: { x: 110, y: 420 }, est: "~3–4 h" },
  { id: "cnn", name: "CNN", description: "Convolutional Nets — visión por computadora", difficulty: "Intermedio", color: "orange", icon: <Layers className="w-6 h-6" />, pos: { x: 420, y: 360 }, connections: ["mlp"], est: "~6–8 h" },
  { id: "rnn", name: "RNN", description: "Recurrentes — secuencias y tiempo", difficulty: "Intermedio", color: "green", icon: <Network className="w-6 h-6" />, pos: { x: 400, y: 180 }, connections: ["mlp"], est: "~6–8 h" },
  { id: "transformer", name: "Transformers", description: "Attention Is All You Need — NLP moderno", difficulty: "Avanzado", color: "magenta", icon: <Zap className="w-6 h-6" />, pos: { x: 780, y: 240 }, connections: ["rnn", "cnn"], est: "~8–12 h" },
];

// Helpers
const colorToClass = (c: StopMeta["color"]) => ({
  text: `text-neon-${c}`,
  glow: `shadow-glow-${c}`,
});

const difficultyToClass = (d: StopMeta["difficulty"]) => {
  switch (d) {
    case "Principiante": return "text-neon-cyan";
    case "Intermedio":  return "text-neon-green";    // verde para Intermedio
    case "Avanzado":    return "text-neon-magenta";  // magenta para Avanzado
    case "Experto":     return "text-neon-orange";
  }
};

// Component
const NeuralNetworkRoadmap: React.FC = () => {
  const { toast } = useToast();
  const [activeId, setActiveId] = useState<string>("mlp");
  const routeRef = useRef<SVGPathElement | null>(null);

  // Spotlight que sigue al cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useTransform([mouseX, mouseY], ([x, y]) => ({
    background: `radial-gradient(200px 200px at ${x}px ${y}px, hsla(var(--brand-cyan)/.12), transparent 60%)`,
  }));
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const stopsById = useMemo(() => Object.fromEntries(STOPS.map(s => [s.id, s])), []);

  // Offsets anti-solape
  const OFFSETS: Record<string, { x: number; y: number }> = {
    mlp: { x: -30,  y: -120 },
    cnn: { x: -40,  y:   30 },
    rnn: { x: -160, y: -140 },
    transformer: { x: -235, y: -110 },
  };

  // Hasta que estén listas las páginas: solo toast
  const handleOpen = (id: string, _kind: "docs" | "demo") => {
    toast({
      title: `${id}`,
      description: "El profe está preparando profundamente la clase de esta Red Neuronal",
      duration: 3200,
    });
    // Cuando estén listas:
    // const base = kind === "docs" ? "/docs" : "/demos";
    // window.location.href = `${base}/${id}`;
  };

  const handleClickStop = (s: StopMeta) => {
    setActiveId(s.id);
    toast({
      title: `${s.name} — ${s.difficulty}`,
      description: "Abre la doc o prueba la demo interactiva.",
      duration: 2800,
    });
  };

  return (
    <section id="roadmap" className="relative snap-start min-h-[100svh] flex items-stretch justify-center overflow-hidden border-t border-white/5">
      {/* Fondo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "var(--gradient-section)" }} />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Capa de hotspot */}
      <motion.div className="absolute inset-0 pointer-events-none" style={spotlight} />

      <div className="container mx-auto px-6 py-12 md:py-16 lg:py-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8" onMouseMove={handleMouseMove}>
        {/* Intro */}
        <div className="lg:col-span-4 flex flex-col gap-4 justify-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Roadmap: <span className="text-neon-green">Deep Learning</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Abre la <span className="font-semibold">caja negra</span> de la Inteligencia Artificial. En cada estación, domina la arquitectura,
            aprende los conceptos y ejecuta <span className="font-semibold">demos interactivas</span>.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/80">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-white/10 bg-background/60">Secuencial</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-white/10 bg-background/60">Prerrequisitos</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-white/10 bg-background/60">Demos</span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full border border-white/10 bg-background/60">Docs</span>
          </div>
        </div>

        {/* Canvas de ruta */}
        <div className="lg:col-span-8 relative min-h-[60vh] lg:min-h-[70vh]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--brand-cyan))" />
                <stop offset="50%" stopColor="hsl(var(--brand-green))" />
                <stop offset="100%" stopColor="hsl(var(--brand-orange))" />
              </linearGradient>
              <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Carretera */}
            <path
              ref={routeRef}
              d="M100,500 C 260,420 300,220 430,220 C 560,220 590,360 720,360 C 840,360 880,260 920,240"
              stroke="url(#routeGrad)"
              strokeWidth={10}
              strokeLinecap="round"
              fill="none"
              opacity={0.9}
              filter="url(#routeGlow)"
            />
            {/* Línea discontinua central */}
            <path
              d="M100,500 C 260,420 300,220 430,220 C 560,220 590,360 720,360 C 840,360 880,260 920,240"
              stroke="white"
              strokeOpacity={0.6}
              strokeWidth={2}
              strokeDasharray="10 10"
              strokeLinecap="round"
              fill="none"
              className="animate-dash"
            />

            {/* Conexiones prerequisito */}
            {STOPS.map((s) =>
              s.connections?.map((from) => {
                const a = stopsById[from];
                if (!a) return null;
                const d = `M ${a.pos.x} ${a.pos.y} Q ${(a.pos.x + s.pos.x) / 2} ${(a.pos.y + s.pos.y) / 2 - 60} ${s.pos.x} ${s.pos.y}`;
                return <path key={`${from}->${s.id}`} d={d} stroke={`hsl(var(--neon-${s.color}))`} strokeWidth={2} fill="none" opacity={0.35} />;
              })
            )}

            {/* Pines */}
            {STOPS.map((s) => (
              <g key={s.id} transform={`translate(${s.pos.x}, ${s.pos.y})`}>
                <motion.circle
                  r={12}
                  fill={`hsl(var(--neon-${s.color}))`}
                  stroke={`hsla(var(--neon-${s.color})/.9)`}
                  strokeWidth={3}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14 }}
                />
                <circle r={22} stroke={`hsl(var(--neon-${s.color}))`} strokeOpacity={0.25} fill="none" className="animate-ping-slow" />
              </g>
            ))}

            {/* Continuación al final: “Más redes pronto…” */}
            <path d="M920,240 C 950,230 970,220 990,215" stroke="white" strokeOpacity={0.35} strokeWidth={2} strokeDasharray="6 8" fill="none" />
            <g transform="translate(940, 200)">
              <circle r={6} fill="hsl(var(--neon-magenta))" />
              <text x="12" y="4" fontSize="12" fill="hsl(var(--foreground))" opacity="0.85">Pronto</text>
            </g>
          </svg>

          {/* Tarjetas flotantes */}
          {STOPS.map((s) => {
            const c = colorToClass(s.color);
            const isActive = activeId === s.id;
            const off = OFFSETS[s.id] ?? { x: -120, y: -100 };

            return (
              <motion.div
                key={s.id}
                onMouseEnter={() => setActiveId(s.id)}
                onClick={() => handleClickStop(s)}
                role="button"
                tabIndex={0}
                // Transformers siempre con glow magenta; el resto en activo/hover
                className={`absolute ${isActive || s.id === "transformer" ? c.glow : ""} group cursor-pointer select-none`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{
                  left: `calc(${(s.pos.x / 1000) * 100}% + ${off.x}px)`,
                  top: `calc(${(s.pos.y / 600) * 100}% + ${off.y}px)`,
                  maxWidth: 280,
                  zIndex: isActive ? 50 : 10,
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative rounded-xl border bg-card/90 backdrop-blur px-4 py-4 ${c.glow} hover:${c.glow} transition-shadow`}
                >
                  {/* Header tarjeta */}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${c.text}`}
                      style={{
                        backgroundColor: `hsla(var(--neon-${s.color})/.10)`,
                        border: `1px solid hsla(var(--neon-${s.color})/.30)`,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold leading-tight">{s.name}</h3>
                      <div className="text-[11px] text-muted-foreground">Prereqs: {s.connections?.length ? s.connections.join(", ") : "—"}</div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{s.description}</p>

                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[11px] bg-background/60 ${difficultyToClass(s.difficulty)}`}>
                      {s.difficulty}
                    </span>
                    {s.est && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] bg-background/60 text-foreground/80">
                        {s.est}
                      </span>
                    )}
                  </div>

                  {/* Botones con color por tarjeta */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpen(s.id, "docs"); }}
                      style={{
                        borderColor: `hsla(var(--neon-${s.color})/.30)`,
                        // variables CSS para arbitrary values
                        ["--btnGlow" as any]: `hsla(var(--neon-${s.color})/.35)`,
                        ["--btnBg" as any]: `hsla(var(--neon-${s.color})/.12)`,
                      }}
                      className="
                        inline-flex items-center justify-center gap-1
                        rounded-md border px-3 py-2 text-xs font-medium
                        bg-background/60
                        hover:bg-[var(--btnBg)] active:bg-[var(--btnBg)]
                        hover:shadow-[0_0_20px_var(--btnGlow)]
                        focus:outline-none focus:ring-2 focus:ring-ring
                        transition
                      "
                    >
                      <BookOpen className="w-4 h-4" /> Docs
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpen(s.id, "demo"); }}
                      style={{
                        borderColor: `hsla(var(--neon-${s.color})/.30)`,
                        ["--btnGlow" as any]: `hsla(var(--neon-${s.color})/.35)`,
                        ["--btnBg" as any]: `hsla(var(--neon-${s.color})/.12)`,
                      }}
                      className="
                        inline-flex items-center justify-center gap-1
                        rounded-md border px-3 py-2 text-xs font-semibold
                        hover:bg-[var(--btnBg)] active:bg-[var(--btnBg)]
                        hover:shadow-[0_0_20px_var(--btnGlow)]
                        focus:outline-none focus:ring-2 focus:ring-ring
                        transition
                      "
                    >
                      <Play className="w-4 h-4" /> Demo
                    </button>
                  </div>

                  <ArrowRight className={`absolute top-3 right-3 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${c.text}`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="text-xs text-muted-foreground/80 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-background/70">
          <span>Desliza para continuar</span>
          <span className="inline-block animate-bounce">▾</span>
        </div>
      </div>
    </section>
  );
};

export default NeuralNetworkRoadmap;
