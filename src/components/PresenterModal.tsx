import React, { useState } from 'react';
import { GameScene } from '../types/game';
import { SWOT_QUESTIONS, PRESENTER_FAQ, SMART_GOAL_FULL } from '../data/gameContent';
import { X, ShieldCheck, HelpCircle, BookOpen, Clock, Award, CheckCircle2, ChevronRight } from 'lucide-react';

interface PresenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToScene: (scene: GameScene, questionIndex?: number) => void;
}

export const PresenterModal: React.FC<PresenterModalProps> = ({
  isOpen,
  onClose,
  onJumpToScene,
}) => {
  const [activeTab, setActiveTab] = useState<'SCENES' | 'ANSWERS' | 'FAQ'>('SCENES');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-cream border-4 border-navy rounded-3xl shadow-comic-xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b-3 border-navy flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange text-white border-2 border-navy rounded-xl shadow-comic-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-navy tracking-wide">
                PRESENTER CONTROL PANEL
              </h3>
              <p className="text-xs text-navy/70 font-heading font-bold">
                Bảng điều khiển dành riêng cho người thuyết trình / giảng viên
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-cream hover:bg-coral hover:text-white border-2 border-navy rounded-xl text-navy transition-colors shadow-comic-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b-3 border-navy bg-white/50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('SCENES')}
            className={`px-4 py-2 font-heading font-black text-xs rounded-t-xl border-t-2 border-x-2 border-navy transition-all ${
              activeTab === 'SCENES' ? 'bg-cream -mb-[3px] border-b-0 text-navy' : 'bg-white text-navy/60 hover:text-navy'
            }`}
          >
            🎮 ĐIỀU HƯỚNG PHÂN CẢNH
          </button>
          <button
            onClick={() => setActiveTab('ANSWERS')}
            className={`px-4 py-2 font-heading font-black text-xs rounded-t-xl border-t-2 border-x-2 border-navy transition-all ${
              activeTab === 'ANSWERS' ? 'bg-cream -mb-[3px] border-b-0 text-navy' : 'bg-white text-navy/60 hover:text-navy'
            }`}
          >
            📝 ĐÁP ÁN 8 CÂU SWOT
          </button>
          <button
            onClick={() => setActiveTab('FAQ')}
            className={`px-4 py-2 font-heading font-black text-xs rounded-t-xl border-t-2 border-x-2 border-navy transition-all ${
              activeTab === 'FAQ' ? 'bg-cream -mb-[3px] border-b-0 text-navy' : 'bg-white text-navy/60 hover:text-navy'
            }`}
          >
            💡 HƯỚNG DẪN THẢO LUẬN SMART
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'SCENES' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-heading font-black text-xs text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple" />
                  <span>Tổng quan các phân cảnh</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => { onJumpToScene('TITLE'); onClose(); }}
                    className="p-3 bg-white hover:bg-yellow border-2 border-navy rounded-xl shadow-comic-sm text-left font-heading font-bold text-xs text-navy transition-all"
                  >
                    1. Màn hình chính (Title Screen)
                  </button>
                  <button
                    onClick={() => { onJumpToScene('PROLOGUE'); onClose(); }}
                    className="p-3 bg-white hover:bg-yellow border-2 border-navy rounded-xl shadow-comic-sm text-left font-heading font-bold text-xs text-navy transition-all"
                  >
                    2. Prologue (Minh & 6 ngày 9 chương)
                  </button>
                  <button
                    onClick={() => { onJumpToScene('MEET_LINH'); onClose(); }}
                    className="p-3 bg-white hover:bg-yellow border-2 border-navy rounded-xl shadow-comic-sm text-left font-heading font-bold text-xs text-navy transition-all"
                  >
                    3. Gặp Linh & Tick (Giới thiệu SWOT)
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SWOT_COMPLETE'); onClose(); }}
                    className="p-3 bg-white hover:bg-mint border-2 border-navy rounded-xl shadow-comic-sm text-left font-heading font-bold text-xs text-navy transition-all"
                  >
                    4. Hoàn thành Chương 01: SWOT
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SMART_VIDEO'); onClose(); }}
                    className="p-3 bg-white hover:bg-orange text-navy hover:text-white border-2 border-navy rounded-xl shadow-comic-sm text-left font-heading font-bold text-xs transition-all"
                  >
                    5. Video tình huống trì hoãn
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SMART_DISCUSSION'); onClose(); }}
                    className="p-3 bg-white hover:bg-orange text-navy hover:text-white border-2 border-navy rounded-xl shadow-comic-sm text-left font-heading font-bold text-xs transition-all"
                  >
                    6. Thử thách thảo luận 2 phút
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SMART_KEYS'); onClose(); }}
                    className="p-3 bg-white hover:bg-purple text-navy hover:text-white border-2 border-navy rounded-xl shadow-comic-sm text-left font-heading font-bold text-xs transition-all"
                  >
                    7. Khám phá 5 trụ cột S-M-A-R-T
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SMART_PLAN'); onClose(); }}
                    className="p-3 bg-white hover:bg-mint border-2 border-navy rounded-xl shadow-comic-sm text-left font-heading font-bold text-xs text-navy transition-all"
                  >
                    8. Lịch học 5 ngày & Checklist 9 chương
                  </button>
                  <button
                    onClick={() => { onJumpToScene('VICTORY'); onClose(); }}
                    className="sm:col-span-2 p-3 bg-yellow hover:bg-orange text-navy hover:text-white border-2 border-navy rounded-xl shadow-comic-sm text-center font-heading font-black text-xs transition-all"
                  >
                    🏆 9. Màn hình Chiến thắng & Tổng kết (Victory)
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-black text-xs text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-mint" />
                  <span>Nhảy trực tiếp đến từng câu hỏi SWOT</span>
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {SWOT_QUESTIONS.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => { onJumpToScene('SWOT_QUIZ', idx); onClose(); }}
                      className="p-2.5 bg-white hover:bg-mint border-2 border-navy rounded-xl shadow-comic-sm text-center font-heading font-black text-xs text-navy transition-all"
                    >
                      Câu {q.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ANSWERS' && (
            <div className="space-y-3">
              <div className="p-3 bg-yellow border-2 border-navy rounded-2xl shadow-comic-sm font-heading font-black text-sm text-navy flex items-center justify-between">
                <span>🔑 BẢNG ĐÁP ÁN NHANH:</span>
                <span className="text-orange text-base tracking-widest">B - A - C - B - A - C - C - A</span>
              </div>

              <div className="space-y-2">
                {SWOT_QUESTIONS.map((q) => (
                  <div key={q.id} className="p-3 bg-white border-2 border-navy rounded-xl shadow-comic-sm text-xs font-heading">
                    <div className="flex items-center justify-between font-bold text-navy mb-1">
                      <span>{q.title}</span>
                      <span className="px-2 py-0.5 bg-mint text-navy font-black rounded-lg border border-navy">
                        Đáp án {q.correctKey}
                      </span>
                    </div>
                    <p className="text-navy/70 text-[11px] font-sans">{q.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'FAQ' && (
            <div className="space-y-4">
              <div className="p-4 bg-white border-2 border-navy rounded-2xl shadow-comic-sm">
                <span className="font-heading font-black text-xs text-purple uppercase tracking-wider block mb-1">
                  MỤC TIÊU SMART HOÀN CHỈNH (CHÍNH TÀI LIỆU):
                </span>
                <p className="text-xs sm:text-sm font-heading font-bold text-navy leading-relaxed">
                  "{SMART_GOAL_FULL}"
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="font-heading font-black text-xs text-navy uppercase tracking-wider block">
                  ĐỊNH HƯỚNG GIẢI THÍCH KHI KHÁN GIẢ GÓP Ý:
                </span>
                {PRESENTER_FAQ.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-white border-2 border-navy rounded-xl shadow-comic-sm text-xs">
                    <p className="font-heading font-bold text-navy mb-1 text-[11px] sm:text-xs text-orange">
                      ❓ {faq.q}
                    </p>
                    <p className="font-sans text-navy/80 text-[11px] leading-relaxed">
                      💡 <b>Hướng dẫn trả lời:</b> {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
