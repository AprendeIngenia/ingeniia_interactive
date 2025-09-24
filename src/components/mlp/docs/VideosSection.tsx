// src/components/mlp/VideosSection.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Clock, LoaderCircle, AlertTriangle, Video } from 'lucide-react';
import YouTube from 'react-youtube';

// --- Tipado de los datos que esperamos de la API ---
interface VideoData {
  id: string;
  title: string;
  description: string;
  youtube_id: string;
  duration_minutes: number;
}

// --- Pequeños componentes para mantener el código limpio ---
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
    <LoaderCircle className="w-12 h-12 text-neon-cyan animate-spin" />
    <p className="mt-4 text-lg tracking-tight">Desvelando el conocimiento...</p>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-64 text-red-400 bg-red-900/20 rounded-lg">
    <AlertTriangle className="w-12 h-12" />
    <p className="mt-4 text-lg font-semibold">Algo salió mal</p>
    <p className="text-sm text-red-400/70">{message}</p>
  </div>
);

const PlayerPlaceholder = () => (
  <div className="flex flex-col justify-center items-center h-full bg-grid-pattern-dark rounded-xl border border-white/10 shadow-inner-strong">
    <Video className="w-16 h-16 text-neon-cyan/50" />
    <h3 className="mt-4 text-2xl font-bold text-white tracking-tighter">Tu Viaje Comienza Aquí</h3>
    <p className="text-muted-foreground">Elige un video y sumérgete en las bases del Deep Learning.</p>
  </div>
);

// --- Componente de la Tarjeta de Video (con persuasión) ---
const VideoCard = ({ video, onSelect, index }: { video: VideoData, onSelect: (videoId: string) => void, index: number }) => {
  const thumbnailUrl = `https://i3.ytimg.com/vi/${video.youtube_id}/maxresdefault.jpg`;
  
  // Gatillo Psicológico: Etiquetado de autoridad/guía
  const tags = ["Introducción", "Conceptos Clave", "Entrenamiento", "Profesional"];
  const tag = tags[index] || null;

  return (
    <motion.div
      className="group relative flex-shrink-0 w-[340px] cursor-pointer overflow-hidden rounded-xl shadow-lg border border-white/5"
      onClick={() => onSelect(video.youtube_id)}
      whileHover={{ scale: 1.03, y: -5, boxShadow: "0 10px 20px hsla(var(--brand-cyan)/0.2)" }}
      transition={{ type: 'spring', stiffness: 250, damping: 15 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      viewport={{ once: true }}
    >
      <div className="absolute top-3 left-3 z-10">
        {tag && (
            <span className="px-2 py-1 text-xs font-bold text-background bg-neon-cyan rounded-full">{tag}</span>
        )}
      </div>
      <img src={thumbnailUrl} alt={video.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <PlayCircle className="w-20 h-20 text-white/80 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{video.title}</h3>
        <div className="flex items-center gap-2 mt-2 text-sm text-white/70">
          <Clock className="w-4 h-4" />
          <span>{video.duration_minutes} minutos de puro conocimiento</span>
        </div>
      </div>
    </motion.div>
  );
};


// --- Componente Principal de la Sección de Videos ---
const VideosSection = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiUrl = `${import.meta.env.VITE_API_CONTENT_SERVICE_URL}/videos/topic/mlp`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo conectar con el servidor de contenido.`);
        }
        const data: VideoData[] = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Error al cargar videos:", err);
        setError(err instanceof Error ? err.message : "Un error inesperado ocurrió.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  const videoPlayerOptions = {
    height: '100%',
    width: '100%',
    playerVars: { autoplay: 1, modestbranding: 1, rel: 0, iv_load_policy: 3 },
  };

  return (
    <section id="videos-explicativos" className="py-24 border-t border-white/5 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
            Domina la Arquitectura
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            El Perceptrón Multicapa es la base la inteligencia artificial moderna. Cada clic es un paso más cerca de convertirte en un experto. <strong className="text-neon-cyan">¿Estás listo para empezar?</strong>
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-16 aspect-video">
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedVideoId || 'placeholder'}
                    className="w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-neon-cyan/10 border border-white/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                    {selectedVideoId ? (
                        <YouTube videoId={selectedVideoId} opts={videoPlayerOptions} className="w-full h-full" />
                    ) : (
                        <PlayerPlaceholder />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>

        <div className="relative">
            <div className="flex gap-8 pb-4 -mx-6 px-6 overflow-x-auto [scrollbar-color:hsl(var(--brand-cyan))_transparent] [scrollbar-width:thin]">
                {isLoading ? <LoadingSpinner /> : null}
                {error ? <ErrorDisplay message={error} /> : null}
                <AnimatePresence>
                    {!isLoading && !error && videos.map((video, index) => (
                        <VideoCard key={video.id} video={video} onSelect={setSelectedVideoId} index={index} />
                    ))}
                </AnimatePresence>
            </div>
            {/* Sombras para indicar que hay más contenido */}
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#0A0A0A] to-transparent pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#0A0A0A] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default VideosSection;