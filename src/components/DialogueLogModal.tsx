import React from 'react';
import { DialogueLine } from '../types/game';
import { X, BookOpen } from 'lucide-react';

interface DialogueLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: DialogueLine[];
}

export const DialogueLogModal: React.FC<DialogueLogModalProps> = ({ isOpen, onClose, history }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-dark/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[80vh] bg-midnight border-2 border-violet/70 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-violet/30 bg-midnight-dark/80">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-mint" />
            <h3 className="font-heading font-black text-cream text-base">
              LỊCH SỬ HỘI THOẠI (DIALOGUE LOG)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-cream/60 hover:text-coral transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 max-h-[60vh]">
          {history.length === 0 ? (
            <p className="text-center text-xs text-cream/50 py-8">Chưa có hội thoại nào được ghi nhận.</p>
          ) : (
            history.map((line, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-midnight-light/60 border border-violet/20 flex flex-col gap-1">
                <span className={`text-xs font-heading font-bold ${
                  line.speaker === 'nova' ? 'text-violet-light' :
                  line.speaker === 'iris' ? 'text-mint' :
                  line.speaker === 'glitch' ? 'text-coral' :
                  line.speaker === 'system' ? 'text-amber' : 'text-cream'
                }`}>
                  {line.name}:
                </span>
                <p className="text-xs sm:text-sm text-cream/90 leading-relaxed font-sans">
                  {line.text}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-3 border-t border-violet/30 bg-midnight-dark/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg bg-violet hover:bg-violet-light text-cream font-bold text-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
