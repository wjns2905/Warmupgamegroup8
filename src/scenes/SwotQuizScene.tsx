import React, { useState, useEffect } from 'react';
import { SWOT_QUESTIONS } from '../data/gameContent';
import { BackgroundView } from '../components/BackgroundView';
import { soundManager } from '../utils/audio';
import { CheckCircle2, XCircle, ChevronRight, Award, Sparkles, RotateCcw } from 'lucide-react';

interface SwotQuizSceneProps {
  currentQuestionIndex: number;
  onAnswerQuestion: (questionId: number, isCorrect: boolean, isFirstAttempt: boolean) => void;
  onNextQuestion: () => void;
  onFinishSwot: () => void;
}

export const SwotQuizScene: React.FC<SwotQuizSceneProps> = ({
  currentQuestionIndex,
  onAnswerQuestion,
  onNextQuestion,
  onFinishSwot,
}) => {
  const question = SWOT_QUESTIONS[currentQuestionIndex];
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setSelectedKey(null);
    setHasAnswered(false);
    setAttempts(0);
  }, [currentQuestionIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hasAnswered) {
        if (e.code === 'Space' || e.code === 'Enter') {
          handleAdvance();
        }
        return;
      }

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleSelect(key as 'A' | 'B' | 'C' | 'D');
      } else if (e.key === '1') handleSelect('A');
      else if (e.key === '2') handleSelect('B');
      else if (e.key === '3') handleSelect('C');
      else if (e.key === '4') handleSelect('D');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasAnswered, currentQuestionIndex, selectedKey]);

  const handleSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    if (hasAnswered) return;

    setSelectedKey(key);
    setHasAnswered(true);
    const isCorrect = key === question.correctKey;
    const isFirst = attempts === 0;

    if (isCorrect) {
      soundManager.playCorrect();
      onAnswerQuestion(question.id, true, isFirst);
    } else {
      soundManager.playIncorrect();
      setAttempts(prev => prev + 1);
      onAnswerQuestion(question.id, false, isFirst);
    }
  };

  const handleTryAgain = () => {
    soundManager.playClick();
    setSelectedKey(null);
    setHasAnswered(false);
  };

  const handleAdvance = () => {
    soundManager.playClick();
    if (currentQuestionIndex < SWOT_QUESTIONS.length - 1) {
      onNextQuestion();
    } else {
      onFinishSwot();
    }
  };

  const isCorrect = selectedKey === question.correctKey;
  const isLastQuestion = currentQuestionIndex === SWOT_QUESTIONS.length - 1;

  return (
    <BackgroundView bg={question.background || 'swot_room'}>
      <div className="relative z-20 w-full h-full max-w-6xl mx-auto px-6 py-16 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-violet-light font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber" />
              <span>THỬ THÁCH SWOT: CÂU HỎI {question.id} / 8</span>
              <span className="text-cream/50">• {question.title}</span>
            </span>
            <span className="text-amber font-bold">+100 XP / câu đúng lần đầu</span>
          </div>

          <div className="grid grid-cols-8 gap-2">
            {SWOT_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx < currentQuestionIndex
                    ? 'bg-gradient-to-r from-violet to-mint shadow-[0_0_8px_rgba(88,205,181,0.6)]'
                    : idx === currentQuestionIndex
                    ? 'bg-amber animate-pulse'
                    : 'bg-midnight-light/80 border border-violet/20'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 flex flex-col space-y-4">
            <div className="p-6 rounded-2xl bg-midnight/90 border-2 border-violet/60 shadow-[0_0_25px_rgba(120,85,217,0.3)] backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-violet/30 border border-violet-light text-[10px] font-digital font-bold text-violet-light uppercase">
                  QUESTION {question.id}
                </span>
                <span className="text-xs font-mono text-cream/60">Chọn 1 đáp án chính xác nhất</span>
              </div>

              <h2 className="text-base sm:text-lg md:text-xl font-heading font-bold text-cream leading-relaxed">
                {question.question}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {question.options.map((opt) => {
                let btnStyle = 'bg-midnight-light/85 border-violet/30 hover:border-violet hover:bg-violet/20 text-cream';
                let badgeStyle = 'bg-violet/30 text-cream';

                if (hasAnswered) {
                  if (opt.key === question.correctKey) {
                    btnStyle = 'bg-success/20 border-success text-white shadow-[0_0_15px_rgba(66,211,146,0.4)]';
                    badgeStyle = 'bg-success text-midnight font-bold';
                  } else if (opt.key === selectedKey && !isCorrect) {
                    btnStyle = 'bg-coral/20 border-coral text-coral-light';
                    badgeStyle = 'bg-coral text-white font-bold';
                  } else {
                    btnStyle = 'opacity-40 bg-midnight/50 border-transparent text-cream/40';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    disabled={hasAnswered && isCorrect}
                    onClick={() => handleSelect(opt.key)}
                    className={`w-full p-3 sm:p-3.5 rounded-xl border-2 transition-all flex items-center gap-3.5 text-left group shadow ${btnStyle}`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-heading font-black text-xs shrink-0 transition-colors ${badgeStyle}`}>
                      {opt.key}
                    </span>
                    <span className="text-xs sm:text-sm font-sans font-medium flex-1">
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
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            {hasAnswered ? (
              <div className={`p-6 rounded-2xl border-2 backdrop-blur-md shadow-xl animate-fadeIn ${
                isCorrect 
                  ? 'bg-midnight/90 border-success shadow-[0_0_20px_rgba(66,211,146,0.3)]' 
                  : 'bg-midnight/90 border-coral shadow-[0_0_20px_rgba(244,109,117,0.3)]'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <div className="p-1.5 rounded-full bg-success/20 text-success">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="font-heading font-black text-sm text-success">
                          ĐÁP ÁN CHÍNH XÁC!
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="p-1.5 rounded-full bg-coral/20 text-coral">
                          <XCircle className="w-5 h-5" />
                        </div>
                        <span className="font-heading font-black text-sm text-coral">
                          CHƯA CHÍNH XÁC!
                        </span>
                      </>
                    )}
                  </div>

                  {isCorrect && attempts === 0 && (
                    <span className="px-2.5 py-0.5 rounded bg-amber/20 border border-amber/40 text-amber text-xs font-mono font-bold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      +100 XP
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-violet-light shrink-0">
                    <img 
                      src={isCorrect ? './assets/characters/nova_celebrate.png' : './assets/characters/nova_thinking.png'} 
                      alt="Nova" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-heading font-bold text-violet-light">NOVA:</span>
                    <p className="text-xs sm:text-sm text-cream/90 italic mt-0.5">
                      "{isCorrect ? question.correctDialogue.text : 'Hãy đọc kỹ lời giải thích bên dưới để hiểu rõ bản chất nhé!'}"
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-midnight-dark/80 border border-violet/30 text-xs text-cream/85 leading-relaxed">
                  <span className="font-bold text-amber block mb-1">Giải thích chi tiết:</span>
                  {question.explanation}
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  {!isCorrect && (
                    <button
                      onClick={handleTryAgain}
                      className="px-4 py-2 rounded-xl bg-midnight-light hover:bg-violet/30 border border-violet/40 text-cream text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4 text-amber" />
                      <span>Thử Lại Câu Này</span>
                    </button>
                  )}

                  <button
                    onClick={handleAdvance}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet to-mint hover:from-violet-light hover:to-mint-light text-white font-heading font-black text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(88,205,181,0.5)]"
                  >
                    <span>{isLastQuestion ? 'HOÀN THÀNH CHƯƠNG SWOT' : 'CÂU TIẾP THEO'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-midnight/80 border border-violet/30 backdrop-blur-sm text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 border-violet shadow-lg p-0.5">
                  <img 
                    src="./assets/characters/nova_confident.png" 
                    alt="Nova" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h4 className="text-xs font-heading font-bold text-violet-light">
                  LỜI KHUYÊN TỪ CỐ VẤN CHIẾN LƯỢC NOVA
                </h4>
                <p className="text-xs text-cream/80 leading-relaxed">
                  "Hãy quan sát kỹ các yếu tố trong câu hỏi. Hãy xác định xem đó là yếu tố nội tại của cá nhân/doanh nghiệp hay là tác động từ môi trường bên ngoài!"
                </p>
                <div className="pt-2 text-[11px] font-mono text-cream/40">
                  Khán giả chọn A, B, C hoặc D trên bàn phím/chuột
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-cream/50 font-mono border-t border-violet/20 pt-3">
          <span>Người thuyết trình chủ động bấm [CÂU TIẾP THEO] khi lớp thảo luận xong.</span>
          <span>Thử thách SWOT ({currentQuestionIndex + 1}/8)</span>
        </div>
      </div>
    </BackgroundView>
  );
};
