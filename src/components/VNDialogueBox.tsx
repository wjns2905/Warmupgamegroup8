import React from 'react';
import { CharacterId, CharacterExpression } from '../types/game';
import { ChevronRight, Bell, Sparkles } from 'lucide-react';

interface VNDialogueBoxProps {
  speaker: CharacterId;
  name: string;
  expression?: CharacterExpression;
  text: string;
  subtext?: string;
  onNext: () => void;
  nextLabel?: string;
}

export const VNDialogueBox: React.FC<VNDialogueBoxProps> = ({
  speaker,
  name,
  text,
  subtext,
  onNext,
  nextLabel = "TIẾP TỤC"
}) => {
  const getNameplateColor = () => {
    switch (speaker) {
      case 'minh': return 'bg-mint text-navy';
      case 'linh': return 'bg-orange text-white';
      case 'tick': return 'bg-purple text-white';
      default: return 'bg-navy text-yellow';
    }
  };

  const getAvatarSrc = () => {
    switch (speaker) {
      case 'minh': return './assets/characters/minh_avatar.png';
      case 'linh': return './assets/characters/linh_avatar.png';
      case 'tick': return './assets/characters/tick_avatar.png';
      default: return null;
    }
  };

  const avatarSrc = getAvatarSrc();

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 z-20">
      <div 
        onClick={onNext}
        className="dialogue-box-comic relative p-4 sm:p-6 cursor-pointer group hover:border-purple transition-all flex flex-col md:flex-row items-center md:items-start gap-4"
      >
        {/* Left: Character Avatar Portrait (True Visual Novel Style) */}
        {avatarSrc ? (
          <div className="flex-shrink-0 -mt-2 sm:-mt-3">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-3 border-navy shadow-comic-sm overflow-hidden p-1 group-hover:scale-105 transition-transform">
              <img 
                src={avatarSrc} 
                alt={name} 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-navy text-white text-[9px] font-black font-heading rounded border border-white">
                {name}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-shrink-0 -mt-2 sm:-mt-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-navy border-3 border-navy shadow-comic-sm flex items-center justify-center text-yellow">
              <Sparkles className="w-8 h-8 animate-pulse" />
            </div>
          </div>
        )}

        {/* Right: Text and Nameplate Area */}
        <div className="flex-1 w-full flex flex-col justify-between">
          {/* Nameplate & Subtext Tag */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <div className={`px-4 py-1 border-3 border-navy rounded-full shadow-comic-sm font-heading font-black text-xs sm:text-sm tracking-wide ${getNameplateColor()}`}>
              <span>{name}</span>
            </div>
            {subtext && (
              <span className="px-3 py-0.5 bg-white border-2 border-navy rounded-full text-[11px] font-bold font-heading text-navy/70 shadow-comic-sm">
                {subtext}
              </span>
            )}
          </div>

          {/* Dialogue Text Content */}
          <div className="min-h-[56px] flex items-center">
            <p className="text-base sm:text-lg md:text-xl font-heading font-bold text-navy leading-relaxed selection:bg-purple selection:text-white">
              {text}
            </p>
          </div>

          {/* Bottom Actions & Hint */}
          <div className="mt-3 pt-2 border-t-2 border-navy/15 flex items-center justify-between text-xs font-heading font-bold text-navy/60">
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              <span>Nhấn [Space] hoặc click để tiếp tục</span>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="flex items-center gap-1 px-4 py-1.5 bg-orange text-white border-2 border-navy rounded-xl font-heading font-black text-xs hover:bg-orange-light shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <span>{nextLabel}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
