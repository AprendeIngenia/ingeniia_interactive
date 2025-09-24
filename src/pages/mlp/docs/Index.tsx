import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Header from "@/components/mlp/docs/Header";
import VideosSection from "@/components/mlp/docs/VideosSection";
import WhiteboardSection from "@/components/mlp/docs/WhiteboardSection";
import CodeDemosSection from "@/components/mlp/docs/CodeDemosSection";

// Componente Placeholder para las futuras secciones
const PlaceholderSection = ({ id, title, height = "50vh" }: { id: string, title: string, height?: string }) => (
  <section id={id} className="border-t border-white/5" style={{ minHeight: height }}>
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-center text-muted-foreground">{title}</h2>
      <p className="text-center text-muted-foreground/70 mt-4">Contenido Próximamente...</p>
    </div>
  </section>
);

const MLPPageDocs = () => {
        return (
          <div className="min-h-screen bg-background font-linear">
            <Navbar />
            <main>
              <Header />
              <VideosSection />
              <WhiteboardSection />
              <CodeDemosSection />
              <PlaceholderSection id="referencias-recursos" title="📚 Referencias y Recursos" />
            </main>
            <Footer />
          </div>
        );
      };
      
      export default MLPPageDocs;