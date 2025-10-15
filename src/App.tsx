import { useState, useEffect } from 'react';
import svgPaths from "./imports/svg-dqk6fjitf3";
import { RegisterModal } from "./components/RegisterModal";
import { LoginModal } from "./components/LoginModal";
import { DepositModal } from "./components/DepositModal";
import { WalletPage } from "./components/WalletPage";
import { FAQPage } from "./components/FAQPage";
import { TermsPage } from "./components/TermsPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { Wallet, Shield, Lock, CheckCircle2, Award, HeadphonesIcon, User, LogOut, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "./components/ui/dropdown-menu";
import { getCurrentUser, logout as logoutUser } from "./services/authService";
import { Toaster } from 'sonner@2.0.3';
import imgFortuneTigerBanner from "figma:asset/00d319459c0d5383e0c916fb3a62d66610a2803f.png";
import imgDepth7Frame0 from "figma:asset/3d8c02e234a19269ca1589bc3a0c0c1100856051.png";
import imgDepth7Frame1 from "figma:asset/8a3389b75f680b432552aa64c9723f1ae04bdf83.png";
import imgDepth7Frame2 from "figma:asset/1a5130d0661baf1f9bfe7249d8836ce5da73db7f.png";
import imgDepth7Frame3 from "figma:asset/6462732ac489f5e7e732853aa37055adf9bc654e.png";
import imgDepth7Frame4 from "figma:asset/1fda2145bd46d00c990aba4424bfd40d6031e037.png";
import imgDepth7Frame5 from "figma:asset/0aa6f04fae21469ef63b3b6382c6956843e0bdd1.png";
import imgDepth7Frame6 from "figma:asset/6f1333edb10f66c870b18eaf7139224e968b7dc7.png";
import imgDepth7Frame7 from "figma:asset/6c5151b0c7ac7985d18bc839793569c13839e6eb.png";
import imgDepth7Frame8 from "figma:asset/377191cc37a665bb0ec70413b0e6e7fa8c001ca2.png";
import imgDepth7Frame9 from "figma:asset/699395cbe2c1418de643532c71b7d10b7af368e4.png";
import imgDepth7Frame10 from "figma:asset/eaddfd9b29a012e33c4269bdb3d512601878f815.png";
import imgDepth7Frame11 from "figma:asset/bf87672fa4ec04653484f87995bec9a1cb9aa928.png";
import imgDepth7Frame12 from "figma:asset/2a94cc109aadaf4a41c1cb6cfb4c8ae689a6d864.png";
import imgDepth7Frame13 from "figma:asset/a48324423244a3891424237c2aa84596a3ab3320.png";
import imgDepth7Frame14 from "figma:asset/e0d5df07b37ae1ccd38744f21f72e5d63c2b0c87.png";
import imgDepth7Frame15 from "figma:asset/ed5948189c93aeb21742360f6813610a5c3365c8.png";
import imgDepth7Frame16 from "figma:asset/8824066a9058359ed4aa3073210276aa50f337f1.png";
import imgDepth7Frame17 from "figma:asset/8ad37ec38173b107263d6184c753d8aa6e4271eb.png";
import imgDepth7Frame18 from "figma:asset/99768b7600d8ba1e6f1b92c3004733ac0ec0fba1.png";
import imgDepth7Frame19 from "figma:asset/8b4cc32bf216a22351c6197295fe0d07283a5067.png";
import imgSweetBonanza from "figma:asset/356ac2c68aa3c0876929f78b3c266f819bdc1547.png";
import imgAviator from "figma:asset/5c7dc8fd5f40afca6716de057ac8a350d7c02b34.png";
import imgSpaceman from "figma:asset/e807da9157daf1b181cbc2fc73bed9ce26d64f1d.png";
import imgCrazyTime from "figma:asset/cb9a74ecafd6de242d6b376ecdd0055e0c9d6bd9.png";
import imgMonopoly from "figma:asset/b6aae0496d0f1a5329848ae1396775fa8cd38150.png";
import imgLightningRoulette from "figma:asset/cf1385ef92e412b225b88e788359213073c3648a.png";
import imgMegaBall from "figma:asset/bea51b979311440e0dd61fd0dcf2600169851835.png";
import imgSugarRush from "figma:asset/9a39923ba54fac67f1a6000877cc4ae7904f81c5.png";

export default function App() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showGameOffline, setShowGameOffline] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const banners = [
    imgFortuneTigerBanner,
    'https://images.unsplash.com/photo-1614907691085-f20a15126024?w=1200',
    'https://images.unsplash.com/photo-1749527175486-d37418187116?w=1200',
    'https://images.unsplash.com/photo-1561102427-0b1bb2138007?w=1200',
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  const games = [
    { id: 1, name: 'Fortune Tiger', provider: 'PG Soft', image: imgDepth7Frame0 },
    { id: 2, name: 'Gates of Olympus', provider: 'Pragmatic', image: imgDepth7Frame1 },
    { id: 3, name: 'Sweet Bonanza', provider: 'Pragmatic', image: imgSweetBonanza },
    { id: 4, name: 'Aviator', provider: 'Spribe', image: imgAviator },
    { id: 5, name: 'Spaceman', provider: 'Pragmatic', image: imgSpaceman },
    { id: 6, name: 'Crazy Time', provider: 'Evolution', image: imgCrazyTime },
    { id: 7, name: 'Monopoly Live', provider: 'Evolution', image: imgMonopoly },
    { id: 8, name: 'Lightning Roulette', provider: 'Evolution', image: imgLightningRoulette },
    { id: 9, name: 'Mega Ball', provider: 'Evolution', image: imgMegaBall },
    { id: 10, name: 'Sugar Rush', provider: 'Pragmatic', image: imgSugarRush },
  ];



  // Carrega usuário logado ao iniciar
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser({
        name: currentUser.name,
        email: currentUser.email
      });
    }
  }, []);

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    // Após login, abrir modal de depósito
    setShowLoginModal(false);
    setShowDepositModal(true);
  };

  const handleRegisterSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    // Após registro, abrir modal de depósito
    setShowRegisterModal(false);
    setShowDepositModal(true);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  const handleWalletClose = () => {
    setShowWallet(false);
  };

  const handleGameClick = (gameName: string) => {
    setSelectedGame(gameName);
    
    // Se não estiver logado, mostrar login
    if (!user) {
      setShowLoginModal(true);
    } else {
      // Se estiver logado, abrir modal de depósito
      setShowDepositModal(true);
    }
  };

  const handleDepositComplete = () => {
    setShowDepositModal(false);
    // Após depositar, mostrar mensagem de jogo offline
    if (selectedGame) {
      setShowGameOffline(true);
    }
  };

  if (showWallet) {
    return <WalletPage onClose={handleWalletClose} />;
  }

  if (showFAQ) {
    return <FAQPage onClose={() => setShowFAQ(false)} />;
  }

  if (showTerms) {
    return <TermsPage onClose={() => setShowTerms(false)} />;
  }

  if (showPrivacy) {
    return <PrivacyPage onClose={() => setShowPrivacy(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#121221] text-white">
      {/* Header */}
      <header className="border-b border-[#333366] sticky top-0 bg-[#121221]/95 backdrop-blur z-50">
        <div className="max-w-[1400px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <span className="text-3xl tracking-wide" style={{ fontFamily: "'Bebas Neue', 'Anton', sans-serif" }}>
                  BRAVA<span className="text-[#ffd700]">BET</span>
                </span>
              </div>
              
              {/* Nav */}
              <nav className="flex gap-8">
                <button className="text-sm hover:text-white/80 transition">Início</button>
                <button 
                  onClick={() => setShowFAQ(true)}
                  className="text-sm text-white/60 hover:text-white/80 transition"
                >
                  FAQ
                </button>
                <button 
                  onClick={() => setShowTerms(true)}
                  className="text-sm text-white/60 hover:text-white/80 transition"
                >
                  Termos
                </button>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Wallet Button */}
              <button 
                onClick={() => setShowWallet(true)}
                className="bg-[#242447] hover:bg-[#2d2d5a] p-2 rounded-lg transition flex items-center justify-center"
                title="Carteira"
              >
                <Wallet className="w-5 h-5" />
              </button>

              {/* User logged in or Login/Register buttons */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="bg-[#242447] hover:bg-[#2d2d5a] px-4 py-2 rounded-lg transition flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#1414b8] rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium">{user.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#242447] border-[#333366] text-white">
                    <DropdownMenuItem 
                      onClick={() => setShowWallet(true)}
                      className="cursor-pointer hover:bg-[#2d2d5a] focus:bg-[#2d2d5a]"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Carteira
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => alert('Perfil em desenvolvimento')}
                      className="cursor-pointer hover:bg-[#2d2d5a] focus:bg-[#2d2d5a]"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Meu Perfil
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[#333366]" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="cursor-pointer hover:bg-[#2d2d5a] focus:bg-[#2d2d5a] text-red-400"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <button 
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-[#1414b8] hover:bg-[#1a1ad0] px-6 py-2 rounded-lg text-sm font-bold transition"
                  >
                    Cadastrar
                  </button>
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="bg-[#242447] hover:bg-[#2d2d5a] px-6 py-2 rounded-lg text-sm font-bold transition"
                  >
                    Entrar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Banner Carousel */}
        <div className="relative h-[240px] rounded-lg overflow-hidden mb-8">
          <img 
            src={banners[currentBanner]} 
            alt="Banner" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-4xl font-bold mb-2">Bônus de Boas-Vindas</h2>
            <p className="text-lg mb-4">Ganhe até R$ 5.000 + 200 rodadas grátis</p>
            <button className="bg-[#1414b8] hover:bg-[#1a1ad0] px-6 py-3 rounded-lg font-bold transition">
              Cadastre-se Agora
            </button>
          </div>
          
          {/* Banner dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`h-2 rounded-full transition ${
                  idx === currentBanner ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Jogos Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => handleGameClick(game.name)}
                className="group rounded-xl overflow-hidden bg-[#1a1a2e] hover:scale-105 transition-transform"
              >
                <div className="relative h-36 overflow-hidden bg-[#1a1a2e] flex items-center justify-center p-2">
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="max-w-[90%] max-h-[90%] object-contain group-hover:scale-110 transition-transform duration-300 rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#1414b8] px-4 py-2 rounded-full font-bold text-sm">
                      Jogar
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold truncate">{game.name}</p>
                  <p className="text-[#9494c7] text-sm truncate">{game.provider}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Security Section */}
      <section className="bg-[#1a1a33] border-t border-[#333366] py-12">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Segurança e Confiabilidade</h2>
            <p className="text-[#9494c7]">Sua segurança é nossa prioridade</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Criptografia SSL */}
            <div className="bg-[#242447] rounded-lg p-6 text-center hover:bg-[#2d2d5a] transition">
              <div className="bg-[#1414b8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Criptografia SSL</h3>
              <p className="text-sm text-[#9494c7]">
                Todas as transações são protegidas com criptografia de 256 bits
              </p>
            </div>

            {/* Licença Certificada */}
            <div className="bg-[#242447] rounded-lg p-6 text-center hover:bg-[#2d2d5a] transition">
              <div className="bg-[#1414b8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Licença Certificada</h3>
              <p className="text-sm text-[#9494c7]">
                Operamos com licença oficial e regulamentação completa
              </p>
            </div>

            {/* Jogos Verificados */}
            <div className="bg-[#242447] rounded-lg p-6 text-center hover:bg-[#2d2d5a] transition">
              <div className="bg-[#1414b8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Jogos Verificados</h3>
              <p className="text-sm text-[#9494c7]">
                Todos os jogos são auditados e certificados para justiça
              </p>
            </div>

            {/* Suporte 24/7 */}
            <div className="bg-[#242447] rounded-lg p-6 text-center hover:bg-[#2d2d5a] transition">
              <div className="bg-[#1414b8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="w-8 h-8" />
              </div>
              <h3 className="font-bold mb-2">Suporte 24/7</h3>
              <p className="text-sm text-[#9494c7]">
                Equipe de suporte disponível a qualquer momento
              </p>
            </div>
          </div>

          {/* Seals and Certifications */}
          <div className="border-t border-[#333366] pt-8">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center gap-2 bg-[#242447] px-6 py-3 rounded-lg">
                <Shield className="w-6 h-6 text-green-500" />
                <div>
                  <p className="text-xs text-[#9494c7]">Certificado por</p>
                  <p className="font-bold text-sm">SSL Secure</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#242447] px-6 py-3 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-xs text-[#9494c7]">Jogos certificados</p>
                  <p className="font-bold text-sm">Fair Play</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#242447] px-6 py-3 rounded-lg">
                <Award className="w-6 h-6 text-yellow-500" />
                <div>
                  <p className="text-xs text-[#9494c7]">Pagamentos</p>
                  <p className="font-bold text-sm">100% Seguros</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#242447] px-6 py-3 rounded-lg">
                <Lock className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="text-xs text-[#9494c7]">Dados protegidos</p>
                  <p className="font-bold text-sm">LGPD Compliant</p>
                </div>
              </div>
            </div>
          </div>

          {/* Responsible Gaming */}
          <div className="mt-10 bg-[#242447] rounded-lg p-6 text-center">
            <h3 className="font-bold mb-2">Jogo Responsável</h3>
            <p className="text-sm text-[#9494c7] max-w-3xl mx-auto">
              Incentivamos o jogo responsável. Se você ou alguém que você conhece tem problemas com jogos de azar, 
              entre em contato com nosso suporte ou procure ajuda especializada. Apenas para maiores de 18 anos.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <span className="bg-[#1a1a33] px-4 py-2 rounded text-sm">+18</span>
              <span className="bg-[#1a1a33] px-4 py-2 rounded text-sm">Jogue com Responsabilidade</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0d1a] border-t border-[#333366] py-8">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About */}
            <div>
              <h4 className="font-bold mb-4">Sobre Nós</h4>
              <ul className="space-y-2 text-sm text-[#9494c7]">
                <li><a href="#" className="hover:text-white transition">Quem Somos</a></li>
                <li><button onClick={() => setShowTerms(true)} className="hover:text-white transition">Termos e Condições</button></li>
                <li><button onClick={() => setShowPrivacy(true)} className="hover:text-white transition">Política de Privacidade</button></li>
                <li><a href="#" className="hover:text-white transition">Jogo Responsável</a></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-bold mb-4">Ajuda</h4>
              <ul className="space-y-2 text-sm text-[#9494c7]">
                <li><button onClick={() => setShowFAQ(true)} className="hover:text-white transition">FAQ</button></li>
                <li><a href="#" className="hover:text-white transition">Suporte</a></li>
                <li><a href="#" className="hover:text-white transition">Como Depositar</a></li>
                <li><a href="#" className="hover:text-white transition">Como Sacar</a></li>
              </ul>
            </div>

            {/* Games */}
            <div>
              <h4 className="font-bold mb-4">Jogos</h4>
              <ul className="space-y-2 text-sm text-[#9494c7]">
                <li><a href="#" className="hover:text-white transition">Slots</a></li>
                <li><a href="#" className="hover:text-white transition">Crash Games</a></li>
                <li><a href="#" className="hover:text-white transition">Casino ao Vivo</a></li>
                <li><a href="#" className="hover:text-white transition">Megaways</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-sm text-[#9494c7]">
                <li>Email: suporte@bravabet.com</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#333366] pt-6 text-center text-sm text-[#9494c7]">
            <p>&copy; 2024 Brava Bet. Todos os direitos reservados.</p>
            <p className="mt-2">
              Este site é operado de forma segura e responsável. Jogue com responsabilidade. +18
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RegisterModal 
        open={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
        onRegisterSuccess={handleRegisterSuccess}
      />
      
      <LoginModal 
        open={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <DepositModal 
        open={showDepositModal}
        onClose={() => {
          setShowDepositModal(false);
          setSelectedGame('');
        }}
        onDepositComplete={handleDepositComplete}
      />

      {/* Game Offline Modal */}
      {showGameOffline && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a33] rounded-lg max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 bg-[#242447] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Jogo Temporariamente Indisponível</h2>
            <p className="text-[#9494c7] mb-6">
              O jogo <span className="text-white font-bold">{selectedGame}</span> está fora do ar no momento. 
              Nossa equipe está trabalhando para reestabelecê-lo o mais breve possível.
            </p>
            <p className="text-sm text-[#9494c7] mb-6">
              Tente outros jogos disponíveis ou volte mais tarde.
            </p>
            <button
              onClick={() => {
                setShowGameOffline(false);
                setSelectedGame('');
              }}
              className="w-full bg-[#1414b8] hover:bg-[#1a1ad0] py-3 rounded-lg font-bold transition"
            >
              Voltar aos Jogos
            </button>
          </div>
        </div>
      )}

      {/* Toaster for notifications */}
      <Toaster position="top-right" theme="dark" richColors />
    </div>
  );
}
