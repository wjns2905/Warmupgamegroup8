import React, { useState } from 'react';
import { GameScene } from '../types/game';
import { PRESENTER_SITUATIONS } from '../data/gameContent';
import { soundManager } from '../utils/audio';
import { X, Play, RotateCcw, Volume2, ShieldAlert, Award, Compass, CheckSquare, FastForward } from 'lucide-react';

interface PresenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScene: GameScene;
  onJumpToScene: (scene: GameScene, swotIndex?: number) => void;
  onResetGame: () => void;
  onUnlockAllChapters: () => void;
  onMaxXP: () => void;
}

export const PresenterModal: React.FC<PresenterModalProps> = ({
  isOpen,
  onClose,
  currentScene,
  onJumpToScene,
  onResetGame,
  onUnlockAllChapters,
  onMaxXP,
}) => {
  const [activeTab, setActiveTab] = useState<'jump' | 'cheat' | 'notes' | 'settings'>('jump');
  const [volume, setVolume] = useState(0.8);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-dark/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-midnight border-2 border-violet/70 rounded-2xl shadow-[0_0_50px_rgba(120,85,217,0.5)] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-violet-dark via-midnight to-midnight border-b border-violet/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber text-midnight font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-black text-cream flex items-center gap-2">
                BẢNG ĐIỀU KHIỂN DÀNH CHO NGƯỜI THUYẾT TRÌNH
                <span className="text-xs px-2 py-0.5 rounded bg-violet text-cream font-mono">PRESENTER MODE</span>
              </h2>
              <p className="text-xs text-cream/70">Điều khiển luồng trò chơi, tra cứu đáp án và hướng dẫn giải thích thảo luận.</p>
            </div>
          </div>

          <button 
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-cream/60 hover:text-coral hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-violet/30 bg-midnight-dark/60 px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('jump')}
            className={`px-4 py-2 font-heading font-bold text-xs rounded-t-lg transition-colors flex items-center gap-2 border-t border-x ${
              activeTab === 'jump'
                ? 'bg-midnight border-violet/60 text-amber'
                : 'border-transparent text-cream/60 hover:text-cream'
            }`}
          >
            <FastForward className="w-4 h-4" />
            <span>Chuyển Cảnh Nhanh</span>
          </button>

          <button
            onClick={() => setActiveTab('cheat')}
            className={`px-4 py-2 font-heading font-bold text-xs rounded-t-lg transition-colors flex items-center gap-2 border-t border-x ${
              activeTab === 'cheat'
                ? 'bg-midnight border-violet/60 text-mint'
                : 'border-transparent text-cream/60 hover:text-cream'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>Đáp Án & Gợi Ý Trả Lời</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 font-heading font-bold text-xs rounded-t-lg transition-colors flex items-center gap-2 border-t border-x ${
              activeTab === 'notes'
                ? 'bg-midnight border-violet/60 text-violet-light'
                : 'border-transparent text-cream/60 hover:text-cream'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Kịch Bản Thảo Luận (4 Tình Huống)</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-heading font-bold text-xs rounded-t-lg transition-colors flex items-center gap-2 border-t border-x ${
              activeTab === 'settings'
                ? 'bg-midnight border-violet/60 text-cream'
                : 'border-transparent text-cream/60 hover:text-cream'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tiện Ích & Cài Đặt</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
          {activeTab === 'jump' && (
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase text-cream/60 tracking-wider">Chọn phân cảnh cần chuyển tới ngay lập tức:</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                <button
                  onClick={() => onJumpToScene('TITLE')}
                  className="p-3 text-left rounded-lg bg-midnight-light/80 hover:bg-violet/30 border border-violet/30 hover:border-amber transition-all text-xs font-semibold"
                >
                  <span className="text-amber block font-mono text-[10px]">SCENE 01</span>
                  Màn Hình Mở Đầu (Title Screen)
                </button>

                <button
                  onClick={() => onJumpToScene('PROLOGUE')}
                  className="p-3 text-left rounded-lg bg-midnight-light/80 hover:bg-violet/30 border border-violet/30 hover:border-amber transition-all text-xs font-semibold"
                >
                  <span className="text-amber block font-mono text-[10px]">SCENE 02</span>
                  Prologue: 5 Phút Nữa (Alex & Glitch)
                </button>

                <button
                  onClick={() => onJumpToScene('MEET_NOVA')}
                  className="p-3 text-left rounded-lg bg-midnight-light/80 hover:bg-violet/30 border border-violet/30 hover:border-amber transition-all text-xs font-semibold"
                >
                  <span className="text-amber block font-mono text-[10px]">SCENE 03</span>
                  Gặp Nova & Giới Thiệu SWOT
                </button>
              </div>

              <div className="p-3 rounded-xl bg-violet/10 border border-violet/30">
                <span className="text-xs font-bold text-violet-light block mb-2 font-heading">
                  Chương 01: 8 Câu Hỏi SWOT (B - A - C - B - A - C - C - A)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((qNum) => (
                    <button
                      key={qNum}
                      onClick={() => onJumpToScene('SWOT_QUIZ', qNum - 1)}
                      className="p-2 text-center rounded bg-midnight/80 hover:bg-violet border border-violet/40 text-xs font-mono text-cream transition-colors"
                    >
                      Câu {qNum}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => onJumpToScene('SWOT_COMPLETE')}
                  className="mt-2 w-full py-1.5 rounded bg-violet/40 hover:bg-violet text-cream text-xs font-bold text-center transition-colors"
                >
                  Tổng Kết SWOT (SWOT Complete Screen)
                </button>
              </div>

              <div className="p-3 rounded-xl bg-mint/10 border border-mint/30">
                <span className="text-xs font-bold text-mint block mb-2 font-heading">
                  Chương 02: Thiết Lập Mục Tiêu SMART
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  <button
                    onClick={() => onJumpToScene('SMART_INTRO')}
                    className="p-2 text-left rounded bg-midnight/80 hover:bg-mint/30 border border-mint/40 text-xs text-cream"
                  >
                    1. Giới thiệu SMART (Vòng lặp)
                  </button>
                  <button
                    onClick={() => onJumpToScene('SMART_VIDEO')}
                    className="p-2 text-left rounded bg-midnight/80 hover:bg-mint/30 border border-mint/40 text-xs text-cream"
                  >
                    2. Video Tình Huống YouTube
                  </button>
                  <button
                    onClick={() => onJumpToScene('SMART_DISCUSSION')}
                    className="p-2 text-left rounded bg-midnight/80 hover:bg-mint/30 border border-mint/40 text-xs text-cream font-bold text-amber"
                  >
                    3. Đồng Hồ 2 Phút Thảo Luận
                  </button>
                  <button
                    onClick={() => onJumpToScene('SMART_KEYS')}
                    className="p-2 text-left rounded bg-midnight/80 hover:bg-mint/30 border border-mint/40 text-xs text-cream"
                  >
                    4. Khám Phá 5 Thẻ S-M-A-R-T
                  </button>
                  <button
                    onClick={() => onJumpToScene('SMART_MINIGAME')}
                    className="p-2 text-left rounded bg-midnight/80 hover:bg-mint/30 border border-mint/40 text-xs text-cream"
                  >
                    5. Mini-game Xây Dựng SMART
                  </button>
                  <button
                    onClick={() => onJumpToScene('SMART_GOAL_REVEAL')}
                    className="p-2 text-left rounded bg-midnight/80 hover:bg-mint/30 border border-mint/40 text-xs text-cream font-bold text-mint"
                  >
                    6. Công Bố Mục Tiêu Hoàn Chỉnh
                  </button>
                  <button
                    onClick={() => onJumpToScene('ACTION_PLAN')}
                    className="p-2 text-left rounded bg-midnight/80 hover:bg-mint/30 border border-mint/40 text-xs text-cream"
                  >
                    7. Kế Hoạch 5 Ngày & Checklist
                  </button>
                  <button
                    onClick={() => onJumpToScene('DEFEAT_GLITCH')}
                    className="p-2 text-left rounded bg-midnight/80 hover:bg-coral/30 border border-coral/40 text-xs text-coral font-bold"
                  >
                    8. Đánh Bại Glitch
                  </button>
                  <button
                    onClick={() => onJumpToScene('VICTORY')}
                    className="p-2 text-left rounded bg-midnight/80 hover:bg-amber/30 border border-amber/40 text-xs text-amber font-bold"
                  >
                    9. Màn Hình Chiến Thắng
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cheat' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-violet/10 border border-violet/40">
                <h4 className="text-sm font-bold text-violet-light font-heading mb-2">Đáp án 8 Câu Hỏi SWOT:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-midnight/80 border border-violet/20">
                    <span className="font-bold text-amber">Câu 1:</span> B (Strengths, Weaknesses, Opportunities, Threats)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-violet/20">
                    <span className="font-bold text-amber">Câu 2:</span> A (Đòi hỏi sự phán đoán & tài năng nhà quản trị)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-violet/20">
                    <span className="font-bold text-amber">Câu 3:</span> C (Đối thủ cạnh tranh mới gia nhập giá rẻ)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-violet/20">
                    <span className="font-bold text-amber">Câu 4:</span> B (Livestream bộ sưu tập mới)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-violet/20">
                    <span className="font-bold text-amber">Câu 5:</span> A (Sử dụng điểm mạnh để khai thác cơ hội)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-violet/20">
                    <span className="font-bold text-amber">Câu 6:</span> C (Điểm mạnh và điểm yếu)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-violet/20">
                    <span className="font-bold text-amber">Câu 7:</span> C (Cơ hội - O)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-violet/20">
                    <span className="font-bold text-amber">Câu 8:</span> A (Điểm mạnh và điểm yếu)
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-mint/10 border border-mint/40">
                <h4 className="text-sm font-bold text-mint font-heading mb-2">Đáp án Mini Game SMART:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-midnight/80 border border-mint/20">
                    <span className="font-bold text-mint">Specific:</span> B (Đọc hiểu, tóm tắt và ôn tập đủ 9 chương)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-mint/20">
                    <span className="font-bold text-mint">Measurable:</span> A (Theo dõi trên checklist 9 chương)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-mint/20">
                    <span className="font-bold text-mint">Achievable:</span> C (Chia 9 chương thành các phần nhỏ trong 5 ngày)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-mint/20">
                    <span className="font-bold text-mint">Relevant:</span> B (Tập trung vào môn thi và hạn chế xao nhãng)
                  </div>
                  <div className="p-2 rounded bg-midnight/80 border border-mint/20">
                    <span className="font-bold text-mint">Time-bound:</span> A (Hoàn thành trước 22 giờ ngày trước kỳ thi)
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <p className="text-xs text-cream/70">
                Gợi ý phản hồi tương tác khi khán giả đưa ra ý kiến trong buổi thuyết trình:
              </p>
              {PRESENTER_SITUATIONS.map((sit) => (
                <div key={sit.id} className="p-3.5 rounded-xl bg-midnight-light/80 border border-violet/30">
                  <h5 className="text-xs font-bold text-amber font-heading">{sit.title}</h5>
                  <p className="mt-1 text-xs text-cream/85 leading-relaxed">{sit.guidance}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-midnight-light/80 border border-violet/30 space-y-3">
                <h4 className="text-xs font-bold text-cream font-heading">Phím Tắt Điều Khiển:</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-cream/80">
                  <div><kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">Space</kbd> / <kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">Enter</kbd>: Tiến tới câu thoại</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">A</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">B</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">C</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">D</kbd>: Chọn đáp án</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">F</kbd>: Bật/Tắt Toàn Màn Hình</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">M</kbd>: Bật/Tắt Âm Thanh</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">P</kbd>: Mở Menu Presenter</div>
                  <div><kbd className="px-1.5 py-0.5 rounded bg-violet/40 text-cream">Esc</kbd>: Đóng Menu</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-midnight-light/80 border border-violet/30 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-cream">Âm Lượng Tổng</h4>
                  <p className="text-[11px] text-cream/60">Điều chỉnh mức âm thanh hiệu ứng và nhạc nền.</p>
                </div>
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-amber" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      setVolume(v);
                      soundManager.setVolume(v);
                    }}
                    className="w-32 accent-amber"
                  />
                  <span className="text-xs font-mono text-cream w-8">{Math.round(volume * 100)}%</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    soundManager.playLevelUp();
                    onMaxXP();
                  }}
                  className="px-4 py-2 rounded-lg bg-amber/20 hover:bg-amber/30 border border-amber/50 text-amber text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Cộng Thử Nghiệm Max XP (1300 XP)</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playCorrect();
                    onUnlockAllChapters();
                  }}
                  className="px-4 py-2 rounded-lg bg-mint/20 hover:bg-mint/30 border border-mint/50 text-mint text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Hoàn Thành 9/9 Chương Ngay</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Khởi động lại toàn bộ game từ đầu?')) {
                      onResetGame();
                      onClose();
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-coral/20 hover:bg-coral/30 border border-coral/50 text-coral text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi Lại Từ Đầu (Reset Game)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-midnight-dark/90 border-t border-violet/30 flex items-center justify-between text-xs text-cream/60">
          <span>Phím tắt: Bấm [P] để bật/tắt menu này bất cứ lúc nào</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-violet hover:bg-violet-light text-cream font-bold transition-colors"
          >
            Đóng Menu
          </button>
        </div>
      </div>
    </div>
  );
};
