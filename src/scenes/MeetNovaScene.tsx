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
      <div className="absolute top-16 inset-x-8 sm:inset-x-20 z-20 pointer-events-none">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <span className="px-3 py-1 rounded bg-violet/30 border border-violet-light text-violet-light text-xs font-digital font-bold tracking-wider">
              MA TRẬN CHIẾN LƯỢC SWOT (STRATEGIC MATRIX)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pointer-events-auto">
            <div className="p-3.5 rounded-xl bg-midnight/90 border-2 border-violet shadow-[0_0_15px_rgba(120,85,217,0.4)] backdrop-blur-md transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between text-violet-light">
                <span className="text-xl font-heading font-black">S</span>
                <Shield className="w-5 h-5 text-violet" />
              </div>
              <h4 className="text-xs font-bold text-cream mt-1 font-heading">STRENGTHS</h4>
              <p className="text-[11px] text-violet-light font-medium">Điểm mạnh</p>
              <div className="mt-2 text-[10px] px-2 py-0.5 rounded bg-violet/20 text-violet-light font-mono text-center">
                Bên Trong (Internal)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-midnight/90 border-2 border-coral shadow-[0_0_15px_rgba(244,109,117,0.3)] backdrop-blur-md transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between text-coral">
                <span className="text-xl font-heading font-black">W</span>
                <Zap className="w-5 h-5 text-coral" />
              </div>
              <h4 className="text-xs font-bold text-cream mt-1 font-heading">WEAKNESSES</h4>
              <p className="text-[11px] text-coral font-medium">Điểm yếu</p>
              <div className="mt-2 text-[10px] px-2 py-0.5 rounded bg-coral/20 text-coral font-mono text-center">
                Bên Trong (Internal)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-midnight/90 border-2 border-mint shadow-[0_0_15px_rgba(88,205,181,0.3)] backdrop-blur-md transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between text-mint">
                <span className="text-xl font-heading font-black">O</span>
                <ArrowUpRight className="w-5 h-5 text-mint" />
              </div>
              <h4 className="text-xs font-bold text-cream mt-1 font-heading">OPPORTUNITIES</h4>
              <p className="text-[11px] text-mint font-medium">Cơ hội</p>
              <div className="mt-2 text-[10px] px-2 py-0.5 rounded bg-mint/20 text-mint font-mono text-center">
                Bên Ngoài (External)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-midnight/90 border-2 border-amber shadow-[0_0_15px_rgba(255,202,100,0.3)] backdrop-blur-md transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center justify-between text-amber">
                <span className="text-xl font-heading font-black">T</span>
                <AlertTriangle className="w-5 h-5 text-amber" />
              </div>
              <h4 className="text-xs font-bold text-cream mt-1 font-heading">THREATS</h4>
              <p className="text-[11px] text-amber font-medium">Thách thức</p>
              <div className="mt-2 text-[10px] px-2 py-0.5 rounded bg-amber/20 text-amber font-mono text-center">
                Bên Ngoài (External)
              </div>
            </div>
          </div>

          {isLastDialogue && (
            <div className="mt-4 flex justify-center pointer-events-auto animate-scaleUp">
              <button
                onClick={() => {
                  soundManager.playLevelUp();
                  onStartSwot();
                }}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet via-violet-light to-amber hover:from-violet-light hover:to-mint text-white font-heading font-black text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(120,85,217,0.8)] transition-all transform hover:scale-105 active:scale-95"
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
