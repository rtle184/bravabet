import { useState } from 'react';
import { X, FileText, Gift, CreditCard, Wallet as WalletIcon, Shield } from 'lucide-react';

interface TermsPageProps {
  onClose: () => void;
}

export function TermsPage({ onClose }: TermsPageProps) {
  const [activeSection, setActiveSection] = useState<string>('regras');

  const sections = [
    { id: 'regras', label: 'Regras de Aposta', icon: FileText },
    { id: 'bonus', label: 'Bônus', icon: Gift },
    { id: 'depositos', label: 'Depósitos', icon: CreditCard },
    { id: 'saques', label: 'Saques', icon: WalletIcon },
    { id: 'privacidade', label: 'Privacidade', icon: Shield }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121221] text-white">
      {/* Header */}
      <header className="border-b border-[#333366] sticky top-0 bg-[#121221]/95 backdrop-blur z-50">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-3xl tracking-wide" style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif" }}>
                  BRAVA<span className="text-[#ffd700]">BET</span>
                </span>
              </div>
              
              <nav className="flex gap-8">
                <button onClick={onClose} className="text-sm hover:text-white/80 transition">Início</button>
                <button className="text-sm text-white hover:text-white/80 transition">Legal</button>
              </nav>
            </div>

            <button 
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center px-8 py-5">
        <div className="w-full max-w-[1280px] flex gap-1">
          {/* Sidebar */}
          <aside className="w-[320px] shrink-0">
            <div className="bg-[#1a1a2e] rounded-lg p-4 sticky top-24">
              <div className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-[#242447] text-white'
                          : 'text-[#9494c7] hover:bg-[#242447]/50 hover:text-white'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 max-w-[960px]">
            {/* Title */}
            <div className="p-4 mb-4">
              <h1 className="text-[32px] leading-[40px] font-bold">Termos e Condições</h1>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {/* Regras de Aposta */}
              <section id="regras" className="bg-[#1a1a2e] rounded-lg p-6">
                <h2 className="text-[18px] font-bold mb-3">Regras de Aposta</h2>
                <p className="text-[#9494c7] leading-[24px]">
                  Ao utilizar a plataforma BravaBet, você concorda em cumprir todas as regras de aposta estabelecidas. 
                  As apostas devem ser feitas de acordo com as probabilidades e limites definidos para cada evento. 
                  A BravaBet reserva-se o direito de cancelar apostas em caso de erro nas probabilidades ou outras 
                  circunstâncias imprevistas.
                  <br /><br />
                  Todas as apostas são finais e não podem ser alteradas ou canceladas após a confirmação. Os resultados 
                  são determinados com base nas informações oficiais fornecidas pelos provedores de jogos. Em caso de 
                  disputa, a decisão da BravaBet é final e vinculativa.
                  <br /><br />
                  É proibido o uso de múltiplas contas, apostas fraudulentas ou qualquer outra forma de manipulação 
                  do sistema. Violações dessas regras podem resultar no cancelamento de apostas, confisco de ganhos 
                  e encerramento permanente da conta.
                </p>
              </section>

              {/* Bônus */}
              <section id="bonus" className="bg-[#1a1a2e] rounded-lg p-6">
                <h2 className="text-[18px] font-bold mb-3">Bônus</h2>
                <p className="text-[#9494c7] leading-[24px]">
                  Os bônus oferecidos pela BravaBet estão sujeitos a termos e condições específicas, incluindo 
                  requisitos de aposta e prazos de validade. Os jogadores devem ler atentamente os termos de cada 
                  bônus antes de ativá-lo. A BravaBet pode alterar ou cancelar promoções a qualquer momento.
                  <br /><br />
                  Cada bônus possui requisitos de apostas (rollover) que devem ser cumpridos antes que os ganhos 
                  possam ser sacados. Geralmente, o requisito é de 35x o valor do bônus. Por exemplo, um bônus de 
                  R$ 100 requer R$ 3.500 em apostas antes de liberar o saque.
                  <br /><br />
                  Os bônus não podem ser transferidos entre contas e são válidos apenas para o jogador que os recebeu. 
                  Qualquer tentativa de abuso do sistema de bônus resultará no cancelamento do bônus e possível 
                  encerramento da conta.
                </p>
              </section>

              {/* Depósitos */}
              <section id="depositos" className="bg-[#1a1a2e] rounded-lg p-6">
                <h2 className="text-[18px] font-bold mb-3">Depósitos</h2>
                <p className="text-[#9494c7] leading-[24px]">
                  Os depósitos na BravaBet podem ser feitos através de diversos métodos de pagamento, sujeitos a 
                  limites mínimos e máximos. A BravaBet não se responsabiliza por atrasos ou problemas causados por 
                  provedores de pagamento. Os jogadores devem garantir que os fundos depositados sejam de origem legal.
                  <br /><br />
                  <strong className="text-white">Métodos aceitos:</strong> PIX (instantâneo), Cartões de crédito/débito 
                  (Visa, Mastercard), Transferência bancária, Criptomoedas (Bitcoin, Ethereum, USDT).
                  <br /><br />
                  <strong className="text-white">Limites:</strong> Depósito mínimo de R$ 20,00 para PIX e transferência, 
                  R$ 50,00 para cartão de crédito. Não há limite máximo, mas depósitos acima de R$ 10.000,00 podem 
                  requerer verificação adicional de identidade.
                  <br /><br />
                  Os fundos depositados ficam disponíveis imediatamente na maioria dos casos. Transações com cartão 
                  podem levar até 24 horas para processamento.
                </p>
              </section>

              {/* Saques */}
              <section id="saques" className="bg-[#1a1a2e] rounded-lg p-6">
                <h2 className="text-[18px] font-bold mb-3">Saques</h2>
                <p className="text-[#9494c7] leading-[24px]">
                  Os saques na BravaBet estão sujeitos a verificação de identidade e podem ter limites mínimos e 
                  máximos. O tempo de processamento pode variar dependendo do método de pagamento escolhido. 
                  A BravaBet reserva-se o direito de recusar ou atrasar saques em caso de suspeita de fraude ou 
                  outras irregularidades.
                  <br /><br />
                  <strong className="text-white">Tempos de processamento:</strong> PIX (instantâneo a 24h), 
                  Transferência bancária (1-3 dias úteis), Criptomoedas (até 24h).
                  <br /><br />
                  <strong className="text-white">Limites:</strong> Saque mínimo de R$ 50,00. Limite diário de 
                  R$ 20.000,00 e mensal de R$ 100.000,00. Limites maiores podem ser negociados para clientes VIP.
                  <br /><br />
                  Antes do primeiro saque, é obrigatória a verificação de identidade através do envio de documentos 
                  (RG/CNH e comprovante de residência). Todos os saques devem ser feitos para contas em nome do 
                  titular da conta BravaBet.
                </p>
              </section>

              {/* Privacidade */}
              <section id="privacidade" className="bg-[#1a1a2e] rounded-lg p-6">
                <h2 className="text-[18px] font-bold mb-3">Privacidade</h2>
                <p className="text-[#9494c7] leading-[24px]">
                  A BravaBet compromete-se a proteger a privacidade dos seus jogadores. Os dados pessoais são 
                  coletados e processados de acordo com a Lei Geral de Proteção de Dados (LGPD) e nossa política 
                  de privacidade. Os jogadores têm o direito de acessar, corrigir ou excluir seus dados pessoais.
                  <br /><br />
                  <strong className="text-white">Dados coletados:</strong> Nome completo, CPF, email, telefone, 
                  endereço, dados de pagamento, histórico de transações e atividades na plataforma.
                  <br /><br />
                  <strong className="text-white">Uso dos dados:</strong> Verificação de identidade, processamento 
                  de transações, prevenção de fraudes, comunicação com o jogador, cumprimento de obrigações legais.
                  <br /><br />
                  Seus dados nunca serão vendidos a terceiros. Podemos compartilhar informações apenas com 
                  processadores de pagamento, órgãos reguladores e autoridades legais quando exigido por lei. 
                  Utilizamos criptografia SSL para proteger todas as transmissões de dados.
                  <br /><br />
                  Para exercer seus direitos de privacidade ou solicitar a exclusão de dados, entre em contato 
                  através do email: privacidade@bravabet.com
                </p>
              </section>
            </div>

            {/* Footer Info */}
            <div className="mt-8 p-6 bg-[#1a1a2e] rounded-lg border border-[#333366]">
              <p className="text-[#9494c7] text-sm leading-[21px]">
                <strong className="text-white">Última atualização:</strong> 15 de outubro de 2025
                <br /><br />
                Ao utilizar a plataforma BravaBet, você concorda com todos os termos e condições aqui estabelecidos. 
                A BravaBet reserva-se o direito de modificar estes termos a qualquer momento. As alterações entram 
                em vigor imediatamente após a publicação. Recomendamos que você revise esta página regularmente.
                <br /><br />
                Para dúvidas ou esclarecimentos sobre estes termos, entre em contato com nosso suporte através do 
                chat ao vivo ou email: suporte@bravabet.com
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#333366] mt-12">
        <div className="max-w-[1280px] mx-auto px-8 py-10">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <a href="#" className="text-[#9494c7] hover:text-white transition text-center min-w-[160px]">
              Termos de Serviço
            </a>
            <a href="#" className="text-[#9494c7] hover:text-white transition text-center">
              Política de Privacidade
            </a>
            <a href="#" className="text-[#9494c7] hover:text-white transition text-center min-w-[160px]">
              Jogo Responsável
            </a>
          </div>
          <div className="text-center">
            <p className="text-[#9494c7]">© 2025 BravaBet. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
