import React, { useState } from "react";
import { authService } from "@/services/authService";
import { useAuth } from "@/state/AuthContext";
import { X } from "lucide-react";

type Tab = "login" | "register" | "verify";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-cyan"
  />
);

const AuthModal: React.FC = () => {
  const { isModalOpen, closeAuthModal, setSession } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const [verifyToken, setVerifyToken] = useState("");

  if (!isModalOpen) return null;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    setLoading(true);
    try {
      const t = await authService.login(form.email, form.password);
      await setSession(t.access_token, t.refresh_token);
      closeAuthModal();
    } catch (e: any) {
      alert(e?.message ?? "No fue posible iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await authService.register(form.email, form.password, form.username || undefined);
      setTab("verify");
      alert("Te enviamos un correo de verificación. En dev, pega el token aquí.");
    } catch (e: any) {
      alert(e?.message ?? "No fue posible registrarte.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const t = await authService.verifyEmail(verifyToken);
      await setSession(t.access_token, t.refresh_token);
      closeAuthModal();
    } catch (e: any) {
      alert(e?.message ?? "Token inválido o expirado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-[#0C0C0C] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <button className="absolute right-3 top-3 p-2 rounded-lg hover:bg-white/10" onClick={closeAuthModal}>
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-lg border ${tab === "login" ? "bg-neon-cyan text-black border-neon-cyan" : "border-white/10"}`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 py-2 rounded-lg border ${tab === "register" ? "bg-neon-purple text-white border-neon-purple" : "border-white/10"}`}
          >
            Registro
          </button>
          <button
            onClick={() => setTab("verify")}
            className={`flex-1 py-2 rounded-lg border ${tab === "verify" ? "bg-neon-orange text-black border-neon-orange" : "border-white/10"}`}
            title="Pegar token de verificación (útil en dev)"
          >
            Verificar
          </button>
        </div>

        {tab === "login" && (
          <div className="space-y-3">
            <Input placeholder="Email" name="email" type="email" onChange={onChange} />
            <Input placeholder="Contraseña" name="password" type="password" onChange={onChange} />
            <button
              disabled={loading}
              onClick={handleLogin}
              className="w-full py-3 rounded-xl font-semibold bg-white text-black hover:bg-gray-200"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        )}

        {tab === "register" && (
          <div className="space-y-3">
            <Input placeholder="Usuario (opcional)" name="username" onChange={onChange} />
            <Input placeholder="Email" name="email" type="email" onChange={onChange} />
            <Input placeholder="Contraseña" name="password" type="password" onChange={onChange} />
            <button
              disabled={loading}
              onClick={handleRegister}
              className="w-full py-3 rounded-xl font-semibold bg-neon-purple text-white hover:opacity-90"
            >
              {loading ? "Creando cuenta..." : "Crear cuenta"}
            </button>
            <p className="text-xs text-muted-foreground">
              Te enviaremos un correo de verificación. En local, pega el token manualmente en la pestaña “Verificar”.
            </p>
          </div>
        )}

        {tab === "verify" && (
          <div className="space-y-3">
            <Input placeholder="Token de verificación" value={verifyToken} onChange={(e) => setVerifyToken(e.target.value)} />
            <button
              disabled={loading}
              onClick={handleVerify}
              className="w-full py-3 rounded-xl font-semibold bg-neon-orange text-black hover:opacity-90"
            >
              {loading ? "Verificando..." : "Verificar email"}
            </button>
            <p className="text-xs text-muted-foreground">
              Si tu proveedor de correo está en “dummy” en dev, copia el token desde logs/DB.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
