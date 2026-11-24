import React, { useState } from 'react';
import { MEET_NOVA_DIALOGUES } from '../data/gameContent';
import { DialogueBox } from '../components/DialogueBox';
import { CharacterStage } from '../components/CharacterStage';
import { BackgroundView } from '../components/BackgroundView';
import { soundManager } from '../utils/audio';
import { Shield, AlertTriangle, ArrowUpRight, Zap, Play, Sparkles } from 'lucide-react';

interface MeetNovaSceneProps {
  onStartSwot: () => void;
  onOpenLog?: () => void;
}

export const MeetNovaScene: React.FC<MeetNovaSceneProps> = ({ onStartSwot, onOpenLog }) => {
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const currentDialogue = MEET_NOVA_DIALOGUES[dialogueIdx];
  const isLastDialogue = dialogueIdx === MEET_NOVA_DIALOGUES.length - 1;

  const handleNext = () => {
    if (dialogueIdx < MEET_NOVA_DIALOGUES.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    }
  };

  return (
    <BackgroundView bg="swot_room">
      {/* Top Strategic Badge & Action Button */}
      <div className="absolute top-16 inset-x-8 sm:inset-x-20 z-20 pointer-events-none">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-center mb-4">
            <span className="px-4 py-1.5 rounded-xl bg-midnight/85 border border-violet text-violet-light text-xs font-digital font-bold tracking-widest uppercase shadow-lg backdrop-blur-md">
              PHÒNG CHIẾN LƯỢC TƯƠNG LAI • HỆ THỐNG PHÂN TÍCH SWOT
            </span>
          </div>

          {/* Start Quest button unlocked on final dialogue */}
          {isLastDialogue && (
            <div className="mt-2 flex justify-center pointer-events-auto animate-scaleUp">
              <button
                onClick={() => {
                  soundManager.playLevelUp();
                  onStartSwot();
                }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet via-violet-light to-amber hover:from-violet-light hover:to-mint text-white font-heading font-black text-sm flex items-center gap-2 shadow-[0_0_30px_rgba(120,85,217,0.9)] transition-all transform hover:scale-105 active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>BẮT ĐẦU 8 THỬ THÁCH SWOT (BEGIN SWOT QUEST)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <CharacterStage
        speaker={currentDialogue.speaker}
        alexExpression="thinking"
        novaExpression={
          dialogueIdx === 0 ? 'smile' :
          dialogueIdx === 1 ? 'confident' :
          dialogueIdx === 3 ? 'explain' :
          dialogueIdx === 4 ? 'thinking' : 'confident'
        }
        showAlex={true}
        showNova={true}
      />

      <DialogueBox
        speaker={currentDialogue.speaker}
        speakerName={currentDialogue.name}
        subtext={currentDialogue.subtext}
        text={currentDialogue.text}
        onNext={handleNext}
        onOpenLog={onOpenLog}
        hideNextArrow={isLastDialogue}
      />
    </BackgroundView>
  );
};
