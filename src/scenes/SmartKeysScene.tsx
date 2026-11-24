import React, { useState } from 'react';
import { SMART_CARDS_DATA } from '../data/gameContent';
import { BackgroundView } from '../components/BackgroundView';
import { soundManager } from '../utils/audio';
import { Target, BarChart2, CheckCircle2, Compass, Clock, Zap, ArrowRight, Sparkles } from 'lucide-react';

interface SmartKeysSceneProps {
  onAllKeysUnlocked: () => void;
  onOpenLog?: () => void;
}

export const SmartKeysScene: React.FC<SmartKeysSceneProps> = ({ onAllKeysUnlocked, onOpenLog }) => {
  const [unlockedKeys, setUnlockedKeys] = useState<string[]>(['S']);
  const [activeKey, setActiveKey] = useState<'S' | 'M' | 'A' | 'R' | 'T'>('S');

  const currentCard = SMART_CARDS_DATA.find(c => c.key === activeKey)!;
  const allUnlocked = unlockedKeys.length === 5;

  const handleUnlockKey = (key: 'S' | 'M' | 'A' | 'R' | 'T') => {
    soundManager.playClick();
    setActiveKey(key);
    if (!unlockedKeys.includes(key)) {
      soundManager.playCorrect();
      setUnlockedKeys(prev => [...prev, key]);
    }
  };

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'Target': return <Target className="w-5 h-5" />;
      case 'BarChart2': return <BarChart2 className="w-5 h-5" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Clock': return <Clock className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <BackgroundView bg="smart_lab">
      <div className="relative z-20 w-full h-full max-w-6xl mx-auto px-6 py-10 flex flex-col justify-between">
        <div className="text-center">
          <span className="px-3 py-1 rounded bg-mint/20 border border-mint text-mint text-xs font-digital font-bold tracking-wider">
            MỞ KHÓA 5 KỸ NĂNG THIẾT LẬP MỤC TIÊU SMART
          </span>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-cream mt-1">
            BẤM VÀO TỪNG THẺ ĐỂ MỞ KHÓA S – M – A – R – T
          </h2>
        </div>

        <div className="my-auto grid grid-cols-5 gap-3">
          {SMART_CARDS_DATA.map((card) => {
            const isUnlocked = unlockedKeys.includes(card.key);
            const isActive = activeKey === card.key;

            return (
              <button
                key={card.key}
                onClick={() => handleUnlockKey(card.key)}
                className={`p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-between min-h-[140px] text-center backdrop-blur-md relative group ${
                  isActive
                    ? 'bg-midnight/95 border-mint shadow-[0_0_25px_rgba(88,205,181,0.6)] scale-105 z-10'
                    : isUnlocked
                    ? 'bg-midnight/80 border-mint/40 hover:border-mint text-cream'
                    : 'bg-midnight/50 border-violet/20 opacity-60 hover:opacity-100'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-heading font-black text-xl shadow ${
                  isActive ? 'bg-mint text-midnight' : 'bg-mint/20 text-mint'
                }`}>
                  {card.letter}
                </div>

                <div className="my-2">
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-cream">
                    {card.titleEn}
                  </h4>
                  <p className="text-[11px] text-mint font-medium">{card.titleVi}</p>
                </div>

                <div className="text-[10px] font-mono text-cream/50 flex items-center gap-1">
                  {isUnlocked ? (
                    <span className="text-mint font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Đã Mở
                    </span>
                  ) : (
                    <span>Bấm để mở</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-5 rounded-2xl bg-midnight/90 border-2 border-mint/60 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-mint text-midnight font-bold">
                  {getCardIcon(currentCard.iconName)}
                </div>
                <h3 className="text-base font-heading font-black text-mint">
                  {currentCard.letter} – {currentCard.titleEn.toUpperCase()} ({currentCard.titleVi})
                </h3>
              </div>

              <div className="text-xs sm:text-sm text-cream/90 font-medium">
                <span className="text-amber font-bold">Câu hỏi định hướng: </span>
                "{currentCard.guidingQuestion}"
              </div>

              <p className="text-xs text-cream/80">
                <span className="font-semibold text-white">Định nghĩa: </span>
                {currentCard.definition}
              </p>

              <div className="pt-1">
                <span className="text-[11px] font-bold text-mint uppercase tracking-wider block mb-1">
                  Ứng dụng vào tình huống kỳ thi của Alex:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-cream/85">
                  {currentCard.caseApplication.map((app, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-mint font-bold">•</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-4 p-4 rounded-xl bg-midnight-dark/80 border border-mint/30 flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] font-mono text-cream/50 uppercase block">ALEX NHẬN RA:</span>
                <p className="text-xs text-cream italic mt-1 leading-relaxed">
                  "{currentCard.alexDialogue}"
                </p>
              </div>

              {allUnlocked && (
                <div className="mt-4 pt-3 border-t border-mint/20">
                  <button
                    onClick={() => {
                      soundManager.playLevelUp();
                      onAllKeysUnlocked();
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-mint to-amber text-midnight font-heading font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(88,205,181,0.6)] hover:scale-105 transition-all"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>LẬP MỤC TIÊU SMART HOÀN CHỈNH</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-cream/50 font-mono pt-2">
          <span>Tiến trình mở khóa: {unlockedKeys.length} / 5 chìa khóa SMART</span>
          <span>{allUnlocked ? 'Đã sẵn sàng ghép nối mục tiêu!' : 'Hãy bấm qua tất cả 5 thẻ'}</span>
        </div>
      </div>
    </BackgroundView>
  );
};
