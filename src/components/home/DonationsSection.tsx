import { Heart, CreditCard, Banknote, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DonationsSection = () => {
  const { toast } = useToast();

  const handleDonationClick = (method: string) => {
    toast({
      title: `Donación via ${method}`,
      description: "Estamos pensando profundamente en la construcción de esta sección",
      duration: 3000,
    });
  };

  const donationMethods = [
    {
      name: "PayPal",
      description: "Donación internacional segura",
      icon: <CreditCard className="w-6 h-6" />,
      color: "cyan"
    },
    {
      name: "Tarjeta de Crédito",
      description: "Visa, Mastercard, American Express",
      icon: <CreditCard className="w-6 h-6" />,
      color: "orange"
    },
    {
      name: "Bancos Colombia",
      description: "Nequi, Daviplata, Bancolombia",
      icon: <Banknote className="w-6 h-6" />,
      color: "green"
    }
  ];

  return (
    <section className="py-20 bg-gradient-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Heart className="w-8 h-8 text-neon-magenta animate-pulse" />
            <h2 className="text-4xl font-linear font-bold">
              Apoya el <span className="text-neon-magenta">Proyecto</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-linear">
            Mantén ingeniia gratuito para todos. Tu donación nos ayuda a crear más contenido educativo
            y mejorar la plataforma continuamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {donationMethods.map((method, index) => (
            <div
              key={method.name}
              className="group cursor-pointer"
              onClick={() => handleDonationClick(method.name)}
            >
              <div className={`
                relative bg-card p-8 rounded-xl border border-border
                hover:shadow-glow-${method.color} transition-all duration-300
                hover:scale-105 hover:border-neon-${method.color}/50
              `}>
                <div className={`
                  w-16 h-16 rounded-xl bg-neon-${method.color}/10 
                  border border-neon-${method.color}/30 
                  flex items-center justify-center mb-6 mx-auto
                  text-neon-${method.color} group-hover:animate-float
                `}>
                  {method.icon}
                </div>

                <h3 className="text-xl font-linear font-semibold text-center mb-3">
                  {method.name}
                </h3>
                <p className="text-sm text-muted-foreground text-center font-linear">
                  {method.description}
                </p>

                <div className="mt-6 text-center">
                  <span className={`
                    text-sm font-medium text-neon-${method.color} 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                  `}>
                    Próximamente →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fun stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-linear font-bold text-neon-cyan mb-2">100%</div>
            <p className="text-sm text-muted-foreground font-linear">Gratuito siempre</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-linear font-bold text-neon-orange mb-2">∞</div>
            <p className="text-sm text-muted-foreground font-linear">Cursos disponibles</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-linear font-bold text-neon-green mb-2">24/7</div>
            <p className="text-sm text-muted-foreground font-linear">Acceso completo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationsSection;