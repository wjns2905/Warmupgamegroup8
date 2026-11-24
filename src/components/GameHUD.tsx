import React from 'react';
import { GameScene } from '../types/game';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, Maximize, Minimize, Settings, ShieldCheck, Flame, BookCheck } from 'lucide-react';

interface GameHUDProps {
  currentScene: GameScene;
  xp: number;
  level: number;
  levelName: string;
  completedChaptersCount: number;
  bgmMuted: boolean;
  sfxMuted: boolean;
  isFullscreen: boolean;
  onToggleBgm: () => void;
  onToggleSfx: () => void;
  onToggleFullscreen: () => void;
  onOpenPresenterMode: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  currentScene,
  xp,
  level,
  levelName,
  completedChaptersCount,
  bgmMuted,
  sfxMuted,
  isFullscreen,
  onToggleBgm,
  onToggleSfx,
  onToggleFullscreen,
  onOpenPresenterMode,
}) => {
  if (currentScene === 'TITLE') return null;

  const getSceneMeta = () => {
    switch (currentScene) {
      case 'PROLOGUE':
        return { chapter: 'PROLOGUE', mission: 'JUST FIVE MORE MINUTES', color: 'text-violet-light' };
      case 'MEET_NOVA':
      case 'SWOT_INTRO':
      case 'SWOT_QUIZ':
      case 'SWOT_COMPLETE':
        return { chapter: 'CHAPTER 01: SWOT', mission: 'KNOW YOURSELF (8 CHALLENGES)', color: 'text-violet-light' };
      case 'SMART_INTRO':
      case 'SMART_VIDEO':
      case 'SMART_DISCUSSION':
      case 'SMART_KEYS':
      case 'SMART_MINIGAME':
      case 'SMART_GOAL_REVEAL':
      case 'ACTION_PLAN':
        return { chapter: 'CHAPTER 02: SMART', mission: 'BREAK THE LOOP & BUILD GOAL', color: 'text-mint' };
      case 'DEFEAT_GLITCH':
        return { chapter: 'FINAL CHAPTER', mission: 'DEFEAT THE GLITCH', color: 'text-coral' };
      case 'VICTORY':
        return { chapter: 'EPILOGUE', mission: 'QUEST COMPLETED', color: 'text-amber' };
      default:
        return { chapter: 'LEVEL UP!', mission: 'THE QUEST', color: 'text-cream' };
    }
  };

  const meta = getSceneMeta();

  const levelThresholds = [0, 300, 600, 1000, 1300];
  const nextXP = level < 5 ? levelThresholds[level] : 1300;
  const prevXP = levelThresholds[level - 1] || 0;
  const progressPercent = Math.min(100, Math.max(0, ((xp - prevXP) / (nextXP - prevXP || 1)) * 100));

  return (
    <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-start justify-between z-30 pointer-events-none select-none">
      <div className="flex items-start gap-4 pointer-events-auto">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded bg-gradient-to-r from-violet via-violet-dark to-midnight border border-violet-light shadow-[0_0_15px_rgba(120,85,217,0.5)] flex items-center gap-1.5">
              <span className="font-heading font-black text-sm tracking-widest text-cream">LEVEL UP!</span>
              <span className="text-[10px] text-amber font-mono font-bold">▲</span>
            </div>
            <span className={`text-xs font-mono font-bold tracking-wider ${meta.color} drop-shadow`}>
              {meta.chapter}
            </span>
          </div>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs font-semibold text-cream/90 bg-midnight/80 px-2.5 py-0.5 rounded border border-violet/30 backdrop-blur-sm">
              Nhiệm vụ: <span className="text-amber">{meta.mission}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-midnight/85 border border-mint/40 shadow-sm backdrop-blur-sm text-xs font-mono">
          <BookCheck className="w-4 h-4 text-mint" />
          <span className="text-cream/70">Tiến độ ôn tập:</span>
          <span className="text-mint font-bold">{completedChaptersCount}/9 chương</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-midnight/90 border border-violet/40 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-1.5 text-amber">
            <Flame className="w-4 h-4 fill-current" />
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-3 text-[10px] font-digital font-bold">
                <span>XP {xp}</span>
                <span className="text-cream/80">Lv.{level} {levelName}</span>
              </div>
              <div className="w-28 sm:w-36 h-2 rounded-full bg-midnight-dark border border-amber/40 overflow-hidden mt-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-amber-dark via-amber to-amber-light transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenPresenterMode();
          }}
          className="px-3 py-1.5 rounded-lg bg-violet/40 hover:bg-violet border border-violet-light text-cream font-heading font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(120,85,217,0.4)]"
          title="Mở Bảng Điều Khiển Người Thuyết Trình (Phím P)"
        >
          <ShieldCheck className="w-4 h-4 text-amber" />
          <span className="hidden sm:inline">PRESENTER</span>
        </button>

        <div className="flex items-center gap-1 bg-midnight/80 border border-violet/30 p-1 rounded-lg backdrop-blur-sm">
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleBgm();
            }}
            className={`p-1.5 rounded hover:bg-violet/30 transition-colors ${bgmMuted ? 'text-coral' : 'text-cream'}`}
            title={bgmMuted ? 'Bật Nhạc Nền' : 'Tắt Nhạc Nền (Phím M)'}
          >
            {bgmMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onToggleFullscreen();
            }}
            className="p-1.5 rounded hover:bg-violet/30 text-cream transition-colors"
            title="Toàn màn hình (Phím F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
