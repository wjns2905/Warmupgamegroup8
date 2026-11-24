import React, { useState } from 'react';
import { BackgroundView } from '../components/BackgroundView';
import { CharacterStage } from '../components/CharacterStage';
import { DialogueBox } from '../components/DialogueBox';
import { soundManager } from '../utils/audio';
import { ChoiceOption } from '../types/game';
import confetti from 'canvas-confetti';

interface DefeatGlitchSceneProps {
  onGlitchDefeated: () => void;
  onOpenLog?: () => void;
}

export const DefeatGlitchScene: React.FC<DefeatGlitchSceneProps> = ({ onGlitchDefeated, onOpenLog }) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [defeatPhase, setDefeatPhase] = useState<'decision' | 'dialogue'>('decision');
  const [dialogueIdx, setDialogueIdx] = useState(0);

  const choices: ChoiceOption[] = [
    { key: 'A', text: 'Xem nốt một video ngắn rồi bắt đầu học.' },
    { key: 'B', text: 'Đợi đến khi có thật nhiều cảm hứng và động lực.' },
    { key: 'C', text: 'Cất điện thoại vào ngăn kéo và bắt đầu đọc ngay từ trang đầu tiên.', isCorrect: true }
  ];

  const postDefeatDialogues = [
    {
      speaker: 'alex' as const,
      name: 'Alex',
      expression: 'determined' as const,
      text: 'Không cần đợi đến khi có đủ động lực. Tôi có thể bắt đầu ngay từ một hành động nhỏ nhất!',
    },
    {
      speaker: 'glitch' as const,
      name: 'Glitch',
      expression: 'defeated' as const,
      text: 'Ơ kìa… lần này không còn "thêm 5 phút nữa" sao?! Tôi biến mất mất thôi!',
    },
    {
      speaker: 'alex' as const,
      name: 'Alex',
      expression: 'determined' as const,
      text: 'Không. Lần này tôi biết mình đang ở đâu và cần làm gì rồi!',
    },
    {
      speaker: 'nova' as const,
      name: 'Nova',
      expression: 'celebrate' as const,
      text: 'SWOT giúp cậu hiểu rõ điểm mạnh, điểm yếu và môi trường xung quanh.',
    },
    {
      speaker: 'iris' as const,
      name: 'Iris',
      expression: 'celebrate' as const,
      text: 'SMART giúp cậu biến những hiểu biết đó thành mục tiêu rõ ràng, kế hoạch khả thi và hành động thực tế.',
    },
    {
      speaker: 'alex' as const,
      name: 'Alex',
      expression: 'victory' as const,
      text: 'Hiểu bản thân, đặt mục tiêu và bắt đầu hành động. Đó mới là cách để thực sự LEVEL UP!',
    }
  ];

  const handleSelect = (choice: ChoiceOption) => {
    if (choice.key === 'A' || choice.key === 'B') {
      soundManager.playGlitchSound();
      setSelectedChoice(choice.key);
    } else {
      soundManager.playLevelUp();
      setSelectedChoice('C');
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#58CDB5', '#FFCA64', '#7855D9', '#42D392']
        });
      } catch {}

      setTimeout(() => {
        setDefeatPhase('dialogue');
      }, 1000);
    }
  };

  const handleNextDialogue = () => {
    if (dialogueIdx < postDefeatDialogues.length - 1) {
      setDialogueIdx(prev => prev + 1);
    } else {
      onGlitchDefeated();
    }
  };

  const currentDialogue = postDefeatDialogues[dialogueIdx];
  const isDefeated = selectedChoice === 'C';

  return (
    <BackgroundView bg={isDefeated ? 'library' : 'gateway'}>
      <div className="absolute top-16 inset-x-8 text-center z-20 pointer-events-none">
        <span className="px-3 py-1 rounded bg-coral/20 border border-coral text-coral text-xs font-digital font-bold tracking-wider uppercase">
          FINAL SHOWDOWN • ĐỐI ĐẦU VỚI SỰ TRÌ HOÃN
        </span>
      </div>

      <CharacterStage
        speaker={defeatPhase === 'decision' ? 'glitch' : currentDialogue.speaker}
        alexExpression={isDefeated ? 'determined' : 'thinking'}
        glitchExpression={isDefeated ? 'defeated' : 'laugh'}
        novaExpression="celebrate"
        irisExpression="celebrate"
        glitchDefeated={isDefeated}
        showAlex={true}
        showGlitch={defeatPhase === 'decision' || dialogueIdx <= 2}
        showNova={defeatPhase === 'dialogue' && dialogueIdx >= 3}
        showIris={defeatPhase === 'dialogue' && dialogueIdx >= 3}
      />

      {defeatPhase === 'decision' && (
        <div className="absolute bottom-6 inset-x-6 sm:inset-x-20 z-40 max-w-4xl mx-auto p-6 rounded-2xl bg-midnight/95 border-2 border-violet shadow-[0_0_40px_rgba(120,85,217,0.6)] backdrop-blur-md">
          <div className="flex items-center gap-3 mb-3 border-b border-violet/30 pb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-coral">
              <img src="./assets/characters/glitch_laugh.png" alt="Glitch" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-digital font-bold text-coral">GLITCH (HIỆN THÂN SỰ TRÌ HOÃN):</span>
              <h3 className="text-sm sm:text-base font-bold text-cream">
                “Cậu chắc chắn muốn ngồi học ngay bây giờ sao? Thêm 5 phút lướt mạng nữa thôi mà!”
              </h3>
            </div>
          </div>

          {(selectedChoice === 'A' || selectedChoice === 'B') && (
            <div className="mb-4 p-3 rounded-xl bg-coral/20 border border-coral text-xs text-coral-light flex items-center justify-between animate-shake">
              <span>
                {selectedChoice === 'A'
                  ? '⚠️ Lại một video ngắn nữa... và thời gian sẽ biến mất! Đây chính là cái bẫy!'
                  : '⚠️ Đợi động lực là cái cớ lớn nhất của sự trì hoãn! Hành động tạo ra cảm hứng, chứ không phải ngược lại!'}
              </span>
              <button
                onClick={() => setSelectedChoice(null)}
                className="px-3 py-1 rounded bg-coral text-white font-bold text-[11px]"
              >
                Chọn Lại
              </button>
            </div>
          )}

          <div className="space-y-2">
            {choices.map((c) => (
              <button
                key={c.key}
                onClick={() => handleSelect(c)}
                className={`w-full p-3.5 rounded-xl border-2 transition-all flex items-center gap-3.5 text-left text-xs sm:text-sm font-medium ${
                  c.key === 'C'
                    ? 'bg-gradient-to-r from-mint/20 to-midnight border-mint text-mint-light hover:bg-mint/30 shadow-[0_0_15px_rgba(88,205,181,0.3)]'
                    : 'bg-midnight-light/80 border-violet/30 text-cream/80 hover:border-violet'
                }`}
              >
                <span className="w-7 h-7 rounded-lg bg-midnight border border-white/20 flex items-center justify-center font-heading font-black text-xs shrink-0">
                  {c.key}
                </span>
                <span>{c.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {defeatPhase === 'dialogue' && (
        <DialogueBox
          speaker={currentDialogue.speaker}
          speakerName={currentDialogue.name}
          text={currentDialogue.text}
          onNext={handleNextDialogue}
          onOpenLog={onOpenLog}
        />
      )}
    </BackgroundView>
  );
};
