import React from 'react';
import { CharacterId, CharacterExpression } from '../types/game';

interface CharacterStageProps {
  speaker: CharacterId;
  alexExpression?: CharacterExpression;
  novaExpression?: CharacterExpression;
  irisExpression?: CharacterExpression;
  glitchExpression?: CharacterExpression;
  glitchDefeated?: boolean;
  showAlex?: boolean;
  showNova?: boolean;
  showIris?: boolean;
  showGlitch?: boolean;
}

export const CharacterStage: React.FC<CharacterStageProps> = ({
  speaker,
  alexExpression = 'neutral',
  novaExpression = 'confident',
  irisExpression = 'smile',
  glitchExpression = 'sneaky',
  glitchDefeated = false,
  showAlex = true,
  showNova = false,
  showIris = false,
  showGlitch = false,
}) => {
  const getAlexImage = (expr: CharacterExpression) => {
    switch (expr) {
      case 'sleepy': return './assets/characters/alex_sleepy.png';
      case 'worried': return './assets/characters/alex_worried.png';
      case 'thinking': return './assets/characters/alex_thinking.png';
      case 'determined': return './assets/characters/alex_determined.png';
      case 'confused': return './assets/characters/alex_confused.png';
      default: return './assets/characters/alex_neutral.png';
    }
  };

  const getNovaImage = (expr: CharacterExpression) => {
    switch (expr) {
      case 'smile': return './assets/characters/nova_smile.png';
      case 'thinking': return './assets/characters/nova_thinking.png';
      case 'explain': return './assets/characters/nova_explain.png';
      case 'celebrate': return './assets/characters/nova_celebrate.png';
      case 'neutral': return './assets/characters/nova_neutral.png';
      default: return './assets/characters/nova_confident.png';
    }
  };

  const getIrisImage = (expr: CharacterExpression) => {
    switch (expr) {
      case 'smile': return './assets/characters/iris_smile.png';
      case 'thinking': return './assets/characters/iris_thinking.png';
      case 'explain': return './assets/characters/iris_explain.png';
      case 'encourage': return './assets/characters/iris_encourage.png';
      case 'celebrate': return './assets/characters/iris_celebrate.png';
      default: return './assets/characters/iris_neutral.png';
    }
  };

  const getGlitchImage = (expr: CharacterExpression) => {
    switch (expr) {
      case 'laugh': return './assets/characters/glitch_laugh.png';
      case 'sneaky': return './assets/characters/glitch_sneaky.png';
      case 'defeated': return './assets/characters/glitch_defeated.png';
      case 'angry': return './assets/characters/glitch_angry.png';
      case 'shocked': return './assets/characters/glitch_shocked.png';
      default: return './assets/characters/glitch_neutral.png';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex items-end justify-between px-16 pb-28 select-none z-10">
      {/* ALEX */}
      {showAlex && (
        <div 
          className={`relative transition-all duration-500 ease-out transform ${
            speaker === 'alex' ? 'scale-105 opacity-100 z-20' : 'scale-95 opacity-65 z-10'
          }`}
        >
          <div className="relative group flex flex-col items-center">
            <div className="relative w-72 h-[480px] flex items-end justify-center filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
              <img 
                src="./assets/characters/alex_sprite.png" 
                alt="Alex" 
                className="max-h-full object-contain filter drop-shadow-[0_0_12px_rgba(23,27,53,0.8)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/characters/alex_full.png';
                }}
              />
              <div className="absolute top-8 -right-4 w-16 h-16 rounded-full border-2 border-violet bg-midnight/90 overflow-hidden shadow-lg p-0.5 animate-pulse-glow">
                <img 
                  src={getAlexImage(alexExpression)} 
                  alt={alexExpression} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="mt-2 px-4 py-1 rounded bg-midnight/90 border border-violet/50 text-xs font-heading font-bold text-cream flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-violet" />
              <span>ALEX</span>
              <span className="text-[10px] text-cream/50 font-normal">| The Player</span>
            </div>
          </div>
        </div>
      )}

      {/* GLITCH */}
      {showGlitch && (
        <div 
          className={`absolute top-24 right-1/4 transition-all duration-700 ease-out transform ${
            glitchDefeated 
              ? 'scale-25 opacity-20 translate-y-36 rotate-45' 
              : speaker === 'glitch' 
                ? 'scale-110 opacity-100 z-30 animate-bounce' 
                : 'scale-90 opacity-75 z-10 animate-float'
          }`}
        >
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-4 rounded-full bg-purple-600/30 blur-xl animate-pulse" />
            
            <div className="relative w-44 h-40 flex items-center justify-center">
              <img 
                src="./assets/characters/glitch_sprite.png" 
                alt="Glitch" 
                className="max-h-full object-contain filter drop-shadow-[0_0_15px_rgba(156,39,176,0.8)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/characters/glitch_full.png';
                }}
              />

              <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full border border-coral bg-midnight/90 overflow-hidden shadow-md">
                <img 
                  src={getGlitchImage(glitchExpression)} 
                  alt={glitchExpression} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="mt-1 px-3 py-0.5 rounded bg-midnight/90 border border-coral/60 text-[11px] font-digital font-bold text-coral flex items-center gap-1 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-ping" />
              <span>GLITCH</span>
              <span className="text-[9px] text-cream/50 font-normal">| Procrastination Monster</span>
            </div>
          </div>
        </div>
      )}

      {/* NOVA */}
      {showNova && (
        <div 
          className={`relative transition-all duration-500 ease-out transform ${
            speaker === 'nova' ? 'scale-105 opacity-100 z-20' : 'scale-95 opacity-65 z-10'
          }`}
        >
          <div className="relative group flex flex-col items-center">
            <div className="relative w-72 h-[490px] flex items-end justify-center filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
              <img 
                src="./assets/characters/nova_sprite.png" 
                alt="Nova" 
                className="max-h-full object-contain filter drop-shadow-[0_0_15px_rgba(120,85,217,0.7)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/characters/nova_full.png';
                }}
              />
              
              <div className="absolute top-6 -left-3 w-16 h-16 rounded-full border-2 border-violet bg-midnight/90 overflow-hidden shadow-lg p-0.5 animate-pulse-glow">
                <img 
                  src={getNovaImage(novaExpression)} 
                  alt={novaExpression} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="mt-2 px-4 py-1 rounded bg-midnight/90 border border-violet text-xs font-heading font-bold text-violet-light flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
              <span>NOVA</span>
              <span className="text-[10px] text-cream/60 font-normal">| The Strategist (SWOT)</span>
            </div>
          </div>
        </div>
      )}

      {/* IRIS */}
      {showIris && (
        <div 
          className={`relative transition-all duration-500 ease-out transform ${
            speaker === 'iris' ? 'scale-105 opacity-100 z-20' : 'scale-95 opacity-65 z-10'
          }`}
        >
          <div className="relative group flex flex-col items-center">
            <div className="relative w-72 h-[490px] flex items-end justify-center filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
              <img 
                src="./assets/characters/iris_sprite.png" 
                alt="Iris" 
                className="max-h-full object-contain filter drop-shadow-[0_0_15px_rgba(88,205,181,0.7)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/characters/iris_full.png';
                }}
              />
              
              <div className="absolute top-6 -left-3 w-16 h-16 rounded-full border-2 border-mint bg-midnight/90 overflow-hidden shadow-lg p-0.5 animate-pulse-glow">
                <img 
                  src={getIrisImage(irisExpression)} 
                  alt={irisExpression} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="mt-2 px-4 py-1 rounded bg-midnight/90 border border-mint text-xs font-heading font-bold text-mint-light flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span>IRIS</span>
              <span className="text-[10px] text-cream/60 font-normal">| The Goal Architect (SMART)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
