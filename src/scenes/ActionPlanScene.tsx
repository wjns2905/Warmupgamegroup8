import React, { useState } from 'react';
import { BackgroundView } from '../components/BackgroundView';
import { soundManager } from '../utils/audio';
import { CheckSquare, Square, Play, RotateCcw, ArrowRight, BookCheck, AlertCircle } from 'lucide-react';

interface ActionPlanSceneProps {
  completedChapters: boolean[];
  onToggleChapter: (index: number) => void;
  onSetAllChapters: (status: boolean) => void;
  onGoToDefeatGlitch: () => void;
}

export const ActionPlanScene: React.FC<ActionPlanSceneProps> = ({
  completedChapters,
  onToggleChapter,
  onSetAllChapters,
  onGoToDefeatGlitch,
}) => {
  const [isSimulating, setIsSimulating] = useState(false);

  const completedCount = completedChapters.filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 9) * 100);

  const days = [
    { day: 'DAY 01', chapters: [1, 2], target: 'Hoàn thành chương 1 & 2', progress: '2/9' },
    { day: 'DAY 02', chapters: [3, 4], target: 'Hoàn thành chương 3 & 4', progress: '4/9' },
    { day: 'DAY 03', chapters: [5, 6], target: 'Hoàn thành chương 5 & 6', progress: '6/9' },
    { day: 'DAY 04', chapters: [7, 8], target: 'Hoàn thành chương 7 & 8', progress: '8/9' },
    { day: 'DAY 05', chapters: [9], target: 'Hoàn thành chương 9 & Tổng ôn trước 22:00', progress: '9/9' },
  ];

  const handleSimulate = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    soundManager.playClick();

    onSetAllChapters(false);

    for (let i = 0; i < 9; i++) {
      await new Promise(r => setTimeout(r, 450));
      soundManager.playCorrect();
      onToggleChapter(i);
    }

    soundManager.playLevelUp();
    setIsSimulating(false);
  };

  return (
    <BackgroundView bg="smart_lab">
      <div className="relative z-20 w-full h-full max-w-6xl mx-auto px-6 py-10 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-mint/20 border border-mint text-mint text-[11px] font-digital font-bold uppercase">
                ACTION PLAN ROADMAP
              </span>
              <span className="text-xs font-mono text-cream/70">Kế hoạch 5 ngày trước kỳ thi</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-black text-cream mt-1">
              BẢNG NHIỆM VỤ CHI TIẾT & CHECKLIST 9 CHƯƠNG
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-mint to-amber hover:from-mint-light hover:to-amber-light text-midnight font-heading font-black text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(88,205,181,0.5)]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isSimulating ? 'Đang mô phỏng tiến độ...' : 'MÔ PHỎNG KẾ HOẠCH (SIMULATE)'}</span>
            </button>

            <button
              onClick={() => onSetAllChapters(false)}
              className="p-2 rounded-xl bg-midnight/80 border border-violet/30 text-cream/70 hover:text-coral transition-colors"
              title="Đặt lại checklist"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-2.5">
            {days.map((d) => {
              const dayCompleted = d.chapters.every(c => completedChapters[c - 1]);

              return (
                <div
                  key={d.day}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between backdrop-blur-md ${
                    dayCompleted
                      ? 'bg-midnight/90 border-success shadow-[0_0_12px_rgba(66,211,146,0.3)]'
                      : 'bg-midnight/70 border-mint/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded text-xs font-digital font-black ${
                      dayCompleted ? 'bg-success text-midnight' : 'bg-mint/20 text-mint'
                    }`}>
                      {d.day}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-cream font-heading">
                        {d.target}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-cream/60">Chương mục tiêu:</span>
                        {d.chapters.map(c => (
                          <span
                            key={c}
                            className={`text-[10px] px-1.5 py-0.2 rounded font-mono font-bold ${
                              completedChapters[c - 1]
                                ? 'bg-success/30 text-success'
                                : 'bg-midnight-light text-cream/70'
                            }`}
                          >
                            Chương {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className={`text-xs font-mono font-bold ${dayCompleted ? 'text-success' : 'text-cream/50'}`}>
                    {d.progress}
                  </span>
                </div>
              );
            })}

            <div className="p-2.5 rounded-lg bg-midnight-dark/60 border border-violet/20 text-[11px] text-cream/60 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber shrink-0" />
              <span>Ghi chú: Đây là mô phỏng kế hoạch thực hiện, không phải kết quả thực tế của nhân vật.</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-5 rounded-2xl bg-midnight/95 border-2 border-mint shadow-[0_0_30px_rgba(88,205,181,0.4)] backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-mint/30 pb-3">
              <div className="flex items-center gap-2 text-mint font-heading font-black text-sm">
                <BookCheck className="w-5 h-5" />
                <span>CHECKLIST 9 CHƯƠNG</span>
              </div>
              <span className="text-xs font-digital font-bold text-amber">
                {completedCount} / 9 CHƯƠNG ({progressPercent}%)
              </span>
            </div>

            <div className="w-full h-3 rounded-full bg-midnight-dark border border-mint/40 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-mint via-mint-light to-amber transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ch) => {
                const isChecked = completedChapters[ch - 1];

                return (
                  <button
                    key={ch}
                    onClick={() => {
                      soundManager.playClick();
                      onToggleChapter(ch - 1);
                    }}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-mint/20 border-mint text-cream font-bold'
                        : 'bg-midnight-light/60 border-violet/20 text-cream/60 hover:border-mint'
                    }`}
                  >
                    <span className="text-xs font-mono">Ch.{ch}</span>
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-mint" />
                    ) : (
                      <Square className="w-4 h-4 text-cream/30" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-[11px] text-cream/70 text-center italic border-t border-white/10">
              {completedCount === 0 && 'Glitch đang lởn vởn dụ dỗ Alex trì hoãn...'}
              {completedCount > 0 && completedCount < 9 && 'Alex đang hoàn thành từng chương, Glitch dần mất đi sức mạnh!'}
              {completedCount === 9 && '✨ Xuất sắc! Toàn bộ 9 chương đã hoàn thành! Glitch hoàn toàn hoảng sợ!'}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-mint/20 pt-3">
          <span className="text-xs text-cream/50 font-mono">Alex đã sẵn sàng bước vào thử thách cuối cùng</span>
          <button
            onClick={() => {
              soundManager.playLevelUp();
              onGoToDefeatGlitch();
            }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-coral via-amber to-mint text-midnight font-heading font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(244,109,117,0.7)] hover:scale-105 transition-all"
          >
            <span>ĐỐI ĐẦU VỚI GLITCH (FINAL CHAPTER)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </BackgroundView>
  );
};
