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
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="./assets/backgrounds/bg_smart_lab.jpg" 
            alt="Iris SMART Goal Lab" 
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark/75 via-transparent to-midnight-dark/30 pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] rounded-full bg-mint/15 blur-3xl pointer-events-none animate-pulse" />
        </div>
      )}

      {bg === 'fashion_store' && (
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="./assets/backgrounds/bg_fashion_store.jpg" 
            alt="Fashion Livestream Store" 
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark/75 via-transparent to-midnight-dark/30 pointer-events-none" />
          <div className="absolute top-16 left-20 border border-violet/40 rounded-xl p-4 bg-midnight/70 backdrop-blur-sm max-w-sm pointer-events-none shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-coral">
              <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping" />
              <span>LIVESTREAM SHOPPING STAGE</span>
            </div>
            <div className="mt-2 text-xs text-cream/90 font-medium">
              Điểm mạnh: Thiết kế theo mùa độc quyền + Khách hàng trung thành.
            </div>
            <div className="mt-1 text-xs text-mint font-medium">
              Cơ hội: Xu hướng mua sắm trực tuyến tăng trưởng vượt bậc!
            </div>
          </div>
        </div>
      )}

      {bg === 'career_fair' && (
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="./assets/backgrounds/bg_career_fair.jpg" 
            alt="University Career Fair" 
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark/75 via-transparent to-midnight-dark/30 pointer-events-none" />
          <div className="absolute top-16 right-20 border border-mint/40 rounded-xl p-4 bg-midnight/80 backdrop-blur-sm max-w-sm pointer-events-none shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-mint">
              <span className="text-amber">★</span>
              <span>UNIVERSITY CAREER & INTERNSHIP FAIR</span>
            </div>
            <div className="mt-2 text-xs text-cream/90 font-medium">
              Nhà trường kết nối sinh viên với các tập đoàn và doanh nghiệp du lịch.
            </div>
          </div>
        </div>
      )}

      {bg === 'library' && (
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="./assets/backgrounds/bg_library.jpg" 
            alt="University Silent Library" 
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark/75 via-transparent to-midnight-dark/30 pointer-events-none" />
          <div className="absolute bottom-28 left-20 border border-amber/40 rounded-xl p-3 bg-midnight/80 backdrop-blur-sm pointer-events-none shadow-lg">
            <span className="text-xs font-mono text-amber font-bold">📚 SILENT STUDY ZONE • 100% FOCUS</span>
          </div>
        </div>
      )}

      {bg === 'victory' && (
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="./assets/backgrounds/bg_victory.jpg" 
            alt="Level Up Hall of Fame" 
            className="w-full h-full object-cover object-center filter contrast-110 brightness-95"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-dark/75 via-transparent to-midnight-dark/25 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,202,100,0.2)_0%,_transparent_70%)] animate-pulse-glow pointer-events-none" />
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
