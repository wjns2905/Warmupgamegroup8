import React, { useState } from 'react';
import { PROLOGUE_DIALOGUES } from '../data/gameContent';
import { DialogueBox } from '../components/DialogueBox';
import { CharacterStage } from '../components/CharacterStage';
import { BackgroundView } from '../components/BackgroundView';
import { soundManager } from '../utils/audio';
import { ChoiceOption } from '../types/game';
import { Sparkles, ArrowRight, Smartphone, Compass } from 'lucide-react';

interface PrologueSceneProps {
  onQuestAccepted: () => void;
  onOpenLog?: () => void;
}

export const PrologueScene: React.FC<PrologueSceneProps> = ({ onQuestAccepted, onOpenLog }) => {
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [choiceMade, setChoiceMade] = useState<string | null>(null);
  const [glitchTaunt, setGlitchTaunt] = useState(false);

  const currentDialogue = PROLOGUE_DIALOGUES[dialogueIdx];
  const isLastDialogue = dialogueIdx === PROLOGUE_DIALOGUES.length - 1;

  const choices: ChoiceOption[] = [
    {
      key: 'A',
      text: 'Tiếp tục lướt điện thoại thêm một chút...',
    },
    {
      key: 'B',
      text: 'Khám phá nhiệm vụ mới (Bắt đầu LEVEL UP!)',
      isCorrect: true,
    }
  ];

  const handleNext = () => {
    if (dialogueIdx < PROLOGUE_DIALOGUES.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    }
  };

  const handleSelectChoice = (choice: ChoiceOption) => {
    if (choice.key === 'A') {
      soundManager.playGlitchSound();
      setGlitchTaunt(true);
      setChoiceMade('A');
    } else {
      soundManager.playLevelUp();
      setChoiceMade('B');
      setTimeout(() => {
        onQuestAccepted();
      }, 1200);
    }
  };

  return (
    <BackgroundView bg={isLastDialogue ? 'gateway' : 'bedroom'}>
      <div className="absolute top-20 left-8 z-30">
        <div className="px-4 py-2 rounded-xl bg-midnight/90 border border-violet/40 shadow-xl backdrop-blur-md flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-coral animate-ping" />
            <span className="text-xs font-mono font-bold text-cream">KỲ THI SẮP TỚI:</span>
            <span className="text-xs font-mono font-black text-coral">CÒN 6 NGÀY</span>
          </div>
          <div className="w-px h-4 bg-violet/30" />
          <div className="text-xs font-mono text-amber">
            TIẾN ĐỘ: <span className="font-bold">0 / 9 CHƯƠNG</span>
          </div>
        </div>
      </div>

      <CharacterStage
        speaker={glitchTaunt ? 'glitch' : currentDialogue.speaker}
        alexExpression={
          dialogueIdx === 0 ? 'sleepy' :
          dialogueIdx === 1 ? 'worried' :
          dialogueIdx === 2 ? 'determined' :
          dialogueIdx === 6 ? 'confused' :
          dialogueIdx === 8 ? 'worried' : 'neutral'
        }
        glitchExpression={
          glitchTaunt ? 'laugh' :
          dialogueIdx >= 4 && dialogueIdx <= 6 ? 'sneaky' :
          dialogueIdx === 9 ? 'laugh' : 'neutral'
        }
        showAlex={true}
        showGlitch={dialogueIdx >= 4 || glitchTaunt}
      />

      {glitchTaunt && choiceMade === 'A' && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-midnight-dark/80 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-lg p-6 rounded-2xl bg-midnight border-2 border-coral shadow-[0_0_30px_rgba(244,109,117,0.5)] text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-coral/20 flex items-center justify-center text-coral animate-bounce">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-heading font-black text-coral">
              GLITCH: "Haha! Thêm 5 phút nữa… rồi lại 5 phút nữa!"
            </h3>
            <p className="text-xs sm:text-sm text-cream/90 leading-relaxed">
              Thời gian lại tiếp tục trôi qua. Bạn nhận ra mình vẫn dậm chân tại chỗ và cảm giác tội lỗi, áp lực càng tăng lên...
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setGlitchTaunt(false);
                  setChoiceMade(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-violet hover:bg-violet-light text-cream font-bold text-xs transition-colors flex items-center gap-2 mx-auto"
              >
                <span>Nhận ra vấn đề, chọn lại!</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {choiceMade === 'B' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-midnight-dark/80 backdrop-blur-md animate-fadeIn">
          <div className="text-center space-y-4 animate-scaleUp">
            <div className="inline-flex p-4 rounded-full bg-mint/20 border-2 border-mint text-mint animate-pulse-glow">
              <Compass className="w-12 h-12" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber via-white to-mint tracking-wider">
              QUEST ACCEPTED!
            </h2>
            <p className="text-sm font-mono text-mint tracking-widest">
              ĐANG KẾT NỐI VỚI CHIẾN LƯỢC GIA NOVA...
            </p>
          </div>
        </div>
      )}

      <DialogueBox
        speaker={currentDialogue.speaker}
        speakerName={currentDialogue.name}
        subtext={currentDialogue.subtext}
        text={currentDialogue.text}
        choices={isLastDialogue ? choices : undefined}
        onSelectChoice={handleSelectChoice}
        onNext={handleNext}
        onOpenLog={onOpenLog}
        hideNextArrow={isLastDialogue}
      />
    </BackgroundView>
  );
};
