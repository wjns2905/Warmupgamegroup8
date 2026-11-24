import React, { useEffect, useState } from 'react';
import { BackgroundView } from '../components/BackgroundView';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, Home, Sparkles, Compass, Flame, Shield, HelpCircle } from 'lucide-react';

interface VictorySceneProps {
  totalXP: number;
  level: number;
  levelName: string;
  swotCorrectFirstAttempt: number;
  smartMinigameScore: number;
  onPlayAgain: () => void;
  onReviewSwot: () => void;
  onReviewSmart: () => void;
  onReturnToMenu: () => void;
}

export const VictoryScene: React.FC<VictorySceneProps> = ({
  totalXP,
  level,
  levelName,
  swotCorrectFirstAttempt,
  smartMinigameScore,
  onPlayAgain,
  onReviewSwot,
  onReviewSmart,
  onReturnToMenu,
}) => {
  useEffect(() => {
    soundManager.playLevelUp();
    try {
      const end = Date.now() + 2.5 * 1000;
      const interval: number = window.setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#7855D9', '#58CDB5', '#FFCA64', '#42D392', '#FFFFFF']
        });
      }, 250);
    } catch {}
  }, []);

  const badges = [
    { title: 'SWOT Explorer', desc: 'Mở khóa 8 yếu tố chiến lược', icon: <Shield className="w-4 h-4 text-violet" /> },
    { title: 'Strategic Thinker', desc: 'Phối hợp các tổ hợp SO, WO, ST', icon: <Compass className="w-4 h-4 text-amber" /> },
    { title: 'SMART Architect', desc: 'Làm chủ 5 tiêu chí thiết lập mục tiêu', icon: <Award className="w-4 h-4 text-mint" /> },
    { title: 'Procrastination Breaker', desc: 'Đánh bại quái vật Glitch', icon: <Flame className="w-4 h-4 text-coral" /> },
    { title: 'Self-Discovery Hero', desc: 'Nâng cấp chính mình thành công!', icon: <Sparkles className="w-4 h-4 text-amber" /> },
  ];

  return (
    <BackgroundView bg="victory">
      <div className="relative z-20 w-full h-full max-w-6xl mx-auto px-6 py-8 flex flex-col justify-between overflow-y-auto">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber/20 border border-amber text-amber text-xs font-digital font-bold tracking-widest uppercase animate-pulse-glow">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>MISSION ACCOMPLISHED • SELF-DISCOVERY QUEST</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-heading font-black tracking-tight text-white drop-shadow-[0_0_25px_rgba(255,202,100,0.6)]">
            LEVEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber via-amber-light to-mint">UP!</span>
          </h1>
          <p className="text-xs sm:text-sm font-heading font-bold text-mint tracking-wider">
            CHÚC MỪNG BẠN ĐÃ HOÀN THÀNH TOÀN BỘ HÀNH TRÌNH KHÁM PHÁ VÀ NÂNG CẤP BẢN THÂN!
          </p>
        </div>

        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 p-5 rounded-2xl bg-midnight/90 border-2 border-violet/60 shadow-xl backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-violet/30 pb-3">
              <span className="text-xs font-mono font-bold text-cream/70">KẾT QUẢ TỔNG KẾT:</span>
              <span className="px-2.5 py-0.5 rounded bg-amber/20 border border-amber text-amber font-digital font-bold text-xs">
                Lv.{level} {levelName}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center p-2 rounded bg-midnight-dark/80">
                <span className="text-cream/80">Thử thách SWOT:</span>
                <span className="font-bold text-mint">8 / 8 (Đúng lần đầu: {swotCorrectFirstAttempt})</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded bg-midnight-dark/80">
                <span className="text-cream/80">Chìa khóa SMART:</span>
                <span className="font-bold text-mint">5 / 5 Đã Mở Khóa</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded bg-midnight-dark/80">
                <span className="text-cream/80">Điểm Mini-game:</span>
                <span className="font-bold text-amber">+{smartMinigameScore} XP</span>
              </div>

              <div className="flex justify-between items-center p-2 rounded bg-midnight-dark/80">
                <span className="text-cream/80">Kế hoạch ôn tập:</span>
                <span className="font-bold text-mint">9 / 9 Chương Sẵn Sàng</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-amber/20 to-midnight border border-amber/40">
                <span className="font-mono text-cream/80 font-bold">TỔNG XP ĐẠT ĐƯỢC:</span>
                <span className="text-lg font-digital font-black text-amber">{totalXP} XP</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="p-4 rounded-2xl bg-midnight/90 border border-mint/40 backdrop-blur-md">
              <span className="text-xs font-mono font-bold text-mint uppercase tracking-wider block mb-2">
                HUY HIỆU DANH GIÁ ĐÃ MỞ KHÓA:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {badges.map((b) => (
                  <div key={b.title} className="p-2.5 rounded-xl bg-midnight-dark/80 border border-violet/30 flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-midnight border border-white/10 shrink-0">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-cream font-heading">{b.title}</h4>
                      <p className="text-[10px] text-cream/60">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#171b35] via-[#241c48] to-[#122228] border-2 border-amber/50 shadow-[0_0_20px_rgba(255,202,100,0.3)] backdrop-blur-md text-center space-y-2">
              <blockquote className="text-sm sm:text-base font-sans font-bold text-cream leading-relaxed italic">
                “Biết mình đang ở đâu là bước đầu tiên. <br />
                Biết mình muốn đi đâu là bước tiếp theo. <br />
                Và hành động chính là điều đưa mình đến đó.”
              </blockquote>
            </div>

            <div className="p-4 rounded-2xl bg-midnight/90 border border-mint/40 text-xs sm:text-sm text-cream/90 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber shrink-0" />
                <span className="font-semibold">
                  CÂU HỎI TƯƠNG TÁC LỚP HỌC: “Nếu được đặt một mục tiêu SMART cho chính mình ngay hôm nay, bạn sẽ chọn mục tiêu gì?”
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-violet/20 pt-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onReviewSwot();
              }}
              className="px-4 py-2 rounded-xl bg-midnight/80 hover:bg-violet/30 border border-violet/40 text-cream text-xs font-bold transition-all"
            >
              Ôn Lại SWOT
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onReviewSmart();
              }}
              className="px-4 py-2 rounded-xl bg-midnight/80 hover:bg-mint/30 border border-mint/40 text-cream text-xs font-bold transition-all"
            >
              Ôn Lại SMART
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundManager.playClick();
                onPlayAgain();
              }}
              className="px-5 py-2.5 rounded-xl bg-violet/40 hover:bg-violet border border-violet-light text-cream text-xs font-bold transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi Lại Từ Đầu</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onReturnToMenu();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-mint to-amber text-midnight font-heading font-black text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(88,205,181,0.6)]"
            >
              <Home className="w-4 h-4" />
              <span>TRỞ VỀ MENU CHÍNH</span>
            </button>
          </div>
        </div>
      </div>
    </BackgroundView>
  );
};
