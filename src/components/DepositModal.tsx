import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { X, Wallet, CreditCard, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
  onDepositComplete: () => void;
}

export function DepositModal({ open, onClose, onDepositComplete }: DepositModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const depositOptions = [
    { value: 30, label: 'R$ 30', popular: false, stripeLink: 'https://buy.stripe.com/aFa8wQb5b5Ld38g5HWgYU05' },
    { value: 50, label: 'R$ 50', popular: true, stripeLink: 'https://buy.stripe.com/00w14o1uB3D5dMU9YcgYU06' },
    { value: 100, label: 'R$ 100', popular: false, stripeLink: 'https://buy.stripe.com/14A6oI2yF1uX8sA6M0gYU04' },
  ];

  const handleDeposit = () => {
    if (!selectedAmount) {
      toast.error('Por favor, selecione um valor para depositar');
      return;
    }

    const selectedOption = depositOptions.find(opt => opt.value === selectedAmount);
    if (!selectedOption) return;

    setIsProcessing(true);
    toast.success('Redirecionando para pagamento seguro...');
    
    setTimeout(() => {
      window.open(selectedOption.stripeLink, '_blank');
      setIsProcessing(false);
      onDepositComplete();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#121221] border-[#333366] text-white max-w-[520px] p-0 gap-0">
        <DialogTitle className="sr-only">Fazer Depósito</DialogTitle>
        <DialogDescription className="sr-only">
          Deposite fundos para jogar
        </DialogDescription>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#333366]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1414b8] rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">Fazer Depósito</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-[#9494c7] text-sm mb-2">
              Escolha o valor que deseja depositar
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-[#9494c7]">
              <CreditCard className="w-4 h-4" />
              <span>Pagamento via Cartão - Stripe</span>
            </div>
          </div>

          {/* Valores Disponíveis */}
          <div className="grid grid-cols-3 gap-3">
            {depositOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedAmount(option.value)}
                className={`relative p-6 rounded-xl border-2 transition-all ${
                  selectedAmount === option.value
                    ? 'bg-[#1414b8]/20 border-[#1414b8] scale-105'
                    : 'bg-[#242447] border-[#333366] hover:border-[#1414b8]/50 hover:scale-102'
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
                {selectedAmount === option.value && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-[#1414b8] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{option.label}</div>
                  <div className="text-xs text-[#9494c7]">Depósito</div>
                </div>
              </button>
            ))}
          </div>

          {/* Valor Selecionado */}
          {selectedAmount && (
            <div className="bg-[#1414b8]/10 border border-[#1414b8]/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-[#9494c7]">Valor selecionado:</span>
                <span className="text-xl font-bold">R$ {selectedAmount},00</span>
              </div>
            </div>
          )}

          {/* Informações */}
          <div className="bg-[#242447] rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-[#9494c7]">Pagamento seguro via Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-[#9494c7]">Crédito instantâneo após aprovação</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-[#9494c7]">Sem taxas adicionais</span>
            </div>
          </div>

          {/* Botão de Depósito */}
          <Button 
            onClick={handleDeposit}
            disabled={isProcessing || !selectedAmount}
            className="w-full bg-[#1414b8] hover:bg-[#1a1ad0] h-14 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              'Redirecionando...'
            ) : selectedAmount ? (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Pagar R$ {selectedAmount},00
              </>
            ) : (
              'Selecione um valor'
            )}
          </Button>

          {/* Nota de Segurança */}
          <p className="text-xs text-[#9494c7] text-center">
            🔒 Você será redirecionado para a página segura do Stripe
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
