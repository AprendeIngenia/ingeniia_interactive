import { Mail, Github, Linkedin, Coffee } from "lucide-react";

const FounderSection = () => {
  return (
    <footer className="py-16 bg-gradient-section border-t border-border/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Founder intro */}
          <div className="mb-12">
            <h3 className="text-2xl font-linear font-semibold mb-4">
              Creado con <span className="text-neon-magenta">❤️</span> por el profe
            </h3>
            <p className="text-lg text-muted-foreground font-linear leading-relaxed max-w-2xl mx-auto">
              Soy un apasionado del machine learning y la educación. Decidí crear ingeniia para 
              democratizar el acceso al conocimiento de deep learning, combinando teoría sólida 
              con práctica aplicada usando las mejores prácticas de la industria.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-card p-8 rounded-xl border border-border mb-12">
            <h4 className="text-xl font-linear font-semibold text-neon-cyan mb-4">
              Nuestra Misión
            </h4>
            <p className="text-muted-foreground font-linear leading-relaxed">
              Hacer que el deep learning sea accesible para todos, sin importar tu trasfondo técnico. 
              Creemos que la educación de calidad debe ser gratuita y que todos merecen aprender 
              las tecnologías que están transformando el mundo.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-xl font-linear font-semibold">
              ¿Tienes alguna pregunta o sugerencia?
            </h4>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:hello@ingeniia.dev"
                className="group flex items-center space-x-2 px-6 py-3 bg-card border border-neon-cyan/30 rounded-xl font-linear hover:shadow-glow-cyan transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-5 h-5 text-neon-cyan" />
                <span>hello@ingeniia.dev</span>
              </a>
              
              <a 
                href="#"
                className="group flex items-center space-x-2 px-6 py-3 bg-card border border-neon-orange/30 rounded-xl font-linear hover:shadow-glow-orange transition-all duration-300 hover:scale-105"
              >
                <Github className="w-5 h-5 text-neon-orange" />
                <span>GitHub</span>
              </a>
              
              <a 
                href="#"
                className="group flex items-center space-x-2 px-6 py-3 bg-card border border-neon-green/30 rounded-xl font-linear hover:shadow-glow-green transition-all duration-300 hover:scale-105"
              >
                <Linkedin className="w-5 h-5 text-neon-green" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Fun footer note */}
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground font-linear pt-8 border-t border-border/30 mt-12">
              <Coffee className="w-4 h-4 text-neon-orange" />
              <span>Hecho con mucho café y redes neuronales</span>
              <span className="text-neon-cyan">•</span>
              <span>© 2024 ingeniia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FounderSection;