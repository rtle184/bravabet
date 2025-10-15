import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X } from 'lucide-react';
import { loginUser } from "../services/authService";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess: (userData: { name: string; email: string }) => void;
}

export function LoginModal({ open, onClose, onSwitchToRegister, onLoginSuccess }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Tenta fazer login
      const result = loginUser(formData.email, formData.password);

      if (result.success && result.user) {
        // Login bem-sucedido
        console.log('Login realizado:', result.user);
        
        // Chama callback com dados do usuário
        onLoginSuccess({
          name: result.user.name,
          email: result.user.email
        });
        
        // Fecha modal e limpa formulário
        onClose();
        setFormData({ email: '', password: '' });
        setErrors({});
      } else {
        // Erro no login
        setErrors({ password: result.message });
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#121221] border-[#333366] text-white max-w-[520px] p-0 gap-0">
        <DialogTitle className="sr-only">Bem-vindo de Volta</DialogTitle>
        <DialogDescription className="sr-only">
          Entre com suas credenciais para acessar sua conta
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333366]">
          <h2 className="text-2xl font-bold">Bem-vindo de Volta</h2>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <p className="text-center text-[#9494c7] text-sm">
            Entre com suas credenciais para acessar sua conta
          </p>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-white font-medium">
              Email
            </Label>
            <Input 
              id="login-email" 
              type="email" 
              placeholder="Digite seu email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`bg-[#242447] border-[#333366] text-white placeholder:text-[#9494c7] h-14 ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password" className="text-white font-medium">
                Senha
              </Label>
              <button
                type="button"
                onClick={() => alert('Recuperação de senha em breve!')}
                className="text-[#1414b8] text-sm hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>
            <Input 
              id="login-password" 
              type="password" 
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className={`bg-[#242447] border-[#333366] text-white placeholder:text-[#9494c7] h-14 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-[#1414b8] hover:bg-[#1a1ad0] h-12 text-base font-bold"
          >
            Entrar
          </Button>

          {/* Switch to Register */}
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-[#9494c7] hover:text-white text-sm transition-colors"
            >
              Não tem uma conta? <span className="text-[#1414b8] font-semibold">Cadastre-se</span>
            </button>
          </div>

          {/* 2FA Info */}
          <p className="text-xs text-[#9494c7] text-center">
            Autenticação de dois fatores (TOTP/SMS) disponível
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
