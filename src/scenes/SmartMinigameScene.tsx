import React, { useState } from 'react';
import { SMART_MINIGAME_QUESTIONS } from '../data/gameContent';
import { BackgroundView } from '../components/BackgroundView';
import { soundManager } from '../utils/audio';
import { CheckCircle2, XCircle, ChevronRight, Award, FastForward, Sparkles } from 'lucide-react';

interface SmartMinigameSceneProps {
  onCompleteMinigame: (score: number) => void;
  onSkipMinigame: () => void;
}

export const SmartMinigameScene: React.FC<SmartMinigameSceneProps> = ({
  onCompleteMinigame,
  onSkipMinigame,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const question = SMART_MINIGAME_QUESTIONS[currentIdx];
  const isLast = currentIdx === SMART_MINIGAME_QUESTIONS.length - 1;

  const handleSelect = (key: 'A' | 'B' | 'C') => {
    if (hasAnswered) return;
    setSelectedKey(key);
    setHasAnswered(true);

    const isCorrect = key === question.correctKey;
    if (isCorrect) {
      soundManager.playCorrect();
      setScore(prev => prev + 100);
    } else {
      soundManager.playIncorrect();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (isLast) {
      onCompleteMinigame(score);
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedKey(null);
      setHasAnswered(false);
    }
  };

  const isCorrect = selectedKey === question.correctKey;

  return (
    <BackgroundView bg="smart_lab">
      <div className="relative z-20 w-full h-full max-w-4xl mx-auto px-6 py-12 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-mint/20 border border-mint text-mint text-[11px] font-digital font-bold uppercase">
                MINI-GAME ({currentIdx + 1}/5)
              </span>
              <span className="text-xs font-mono text-cream/70">Tiêu chí: {question.element}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-heading font-black text-cream mt-1">
              CHỌN PHƯƠNG ÁN PHÙ HỢP CHO TỪNG THÀNH TỐ SMART
            </h2>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onSkipMinigame();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-midnight/80 hover:bg-white/10 border border-violet/30 hover:border-amber text-amber text-xs font-mono flex items-center gap-1.5 transition-all"
            title="Bỏ qua phần này nếu thiếu thời gian"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Bỏ qua (Tiết kiệm thời gian)</span>
          </button>
        </div>

        <div className="my-auto space-y-4">
          <div className="p-4 rounded-xl bg-midnight/90 border border-mint/40 text-center">
            <span className="text-xs font-mono text-mint uppercase block">Mục tiêu cho chữ cái {question.key}:</span>
            <h3 className="text-base sm:text-lg font-bold text-cream mt-1">
              Lựa chọn nào thể hiện đúng nhất nguyên tắc {question.element}?
            </h3>
          </div>

          <div className="space-y-3">
            {question.options.map((opt) => {
              let btnStyle = 'bg-midnight-light/85 border-violet/30 hover:border-mint hover:bg-mint/10 text-cream';
              let badgeStyle = 'bg-midnight text-mint border border-mint/40';

              if (hasAnswered) {
                if (opt.key === question.correctKey) {
                  btnStyle = 'bg-success/20 border-success text-white shadow-[0_0_15px_rgba(66,211,146,0.4)]';
                  badgeStyle = 'bg-success text-midnight font-bold border-success';
                } else if (opt.key === selectedKey && !isCorrect) {
                  btnStyle = 'bg-coral/20 border-coral text-coral-light';
                  badgeStyle = 'bg-coral text-white font-bold border-coral';
                } else {
                  btnStyle = 'opacity-40 bg-midnight/50 border-transparent text-cream/40';
                }
              }

              return (
                <button
                  key={opt.key}
                  disabled={hasAnswered}
                  onClick={() => handleSelect(opt.key)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-left shadow ${btnStyle}`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-heading font-black text-sm shrink-0 ${badgeStyle}`}>
                    {opt.key}
                  </span>
                  <span className="text-sm font-medium flex-1">
                    {opt.text}
                  </span>
                  {hasAnswered && opt.key === question.correctKey && (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  )}
                  {hasAnswered && opt.key === selectedKey && !isCorrect && (
                    <XCircle className="w-5 h-5 text-coral shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {hasAnswered && (
            <div className="pt-2 flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <span className="text-xs font-bold text-success flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Chính xác! (+100 XP)
                  </span>
                ) : (
                  <span className="text-xs font-bold text-coral flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Đáp án đúng là {question.correctKey}!
                  </span>
                )}
              </div>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-mint to-amber text-midnight font-heading font-black text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(88,205,181,0.6)] hover:scale-105 transition-all"
              >
                <span>{isLast ? 'HOÀN THÀNH MINI-GAME' : 'TIÊU CHÍ TIẾP THEO'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-cream/50 font-mono border-t border-mint/20 pt-3">
          <span>Điểm tích lũy mini-game: {score} XP</span>
          <span>5 tiêu chí: Specific • Measurable • Achievable • Relevant • Time-bound</span>
        </div>
      </div>
    </BackgroundView>
  );
};
