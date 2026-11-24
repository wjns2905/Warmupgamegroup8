import React from 'react';
import { BackgroundId } from '../types/game';

interface BackgroundViewProps {
  bg: BackgroundId;
  children?: React.ReactNode;
}

export const BackgroundView: React.FC<BackgroundViewProps> = ({ bg, children }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-700">
      {/* Background specific styling */}
      {bg === 'campus' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c244b] via-[#24336a] to-[#12162d]">
          {/* Stylized Anime Campus Sunbeam and Buildings */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber/30 via-transparent to-transparent" />
          <svg className="absolute bottom-0 w-full h-3/5 text-[#141b3a] opacity-80" viewBox="0 0 1440 400" preserveAspectRatio="none">
            <rect x="100" y="80" width="220" height="320" rx="4" fill="currentColor" opacity="0.6" />
            <rect x="360" y="40" width="340" height="360" rx="6" fill="#1b244d" />
            <rect x="740" y="100" width="280" height="300" rx="4" fill="currentColor" opacity="0.7" />
            <rect x="1060" y="60" width="300" height="340" rx="4" fill="#182042" />
          </svg>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(88,205,181,0.15),transparent_40%)]" />
        </div>
      )}

      {bg === 'bedroom' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#14172e] via-[#1a1f3d] to-[#0d0f1f]">
          {/* Cozy Evening Student Room with Laptop Glow */}
          <div className="absolute top-12 left-16 w-72 h-80 rounded-xl border border-violet/30 bg-[#1e254d]/40 backdrop-blur-sm p-4">
            <div className="text-xs font-digital text-amber/80 flex justify-between items-center border-b border-violet/20 pb-2">
              <span>📅 EXAM COUNTDOWN</span>
              <span className="text-coral animate-pulse">6 DAYS LEFT</span>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-1 text-[10px] text-cream/60 text-center font-mono">
              <div className="text-amber">T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div className="text-coral font-bold">T7</div><div className="text-coral font-bold">CN</div>
              <div className="p-1">1</div><div className="p-1">2</div><div className="p-1">3</div><div className="p-1">4</div><div className="p-1">5</div>
              <div className="p-1 bg-violet/40 rounded text-cream font-bold">6</div>
              <div className="p-1 bg-coral/30 rounded text-coral font-bold ring-1 ring-coral">EXAM</div>
            </div>
            <div className="mt-6 p-2 rounded bg-midnight-dark/80 border border-violet/30 text-[11px] text-cream/70">
              <span className="text-amber font-semibold">Tình trạng:</span> 9 chương chưa ôn tập
            </div>
          </div>
          <div className="absolute bottom-0 right-1/4 w-96 h-64 bg-violet/15 blur-3xl rounded-full" />
        </div>
      )}

      {bg === 'gateway' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1b1238] via-[#2d1b54] to-[#0c091f]">
          {/* Hyperspace Digital Portal Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#7855D920_1px,transparent_1px),linear-gradient(to_bottom,#7855D920_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-violet via-mint/40 to-amber/30 blur-2xl opacity-40 animate-pulse-glow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-violet/60 rounded-full animate-spin [animation-duration:20s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-mint/40 rounded-full animate-spin [animation-duration:35s]" />
        </div>
      )}

      {bg === 'swot_room' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#171B35] via-[#201c45] to-[#0f1124]">
          {/* Hologram SWOT Matrix Room */}
          <div className="absolute inset-0 bg-[radial-gradient(#7855D9_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
          <div className="absolute inset-x-20 top-16 bottom-32 grid grid-cols-2 grid-rows-2 gap-6 opacity-25 pointer-events-none">
            <div className="border border-violet/50 rounded-2xl p-6 bg-violet/5 flex flex-col justify-between">
              <span className="font-heading font-black text-4xl text-violet">S // STRENGTHS</span>
              <span className="text-xs tracking-widest text-violet/80 font-mono">INTERNAL ENVIRONMENT</span>
            </div>
            <div className="border border-coral/40 rounded-2xl p-6 bg-coral/5 flex flex-col justify-between">
              <span className="font-heading font-black text-4xl text-coral">W // WEAKNESSES</span>
              <span className="text-xs tracking-widest text-coral/80 font-mono">INTERNAL ENVIRONMENT</span>
            </div>
            <div className="border border-mint/40 rounded-2xl p-6 bg-mint/5 flex flex-col justify-between">
              <span className="font-heading font-black text-4xl text-mint">O // OPPORTUNITIES</span>
              <span className="text-xs tracking-widest text-mint/80 font-mono">EXTERNAL ENVIRONMENT</span>
            </div>
            <div className="border border-amber/40 rounded-2xl p-6 bg-amber/5 flex flex-col justify-between">
              <span className="font-heading font-black text-4xl text-amber">T // THREATS</span>
              <span className="text-xs tracking-widest text-amber/80 font-mono">EXTERNAL ENVIRONMENT</span>
            </div>
          </div>
        </div>
      )}

      {bg === 'smart_lab' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#122228] via-[#152e35] to-[#0a1418]">
          <div className="absolute inset-0 bg-[radial-gradient(#58CDB5_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-mint/15 to-transparent pointer-events-none" />
          <div className="absolute top-20 right-24 w-80 h-64 border border-mint/30 rounded-xl bg-midnight/40 p-4 opacity-40">
            <div className="text-xs font-digital text-mint flex items-center justify-between border-b border-mint/30 pb-2">
              <span>🎯 SMART TARGET PROTOCOL</span>
              <span className="text-amber">V.2.0</span>
            </div>
            <div className="mt-3 space-y-2 text-[11px] font-mono text-cream/70">
              <div className="flex justify-between"><span>Specific (Cụ thể)</span><span className="text-mint">Ready</span></div>
              <div className="flex justify-between"><span>Measurable (Đo lường)</span><span className="text-mint">Ready</span></div>
              <div className="flex justify-between"><span>Achievable (Khả thi)</span><span className="text-mint">Ready</span></div>
              <div className="flex justify-between"><span>Relevant (Liên quan)</span><span className="text-mint">Ready</span></div>
              <div className="flex justify-between"><span>Time-bound (Thời hạn)</span><span className="text-mint">Ready</span></div>
            </div>
          </div>
        </div>
      )}

      {bg === 'fashion_store' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#251b3a] via-[#1f1a3b] to-[#120f26]">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber/40 via-transparent to-transparent" />
          <div className="absolute top-16 left-20 border border-violet/40 rounded-xl p-4 bg-midnight/60 backdrop-blur-sm max-w-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-coral">
              <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping" />
              <span>LIVESTREAM SHOPPING STAGE</span>
            </div>
            <div className="mt-2 text-xs text-cream/80">
              Điểm mạnh: Thiết kế theo mùa độc quyền + Khách hàng trung thành.
            </div>
            <div className="mt-1 text-xs text-mint">
              Cơ hội: Xu hướng mua sắm trực tuyến tăng trưởng vượt bậc!
            </div>
          </div>
        </div>
      )}

      {bg === 'career_fair' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#18263a] via-[#192b45] to-[#0e1728]">
          <div className="absolute top-16 right-20 border border-mint/40 rounded-xl p-4 bg-midnight/70 backdrop-blur-sm max-w-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-mint">
              <span className="text-amber">★</span>
              <span>UNIVERSITY CAREER & INTERNSHIP FAIR</span>
            </div>
            <div className="mt-2 text-xs text-cream/80">
              Nhà trường kết nối sinh viên với các tập đoàn và doanh nghiệp du lịch.
            </div>
          </div>
        </div>
      )}

      {bg === 'library' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#242232] via-[#2b253b] to-[#14121d]">
          <div className="absolute top-0 inset-x-0 h-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber/20 via-transparent to-transparent" />
          <div className="absolute bottom-28 left-20 border border-amber/30 rounded-xl p-4 bg-midnight/60 backdrop-blur-sm">
            <span className="text-xs font-mono text-amber">📚 SILENT STUDY ZONE • 100% FOCUS</span>
          </div>
        </div>
      )}

      {bg === 'victory' && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1340] via-[#243a4e] to-[#0b1324]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,202,100,0.25)_0%,_transparent_70%)] animate-pulse-glow" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(120,85,217,0.15)_25%,transparent_25%),linear-gradient(-45deg,rgba(88,205,181,0.15)_25%,transparent_25%)] bg-[size:3rem_3rem]" />
        </div>
      )}

      <div className="scanlines absolute inset-0 z-10" />
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.7)] z-10" />

      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
};
