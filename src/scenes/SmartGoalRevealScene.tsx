import React, { useState } from 'react';
import { BackgroundView } from '../components/BackgroundView';
import { soundManager } from '../utils/audio';
import { Target, CheckCircle2, Award, ArrowRight, Info, Sparkles, BookOpen } from 'lucide-react';

interface SmartGoalRevealSceneProps {
  onGoToActionPlan: () => void;
}

export const SmartGoalRevealScene: React.FC<SmartGoalRevealSceneProps> = ({ onGoToActionPlan }) => {
  const [activeTab, setActiveTab] = useState<'S' | 'M' | 'A' | 'R' | 'T'>('S');

  const criteria = [
    {
      key: 'S',
      title: 'Specific (Cụ thể)',
      desc: 'Đọc hiểu, tóm tắt và ôn tập trọn vẹn 9 chương; học từng trang, từng chương kết hợp cách ly điện thoại trong phiên học.'
    },
    {
      key: 'M',
      title: 'Measurable (Đo lường)',
      desc: 'Đo lường số chương đã hoàn thành trên checklist 0/9 đến 9/9, kết hợp theo dõi tiến độ học tập hằng ngày.'
    },
    {
      key: 'A',
      title: 'Achievable (Khả thi)',
      desc: 'Chia nhỏ 9 chương trong 5 ngày, trung bình khoảng 1,8–2 chương mỗi ngày thay vì dồn vào 2 ngày cuối.'
    },
    {
      key: 'R',
      title: 'Relevant (Phù hợp)',
      desc: 'Giải quyết trực tiếp thói quen trì hoãn và mất tập trung, phục vụ mục tiêu chuẩn bị cho kỳ thi.'
    },
    {
      key: 'T',
      title: 'Time-bound (Thời hạn)',
      desc: 'Có khung thời gian 5 ngày và hạn chót trước 22 giờ ngày trước kỳ thi.'
    }
  ];

  return (
    <BackgroundView bg="smart_lab">
      <div className="relative z-20 w-full h-full max-w-5xl mx-auto px-6 py-10 flex flex-col justify-between">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-mint/20 border border-mint text-mint text-xs font-digital font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber" />
            <span>MỤC TIÊU SMART HOÀN CHỈNH ĐÃ ĐƯỢC XÂY DỰNG</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-black text-cream">
            YOUR SMART GOAL IS READY!
          </h1>
        </div>

        <div className="my-auto space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-midnight via-[#192b3a] to-midnight border-2 border-mint shadow-[0_0_35px_rgba(88,205,181,0.5)] backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-mint uppercase tracking-wider font-mono">
              <BookOpen className="w-4 h-4" />
              <span>CÔNG THỨC MỤC TIÊU CHUẨN (NGUYÊN VĂN TÀI LIỆU):</span>
            </div>

            <blockquote className="text-sm sm:text-base md:text-lg font-sans font-bold text-cream leading-relaxed pl-4 border-l-4 border-mint">
              “Trong vòng 5 ngày tiếp theo (từ ngày còn 6 ngày đến ngày còn 1 ngày trước kỳ thi), hoàn thành việc đọc hiểu, tóm tắt và làm bài tập ôn tập đủ 9 chương của môn thi bằng cách học tối thiểu 2 chương mỗi ngày (tương đương các khung tập trung không dùng điện thoại, bắt đầu từ từng trang đầu tiên vào buổi sáng/chiều) và đánh dấu hoàn thành trên bảng theo dõi 9 chương trước 22:00 ngày trước kỳ thi.”
            </blockquote>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {criteria.map((item) => (
              <div 
                key={item.key} 
                className="p-3 rounded-xl bg-midnight/90 border border-mint/40 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <span className="w-6 h-6 rounded bg-mint text-midnight font-heading font-black text-xs flex items-center justify-center mb-1">
                    {item.key}
                  </span>
                  <h4 className="text-xs font-bold text-cream font-heading">{item.title}</h4>
                </div>
                <p className="text-[11px] text-cream/80 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-amber/10 border border-amber/40 text-xs text-cream/90 flex items-start gap-2.5">
            <Info className="w-5 h-5 text-amber shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber block mb-0.5">LƯU Ý DÀNH CHO NGƯỜI THUYẾT TRÌNH:</span>
              <span>
                Chỉ tiêu “tối thiểu 2 chương mỗi ngày” cần linh hoạt vì tổng khối lượng là 9 chương trong 5 ngày. Có thể học 2 chương/ngày trong 4 ngày đầu và 1 chương trong ngày cuối, dành thời gian còn lại để tổng ôn.
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-mint/20 pt-3">
          <span className="text-xs text-cream/50 font-mono">Chuyển sang bảng kế hoạch thực hiện từng ngày</span>
          <button
            onClick={() => {
              soundManager.playClick();
              onGoToActionPlan();
            }}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-mint to-amber text-midnight font-heading font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(88,205,181,0.7)] hover:scale-105 transition-all"
          >
            <span>KẾ HOẠCH HÀNH ĐỘNG 5 NGÀY (ACTION PLAN)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </BackgroundView>
  );
};
