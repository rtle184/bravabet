import { X } from 'lucide-react';

interface PrivacyPageProps {
  onClose: () => void;
}

export function PrivacyPage({ onClose }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-[#121221] text-white">
      {/* Header */}
      <header className="border-b border-[#e5e8eb]/10 sticky top-0 bg-[#121221]/95 backdrop-blur z-50">
        <div className="max-w-[1400px] mx-auto px-10 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-3xl tracking-wide" style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif" }}>
                  BRAVA<span className="text-[#ffd700]">BET</span>
                </span>
              </div>
              
              <nav className="flex gap-9">
                <button onClick={onClose} className="text-sm font-medium hover:text-white/80 transition">Jogos</button>
                <button className="text-sm font-medium hover:text-white/80 transition">Promoções</button>
                <button className="text-sm font-medium hover:text-white/80 transition">VIP</button>
                <button className="text-sm font-medium hover:text-white/80 transition">Sobre nós</button>
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
      <main className="flex justify-center px-40 py-5">
        <div className="w-full max-w-[960px]">
          {/* Title */}
          <div className="p-4 mb-3">
            <h1 className="text-[32px] leading-[40px] font-bold">Política de Privacidade</h1>
          </div>

          {/* Introdução */}
          <div className="pb-2 pt-4 px-4">
            <h2 className="text-[18px] leading-[23px] font-bold mb-3">Introdução</h2>
            <p className="text-[16px] leading-[24px] text-white">
              Bem-vindo ao BravaBet. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais. Estamos comprometidos em proteger sua privacidade e garantir que suas informações sejam tratadas com segurança e em conformidade com as leis de proteção de dados, incluindo a Lei Geral de Proteção de Dados (LGPD) e o Regulamento Geral de Proteção de Dados (GDPR).
            </p>
          </div>

          {/* Informações que Coletamos */}
          <div className="pb-2 pt-4 px-4">
            <h2 className="text-[18px] leading-[23px] font-bold mb-3">Informações que Coletamos</h2>
            <p className="text-[16px] leading-[24px] text-white mb-3">
              Coletamos vários tipos de informações para fornecer e melhorar nossos serviços. As informações que coletamos incluem:
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Informações de Registro: Nome, endereço de e-mail, data de nascimento, número de telefone e outras informações de contato.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Informações de Transação: Detalhes de depósitos, saques e apostas realizadas.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Informações de Uso: Dados sobre como você usa nosso site e aplicativos, incluindo páginas visitadas, jogos jogados e tempo gasto.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Informações Técnicas: Endereço IP, tipo de dispositivo, sistema operacional e informações do navegador.
                </p>
              </div>
            </div>
          </div>

          {/* Como Usamos Suas Informações */}
          <div className="pb-2 pt-4 px-4">
            <h2 className="text-[18px] leading-[23px] font-bold mb-3">Como Usamos Suas Informações</h2>
            <p className="text-[16px] leading-[24px] text-white mb-3">
              Usamos suas informações para os seguintes propósitos:
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Fornecer e Gerenciar Serviços: Gerenciar sua conta, processar transações e fornecer suporte ao cliente.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Melhorar Nossos Serviços: Analisar o uso do site para melhorar a experiência do usuário e desenvolver novos recursos.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Comunicações de Marketing: Enviar e-mails promocionais e informações sobre ofertas especiais (com seu consentimento).
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Segurança e Conformidade: Detectar e prevenir fraudes, cumprir obrigações legais e regulatórias.
                </p>
              </div>
            </div>
          </div>

          {/* Compartilhamento de Informações */}
          <div className="pb-2 pt-4 px-4">
            <h2 className="text-[18px] leading-[23px] font-bold mb-3">Compartilhamento de Informações</h2>
            <p className="text-[16px] leading-[24px] text-white mb-3">
              Podemos compartilhar suas informações com terceiros nas seguintes circunstâncias:
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Provedores de Serviços: Empresas que nos ajudam a fornecer serviços, como processamento de pagamentos e análise de dados.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Autoridades Legais: Quando exigido por lei ou para proteger nossos direitos e segurança.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Parceiros de Marketing: Com seu consentimento, para enviar comunicações promocionais.
                </p>
              </div>
            </div>
          </div>

          {/* Segurança de Dados */}
          <div className="pb-2 pt-4 px-4">
            <h2 className="text-[18px] leading-[23px] font-bold mb-3">Segurança de Dados</h2>
            <p className="text-[16px] leading-[24px] text-white">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações contra acesso não autorizado, uso indevido ou divulgação. Usamos criptografia, controles de acesso e outras medidas de segurança para proteger seus dados.
            </p>
          </div>

          {/* Seus Direitos */}
          <div className="pb-2 pt-4 px-4">
            <h2 className="text-[18px] leading-[23px] font-bold mb-3">Seus Direitos</h2>
            <p className="text-[16px] leading-[24px] text-white mb-3">
              Você tem os seguintes direitos em relação às suas informações pessoais:
            </p>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Acesso: Solicitar acesso às informações pessoais que temos sobre você.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Correção: Solicitar a correção de informações imprecisas ou incompletas.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Exclusão: Solicitar a exclusão de suas informações pessoais, sujeito a certas condições.
                </p>
              </div>
              
              <div className="flex gap-3 items-start py-3">
                <div className="w-5 h-5 border-2 border-[#333366] rounded shrink-0 mt-0.5" />
                <p className="text-[16px] leading-[24px] text-white">
                  Portabilidade: Solicitar a transferência de suas informações para outra organização.
                </p>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="pb-6 pt-4 px-4">
            <h2 className="text-[18px] leading-[23px] font-bold mb-3">Contato</h2>
            <p className="text-[16px] leading-[24px] text-white">
              Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos, entre em contato conosco através do email: <span className="text-[#ffd700]">privacidade@bravabet.com</span> ou através do nosso chat de suporte disponível 24/7.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#333366] mt-12">
        <div className="max-w-[960px] mx-auto px-5 py-10">
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            <a href="#" className="text-[#9494c7] hover:text-white transition text-center min-w-[160px]">
              Termos de Serviço
            </a>
            <a href="#" className="text-[#9494c7] hover:text-white transition text-center min-w-[160px]">
              Política de Privacidade
            </a>
            <a href="#" className="text-[#9494c7] hover:text-white transition text-center min-w-[160px]">
              Jogo Responsável
            </a>
          </div>
          <div className="text-center">
            <p className="text-[#9494c7]">© 2024 BravaBet. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
