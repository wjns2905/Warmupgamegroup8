import React, { useEffect, useState } from 'react';
import { BackgroundView } from '../components/BackgroundView';
import { CharacterStage } from '../components/CharacterStage';
import { DialogueBox } from '../components/DialogueBox';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, ChevronRight, Sparkles, Target, Zap } from 'lucide-react';

interface SwotCompleteSceneProps {
  firstAttemptCount: number;
  totalXP: number;
  onUnlockSmart: () => void;
  onOpenLog?: () => void;
}

export const SwotCompleteScene: React.FC<SwotCompleteSceneProps> = ({
  firstAttemptCount,
  totalXP,
  onUnlockSmart,
  onOpenLog,
}) => {
  const [dialogueStep, setDialogueStep] = useState(0);

  useEffect(() => {
    soundManager.playLevelUp();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7855D9', '#58CDB5', '#FFCA64', '#42D392']
      });
    } catch {}
  }, []);

  const dialogues = [
    {
      speaker: 'alex' as const,
      name: 'Alex',
      expression: 'determined' as const,
      text: 'Giờ thì tôi hiểu rồi! Tôi cần nhìn nhận bản thân rõ ràng hơn, biết mình có những lợi thế nào và điều gì đang cản trở mình.',
    },
    {
      speaker: 'nova' as const,
      name: 'Nova',
      expression: 'celebrate' as const,
      text: 'Chính xác! Nhưng hiểu bản thân mới chỉ là bước chân đầu tiên trên con đường nâng cấp.',
    },
    {
      speaker: 'glitch' as const,
      name: 'Glitch',
      expression: 'sneaky' as const,
      text: 'Hiểu thì hiểu thôi, có khi ngày mai cậu ấy vẫn chẳng chịu học đâu, haha!',
    },
    {
      speaker: 'alex' as const,
      name: 'Alex',
      expression: 'thinking' as const,
      text: 'Cũng đúng… Tôi biết mình hay trì hoãn, nhưng phải làm sao để thực sự bắt tay vào hành động?',
    },
    {
      speaker: 'nova' as const,
      name: 'Nova',
      expression: 'smile' as const,
      text: 'Đó chính là lúc người bạn đồng hành tiếp theo của chúng ta xuất hiện.',
    },
    {
      speaker: 'iris' as const,
      name: 'Iris',
      expression: 'smile' as const,
      text: 'Chào Alex! Đã đến lúc biến những điều cậu biết thành một kế hoạch hành động cụ thể và khả thi nhất!',
    }
  ];

  const currentDialogue = dialogues[dialogueStep];
  const isLast = dialogueStep === dialogues.length - 1;

  const handleNext = () => {
    if (dialogueStep < dialogues.length - 1) {
      setDialogueStep(dialogueStep + 1);
    }
  };

  return (
    <BackgroundView bg="swot_room">
      <div className="absolute top-16 inset-x-8 sm:inset-x-20 z-20 pointer-events-none">
        <div className="max-w-3xl mx-auto p-5 rounded-2xl bg-midnight/90 border-2 border-violet shadow-[0_0_30px_rgba(120,85,217,0.5)] backdrop-blur-md pointer-events-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-violet/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-violet/30 border border-violet-light text-amber animate-pulse-glow">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-violet/40 text-violet-light text-[10px] font-digital font-bold uppercase">
                  <Sparkles className="w-3 h-3 text-amber" />
                  CHAPTER 01 COMPLETE
                </div>
                <h2 className="text-xl sm:text-2xl font-heading font-black text-cream">
                  QUEST COMPLETE: SWOT MASTER!
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-mono text-cream/60 block">XP KIẾM ĐƯỢC</span>
                <span className="text-lg font-digital font-black text-amber">+{firstAttemptCount * 100} XP</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 text-center">
            <div className="p-2.5 rounded-lg bg-midnight-dark/80 border border-violet/20">
              <span className="text-[10px] text-cream/60 font-mono block">Thử Thách</span>
              <span className="text-sm font-bold text-cream">8 / 8 Hoàn Thành</span>
            </div>

            <div className="p-2.5 rounded-lg bg-midnight-dark/80 border border-violet/20">
              <span className="text-[10px] text-cream/60 font-mono block">Đúng Lần Đầu</span>
              <span className="text-sm font-bold text-mint">{firstAttemptCount} / 8 Câu</span>
            </div>

            <div className="p-2.5 rounded-lg bg-midnight-dark/80 border border-violet/20">
              <span className="text-[10px] text-cream/60 font-mono block">Huy Hiệu</span>
              <span className="text-sm font-bold text-amber">SWOT Explorer</span>
            </div>
          </div>

          {isLast && (
            <div className="mt-4 flex justify-center animate-scaleUp">
              <button
                onClick={() => {
                  soundManager.playLevelUp();
                  onUnlockSmart();
                }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-mint via-mint-light to-amber text-midnight font-heading font-black text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(88,205,181,0.8)] hover:scale-105 active:scale-95 transition-all"
              >
                <Zap className="w-4 h-4 fill-current text-midnight" />
                <span>MỞ KHÓA CHƯƠNG SMART: BREAK THE LOOP</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <CharacterStage
        speaker={currentDialogue.speaker}
        alexExpression={dialogueStep === 3 ? 'thinking' : 'determined'}
        novaExpression={dialogueStep === 1 ? 'celebrate' : 'smile'}
        irisExpression="smile"
        glitchExpression="sneaky"
        showAlex={true}
        showNova={dialogueStep <= 4}
        showGlitch={dialogueStep === 2}
        showIris={dialogueStep >= 4}
      />

      <DialogueBox
        speaker={currentDialogue.speaker}
        speakerName={currentDialogue.name}
        text={currentDialogue.text}
        onNext={handleNext}
        onOpenLog={onOpenLog}
        hideNextArrow={isLast}
      />
    </BackgroundView>
  );
};
