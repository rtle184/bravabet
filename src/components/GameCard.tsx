interface GameCardProps {
  id: number;
  name: string;
  provider: string;
  image: string;
  onPlay: (name: string) => void;
  isNew?: boolean;
  hasJackpot?: boolean;
}

export function GameCard({ name, provider, image, onPlay, isNew, hasJackpot }: GameCardProps) {
  return (
    <button
      onClick={() => onPlay(name)}
      className="group relative rounded-[8px] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative h-[135px] w-full overflow-hidden rounded-t-[8px] bg-[#1a1a2e] flex items-center justify-center p-2">
        <img 
          alt={name} 
          className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-500 group-hover:scale-110" 
          src={image} 
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#1414b8] px-6 py-2 rounded-full transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <span className="font-['Space_Grotesk:Bold',_sans-serif] font-bold text-white text-sm">
                Jogar Agora
              </span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isNew && (
            <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] px-2 py-1 rounded text-xs font-bold text-white shadow-lg">
              NOVO
            </div>
          )}
          {hasJackpot && (
            <div className="bg-gradient-to-r from-[#ffd700] to-[#ffed4e] px-2 py-1 rounded text-xs font-bold text-black shadow-lg">
              JACKPOT
            </div>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="bg-[#1a1a2e] p-3 rounded-b-[8px] transition-colors duration-300 group-hover:bg-[#242447]">
        <p className="font-['Space_Grotesk:Medium',_sans-serif] font-medium leading-[24px] text-[16px] text-white text-left truncate">
          {name}
        </p>
        <p className="font-['Space_Grotesk:Regular',_sans-serif] font-normal leading-[21px] text-[#9494c7] text-[14px] text-left truncate">
          {provider}
        </p>
      </div>
    </button>
  );
}
