import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X } from 'lucide-react';
import { registerUser, maskCPF, formatCPF } from "../services/authService";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onRegisterSuccess: (userData: { name: string; email: string }) => void;
}

export function RegisterModal({ open, onClose, onSwitchToLogin, onRegisterSuccess }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (formatCPF(formData.cpf).length !== 11) {
      newErrors.cpf = 'CPF deve ter 11 dígitos';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Tenta registrar o usuário
      const result = registerUser({
        name: formData.name,
        email: formData.email,
        cpf: formData.cpf,
        password: formData.password
      });

      if (result.success && result.user) {
        // Cadastro bem-sucedido
        console.log('Cadastro realizado:', result.user);
        
        // Chama callback com dados do usuário
        onRegisterSuccess({
          name: result.user.name,
          email: result.user.email
        });
        
        // Fecha modal e limpa formulário
        onClose();
        setFormData({ name: '', email: '', cpf: '', password: '', confirmPassword: '' });
        setErrors({});
      } else {
        // Erro no cadastro (email ou CPF já existe)
        if (result.message.includes('email')) {
          setErrors({ email: result.message });
        } else if (result.message.includes('CPF')) {
          setErrors({ cpf: result.message });
        } else {
          setErrors({ general: result.message });
        }
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    // Aplica máscara no CPF
    if (field === 'cpf') {
      const formatted = maskCPF(value);
      setFormData(prev => ({ ...prev, [field]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Limpa o erro do campo quando o usuário começa a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#121221] border-[#333366] text-white max-w-[520px] p-0 gap-0">
        <DialogTitle className="sr-only">Criar Conta</DialogTitle>
        <DialogDescription className="sr-only">
          Cadastre-se e ganhe R$ 5.000 + 200 rodadas grátis
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333366]">
          <h2 className="text-2xl font-bold">Criar Conta</h2>
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
            Cadastre-se e ganhe R$ 5.000 + 200 rodadas grátis
          </p>

          {/* Erro Geral */}
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-3">
              <p className="text-red-500 text-sm text-center">{errors.general}</p>
            </div>
          )}

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="register-name" className="text-white font-medium">
              Nome Completo
            </Label>
            <Input 
              id="register-name" 
              type="text" 
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`bg-[#242447] border-[#333366] text-white placeholder:text-[#9494c7] h-14 ${
                errors.name ? 'border-red-500' : ''
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-white font-medium">
              Email
            </Label>
            <Input 
              id="register-email" 
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

          {/* CPF */}
          <div className="space-y-2">
            <Label htmlFor="register-cpf" className="text-white font-medium">
              CPF
            </Label>
            <Input 
              id="register-cpf" 
              type="text" 
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
              maxLength={14}
              className={`bg-[#242447] border-[#333366] text-white placeholder:text-[#9494c7] h-14 ${
                errors.cpf ? 'border-red-500' : ''
              }`}
            />
            {errors.cpf && (
              <p className="text-red-500 text-sm">{errors.cpf}</p>
            )}
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-white font-medium">
              Senha
            </Label>
            <Input 
              id="register-password" 
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

          {/* Confirmar Senha */}
          <div className="space-y-2">
            <Label htmlFor="register-confirm-password" className="text-white font-medium">
              Confirmar Senha
            </Label>
            <Input 
              id="register-confirm-password" 
              type="password" 
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className={`bg-[#242447] border-[#333366] text-white placeholder:text-[#9494c7] h-14 ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            className="w-full bg-[#1414b8] hover:bg-[#1a1ad0] h-12 text-base font-bold"
          >
            Criar Conta
          </Button>

          {/* Switch to Login */}
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#9494c7] hover:text-white text-sm transition-colors"
            >
              Já tem uma conta? <span className="text-[#1414b8] font-semibold">Faça login</span>
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-[#9494c7] text-center">
            Ao se cadastrar, você concorda com nossos{' '}
            <a href="#" className="text-[#1414b8] hover:underline">Termos de Serviço</a>
            {' '}e{' '}
            <a href="#" className="text-[#1414b8] hover:underline">Política de Privacidade</a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
