// src/components/home/FounderSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Youtube, Twitter, Instagram } from 'lucide-react';

// ==============================
// Componente Reutilizable para Enlaces Sociales
// ==============================
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  colorClass: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label, colorClass }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center justify-center w-12 h-12 bg-card/80 border border-white/10 rounded-full transition-all duration-300 ${colorClass}`}
      whileHover={{ scale: 1.1, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      aria-label={`Visitar perfil de ${label}`}
    >
      {icon}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-md">{label}</span>
        <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black/50" />
      </div>
    </motion.a>
  );
};


// ==============================
// Componente Principal de la Sección del Fundador
// ==============================
const FounderSection = () => {

  const socialLinks: SocialLinkProps[] = [
    { href: 'https://www.youtube.com/@in_Geniia/videos', icon: <Youtube className="w-6 h-6" />, label: 'YouTube', colorClass: 'hover:text-[#FF0000] hover:shadow-[0_0_15px_#FF000060]' },
    { href: 'https://github.com/AprendeIngenia', icon: <Github className="w-6 h-6" />, label: 'GitHub', colorClass: 'hover:text-white hover:shadow-[0_0_15px_#FFFFFF60]' },
    { href: 'https://www.linkedin.com/in/santiago-sanchez-rios-0b20431b8/', icon: <Linkedin className="w-6 h-6" />, label: 'LinkedIn', colorClass: 'hover:text-neon-cyan hover:shadow-glow-cyan' },
    { href: 'https://x.com/SantiagSanchezR', icon: <Twitter className="w-6 h-6" />, label: 'Twitter/X', colorClass: 'hover:text-white hover:shadow-[0_0_15px_#FFFFFF60]' },
    { href: 'https://www.instagram.com/santiagsanchezr/', icon: <Instagram className="w-6 h-6" />, label: 'Instagram', colorClass: 'hover:text-neon-magenta hover:shadow-glow-magenta' },
  ];

  return (
    <section id="founder" className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden border-t border-white/5 p-6">
      {/* Fondo con efectos */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-background" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom,hsla(var(--brand-green)/0.15),transparent_60%)]"
        />
      </div>

      <motion.div
        className="container mx-auto z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          {/* Columna de la Imagen */}
          <motion.div
            className="lg:col-span-2 flex justify-center"
            variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: 'spring' } } }}
          >
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-neon-green via-neon-green to-neon-cyan rounded-full blur-md opacity-60 group-hover:opacity-80 transition duration-500 animate-pulse-slow"/>
              <img
                src="/images/founder-photo.JPG" // Asegúrate de tener una foto tuya en public/images
                alt="Foto de Santiago Sánchez, fundador de inGeniia"
                className="relative w-48 h-48 md:w-60 md:h-60 object-cover rounded-full border-4 border-card"
              />
            </div>
          </motion.div>

          {/* Columna de Texto y Enlaces */}
          <div className="lg:col-span-3 text-center lg:text-left">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            >
              <span className="text-neon-cyan">Universo Profundo</span>
            </motion.h2>
            
            <motion.p
              className="text-lg text-muted-foreground mb-6"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } } }}
            >
              Soy <strong>Santiago Sánchez</strong>, Ing. Mecatrónico con +5 años de experiencia creando y desplegando modelos de IA. inGeniia es la materialización de mi visión:
            </motion.p>
            
            <motion.blockquote
              className="border-l-4 border-neon-cyan/50 pl-4 italic text-foreground/80 mb-8"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } } }}
            >
              "Quiero crear un ecosistema vivo de aprendizaje; un lugar seguro para explorar, experimentar y colaborar entre disciplinas, donde las ideas se vuelven desarrollos que inspiran y elevan la vida humana en la tierra."
            </motion.blockquote>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } } }}
            >
              <h4 className="font-semibold mb-4">Conecta conmigo y sé parte de la comunidad:</h4>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                {socialLinks.map((link, index) => (
                  <SocialLink key={index} {...link} />
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-4 text-xs text-muted-foreground/60 text-center">
        © {new Date().getFullYear()} inGeniia • Creado con ❤️, ☕ y Redes Neuronales desde Colombia.
      </div>
    </section>
  );
};

export default FounderSection;