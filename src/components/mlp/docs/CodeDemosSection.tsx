// src/components/mlp/CodeDemosSection.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, GitFork, LoaderCircle, AlertTriangle } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useFetchData } from '@/hooks/useFetchData';
import { contentService, type CodeSnippetData } from '@/services/contentService';

// --- Componente de Visualización de Código ---
const CodeViewer = ({ snippets }: { snippets: CodeSnippetData[] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0A0A0A]/50 shadow-2xl shadow-neon-magenta/10 backdrop-blur-sm overflow-hidden">
      {/* Header con Pestañas */}
      <div className="flex items-center gap-2 p-3 bg-black/30 border-b border-white/10">
        {snippets.map((snippet, index) => (
          <button
            key={snippet.id}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === index 
                ? 'bg-neon-magenta/10 text-neon-magenta font-semibold' 
                : 'text-muted-foreground hover:bg-white/5'
            }`}
          >
            {snippet.title}
          </button>
        ))}
        <div className="flex-grow" />
        <button onClick={handleCopy} className="p-2 rounded-md text-muted-foreground hover:bg-white/5 transition-colors">
          {copied ? <Check className="w-4 h-4 text-neon-green" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Cuerpo del Código */}
      <div className="text-sm">
        <SyntaxHighlighter
          language={snippets[activeTab].language}
          style={vscDarkPlus}
          customStyle={{ background: 'transparent', margin: 0, padding: '1.25rem' }}
        >
          {snippets[activeTab].code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

// --- Componente Principal de la Sección ---
const CodeDemosSection = () => {
  const { data: snippets, isLoading, error } = useFetchData(contentService.getSnippetsByTopic, 'mlp');

  return (
    <section id="codigo-demos" className="relative py-24 border-t border-white/5 bg-background overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/public/grid.svg')] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-neon-magenta/20 bg-neon-magenta/10">
            <Terminal className="w-4 h-4 text-neon-magenta" />
            <span className="text-sm font-medium text-neon-magenta">Construyendo IA</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">
            Código Fuente
          </h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Esto no es solo código. Asi iniciaron los grandes modelos de lenguaje y ahora está a tu alcance. <strong className="text-neon-magenta">¡Experimenta!</strong>
          </p>
        </motion.div>

        {isLoading && (
          <div className="flex justify-center">
            <LoaderCircle className="w-10 h-10 text-neon-magenta animate-spin" />
          </div>
        )}
        {error && (
          <div className="text-center text-red-400">
            <AlertTriangle className="inline-block w-6 h-6 mr-2" />
            {error}
          </div>
        )}

        {!isLoading && !error && (snippets?.length ?? 0) > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <CodeViewer snippets={snippets!} />
          </motion.div>
        )}

        {/* --- El Gran Botón de Llamada a la Acción --- */}
        <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="https://github.com/AprendeIngenia/ingeniia_services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 font-bold text-lg text-background bg-neon-magenta rounded-full shadow-[0_0_20px_theme(colors.neon.magenta),0_0_40px_theme(colors.neon.magenta),inset_0_0_10px_theme(colors.neon.magenta)]
                       hover:bg-white hover:text-black hover:shadow-[0_0_30px_white,0_0_50px_white] transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <GitFork className="w-6 h-6" />
            <span>Acceder al Repositorio Completo</span>
          </a>
          <p className="mt-4 text-sm text-muted-foreground">Únete a la comunidad. Clona, experimenta y hazlo tuyo.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeDemosSection;
