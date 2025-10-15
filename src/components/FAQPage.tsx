import { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Input } from "./ui/input";

interface FAQPageProps {
  onClose: () => void;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Conta' | 'Pagamentos' | 'Jogos' | 'Bônus';
}

export function FAQPage({ onClose }: FAQPageProps) {
  const [activeCategory, setActiveCategory] = useState<'Conta' | 'Pagamentos' | 'Jogos' | 'Bônus'>('Conta');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Como criar uma conta?',
      answer: "Para criar uma conta, clique no botão 'Cadastrar' no canto superior direito da página inicial. Preencha o formulário com suas informações pessoais e siga as instruções para concluir o processo. Certifique-se de fornecer informações precisas para evitar problemas futuros.",
      category: 'Conta'
    },
    {
      id: '2',
      question: 'Como verificar minha conta?',
      answer: 'Após criar sua conta, você receberá um email de verificação. Clique no link fornecido para verificar seu email. Em seguida, acesse sua conta e envie os documentos necessários (RG, CPF e comprovante de residência) na seção de verificação de conta.',
      category: 'Conta'
    },
    {
      id: '3',
      question: 'Esqueci minha senha. O que fazer?',
      answer: "Clique em 'Esqueceu a senha?' na tela de login. Digite seu email cadastrado e você receberá um link para redefinir sua senha. Siga as instruções no email para criar uma nova senha segura.",
      category: 'Conta'
    },
    {
      id: '4',
      question: 'Quais métodos de pagamento são aceitos?',
      answer: 'Aceitamos PIX (instantâneo), cartões de crédito/débito (Visa, Mastercard), transferência bancária e criptomoedas (Bitcoin, Ethereum, USDT). Cada método tem seus próprios limites e tempos de processamento.',
      category: 'Pagamentos'
    },
    {
      id: '5',
      question: 'Quanto tempo leva para processar um saque?',
      answer: 'PIX: instantâneo a 24h. Transferência bancária: 1-3 dias úteis. Criptomoedas: até 24h. O tempo pode variar dependendo da verificação de conta e volume de solicitações.',
      category: 'Pagamentos'
    },
    {
      id: '6',
      question: 'Existe valor mínimo para depósito?',
      answer: 'Sim, o depósito mínimo é de R$ 20,00 para PIX e transferência bancária, e R$ 50,00 para cartão de crédito. Não há depósito mínimo para criptomoedas, mas podem haver taxas de rede.',
      category: 'Pagamentos'
    },
    {
      id: '7',
      question: 'Como funcionam os jogos ao vivo?',
      answer: 'Nossos jogos ao vivo são transmitidos em tempo real de estúdios profissionais. Você joga com dealers reais através de streaming de vídeo HD. Basta selecionar o jogo desejado e você será conectado a uma mesa disponível.',
      category: 'Jogos'
    },
    {
      id: '8',
      question: 'Os jogos são justos?',
      answer: 'Sim! Todos os nossos jogos são certificados por auditores independentes e usam geradores de números aleatórios (RNG) certificados. Você pode verificar os certificados de cada provedor na página do jogo.',
      category: 'Jogos'
    },
    {
      id: '9',
      question: 'Posso jogar no celular?',
      answer: 'Sim! Nossa plataforma é totalmente responsiva e otimizada para dispositivos móveis. Você pode jogar em qualquer smartphone ou tablet sem necessidade de baixar aplicativos.',
      category: 'Jogos'
    },
    {
      id: '10',
      question: 'Como funcionam os bônus de boas-vindas?',
      answer: 'Novos jogadores recebem R$ 5.000 + 200 rodadas grátis no primeiro depósito. O bônus tem requisitos de aposta de 35x e é válido por 30 dias. As rodadas grátis são creditadas automaticamente em jogos selecionados.',
      category: 'Bônus'
    },
    {
      id: '11',
      question: 'Posso cancelar um bônus ativo?',
      answer: 'Sim, você pode cancelar um bônus ativo a qualquer momento através da seção "Meus Bônus" na sua conta. Ao cancelar, você perderá o saldo de bônus, mas manterá seus ganhos já convertidos.',
      category: 'Bônus'
    },
    {
      id: '12',
      question: 'Quais são os requisitos de aposta?',
      answer: 'Os requisitos de aposta variam por bônus. Geralmente são 35x o valor do bônus. Por exemplo, um bônus de R$ 100 requer R$ 3.500 em apostas antes de poder sacar. Verifique os termos específicos de cada promoção.',
      category: 'Bônus'
    }
  ];

  const categories: Array<'Conta' | 'Pagamentos' | 'Jogos' | 'Bônus'> = ['Conta', 'Pagamentos', 'Jogos', 'Bônus'];

  const filteredFaqs = faqs.filter(faq => 
    faq.category === activeCategory && 
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                <button className="text-sm text-white hover:text-white/80 transition">Ajuda</button>
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
        <div className="w-full max-w-[960px]">
          {/* Title */}
          <div className="p-4">
            <h1 className="text-[32px] leading-[40px] font-bold">Perguntas Frequentes</h1>
          </div>

          {/* Search */}
          <div className="px-4 py-3">
            <div className="flex items-center bg-[#242447] rounded-lg overflow-hidden h-12">
              <div className="px-4">
                <Search className="w-5 h-5 text-[#9494c7]" />
              </div>
              <input 
                type="text"
                placeholder="Pesquise por tópicos ou palavras-chave"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder:text-[#9494c7] px-2 py-2 w-full"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="pb-3 pt-0 px-4">
            <div className="border-b border-[#333366] pb-px">
              <div className="flex gap-8 px-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`py-4 text-sm font-bold transition-colors ${
                      activeCategory === category
                        ? 'text-white border-b-[3px] border-white'
                        : 'text-[#9494c7] hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="p-4">
            <Accordion type="single" collapsible className="space-y-3">
              {filteredFaqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="bg-[#121221] border border-[#333366] rounded-lg px-4 py-2"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-2">
                    <span className="text-sm font-medium text-white pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-0">
                    <p className="text-sm text-[#9494c7] leading-[21px]">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#9494c7]">Nenhuma pergunta encontrada.</p>
                <p className="text-[#9494c7] text-sm mt-2">Tente buscar por outros termos.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#333366] mt-12">
        <div className="max-w-[960px] mx-auto px-5 py-10">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
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
            <p className="text-[#9494c7]">© 2024 BravaBet. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
