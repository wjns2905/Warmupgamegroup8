import React, { useState } from 'react';
import { GameScene } from '../types/game';
import { SWOT_QUESTIONS, SMART_GAME_QUESTIONS, PRESENTER_FAQ, SMART_GOAL_FULL, VIDEO_DATA } from '../data/gameContent';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151C45]/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FFF4DF] border-4 border-[#151C45] rounded-3xl shadow-[8px_8px_0px_#151C45] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b-3 border-[#151C45] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#FF8426] text-white border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-black text-lg text-[#151C45] tracking-wide">
                WARM UP GAME - PRESENTER CONTROL
              </h3>
              <p className="text-xs text-[#151C45]/70 font-heading font-bold">
                Bảng điều khiển & tài liệu dành riêng cho người thuyết trình / giảng viên
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#FFF4DF] hover:bg-[#F47E93] hover:text-white border-2 border-[#151C45] rounded-xl text-[#151C45] transition-colors shadow-[2px_2px_0px_#151C45]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b-3 border-[#151C45] bg-white/50 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('SCENES')}
            className={`px-4 py-2 font-heading font-black text-xs rounded-t-xl border-t-2 border-x-2 border-[#151C45] transition-all ${
              activeTab === 'SCENES' ? 'bg-[#FFF4DF] -mb-[3px] border-b-0 text-[#151C45]' : 'bg-white text-[#151C45]/60 hover:text-[#151C45]'
            }`}
          >
            🎮 ĐIỀU HƯỚNG CÁC PHẦN
          </button>
          <button
            onClick={() => setActiveTab('ANSWERS')}
            className={`px-4 py-2 font-heading font-black text-xs rounded-t-xl border-t-2 border-x-2 border-[#151C45] transition-all ${
              activeTab === 'ANSWERS' ? 'bg-[#FFF4DF] -mb-[3px] border-b-0 text-[#151C45]' : 'bg-white text-[#151C45]/60 hover:text-[#151C45]'
            }`}
          >
            📝 ĐÁP ÁN 10 CÂU SWOT & SMART
          </button>
          <button
            onClick={() => setActiveTab('FAQ')}
            className={`px-4 py-2 font-heading font-black text-xs rounded-t-xl border-t-2 border-x-2 border-[#151C45] transition-all ${
              activeTab === 'FAQ' ? 'bg-[#FFF4DF] -mb-[3px] border-b-0 text-[#151C45]' : 'bg-white text-[#151C45]/60 hover:text-[#151C45]'
            }`}
          >
            🎙️ LỜI DẪN DIỄN GIẢ & FAQ
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'SCENES' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-heading font-black text-xs text-[#151C45] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7965F2]" />
                  <span>Tổng quan lộ trình Warm Up Game</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => { onJumpToScene('WARMUP_INTRO'); onClose(); }}
                    className="p-3 bg-white hover:bg-[#FFD343] border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-left font-heading font-bold text-xs text-[#151C45] transition-all"
                  >
                    1. Khởi động Warm Up Game (Intro)
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SWOT_QUIZ', 0); onClose(); }}
                    className="p-3 bg-white hover:bg-[#55C7AA] border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-left font-heading font-bold text-xs text-[#151C45] transition-all"
                  >
                    2. Phần 1: 10 Câu thử thách SWOT
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SWOT_COMPLETE'); onClose(); }}
                    className="p-3 bg-white hover:bg-[#FFD343] border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-left font-heading font-bold text-xs text-[#151C45] transition-all"
                  >
                    3. Tổng kết Phần SWOT
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SMART_VIDEO'); onClose(); }}
                    className="p-3 bg-white hover:bg-[#FF8426] text-[#151C45] hover:text-white border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-left font-heading font-bold text-xs transition-all"
                  >
                    4. Phần 2: Trình chiếu Video tình huống
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SMART_DISCUSSION'); onClose(); }}
                    className="p-3 bg-white hover:bg-[#FF8426] text-[#151C45] hover:text-white border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-left font-heading font-bold text-xs transition-all"
                  >
                    5. Phần 3: Thử thách thảo luận 2 phút
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SMART_INTRO'); onClose(); }}
                    className="p-3 bg-white hover:bg-[#7965F2] text-[#151C45] hover:text-white border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-left font-heading font-bold text-xs transition-all"
                  >
                    6. Slide 3: Giới thiệu SMART (S - M - A - R - T)
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SMART_THEORY'); onClose(); }}
                    className="p-3 bg-white hover:bg-[#7965F2] text-[#151C45] hover:text-white border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-left font-heading font-bold text-xs transition-all"
                  >
                    7. Slide 4: Mục tiêu SMART hoàn chỉnh & 5 Tiêu chí
                  </button>
                  <button
                    onClick={() => { onJumpToScene('SMART_GAME'); onClose(); }}
                    className="p-3 bg-white hover:bg-[#55C7AA] border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-left font-heading font-bold text-xs text-[#151C45] transition-all"
                  >
                    8. Phần 5: Trò chơi thực hành SMART & Checklist
                  </button>
                  <button
                    onClick={() => { onJumpToScene('VICTORY'); onClose(); }}
                    className="sm:col-span-2 p-3 bg-[#FFD343] hover:bg-[#FF8426] text-[#151C45] hover:text-white border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-center font-heading font-black text-xs transition-all"
                  >
                    🏆 9. Tổng kết & Vinh danh chiến thắng (Victory)
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-black text-xs text-[#151C45] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#55C7AA]" />
                  <span>Nhảy trực tiếp đến 10 câu hỏi SWOT</span>
                </h4>
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                  {SWOT_QUESTIONS.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => { onJumpToScene('SWOT_QUIZ', idx); onClose(); }}
                      className="p-2 bg-white hover:bg-[#55C7AA] border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-center font-heading font-black text-xs text-[#151C45] transition-all"
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
              <div className="p-3 bg-[#FFD343] border-2 border-[#151C45] rounded-2xl shadow-[2px_2px_0px_#151C45] font-heading font-black text-xs sm:text-sm text-[#151C45] flex items-center justify-between">
                <span>🔑 BẢNG ĐÁP ÁN 10 CÂU SWOT:</span>
                <span className="text-[#FF8426] text-xs sm:text-sm tracking-wider font-mono">B-A-C-B-A-C-C-A-B-A</span>
              </div>

              <div className="space-y-2">
                <span className="font-heading font-black text-xs text-[#151C45] block">10 CÂU HỎI & GIẢI THÍCH CHI TIẾT SWOT:</span>
                {SWOT_QUESTIONS.map((q) => (
                  <div key={q.id} className="p-2.5 bg-white border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-xs font-heading">
                    <div className="flex items-center justify-between font-bold text-[#151C45] mb-1">
                      <span>{q.title}</span>
                      <span className="px-2 py-0.5 bg-[#55C7AA] text-[#151C45] font-black rounded-lg border border-[#151C45]">
                        Đáp án {q.correctKey}
                      </span>
                    </div>
                    <p className="text-[#151C45]/80 text-[11px] font-sans">{q.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-2 border-t-2 border-[#151C45]">
                <span className="font-heading font-black text-xs text-[#7965F2] block">5 THỬ THÁCH SMART GAME:</span>
                {SMART_GAME_QUESTIONS.map((sq) => (
                  <div key={sq.id} className="p-2.5 bg-white border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-xs font-heading">
                    <div className="flex items-center justify-between font-bold text-[#151C45] mb-1">
                      <span>{sq.title}</span>
                      <span className="px-2 py-0.5 bg-[#7965F2] text-white font-black rounded-lg border border-[#151C45]">
                        Đáp án {sq.correctKey}
                      </span>
                    </div>
                    <p className="text-[#151C45]/80 text-[11px] font-sans">{sq.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'FAQ' && (
            <div className="space-y-4">
              {/* Speaker Notes */}
              <div className="p-4 bg-[#FFFDF7] border-2 border-[#151C45] rounded-2xl shadow-[2px_2px_0px_#151C45] space-y-3">
                <div className="flex items-center justify-between border-b-2 border-[#151C45]/20 pb-2">
                  <span className="font-heading font-black text-xs text-[#FF8426] uppercase tracking-wider">
                    🎙️ LỜI DẪN THUYẾT TRÌNH (CHỈ DIỄN GIẢ THẤY)
                  </span>
                  <span className="text-[10px] bg-[#FF8426] text-white font-bold px-2 py-0.5 rounded-full">
                    Nói mồm - Không hiện trên màn hình
                  </span>
                </div>
                
                <div className="space-y-1.5 text-xs text-[#151C45]">
                  <p className="font-heading font-bold text-[#7965F2] flex items-center gap-1.5">
                    <span>1. Sau khi chiếu xong Video tình huống:</span>
                  </p>
                  <div className="p-2.5 bg-[#FFF4DF] rounded-xl border border-[#151C45] space-y-1 font-sans text-xs italic leading-relaxed">
                    <p>"{VIDEO_DATA.afterVideoReflection[0]}"</p>
                    <p className="font-bold text-[#151C45] mt-1">"{VIDEO_DATA.afterVideoReflection[1]}"</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#151C45]">
                  <p className="font-heading font-bold text-[#7965F2] flex items-center gap-1.5">
                    <span>2. Sau khi kết thúc 2 phút thảo luận nhóm:</span>
                  </p>
                  <div className="p-2.5 bg-[#FFF4DF] rounded-xl border border-[#151C45] font-sans text-xs italic leading-relaxed">
                    <p>"{VIDEO_DATA.afterDiscussionRemark}"</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#151C45]">
                  <p className="font-heading font-bold text-[#7965F2] flex items-center gap-1.5">
                    <span>3. Tại Slide 3 (Giới thiệu nguyên tắc SMART):</span>
                  </p>
                  <div className="p-2.5 bg-[#FFF4DF] rounded-xl border border-[#151C45] font-sans text-xs italic leading-relaxed">
                    <p>"{VIDEO_DATA.slide3SpeakerNote}"</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white border-2 border-[#151C45] rounded-2xl shadow-[2px_2px_0px_#151C45]">
                <span className="font-heading font-black text-xs text-[#7965F2] uppercase tracking-wider block mb-1">
                  MỤC TIÊU SMART HOÀN CHỈNH (THEO ĐÚNG TÀI LIỆU):
                </span>
                <p className="text-xs sm:text-sm font-heading font-bold text-[#151C45] leading-relaxed">
                  "{SMART_GOAL_FULL}"
                </p>
              </div>

              <div className="space-y-2.5">
                <span className="font-heading font-black text-xs text-[#151C45] uppercase tracking-wider block">
                  ĐỊNH HƯỚNG PHẢN HỒI KHI KHÁN GIẢ GÓP Ý KHÁC NHAU:
                </span>
                {PRESENTER_FAQ.map((faq, idx) => (
                  <div key={idx} className="p-3 bg-white border-2 border-[#151C45] rounded-xl shadow-[2px_2px_0px_#151C45] text-xs">
                    <p className="font-heading font-bold text-[#FF8426] mb-1 text-[11px] sm:text-xs">
                      ❓ {faq.q}
                    </p>
                    <p className="font-sans text-[#151C45]/85 text-[11px] leading-relaxed">
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

