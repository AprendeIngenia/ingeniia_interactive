// src/components/mlp/WhiteboardSection.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Download, ExternalLink, LoaderCircle, AlertTriangle, PenLine } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- Tipado de datos extendido ---
interface WhiteboardData {
  id: string;
  preview_url: string;
  file_url: string;
}

interface VideoData {
  id: string;
  title: string;
  whiteboard?: WhiteboardData;
}

// --- Componente de la Tarjeta de Pizarra ---
const WhiteboardCard = ({ video }: { video: VideoData }) => {
  if (!video.whiteboard) return null;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 shadow-lg"
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <img
        src={video.whiteboard.preview_url}
        alt={`Pizarra de ${video.title}`}
        className="w-full h-56 object-cover object-top transition-transform duration-300 ease-in-out group-hover:scale-105"
      />
      {/* Superposición de degradado para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 p-5 w-full">
        <h3 className="text-lg font-bold text-white leading-tight tracking-tight">{video.title}</h3>
        <p className="text-sm text-muted-foreground/80">El lienzo donde las ideas cobran vida.</p>
      </div>

      {/* Botones de acción que aparecen al hacer hover */}
      <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
        <TooltipProvider delayDuration={100}>
          {/* ABRIR EN EXCALIDRAW (enlace externo) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a href="https://excalidraw.com/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 transition-colors">
                <ExternalLink className="w-6 h-6" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Abrir en Excalidraw (arrastra el archivo descargado)</p>
            </TooltipContent>
          </Tooltip>
          {/* DESCARGAR ARCHIVO */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a href={video.whiteboard.file_url} download className="p-3 rounded-full bg-neon-magenta/10 text-neon-magenta hover:bg-neon-magenta/20 transition-colors">
                <Download className="w-6 h-6" />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Descargar archivo .excalidraw</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </motion.div>
  );
};


// --- Componente Principal de la Sección ---
const WhiteboardSection = () => {
  const [videosWithWhiteboards, setVideosWithWhiteboards] = useState<VideoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_CONTENT_SERVICE_URL}/videos/topic/mlp`);
        if (!response.ok) throw new Error("No se pudo conectar al servidor de contenido.");
        const data: VideoData[] = await response.json();
        
        // Filtramos para quedarnos solo con los videos que tienen pizarra
        const filteredData = data.filter(video => video.whiteboard);
        setVideosWithWhiteboards(filteredData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "Un error inesperado ocurrió.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  return (
    <section id="pizarra-interactiva" className="py-24 border-t border-white/5 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-neon-orange/20 bg-neon-orange/10">
            <PenLine className="w-4 h-4 text-neon-orange" />
            <span className="text-sm font-medium text-neon-orange">Profundiza tu Conocimiento</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
            Mapas Mentales Interactivos
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Cada concepto complejo, desglosado visualmente. Accede a las pizarras de cada lección para <strong className="text-neon-orange">construir una intuición sólida y duradera</strong>.
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <LoaderCircle className="w-10 h-10 text-neon-orange animate-spin" />
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center h-40 text-red-400 bg-red-900/20 rounded-lg">
            <AlertTriangle className="w-10 h-10 mb-2" />
            <p className="font-semibold">{error}</p>
          </div>
        )}
        
        {!isLoading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {videosWithWhiteboards.map(video => (
              <WhiteboardCard key={video.id} video={video} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WhiteboardSection;