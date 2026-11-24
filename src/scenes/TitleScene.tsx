import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { Play, HelpCircle, ShieldCheck, Maximize, Minimize, Award, Sparkles, ChevronRight, X } from 'lucide-react';

interface TitleSceneProps {
  onStartGame: () => void;
  onOpenPresenter: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  hasSavedGame?: boolean;
  onContinueGame?: () => void;
}

export const TitleScene: React.FC<TitleSceneProps> = ({
  onStartGame,
  onOpenPresenter,
  isFullscreen,
  onToggleFullscreen,
  hasSavedGame = false,
  onContinueGame,
}) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 sm:p-12 z-20">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <img 
          src="./assets/backgrounds/bg_bedroom.jpg" 
          alt="Alex Bedroom" 
          className="w-full h-full object-cover object-center filter contrast-105 brightness-60 blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-dark/95 via-midnight-dark/85 to-[#251b54]/80" />
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-violet/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-mint/20 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        
        {/* Subtle decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#7855D910_1px,transparent_1px),linear-gradient(to_bottom,#7855D910_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded bg-midnight/80 border border-violet/40 text-xs font-mono text-violet-light flex items-center gap-1.5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber" />
            <span>INTERACTIVE VISUAL NOVEL • CLASSROOM EDITION</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenPresenter();
            }}
            className="px-3.5 py-1.5 rounded-lg bg-midnight/80 hover:bg-violet/30 border border-violet/40 hover:border-amber text-cream text-xs font-heading font-bold flex items-center gap-1.5 transition-all shadow"
          >
            <ShieldCheck className="w-4 h-4 text-amber" />
            <span>PRESENTER MODE</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onToggleFullscreen();
            }}
            className="p-1.5 rounded-lg bg-midnight/80 border border-violet/40 text-cream hover:bg-violet/30 transition-colors"
            title="Toàn màn hình"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        <div className="lg:col-span-7 flex flex-col space-y-5">
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-violet/30 border border-violet-light/50 text-amber text-xs font-digital font-bold uppercase tracking-wider mb-2">
              <span>WARM-UP WORKSHOP • SWOT & SMART</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-black tracking-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              LEVEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber via-amber-light to-white">UP!</span>
            </h1>

            <div className="text-xl sm:text-2xl font-heading font-bold text-violet-light tracking-wide mt-1 flex items-center gap-2">
              <span>The Self-Discovery Quest</span>
              <span className="text-xs px-2 py-0.5 rounded bg-mint text-midnight font-black">2.0</span>
            </div>

            <p className="mt-3 text-base sm:text-lg text-cream/90 font-sans font-medium leading-relaxed max-w-xl">
              <span className="text-amber font-bold">Hiểu bản thân</span> – <span className="text-mint font-bold">Làm chủ mục tiêu</span> – <span className="text-violet-light font-bold">Nâng cấp chính mình.</span>
              <br />
              <span className="text-xs text-cream/60 font-normal">Know Yourself. Set Your Goals. Level Up.</span>
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundManager.playLevelUp();
                onStartGame();
              }}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet via-violet-light to-violet hover:from-violet-light hover:to-mint text-white font-heading font-black text-base flex items-center gap-3 shadow-[0_0_25px_rgba(120,85,217,0.7)] hover:shadow-[0_0_35px_rgba(88,205,181,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>START GAME (BẮT ĐẦU)</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            {hasSavedGame && onContinueGame && (
              <button
                onClick={() => {
                  soundManager.playClick();
                  onContinueGame();
                }}
                className="px-6 py-3.5 rounded-xl bg-midnight-light/90 hover:bg-violet/40 border border-mint text-mint font-heading font-bold text-sm flex items-center gap-2 transition-all shadow"
              >
                <span>CHƠI TIẾP (CONTINUE)</span>
              </button>
            )}

            <button
              onClick={() => {
                soundManager.playClick();
                setShowHowToPlay(true);
              }}
              className="px-5 py-3.5 rounded-xl bg-midnight/80 hover:bg-white/10 border border-violet/40 text-cream font-heading font-bold text-sm flex items-center gap-2 transition-all"
            >
              <HelpCircle className="w-4 h-4 text-cream/70" />
              <span>HƯỚNG DẪN</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group rounded-2xl overflow-hidden border-2 border-violet/60 shadow-[0_0_40px_rgba(120,85,217,0.5)] bg-midnight/80 max-w-md transform group-hover:scale-[1.02] transition-transform duration-500">
            <img 
              src="./assets/characters/key_visual.jpg" 
              alt="Level Up Cast" 
              className="w-full h-auto object-cover object-center filter contrast-105"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-midnight via-midnight/80 to-transparent flex items-center justify-between">
              <div>
                <span className="text-xs font-heading font-bold text-cream flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
                  ALEX • NOVA • IRIS • GLITCH
                </span>
                <p className="text-[10px] text-cream/60">Trải nghiệm Visual Novel học tập tương tác lớp học</p>
              </div>
              <span className="text-[11px] font-mono text-amber font-bold">16:9 HD</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs text-cream/50 border-t border-violet/20 pt-4 font-mono">
        <div>Dành cho sinh viên đại học • Thời lượng dự kiến: 15–20 phút • 1920 × 1080 px</div>
        <div className="flex items-center gap-4">
          <span>Phím tắt: [Space] Tiếp tục • [F] Toàn màn hình • [P] Presenter Mode</span>
        </div>
      </div>

      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-dark/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-midnight border-2 border-violet/80 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
            <div className="flex items-center justify-between border-b border-violet/30 pb-4">
              <h3 className="text-lg font-heading font-black text-cream flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber" />
                <span>HƯỚNG DẪN THAM GIA GAME (HOW TO PLAY)</span>
              </h3>
              <button 
                onClick={() => setShowHowToPlay(false)}
                className="p-1 rounded-lg text-cream/60 hover:text-coral transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs sm:text-sm text-cream/85 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <div className="p-3 rounded-xl bg-violet/15 border border-violet/30">
                <h4 className="font-bold text-violet-light mb-1">1. Định dạng trình chiếu lớp học:</h4>
                <p>Người thuyết trình điều khiển game trên máy chiếu / màn hình lớn. Khán giả cả lớp cùng theo dõi câu chuyện, thảo luận và lựa chọn phương án cho nhân vật Alex.</p>
              </div>

              <div className="p-3 rounded-xl bg-violet/15 border border-violet/30">
                <h4 className="font-bold text-amber mb-1">2. Chương 01 – SWOT (Hiểu bản thân):</h4>
                <p>Khám phá 8 thử thách kiến thức và tình huống thực tế về ma trận SWOT (S - Điểm mạnh, W - Điểm yếu, O - Cơ hội, T - Thách thức). Mỗi câu trả lời đúng ngay lần đầu thưởng 100 XP.</p>
              </div>

              <div className="p-3 rounded-xl bg-mint/15 border border-mint/30">
                <h4 className="font-bold text-mint mb-1">3. Chương 02 – SMART (Làm chủ mục tiêu):</h4>
                <p>Xem video tình huống về vòng lặp trì hoãn, tham gia thử thách 2 phút cứu vãn kỳ thi, mở khóa 5 chìa khóa SMART (Specific, Measurable, Achievable, Relevant, Time-bound), xây dựng kế hoạch 5 ngày và đánh bại quái vật Glitch!</p>
              </div>

              <div className="p-3 rounded-xl bg-midnight-light/90 border border-violet/30">
                <h4 className="font-bold text-cream mb-1">4. Phím tắt tiện lợi:</h4>
                <p className="font-mono text-xs text-cream/70">
                  • <b>Space / Enter</b>: Tiếp tục thoại | • <b>A, B, C, D</b>: Chọn đáp án | • <b>P</b>: Mở menu thuyết trình | • <b>F</b>: Bật/tắt toàn màn hình | • <b>M</b>: Bật/tắt âm thanh
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowHowToPlay(false)}
                className="px-6 py-2 rounded-xl bg-violet hover:bg-violet-light text-cream font-bold text-xs transition-colors"
              >
                Đã Hiểu, Bắt Đầu Thôi!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
