import React, { useState, useEffect, useRef } from 'react';
import { CharacterId, ChoiceOption } from '../types/game';
import { soundManager } from '../utils/audio';
import { ChevronRight, Play, FastForward, BookOpen } from 'lucide-react';

interface DialogueBoxProps {
  speaker: CharacterId;
  speakerName: string;
  subtext?: string;
  text: string;
  choices?: ChoiceOption[];
  onSelectChoice?: (choice: ChoiceOption) => void;
  onNext?: () => void;
  onOpenLog?: () => void;
  isAutoPlay?: boolean;
  onToggleAutoPlay?: () => void;
  onSkip?: () => void;
  hideNextArrow?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  speakerName,
  subtext,
  text,
  choices,
  onSelectChoice,
  onNext,
  onOpenLog,
  isAutoPlay = false,
  onToggleAutoPlay,
  onSkip,
  hideNextArrow = false,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let currentIndex = 0;

    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    typingTimerRef.current = window.setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        if (currentIndex % 3 === 0) {
          soundManager.playTypewriter();
        }
        currentIndex++;
      } else {
        setIsTyping(false);
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
        }
      }
    }, 20);

    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, [text]);

  const handleBoxClick = () => {
    if (choices && choices.length > 0) return;

    if (isTyping) {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      setDisplayedText(text);
      setIsTyping(false);
      soundManager.playClick();
    } else if (onNext) {
      soundManager.playClick();
      onNext();
    }
  };

  const getSpeakerStyles = () => {
    switch (speaker) {
      case 'nova':
        return {
          tagBg: 'bg-gradient-to-r from-violet to-violet-dark',
          tagBorder: 'border-violet-light',
          textColor: 'text-violet-light',
          boxBorder: 'border-t-2 border-violet/70',
        };
      case 'iris':
        return {
          tagBg: 'bg-gradient-to-r from-mint-dark to-mint',
          tagBorder: 'border-mint-light',
          textColor: 'text-mint-light',
          boxBorder: 'border-t-2 border-mint/70',
        };
      case 'glitch':
        return {
          tagBg: 'bg-gradient-to-r from-purple-800 to-coral',
          tagBorder: 'border-coral',
          textColor: 'text-coral',
          boxBorder: 'border-t-2 border-coral/70',
        };
      case 'system':
        return {
          tagBg: 'bg-gradient-to-r from-amber-dark to-amber',
          tagBorder: 'border-amber-light text-midnight-dark font-black',
          textColor: 'text-amber',
          boxBorder: 'border-t-2 border-amber/70',
        };
      default:
        return {
          tagBg: 'bg-gradient-to-r from-[#171B35] to-[#252c59]',
          tagBorder: 'border-violet/40',
          textColor: 'text-cream',
          boxBorder: 'border-t-2 border-violet/50',
        };
    }
  };

  const style = getSpeakerStyles();

  return (
    <div 
      className={`absolute bottom-0 inset-x-0 h-44 sm:h-48 z-40 hud-dialogue ${style.boxBorder} transition-all duration-300 cursor-pointer select-none`}
      onClick={handleBoxClick}
    >
      <div className="max-w-6xl mx-auto h-full px-8 py-4 flex flex-col justify-between relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`px-5 py-1.5 rounded-t-lg cyber-cut-sm border-t border-x ${style.tagBorder} ${style.tagBg} shadow-lg flex items-center gap-2`}>
              <span className="font-heading font-black text-sm tracking-wide text-cream">
                {speakerName}
              </span>
              {subtext && (
                <span className="text-[11px] opacity-75 font-sans font-normal border-l border-white/20 pl-2">
                  {subtext}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {onToggleAutoPlay && (
              <button 
                onClick={onToggleAutoPlay}
                className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1 border transition-all ${
                  isAutoPlay 
                    ? 'bg-amber text-midnight font-bold border-amber' 
                    : 'bg-midnight/60 text-cream/70 border-violet/30 hover:border-violet'
                }`}
                title="Tự động chuyển câu"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>AUTO</span>
              </button>
            )}

            {onSkip && (
              <button 
                onClick={onSkip}
                className="px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1 bg-midnight/60 text-cream/70 border border-violet/30 hover:border-coral hover:text-coral transition-all"
                title="Bỏ qua hội thoại"
              >
                <FastForward className="w-3 h-3" />
                <span>SKIP</span>
              </button>
            )}

            {onOpenLog && (
              <button 
                onClick={onOpenLog}
                className="px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1 bg-midnight/60 text-cream/70 border border-violet/30 hover:border-mint hover:text-mint transition-all"
                title="Xem lại lịch sử hội thoại"
              >
                <BookOpen className="w-3 h-3" />
                <span>LOG</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 my-2 overflow-hidden flex flex-col justify-center">
          <p className="text-base sm:text-lg md:text-xl font-sans text-cream/95 leading-relaxed tracking-wide drop-shadow">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2 h-4 ml-1 bg-amber animate-pulse" />
            )}
          </p>

          {choices && choices.length > 0 && !isTyping && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 animate-fadeIn" onClick={(e) => e.stopPropagation()}>
              {choices.map((choice) => (
                <button
                  key={choice.key}
                  onClick={() => {
                    soundManager.playClick();
                    onSelectChoice && onSelectChoice(choice);
                  }}
                  className="px-4 py-2 rounded-lg bg-midnight-light/80 hover:bg-violet/30 border border-violet/40 hover:border-amber transition-all text-left flex items-center gap-3 group shadow"
                >
                  <span className="w-6 h-6 rounded bg-violet/40 group-hover:bg-amber group-hover:text-midnight flex items-center justify-center font-heading font-black text-xs text-cream transition-colors">
                    {choice.key}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-cream group-hover:text-white">
                    {choice.text}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-cream/40 font-mono">
          <span>Nhấn [Space] hoặc [Click] để tiếp tục</span>
          {!hideNextArrow && !choices?.length && (
            <div className="flex items-center gap-1 text-amber animate-pulse font-semibold">
              <span>TIẾP TỤC</span>
              <ChevronRight className="w-4 h-4 animate-bounce" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
