// src/components/shared/Navbar.tsx
import { Link } from "react-router-dom"; // 1. CAMBIA la importación

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 container mx-auto px-6 flex items-center justify-between py-4">
      
      {/* 2. USA <Link to="/"> para el logo */}
      <Link to="/" className="flex items-center space-x-3">
        <img src="/images/logo.png" alt="inGeniia Logo" className="w-8 h-8 rounded-lg" />
        <img src="/images/ingeniia.png" alt="inGeniia wordmark" className="h-5 md:h-6 w-auto object-contain" />
      </Link>

      {/* 3. USA <a> para enlaces de anclaje (#) o externos */}
      <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
        <a href="/#roadmap" className="hover:text-foreground transition-colors">Cursos</a>
        <a href="/#comunidad" className="hover:text-foreground transition-colors">Comunidad</a>
        <a href="/#donations" className="hover:text-foreground transition-colors">Apóyanos</a>
      </div>
      
      {/* 4. USA <Link to="..."> para otras páginas internas */}
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Login
        </Link>
        <Link to="/empezar" className="px-4 py-2 bg-white text-black text-sm font-semibold rounded-md hover:bg-gray-200 transition-colors">
          Empezar
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;