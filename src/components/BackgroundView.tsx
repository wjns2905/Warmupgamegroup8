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
        <div className="absolute inset-0 overflow-hidden">
          {/* Authentic Bedroom Illustration uploaded by user */}
          <img 
            src="./assets/backgrounds/bg_bedroom.jpg" 
            alt="Alex Bedroom" 
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
          />
          {/* Atmospheric ambient lighting & subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark/75 via-transparent to-midnight-dark/30 pointer-events-none" />
          <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-amber/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        </div>
      )}

      {bg === 'gateway' && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Authentic Digital Gateway & Level Up Portal */}
          <img 
            src="./assets/backgrounds/bg_gateway.jpg" 
            alt="Digital Gateway Portal" 
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark/60 via-transparent to-midnight-dark/30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet/20 blur-3xl pointer-events-none animate-pulse" />
        </div>
      )}

      {bg === 'swot_room' && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Authentic SWOT Strategy Room & Futuristic Hologram Portal */}
          <img 
            src="./assets/backgrounds/bg_swot_room.jpg" 
            alt="SWOT Strategy Room" 
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
          />
          {/* Atmospheric gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark/70 via-transparent to-midnight-dark/30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-violet/15 blur-3xl pointer-events-none animate-pulse-glow" />
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
