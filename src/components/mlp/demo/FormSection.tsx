// src/components/mlp/demo/FormSetion.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { postCreditRisk, type CreditRiskInput, type CreditRiskOutput } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Briefcase, 
  Home, 
  PiggyBank, 
  Landmark, 
  Target, 
  Calendar, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

// --- Tipado de datos y valores por defecto ---
type FormData = {
  Age: number;
  Sex: 'male' | 'female';
  Job: number;
  Housing: 'own' | 'rent' | 'free';
  "Saving accounts": 'NA' | 'little' | 'moderate' | 'quite rich' | 'rich';
  "Checking account": 'NA' | 'little' | 'moderate' | 'rich';
  "Credit amount": number;
  Duration: number;
  Purpose: 'car' | 'furniture/equipment' | 'radio/TV' | 'domestic appliances' | 'repairs' | 'education' | 'business' | 'vacation/others';
};

const initialFormData: FormData = {
  Age: 35,
  Sex: "male",
  Job: 1,
  Housing: "own",
  "Saving accounts": "little",
  "Checking account": "moderate",
  "Credit amount": 5000,
  Duration: 24,
  Purpose: "car"
};

// --- Componentes de UI personalizados ---
const InputField = ({ icon: Icon, label, ...props }: any) => (
  <div className="relative">
    <label className="block text-sm font-medium text-muted-foreground mb-1 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="w-5 h-5 text-muted-foreground/70" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-2 bg-neutral-800/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-neon-purple outline-none transition-all"
      />
    </div>
  </div>
);

const SelectField = ({ icon: Icon, label, children, ...props }: any) => (
  <div className="relative">
     <label className="block text-sm font-medium text-muted-foreground mb-1 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="w-5 h-5 text-muted-foreground/70" />
      </div>
      <select
        {...props}
        className="w-full pl-10 pr-4 py-2 appearance-none bg-neutral-800/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-neon-purple focus:border-neon-purple outline-none transition-all"
      >
        {children}
      </select>
    </div>
  </div>
);

// --- Componente Principal del Formulario ---
interface FormSectionProps {
  onPredicted?: (payload: CreditRiskInput, output: CreditRiskOutput) => void;
}

const FormSection: React.FC<FormSectionProps> = ({ onPredicted }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CreditRiskInput>({
    Age: 35,
    Sex: 'male',
    Job: 1,
    Housing: 'own',
    'Saving accounts': 'little',
    'Checking account': 'moderate',
    'Credit amount': 5000,
    Duration: 24,
    Purpose: 'car',
  });

  const [submitting, setSubmitting] = useState(false);
  
  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value, type } = e.target;
    const v = type === 'number' ? Number(value) : (value as any);
    setFormData((p) => ({ ...p, [name]: v }));
  };

  const handleCustomChange = (name: keyof CreditRiskInput, value: any) => {
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const output = await postCreditRisk(formData);

      if (typeof onPredicted === 'function') {
        onPredicted(formData, output);
      } else {
        console.warn('FormSection: onPredicted no es una función o no fue pasada');
      }

      toast({
        title: output.prediction === 'good' ? '¡Aprobado preliminarmente! 🎉' : 'Necesitamos reforzar tu perfil',
        description:
          output.prediction === 'good'
            ? `Probabilidad estimada: ${(output.probability * 100).toFixed(1)}%`
            : `Probabilidad actual: ${(output.probability * 100).toFixed(1)}%`,
      });
    } catch (err: any) {
      toast({
        title: 'Error al analizar',
        description: err?.message ?? 'No pudimos conectar con el motor MLP.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const jobLabels = ["No calificado", "Aprendiz", "Calificado", "Experto"];

  return (
    <section id="application-form" className="py-24 bg-[#0A0A0A] border-y border-white/5">
      <motion.div 
        className="container mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Completa tu <span className="text-neon-purple">Perfil Digital</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Nuestra IA analiza cada detalle para ofrecerte una decisión justa y transparente. 
            <strong>Cada campo es un paso hacia tu futuro financiero.</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-8 bg-card/50 border border-white/10 rounded-2xl shadow-2xl shadow-glow-purple">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <InputField label="Edad" icon={User} type="number" name="Age" value={formData.Age} onChange={handleChange} min="18" max="99" />
            <InputField label="Monto del Crédito ($)" icon={TrendingUp} type="number" name="Credit amount" value={formData['Credit amount']} onChange={handleChange} min="250" />
            <InputField label="Duración (Meses)" icon={Calendar} type="number" name="Duration" value={formData.Duration} onChange={handleChange} min="4" />
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1">Sexo</label>
              <div className="flex gap-4">
                {(['male', 'female'] as const).map(sex => (
                  <button type="button" key={sex} onClick={() => handleCustomChange('Sex', sex)} className={`flex-1 py-2 text-sm font-semibold rounded-lg border transition-all ${formData.Sex === sex ? 'bg-neon-purple text-white border-neon-purple shadow-[0_0_25px_hsl(var(--neon-purple)/0.5)]' : 'bg-neutral-800/50 border-white/10 hover:border-white/30'}`}>
                    {sex === 'male' ? 'Hombre' : 'Mujer'}
                  </button>
                ))}
              </div>
            </div>

            <SelectField label="Propósito del Crédito" icon={Target} name="Purpose" value={formData.Purpose} onChange={handleChange}>
                <option value="car">Carro</option>
                <option value="furniture/equipment">Muebles/Equipamiento</option>
                <option value="radio/TV">Radio/TV</option>
                <option value="domestic appliances">Electrodomésticos</option>
                <option value="repairs">Reparaciones</option>
                <option value="education">Educación</option>
                <option value="business">Negocios</option>
                <option value="vacation/others">Vacaciones/Otros</option>
            </SelectField>
            <SelectField label="Cuenta de Ahorros" icon={PiggyBank} name="Saving accounts" value={formData['Saving accounts']} onChange={handleChange}>
                <option value="NA">No Aplica</option>
                <option value="little">Bajos</option>
                <option value="moderate">Moderados</option>
                <option value="quite rich">Altos</option>
                <option value="rich">Muy Altos</option>
            </SelectField>
            <SelectField label="Cuenta Corriente" icon={Landmark} name="Checking account" value={formData['Checking account']} onChange={handleChange}>
                <option value="NA">No Aplica</option>
                <option value="little">Bajos</option>
                <option value="moderate">Moderados</option>
                <option value="rich">Altos</option>
            </SelectField>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1">Vivienda</label>
              <div className="flex gap-4">
                {(['own', 'rent', 'free'] as const).map(housing => (
                  <button type="button" key={housing} onClick={() => handleCustomChange('Housing', housing)} className={`flex-1 py-2 text-sm font-semibold capitalize rounded-lg border transition-all ${formData.Housing === housing ? 'bg-neon-purple text-white border-neon-purple shadow-[0_0_25px_hsl(var(--neon-purple)/0.5)]' : 'bg-neutral-800/50 border-white/10 hover:border-white/30'}`}>
                    {housing === 'own' ? 'Propia' : housing === 'rent' ? 'Alquilada' : 'Gratis'}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
               <label className="block text-sm font-medium text-muted-foreground mb-2 ml-1">Nivel Laboral: <span className="font-bold text-neon-cyan">{jobLabels[formData.Job]}</span></label>
               <input 
                  type="range"
                  name="Job"
                  min="0"
                  max="3"
                  step="1"
                  value={formData.Job}
                  onChange={handleChange}
                  className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer range-lg accent-neon-cyan"
               />
            </div>

            <div className="md:col-span-2 mt-6 text-center">
            <motion.button
              type="submit"
              disabled={submitting}
              className={`w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-lg rounded-full transition-all duration-300 ease-in-out
                 ${submitting
                  ? 'bg-neutral-700 text-muted-foreground cursor-not-allowed'
                  : 'text-white bg-neon-magenta hover:bg-white hover:text-black hover:shadow-[0_0_30px_white]'}`}
              whileHover={!submitting ? { scale: 1.05 } : undefined}
              whileTap={!submitting ? { scale: 0.98 } : undefined}
            >
              <Sparkles className="w-6 h-6" />
              <span>{submitting ? 'Analizando…' : 'Analizar Mi Perfil con IA'}</span>
            </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default FormSection;