import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/state/AuthContext";

const NerdFaceIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    role="img"
  >
    {/* carita */}
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
    {/* lentes */}
    <circle cx="8.5" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="15.5" cy="11" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    {/* puente */}
    <path d="M10.75 11c.4-.5 2.1-.5 2.5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* sonrisa */}
    <path d="M9 15c1.2 1 4.8 1 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Header = () => {
  const { openAuthModal, isAuthenticated, user, logout } = useAuth();

  const goToRoadmap = () => {
    const el = document.getElementById("roadmap");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleStart = () => {
    if (isAuthenticated) {
      goToRoadmap();
    } else {
      openAuthModal();
    }
  };

  return (
    <header className="relative overflow-hidden border-b border-white/5 min-h-[100svh] flex flex-col">
      {/* Fondo con degradado y patrón de cuadrícula */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-background" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 flex-1 flex flex-col">
        {/* Barra de Navegación */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-3">
            <img src="/images/logo.png" alt="Genia Logo" className="w-8 h-8 rounded-lg" />
            {/* Wordmark PNG sin fondo */}
            <img src="/images/ingeniia.png" alt="inGeniia wordmark" className="h-5 md:h-6 w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
            <a href="#cursos" className="hover:text-foreground transition-colors">Cursos</a>
            <a href="#comunidad" className="hover:text-foreground transition-colors">Comunidad</a>
            <a href="#precios" className="hover:text-foreground transition-colors">Precios</a>
            <a href="#docs" className="hover:text-foreground transition-colors">Docs</a>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={openAuthModal}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={handleStart}
                  className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-md hover:bg-gray-200 transition-colors"
                >
                  Registrarse
                </button>
              </>
            ) : (
              <>
                <span className="text-sm text-muted-foreground">
                  Hola, <span className="font-semibold text-foreground">{user?.username ?? user?.email}</span>
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-2 border border-white/10 rounded-md text-sm hover:bg-white/10 transition-colors"
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Contenido Principal del Header */}
        <div className="text-center py-16 md:py-24 lg:py-28 flex-1 flex flex-col items-center justify-center">
          {/* Slogan */}
          <div className="inline-flex items-center space-x-2 border border-white/10 bg-card/60 backdrop-blur px-3 py-1 rounded-full mb-6 text-sm">
            <span className="text-[hsl(var(--brand-lime))]">
              <NerdFaceIcon />
            </span>
            <span
              className="font-medium bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, hsl(var(--brand-gray)), hsl(var(--brand-gray)))",
              }}
            >
              ¡Para genios!
            </span>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground max-w-4xl mx-auto leading-[1.05]">
            Domina el mundo del
            <br />
            <span className="block text-5xl md:text-7xl mt-2 mx-auto text-center text-foreground text-neon-cyan">
              Deep Learning
            </span>
          </h1>

          {/* Subtítulo */}
          <div className="mt-6">
            <p
              className="inline-flex items-center whitespace-nowrap bg-black/40 border border-white/10 rounded-full px-4 py-2 text-sm md:text-base text-muted-foreground/90"
              title="Aprende sobre redes neuronales artificiales desde cero usando buenas prácticas DevOps & MLOps."
            >
              Aprende sobre redes neuronales artificiales desde cero usando buenas prácticas DevOps &amp; MLOps.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <button
              type="button"
              aria-label="Ir al roadmap o abrir login"
              onClick={handleStart}
              className="group relative px-8 py-4 bg-card/80 border border-[hsla(var(--brand-cyan)/.30)] rounded-xl font-medium text-foreground hover:shadow-[0_0_20px_hsla(var(--brand-cyan)/.35)] transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">{isAuthenticated ? "Ir al roadmap" : "Aprender Deep Learning"}</span>
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, hsla(var(--brand-cyan)/.10), hsla(var(--brand-orange)/.10))",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de autenticación montado aquí */}
      <AuthModal />
    </header>
  );
};

export default Header;
