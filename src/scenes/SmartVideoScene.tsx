import React, { useState } from 'react';
import { BackgroundView } from '../components/BackgroundView';
import { CharacterStage } from '../components/CharacterStage';
import { DialogueBox } from '../components/DialogueBox';
import { soundManager } from '../utils/audio';
import { ExternalLink, Play, ArrowRight, Video } from 'lucide-react';

interface SmartVideoSceneProps {
  onContinueToDiscussion: () => void;
  onOpenLog?: () => void;
}

export const SmartVideoScene: React.FC<SmartVideoSceneProps> = ({ onContinueToDiscussion, onOpenLog }) => {
  const [videoFinished, setVideoFinished] = useState(false);
  const [dialogueIdx, setDialogueIdx] = useState(0);

  const videoId = 'uHRSBmStC5g';
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const postVideoDialogues = [
    {
      speaker: 'iris' as const,
      name: 'Iris',
      expression: 'thinking' as const,
      text: 'Chắc hẳn không ít người trong chúng ta đã từng rơi vào tình huống tương tự như nhân vật trong video: biết mình cần phải làm gì, thậm chí đã có ý định bắt tay vào thực hiện, nhưng rồi lại trì hoãn hết lần này đến lần khác.',
    },
    {
      speaker: 'iris' as const,
      name: 'Iris',
      expression: 'explain' as const,
      text: 'Vậy nếu chúng ta là nhân vật trong video, làm thế nào để thoát khỏi vòng lặp này và thực sự hoàn thành công việc trước kỳ thi?',
    }
  ];

  const currentDialogue = postVideoDialogues[dialogueIdx];
  const isLast = dialogueIdx === postVideoDialogues.length - 1;

  const handleNextDialogue = () => {
    if (dialogueIdx < postVideoDialogues.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    } else {
      onContinueToDiscussion();
    }
  };

  return (
    <BackgroundView bg="smart_lab">
      <div className="relative z-20 w-full h-full max-w-5xl mx-auto px-6 py-12 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-mint/20 text-mint">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-heading font-black text-cream">
                VIDEO TÌNH HUỐNG: VÒNG LẶP TRÌ HOÃN (THE PROCRASTINATION LOOP)
              </h2>
              <p className="text-[11px] text-cream/60">Theo dõi câu chuyện và cùng nhau tìm giải pháp tháo gỡ</p>
            </div>
          </div>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-midnight/80 hover:bg-white/10 border border-mint/40 text-mint text-xs font-mono flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở trên YouTube</span>
          </a>
        </div>

        <div className="my-auto max-w-3xl w-full mx-auto aspect-video rounded-2xl overflow-hidden border-2 border-mint/60 shadow-[0_0_35px_rgba(88,205,181,0.4)] bg-black relative group">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`}
            title="Video tình huống Vòng lặp Trì hoãn"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {!videoFinished ? (
          <div className="flex items-center justify-between p-4 rounded-xl bg-midnight/90 border border-mint/40 backdrop-blur-md">
            <span className="text-xs text-cream/80">
              Người thuyết trình cho cả lớp xem video, sau đó bấm nút tiếp tục để chuyển sang phân tích.
            </span>
            <button
              onClick={() => {
                soundManager.playClick();
                setVideoFinished(true);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-mint to-amber text-midnight font-heading font-black text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(88,205,181,0.6)] hover:scale-105 transition-all"
            >
              <span>ĐÃ XEM XONG • TIẾP TỤC THẢO LUẬN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <CharacterStage
              speaker="iris"
              irisExpression={currentDialogue.expression}
              showIris={true}
              showAlex={true}
            />

            <DialogueBox
              speaker="iris"
              speakerName="Iris"
              subtext="The Goal Architect"
              text={currentDialogue.text}
              onNext={handleNextDialogue}
              onOpenLog={onOpenLog}
            />
          </div>
        )}
      </div>
    </BackgroundView>
  );
};
