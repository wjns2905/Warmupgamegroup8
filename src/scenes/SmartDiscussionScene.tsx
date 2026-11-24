import React, { useState, useEffect, useRef } from 'react';
import { BackgroundView } from '../components/BackgroundView';
import { soundManager } from '../utils/audio';
import { Play, Pause, RotateCcw, Clock, AlertTriangle, Users, Sparkles, ArrowRight } from 'lucide-react';

interface SmartDiscussionSceneProps {
  onCompleteDiscussion: () => void;
}

export const SmartDiscussionScene: React.FC<SmartDiscussionSceneProps> = ({ onCompleteDiscussion }) => {
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            soundManager.playTimerBell();
            return 0;
          }
          if (prev <= 6) {
            soundManager.playCountdownTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, secondsLeft]);

  const handleStartTimer = () => {
    soundManager.playClick();
    setIsRunning(true);
  };

  const handlePauseTimer = () => {
    soundManager.playClick();
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    soundManager.playClick();
    setIsRunning(false);
    setSecondsLeft(120);
    setIsFinished(false);
  };

  const handleFinishDiscussion = () => {
    soundManager.playClick();
    setIsRunning(false);
    setIsFinished(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getTimerColorClass = () => {
    if (secondsLeft <= 10) return 'text-coral border-coral animate-pulse';
    if (secondsLeft <= 30) return 'text-amber border-amber';
    return 'text-mint border-mint';
  };

  return (
    <BackgroundView bg="smart_lab">
      <div className="relative z-20 w-full h-full max-w-5xl mx-auto px-6 py-10 flex flex-col justify-between">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-mint/20 border border-mint text-mint text-xs font-digital font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber" />
            <span>TWO-MINUTE RESCUE MISSION • CLASSROOM BRAINSTORMING</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-cream">
            NHIỆM VỤ: GIẢI CỨU KỲ THI (SAVE THE SEMESTER)
          </h1>
        </div>

        <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 space-y-4">
            <div className="p-5 rounded-2xl bg-midnight/90 border border-violet/40 backdrop-blur-md shadow-xl">
              <h3 className="text-xs font-mono font-bold text-amber uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-coral" />
                DỮ KIỆN TÌNH HUỐNG THỰC TẾ:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-cream/90 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-coral" />
                  <span>Kỳ thi chỉ còn lại: <b className="text-coral">6 ngày</b>.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                  <span>Tổng khối lượng: <b className="text-amber">9 chương</b> cần ôn tập.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-light" />
                  <span>Nhân vật chưa bắt đầu học tập hiệu quả.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                  <span>Thường xuyên bị xao nhãng bởi điện thoại & video ngắn.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-mint/20 to-midnight border-2 border-mint/60 backdrop-blur-md shadow-[0_0_20px_rgba(88,205,181,0.3)]">
              <span className="text-xs font-heading font-black text-mint block mb-1">
                CÂU HỎI THẢO LUẬN NHÓM (2 PHÚT):
              </span>
              <p className="text-sm sm:text-base font-sans font-bold text-cream leading-relaxed">
                "Hãy giúp nhân vật xây dựng một kế hoạch để thực sự hoàn thành việc ôn tập thay vì tiếp tục trì hoãn. Hãy nghĩ về một mục tiêu và cách thực hiện sao cho nhân vật có thể bắt tay vào làm ngay!"
              </p>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-midnight/95 border-2 border-mint/50 shadow-[0_0_35px_rgba(88,205,181,0.4)] backdrop-blur-md">
            <span className="text-xs font-digital font-bold text-cream/60 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-mint" />
              ĐỒNG HỒ ĐẾM NGƯỢC THẢO LUẬN
            </span>

            <div className={`my-4 px-8 py-5 rounded-2xl bg-midnight-dark border-4 font-digital font-black text-6xl sm:text-7xl tracking-wider transition-colors shadow-inner ${getTimerColorClass()}`}>
              {formatTime(secondsLeft)}
            </div>

            <div className="mb-4">
              {isFinished ? (
                <span className="px-4 py-1 rounded-full bg-coral/20 border border-coral text-coral font-bold text-xs uppercase animate-bounce">
                  🔔 TIME'S UP! (HẾT GIỜ THẢO LUẬN)
                </span>
              ) : isRunning ? (
                <span className="px-3 py-1 rounded-full bg-mint/20 border border-mint text-mint text-xs font-mono animate-pulse">
                  Đang đếm ngược... Các nhóm tích cực thảo luận!
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-midnight-light border border-violet/30 text-cream/70 text-xs font-mono">
                  Sẵn sàng • Bấm bắt đầu khi cả lớp chuẩn bị xong
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {!isRunning ? (
                <button
                  onClick={handleStartTimer}
                  className="px-5 py-2.5 rounded-xl bg-mint hover:bg-mint-light text-midnight font-heading font-black text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(88,205,181,0.5)]"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{secondsLeft < 120 ? 'TIẾP TỤC (RESUME)' : 'BẮT ĐẦU (START TIMER)'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseTimer}
                  className="px-5 py-2.5 rounded-xl bg-amber hover:bg-amber-light text-midnight font-heading font-black text-xs flex items-center gap-2 transition-all"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>TẠM DỪNG (PAUSE)</span>
                </button>
              )}

              <button
                onClick={handleResetTimer}
                className="px-4 py-2.5 rounded-xl bg-midnight-light hover:bg-white/10 border border-violet/40 text-cream text-xs font-bold transition-all flex items-center gap-1.5"
                title="Đặt lại 02:00"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Đặt Lại</span>
              </button>

              <button
                onClick={handleFinishDiscussion}
                className="px-4 py-2.5 rounded-xl bg-violet/40 hover:bg-violet text-cream border border-violet-light text-xs font-bold transition-all"
              >
                Kết Thúc Ngay
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-midnight/90 border border-mint/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-mint/20 text-mint shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-xs text-cream/90">
              <span className="font-bold text-mint block">LET'S HEAR YOUR STRATEGIES!</span>
              Mời đại diện 2–3 bạn/nhóm chia sẻ giải pháp trước lớp, sau đó bấm tiếp tục để đối chiếu với nguyên tắc SMART.
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playLevelUp();
              onCompleteDiscussion();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-mint to-amber text-midnight font-heading font-black text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(88,205,181,0.7)] hover:scale-105 transition-all shrink-0"
          >
            <span>KHÁM PHÁ 5 CHÌA KHÓA SMART</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </BackgroundView>
  );
};
