import React from 'react';
import { GameScene } from '../types/game';
import { Award, ShieldCheck, Maximize, Minimize, Volume2, VolumeX, Sparkles, Clock, BookOpen } from 'lucide-react';

interface GameHeaderProps {
  currentScene: GameScene;
  xp: number;
  onOpenPresenter: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  chapterProgress: number; // 0 to 9
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  currentScene,
  xp,
  onOpenPresenter,
  isFullscreen,
  onToggleFullscreen,
  isMuted,
  onToggleMute,
  chapterProgress
}) => {
  const getSceneLabel = () => {
    switch (currentScene) {
      case 'TITLE': return 'TRANG CHỦ';
      case 'PROLOGUE': return 'KHỞI ĐẦU: 5 PHÚT NỮA...';
      case 'MEET_LINH': return 'CHƯƠNG 01: GẶP GỠ LINH & TICK';
      case 'SWOT_QUIZ': return 'CHƯƠNG 01: 8 CÂU HỎI SWOT';
      case 'SWOT_COMPLETE': return 'CHƯƠNG 01: HOÀN THÀNH SWOT';
      case 'SMART_VIDEO': return 'CHƯƠNG 02: TÌNH HUỐNG TRÌ HOÃN';
      case 'SMART_DISCUSSION': return 'CHƯƠNG 02: THẢO LUẬN 2 PHÚT';
      case 'SMART_KEYS': return 'CHƯƠNG 02: 5 TRỤ CỘT SMART';
      case 'SMART_PLAN': return 'CHƯƠNG 02: LẬP KẾ HOẠCH 5 NGÀY';
      case 'VICTORY': return 'CHIẾN THẮNG: LEVEL UP!';
      default: return 'LEVEL UP!';
    }
  };

  return (
    <header className="relative z-30 w-full px-4 sm:px-8 py-3 flex items-center justify-between bg-white border-b-3 border-navy shadow-comic-sm">
      {/* Left: Brand & Scene */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-purple text-white border-2 border-navy rounded-xl shadow-comic-sm font-comic text-xs sm:text-sm tracking-wide">
          <span>🎮 LEVEL UP!</span>
          <span className="text-yellow hidden sm:inline">• SWOT & SMART</span>
        </div>

        <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-cream border-2 border-navy rounded-xl text-xs font-bold font-heading text-navy">
          <Sparkles className="w-3.5 h-3.5 text-orange" />
          <span>{getSceneLabel()}</span>
        </div>
      </div>

      {/* Center: Progress & XP */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Chapters Progress */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-mint/20 border-2 border-navy rounded-xl text-xs font-bold text-navy font-heading">
          <BookOpen className="w-3.5 h-3.5 text-mint" />
          <span>Tiến độ: <span className="text-mint font-black">{chapterProgress}/9</span> chương</span>
        </div>

        {/* XP Badge */}
        <div className="flex items-center gap-1 px-3 py-1 bg-yellow border-2 border-navy rounded-xl text-xs font-black text-navy font-heading shadow-comic-sm">
          <Award className="w-4 h-4 text-orange" />
          <span>{xp} XP</span>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenPresenter}
          title="Mở Chế Độ Thuyết Trình (Phím P)"
          className="flex items-center gap-1 px-3 py-1.5 bg-orange text-white border-2 border-navy rounded-xl font-heading font-black text-xs hover:bg-orange-light shadow-comic-sm active:translate-x-0.5 active:translate-y-0.5"
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="hidden sm:inline">PRESENTER [P]</span>
        </button>

        <button
          onClick={onToggleMute}
          title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          className="p-1.5 bg-cream hover:bg-cream-dark border-2 border-navy rounded-xl text-navy transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-coral" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onToggleFullscreen}
          title="Toàn màn hình (Phím F)"
          className="p-1.5 bg-cream hover:bg-cream-dark border-2 border-navy rounded-xl text-navy transition-colors hidden sm:block"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
