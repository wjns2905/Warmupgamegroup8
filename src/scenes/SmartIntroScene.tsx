import React, { useState } from 'react';
import { BackgroundView } from '../components/BackgroundView';
import { CharacterStage } from '../components/CharacterStage';
import { DialogueBox } from '../components/DialogueBox';
import { soundManager } from '../utils/audio';
import { RefreshCw, ArrowRight, Smartphone, Clock, AlertCircle } from 'lucide-react';

interface SmartIntroSceneProps {
  onContinueToVideo: () => void;
  onOpenLog?: () => void;
}

export const SmartIntroScene: React.FC<SmartIntroSceneProps> = ({ onContinueToVideo, onOpenLog }) => {
  const [dialogueIdx, setDialogueIdx] = useState(0);

  const dialogues = [
    {
      speaker: 'iris' as const,
      name: 'Iris',
      expression: 'explain' as const,
      text: 'Chào mừng Alex đến với Chương 02: BREAK THE LOOP – Phá Vỡ Vòng Lặp Trì Hoãn!',
      subtext: 'The Goal Architect – Kiến trúc sư mục tiêu',
    },
    {
      speaker: 'alex' as const,
      name: 'Alex',
      expression: 'worried' as const,
      text: 'Vòng lặp trì hoãn? Đúng là tôi cứ lặp đi lặp lại việc muốn học nhưng rồi lại lướt điện thoại...',
    },
    {
      speaker: 'iris' as const,
      name: 'Iris',
      expression: 'thinking' as const,
      text: 'Đó chính là cái bẫy tâm lý phổ biến nhất của sinh viên: Ý định học tập → Bị xao nhãng → Trì hoãn → Lo lắng quá tải → Lại tiếp tục trì hoãn!',
    },
    {
      speaker: 'glitch' as const,
      name: 'Glitch',
      expression: 'laugh' as const,
      text: 'Đúng rồi đó! Cứ lo lắng rồi lướt điện thoại cho bớt stress là bài của tôi mà!',
    },
    {
      speaker: 'iris' as const,
      name: 'Iris',
      expression: 'smile' as const,
      text: 'Trước khi bắt tay vào thiết lập mục tiêu, hãy cùng cả lớp theo dõi một đoạn video tình huống ngắn xem nhân vật đã mắc kẹt như thế nào nhé!',
    }
  ];

  const currentDialogue = dialogues[dialogueIdx];
  const isLast = dialogueIdx === dialogues.length - 1;

  const handleNext = () => {
    if (dialogueIdx < dialogues.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    }
  };

  return (
    <BackgroundView bg="smart_lab">
      <div className="absolute top-20 inset-x-8 sm:inset-x-20 z-20 pointer-events-none">
        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-midnight/90 border-2 border-mint shadow-[0_0_30px_rgba(88,205,181,0.4)] backdrop-blur-md pointer-events-auto">
          <div className="flex items-center justify-between border-b border-mint/30 pb-3">
            <span className="text-xs font-digital font-bold text-mint uppercase tracking-wider flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin [animation-duration:10s]" />
              THE PROCRASTINATION LOOP (VÒNG LẶP TRÌ HOÃN)
            </span>
            <span className="text-xs font-mono text-coral font-bold">NGUY CƠ BẪY TÂM LÝ</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-center">
            <div className="px-3 py-2 rounded-lg bg-midnight-light border border-mint/40 text-cream">
              1. Ý định học tập
            </div>
            <ArrowRight className="w-4 h-4 text-mint shrink-0" />
            
            <div className="px-3 py-2 rounded-lg bg-midnight-light border border-coral/40 text-coral flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              2. Xao nhãng (Điện thoại)
            </div>
            <ArrowRight className="w-4 h-4 text-coral shrink-0" />

            <div className="px-3 py-2 rounded-lg bg-midnight-light border border-coral text-coral-light flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              3. Trì hoãn ("Thêm 5p")
            </div>
            <ArrowRight className="w-4 h-4 text-amber shrink-0" />

            <div className="px-3 py-2 rounded-lg bg-midnight-light border border-amber/40 text-amber flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              4. Căng thẳng & Lo lắng
            </div>
            <ArrowRight className="w-4 h-4 text-coral shrink-0" />

            <div className="px-3 py-2 rounded-lg bg-coral/20 border border-coral text-coral font-bold animate-pulse">
              5. Tiếp tục né tránh!
            </div>
          </div>

          {isLast && (
            <div className="mt-4 flex justify-center animate-scaleUp">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onContinueToVideo();
                }}
                className="px-6 py-2.5 rounded-xl bg-mint hover:bg-mint-light text-midnight font-heading font-black text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(88,205,181,0.6)]"
              >
                <span>XEM VIDEO TÌNH HUỐNG (YOUTUBE)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <CharacterStage
        speaker={currentDialogue.speaker}
        alexExpression="worried"
        irisExpression={dialogueIdx === 0 ? 'explain' : dialogueIdx === 2 ? 'thinking' : 'smile'}
        glitchExpression="laugh"
        showAlex={true}
        showIris={true}
        showGlitch={dialogueIdx === 3}
      />

      <DialogueBox
        speaker={currentDialogue.speaker}
        speakerName={currentDialogue.name}
        subtext={currentDialogue.subtext}
        text={currentDialogue.text}
        onNext={handleNext}
        onOpenLog={onOpenLog}
        hideNextArrow={isLast}
      />
    </BackgroundView>
  );
};
