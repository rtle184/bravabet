import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { X, Loader2, Check } from 'lucide-react';
import svgPaths from "../imports/svg-yejns83z2f";
import { toast } from "sonner@2.0.3";

interface Transaction {
  id: string;
  date: string;
  type: 'Depósito';
  method: 'Cartão';
  amount: number;
  status: 'Concluído' | 'Pendente' | 'Cancelado';
}

interface WalletPageProps {
  onClose: () => void;
}

export function WalletPage({ onClose }: WalletPageProps) {
  const [balance, setBalance] = useState(0);
  const [selectedDepositAmount, setSelectedDepositAmount] = useState<number | null>(null);
  const [showDepositHistory, setShowDepositHistory] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const depositOptions = [
    { value: 30, label: 'R$ 30', popular: false, stripeLink: 'https://buy.stripe.com/aFa8wQb5b5Ld38g5HWgYU05' },
    { value: 50, label: 'R$ 50', popular: true, stripeLink: 'https://buy.stripe.com/00w14o1uB3D5dMU9YcgYU06' },
    { value: 100, label: 'R$ 100', popular: false, stripeLink: 'https://buy.stripe.com/14A6oI2yF1uX8sA6M0gYU04' },
  ];

  const handleDeposit = () => {
    if (!selectedDepositAmount) {
      toast.error('Por favor, selecione um valor para depositar');
      return;
    }

    const selectedOption = depositOptions.find(opt => opt.value === selectedDepositAmount);
    if (!selectedOption) return;

    setIsProcessing(true);
    toast.success('Redirecionando para pagamento seguro...');
    
    setTimeout(() => {
      window.open(selectedOption.stripeLink, '_blank');
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#121221] text-white">
      {/* Header */}
      <header className="border-b border-[#333366] sticky top-0 bg-[#121221]/95 backdrop-blur z-50">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-2xl tracking-wide" style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif" }}>
                  BRAVA<span className="text-[#ffd700]">BET</span>
                </span>
              </div>
              
              <nav className="flex gap-8">
                <button onClick={onClose} className="text-sm hover:text-white/80 transition">Início</button>
                <button className="text-sm hover:text-white/80 transition">Jogos</button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-[#242447] p-2 rounded-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20">
                  <path clipRule="evenodd" d={svgPaths.p2b76e080} fill="white" fillRule="evenodd" />
                </svg>
              </button>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#242447] flex items-center justify-center">
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[960px] mx-auto px-8 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Carteira</h1>
          <p className="text-[#9494c7]">Gerencie seu saldo, depósitos e saques.</p>
        </div>

        {/* Balance Card */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Saldo</h2>
          <div className="bg-[#242447] p-6 rounded-lg">
            <p className="text-base mb-2">Saldo Disponível</p>
            <p className="text-2xl font-bold">R$ {balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Deposit Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Depósito via Cartão</h2>
          <p className="text-[#9494c7] text-sm mb-4">Escolha o valor que deseja depositar</p>
          
          {/* Valores Disponíveis */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {depositOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedDepositAmount(option.value)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  selectedDepositAmount === option.value
                    ? 'bg-[#1414b8]/20 border-[#1414b8] scale-105'
                    : 'bg-[#242447] border-[#333366] hover:border-[#1414b8]/50'
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                    🔥
                  </div>
                )}
                {selectedDepositAmount === option.value && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-[#1414b8] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-xl font-bold">{option.label}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 mb-4">
            <Button 
              className="flex-1 bg-[#1414b8] hover:bg-[#1a1ad0] h-12"
              disabled={isProcessing || !selectedDepositAmount}
              onClick={handleDeposit}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : selectedDepositAmount ? (
                <>💳 Pagar R$ {selectedDepositAmount},00</>
              ) : (
                'Selecione um valor'
              )}
            </Button>
            <Button 
              variant="outline"
              className="bg-[#242447] border-[#333366] hover:bg-[#2d2d5a] text-white"
              onClick={() => setShowDepositHistory(true)}
            >
              Histórico
            </Button>
          </div>

          {/* Info Stripe */}
          <div className="bg-[#1414b8]/10 border border-[#1414b8]/30 rounded-lg p-3">
            <p className="text-xs text-[#9494c7] text-center">
              🔒 Pagamento seguro via Stripe - Você será redirecionado para completar o pagamento
            </p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4">Histórico de Transações</h2>
          <div className="border border-[#333366] rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="bg-[#1a1a33] grid grid-cols-5 gap-4 p-4">
              <div className="font-medium">Data</div>
              <div className="font-medium">Tipo</div>
              <div className="font-medium">Método</div>
              <div className="font-medium">Valor</div>
              <div className="font-medium">Status</div>
            </div>

            {/* Table Body */}
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="grid grid-cols-5 gap-4 p-4 border-t border-[#e5e8eb]/10 items-center"
                >
                  <div className="text-[#9494c7] text-sm">{transaction.date}</div>
                  <div className="text-[#9494c7] text-sm">{transaction.type}</div>
                  <div className="text-[#9494c7] text-sm">{transaction.method}</div>
                  <div className="text-[#9494c7] text-sm">R$ {transaction.amount.toFixed(2)}</div>
                  <div>
                    <span className="bg-[#242447] px-4 py-1 rounded text-sm">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center border-t border-[#e5e8eb]/10">
                <p className="text-[#9494c7]">Nenhuma transação encontrada</p>
                <p className="text-[#9494c7] text-sm mt-2">Faça seu primeiro depósito para começar</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Deposit History Modal */}
      <Dialog open={showDepositHistory} onOpenChange={setShowDepositHistory}>
        <DialogContent className="bg-[#121221] border-[#333366] text-white max-w-[720px]">
          <DialogTitle>Histórico de Depósitos</DialogTitle>
          <DialogDescription className="text-[#9494c7]">
            Veja todos os seus depósitos realizados
          </DialogDescription>

          <div className="mt-4 max-h-[400px] overflow-y-auto">
            {transactions.filter(t => t.type === 'Depósito').length > 0 ? (
              transactions.filter(t => t.type === 'Depósito').map((transaction) => (
                <div key={transaction.id} className="border-b border-[#333366] py-4 flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium">{transaction.method}</p>
                    <p className="text-sm text-[#9494c7]">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">R$ {transaction.amount.toFixed(2)}</p>
                    <p className="text-sm text-[#9494c7]">{transaction.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-[#9494c7]">Nenhum depósito realizado ainda</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
