import React from 'react';
import { CharacterId, CharacterExpression } from '../types/game';
import { ChevronRight, Play } from 'lucide-react';

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

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 z-20">
      <div 
        onClick={onNext}
        className="dialogue-box-comic relative p-5 sm:p-6 cursor-pointer group hover:border-purple transition-all"
      >
        {/* Nameplate */}
        <div className="absolute -top-5 left-6 sm:left-8 flex items-center gap-2">
          <div className={`px-4 py-1.5 border-3 border-navy rounded-full shadow-comic-sm font-heading font-black text-sm tracking-wide flex items-center gap-1.5 ${getNameplateColor()}`}>
            <span>{name}</span>
          </div>
          {subtext && (
            <span className="hidden sm:inline-block px-3 py-1 bg-white border-2 border-navy rounded-full text-[11px] font-bold font-heading text-navy/70 shadow-comic-sm">
              {subtext}
            </span>
          )}
        </div>

        {/* Dialogue Text Content */}
        <div className="mt-2 min-h-[64px] flex flex-col justify-center">
          <p className="text-base sm:text-lg md:text-xl font-heading font-bold text-navy leading-relaxed selection:bg-purple selection:text-white">
            {text}
          </p>
        </div>

        {/* Bottom Actions & Hint */}
        <div className="mt-3 pt-2 border-t-2 border-navy/15 flex items-center justify-between text-xs font-heading font-bold text-navy/60">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
            <span>Nhấn [Space] hoặc click chuột để tiếp tục</span>
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
  );
};
