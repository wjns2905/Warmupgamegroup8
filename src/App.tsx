import React, { useState, useEffect } from 'react';
import { GameScene } from './types/game';
import { 
  SWOT_QUESTIONS, 
  SMART_PILLARS, 
  SMART_GOAL_FULL, 
  FIVE_DAY_SCHEDULE,
  PRESENTER_FAQ
} from './data/gameContent';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Settings, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Clock, 
  Award, 
  RotateCcw, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  Check,
  CheckSquare,
  X,
  ShieldCheck
} from 'lucide-react';

// Prologue dialogues matching the demo sample
const SCENE_1_DIALOGUES = [
  { id: '1', speaker: 'Bạn', text: 'Còn 6 ngày nữa!', btn: 'Bắt đầu' },
  { id: '2', speaker: 'Minh', text: 'Tận 9 chương kiến thức cần ôn mà mình vẫn chưa bắt đầu được chương nào cả...', btn: 'Tiếp tục' },
  { id: '3', speaker: 'Minh', text: 'Thôi, hôm nay nhất định phải ngồi vào bàn học nghiêm túc, không được trì hoãn nữa!', btn: 'Tiếp tục' },
  { id: '4', speaker: 'Minh', text: '📱 [Ting!] Kênh yêu thích vừa ra video mới... Xem lướt 5 phút thôi chắc không sao đâu nhỉ?', btn: 'Tiếp tục' },
  { id: '5', speaker: 'Minh', text: '⏳ Vài giờ sau... Đồng hồ điểm 23:30 đêm! Mình vẫn chưa đọc được trang nào!', btn: 'Tiếp tục' },
  { id: '6', speaker: 'Hệ thống', text: '⚡ BẤT NGỜ MÀN HÌNH LAPTOP PHÁT SÁNG! CỔNG LEVEL UP MỞ RA...', btn: 'Gặp Linh & Tick ►' }
];

const SCENE_2_DIALOGUES = [
  { id: 'm1', speaker: 'Linh', text: 'Chào Minh! Đừng hoảng hốt, cậu không hề cô đơn trên hành trình này đâu!', btn: 'Tiếp tục' },
  { id: 'm2', speaker: 'Tick', text: 'Reng reng reng! Báo động đỏ cấp độ thi cử! Chỉ còn 6 ngày nữa thôi đấy!', btn: 'Tiếp tục' },
  { id: 'm3', speaker: 'Minh', text: 'Hai người là ai vậy? Tôi đang lo sốt vó cho kỳ thi 9 chương đây!', btn: 'Tiếp tục' },
  { id: 'm4', speaker: 'Linh', text: 'Để thoát khỏi vòng lặp trì hoãn, trước tiên cậu phải HIỂU RÕ BẢN THÂN bằng Ma trận SWOT!', btn: 'Tiếp tục' },
  { id: 'm5', speaker: 'Linh', text: 'Hãy nhận diện: Strengths (Điểm mạnh), Weaknesses (Điểm yếu), Opportunities (Cơ hội), Threats (Thách thức).', btn: 'Tiếp tục' },
  { id: 'm6', speaker: 'Tick', text: 'Hãy cùng cả lớp giải mã 8 câu hỏi thử thách tư duy SWOT ngay bây giờ nào!', btn: 'Vào 8 Câu SWOT ►' }
];

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<GameScene>('PROLOGUE');
  const [scene1Idx, setScene1Idx] = useState(0);
  const [scene2Idx, setScene2Idx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [xp, setXp] = useState(0);
  const [checkedChapters, setCheckedChapters] = useState<number[]>([]);
  
  // Timer for 2-minute discussion
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Presenter Modal
  const [isPresenterOpen, setIsPresenterOpen] = useState(false);
  const [presenterTab, setPresenterTab] = useState<'SCENES' | 'ANSWERS' | 'FAQ'>('SCENES');

  // Confetti trigger
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'p' || e.key === 'P') {
        setIsPresenterOpen(prev => !prev);
      } else if (e.key === ' ' && !isPresenterOpen) {
        if (currentScene === 'PROLOGUE') {
          handleNextScene1();
        } else if (currentScene === 'MEET_LINH') {
          handleNextScene2();
        }
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key) && currentScene === 'SWOT_QUIZ' && !isAnswerSubmitted) {
        handleSelectAnswer(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, scene1Idx, scene2Idx, isAnswerSubmitted, isPresenterOpen]);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      triggerConfetti();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Scene navigation handlers
  const handleNextScene1 = () => {
    if (scene1Idx < SCENE_1_DIALOGUES.length - 1) {
      setScene1Idx(prev => prev + 1);
    } else {
      setCurrentScene('MEET_LINH');
      setScene2Idx(0);
    }
  };

  const handleNextScene2 = () => {
    if (scene2Idx < SCENE_2_DIALOGUES.length - 1) {
      setScene2Idx(prev => prev + 1);
    } else {
      setCurrentScene('SWOT_QUIZ');
      setCurrentQuestionIdx(0);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    }
  };

  const handleSelectAnswer = (key: string) => {
    setSelectedAnswer(key);
    setIsAnswerSubmitted(true);
    const q = SWOT_QUESTIONS[currentQuestionIdx];
    if (key === q.correctKey) {
      setXp(prev => prev + q.rewardXP);
      triggerConfetti();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < SWOT_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setCurrentScene('SWOT_COMPLETE');
      triggerConfetti();
    }
  };

  const handleJumpToScene = (scene: GameScene, qIdx?: number) => {
    setCurrentScene(scene);
    if (scene === 'PROLOGUE') setScene1Idx(0);
    if (scene === 'MEET_LINH') setScene2Idx(0);
    if (qIdx !== undefined) {
      setCurrentQuestionIdx(qIdx);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    }
    setIsPresenterOpen(false);
  };

  const toggleChapter = (chNum: number) => {
    setCheckedChapters(prev => 
      prev.includes(chNum) ? prev.filter(c => c !== chNum) : [...prev, chNum]
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center p-2 sm:p-6 bg-[#FFF4DF] select-none font-sans">
      
      {/* ================= EXACT DEMO FRAME (16:9 RATIO) ================= */}
      <div className="relative w-full max-w-4xl aspect-[16/10] sm:aspect-video rounded-[28px] sm:rounded-[36px] border-4 sm:border-6 border-[#151C45] overflow-hidden bg-[#151C45] shadow-[8px_8px_0px_#151C45] flex flex-col justify-between">
        
        {/* Top HUD Bar (Exact Match: Controller Logo on left, Book Progress + Gear on right) */}
        <div className="absolute top-2.5 sm:top-3.5 inset-x-3 sm:inset-x-5 flex items-center justify-between z-30 pointer-events-auto">
          {/* Left: Logo Capsule */}
          <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:py-1.5 bg-[#151C45] text-white border-2 border-white/25 rounded-full text-xs sm:text-sm font-black font-heading shadow-[2px_2px_0px_rgba(0,0,0,0.4)]">
            <span className="w-5 h-5 rounded-full bg-white text-[#151C45] flex items-center justify-center text-[10px]">🎮</span>
            <span>LEVEL UP!</span>
            <span className="text-[#FFD343] font-medium hidden sm:inline">• SWOT • SMART</span>
          </div>

          {/* Right: Book 0/9 & Settings Gear */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-[#151C45] rounded-full text-xs sm:text-sm font-black text-[#151C45] shadow-[2px_2px_0px_#151C45]">
              <span>📖</span>
              <span>{checkedChapters.length}/9</span>
            </div>

            <button
              onClick={() => setIsPresenterOpen(true)}
              title="Cài đặt & Chế độ thuyết trình (Phím P)"
              className="p-1.5 sm:p-2 bg-white hover:bg-[#FFD343] border-2 border-[#151C45] rounded-full text-[#151C45] shadow-[2px_2px_0px_#151C45] transition-all"
            >
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* ================= SCENE 1: PROLOGUE (EXACT BEDROOM SCENE WITH BORED MINH) ================= */}
        {currentScene === 'PROLOGUE' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Background + Character Artwork: Minh at study desk (Cleaned, no ghost dialogue overlay) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="/assets/scenes/scene_1_clean_desk.png" 
                alt="Minh bored at home desk" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Live Visual Novel Dialogue Box (Exact Replica of Sample) */}
            <div className="mt-auto z-20 px-3 sm:px-6 pb-3 sm:pb-5">
              <div 
                onClick={handleNextScene1}
                className="relative bg-[#FFFDF7] border-3 sm:border-4 border-[#151C45] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[4px_4px_0px_#151C45] flex items-center justify-between cursor-pointer group hover:border-[#7965F2] transition-all"
              >
                {/* Speaker Tag on Top-Left */}
                <div className="absolute -top-3.5 left-5 px-3 py-0.5 bg-[#252C58] text-white border-2 border-[#151C45] rounded-full text-xs font-black font-heading tracking-wide shadow-[1px_1px_0px_#151C45]">
                  <span>{SCENE_1_DIALOGUES[scene1Idx].speaker}</span>
                </div>

                {/* Dialogue Text */}
                <p className="font-heading font-black text-sm sm:text-lg md:text-xl text-[#151C45] pr-3 sm:pr-6 leading-snug">
                  {SCENE_1_DIALOGUES[scene1Idx].text}
                </p>

                {/* Down Triangle Arrow */}
                <span className="hidden sm:inline-block absolute bottom-2 right-28 sm:right-36 text-[#151C45] text-[11px] animate-bounce">
                  ▼
                </span>

                {/* Right Action Button (Exact Replica of Sample Button) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextScene1();
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-2 sm:border-3 border-[#151C45] rounded-xl sm:rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center gap-1.5 flex-shrink-0 shadow-[2px_2px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <span>► {SCENE_1_DIALOGUES[scene1Idx].btn}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCENE 2: MEET LINH & TICK (CLASSROOM / STRATEGY) ================= */}
        {currentScene === 'MEET_LINH' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFF4DF] to-white">
            {/* Stage: Linh standing with checklist & Tick mascot */}
            <div className="relative flex-1 w-full flex items-end justify-center pb-2 px-6">
              <div className="h-[220px] sm:h-[300px] flex items-end">
                <img 
                  src="/assets/scenes/linh_tick_stage.png" 
                  alt="Linh & Tick" 
                  className="max-h-full object-contain filter drop-shadow-[0_4px_8px_rgba(21,28,69,0.3)]"
                />
              </div>

              {/* SWOT Mini Badges in background */}
              <div className="absolute top-14 left-6 flex gap-1.5">
                <span className="px-2.5 py-1 bg-[#55C7AA] text-[#151C45] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs shadow-[2px_2px_0px_#151C45]">S - Strengths</span>
                <span className="px-2.5 py-1 bg-[#F47E93] text-white border-2 border-[#151C45] rounded-xl font-heading font-black text-xs shadow-[2px_2px_0px_#151C45]">W - Weaknesses</span>
                <span className="px-2.5 py-1 bg-[#FFD343] text-[#151C45] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs shadow-[2px_2px_0px_#151C45]">O - Opportunities</span>
                <span className="px-2.5 py-1 bg-[#7965F2] text-white border-2 border-[#151C45] rounded-xl font-heading font-black text-xs shadow-[2px_2px_0px_#151C45]">T - Threats</span>
              </div>
            </div>

            {/* Bottom Dialogue Box */}
            <div className="mt-auto z-20 px-3 sm:px-6 pb-3 sm:pb-5">
              <div 
                onClick={handleNextScene2}
                className="relative bg-[#FFFDF7] border-3 sm:border-4 border-[#151C45] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[4px_4px_0px_#151C45] flex items-center justify-between cursor-pointer group hover:border-[#7965F2] transition-all"
              >
                <div className={`absolute -top-3.5 left-5 px-3 py-0.5 rounded-full text-xs font-black font-heading tracking-wide border-2 border-[#151C45] ${
                  SCENE_2_DIALOGUES[scene2Idx].speaker === 'Linh' ? 'bg-[#FF8426] text-white' :
                  SCENE_2_DIALOGUES[scene2Idx].speaker === 'Tick' ? 'bg-[#7965F2] text-white' : 'bg-[#55C7AA] text-[#151C45]'
                }`}>
                  <span>{SCENE_2_DIALOGUES[scene2Idx].speaker}</span>
                </div>

                <p className="font-heading font-black text-sm sm:text-lg md:text-xl text-[#151C45] pr-3 sm:pr-6 leading-snug">
                  {SCENE_2_DIALOGUES[scene2Idx].text}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextScene2();
                  }}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-2 sm:border-3 border-[#151C45] rounded-xl sm:rounded-2xl font-heading font-black text-xs sm:text-sm flex items-center gap-1.5 flex-shrink-0 shadow-[2px_2px_0px_#151C45]"
                >
                  <span>► {SCENE_2_DIALOGUES[scene2Idx].btn}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCENE 3: SWOT QUIZ (8 QUESTIONS) ================= */}
        {currentScene === 'SWOT_QUIZ' && (
          <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-[#FFFDF7] overflow-y-auto">
            {/* Top Indicator */}
            <div className="mt-8 flex items-center justify-between border-b-2 border-[#151C45]/20 pb-2">
              <span className="font-heading font-black text-xs sm:text-sm text-[#7965F2]">
                CÂU HỎI {currentQuestionIdx + 1} / {SWOT_QUESTIONS.length}: {SWOT_QUESTIONS[currentQuestionIdx].title}
              </span>
              <div className="flex gap-1">
                {SWOT_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-5 h-2 rounded-full border border-[#151C45] ${
                      i < currentQuestionIdx ? 'bg-[#55C7AA]' : i === currentQuestionIdx ? 'bg-[#FF8426] animate-pulse' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Question Text */}
            <div className="my-auto py-2 space-y-3">
              <h3 className="font-heading font-black text-base sm:text-lg text-[#151C45] leading-snug">
                {SWOT_QUESTIONS[currentQuestionIdx].question}
              </h3>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SWOT_QUESTIONS[currentQuestionIdx].options.map((opt) => {
                  const isSelected = selectedAnswer === opt.key;
                  const isCorrect = opt.key === SWOT_QUESTIONS[currentQuestionIdx].correctKey;
                  
                  let btnColor = "bg-white hover:bg-[#FFF4DF] border-[#151C45] text-[#151C45]";
                  if (isAnswerSubmitted) {
                    if (isCorrect) btnColor = "bg-[#55C7AA] text-[#151C45] font-black";
                    else if (isSelected) btnColor = "bg-[#F47E93] text-white";
                    else btnColor = "bg-white/50 text-[#151C45]/40";
                  }

                  return (
                    <button
                      key={opt.key}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectAnswer(opt.key)}
                      className={`p-2.5 sm:p-3 border-2 sm:border-3 rounded-xl sm:rounded-2xl shadow-[2px_2px_0px_#151C45] text-left flex items-start gap-2.5 transition-all ${btnColor}`}
                    >
                      <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center border-2 border-[#151C45] rounded-lg bg-white text-[#151C45] font-heading font-black text-xs">
                        {opt.key}
                      </span>
                      <span className="text-xs sm:text-sm font-heading font-bold leading-tight">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert */}
              {isAnswerSubmitted && (
                <div className={`p-3 rounded-xl border-2 border-[#151C45] text-xs font-heading font-bold ${
                  selectedAnswer === SWOT_QUESTIONS[currentQuestionIdx].correctKey 
                    ? 'bg-[#55C7AA]/25 text-[#151C45]' 
                    : 'bg-[#F47E93]/25 text-[#151C45]'
                }`}>
                  <div className="font-black mb-0.5">
                    {selectedAnswer === SWOT_QUESTIONS[currentQuestionIdx].correctKey ? '🎉 CHÍNH XÁC! (+100 XP)' : '❌ CHƯA CHÍNH XÁC!'}
                    <span className="ml-2 font-normal">Đáp án đúng là: <b>{SWOT_QUESTIONS[currentQuestionIdx].correctKey}</b></span>
                  </div>
                  <p className="font-sans text-[11px] text-[#151C45]/85">{SWOT_QUESTIONS[currentQuestionIdx].explanation}</p>
                </div>
              )}
            </div>

            {/* Bottom Next Button */}
            <div className="flex justify-end pt-1">
              {isAnswerSubmitted ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs sm:text-sm shadow-[2px_2px_0px_#151C45]"
                >
                  <span>{currentQuestionIdx < SWOT_QUESTIONS.length - 1 ? 'CÂU TIẾP THEO ►' : 'HOÀN THÀNH SWOT ►'}</span>
                </button>
              ) : (
                <span className="text-[11px] font-heading font-bold text-[#151C45]/60 self-center">
                  Bấm phím A, B, C, D hoặc click chọn đáp án
                </span>
              )}
            </div>
          </div>
        )}

        {/* ================= SCENE 4: SWOT COMPLETE ================= */}
        {currentScene === 'SWOT_COMPLETE' && (
          <div className="relative w-full h-full flex flex-col justify-between p-6 bg-[#FFFDF7] text-center my-auto">
            <div className="my-auto space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#FFD343] border-3 border-[#151C45] flex items-center justify-center shadow-[4px_4px_0px_#151C45]">
                <Award className="w-10 h-10 text-[#FF8426]" />
              </div>

              <div>
                <span className="px-3 py-1 bg-[#55C7AA] text-[#151C45] border-2 border-[#151C45] rounded-full text-xs font-black font-heading">
                  CHƯƠNG 01 HOÀN TẤT
                </span>
                <h2 className="text-xl sm:text-3xl font-comic font-black text-[#151C45] mt-1">
                  MỞ KHÓA: SWOT EXPLORER!
                </h2>
                <p className="text-xs text-[#151C45]/70 font-sans mt-1">
                  Đã nhận diện đủ 4 yếu tố ma trận: Strengths, Weaknesses, Opportunities, Threats.
                </p>
              </div>

              <button
                onClick={() => setCurrentScene('SMART_DISCUSSION')}
                className="px-6 py-3 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-3 border-[#151C45] rounded-2xl font-heading font-black text-sm shadow-[3px_3px_0px_#151C45]"
              >
                SANG CHƯƠNG 02: SMART ►
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 5: SMART DISCUSSION (2 MINUTES) ================= */}
        {currentScene === 'SMART_DISCUSSION' && (
          <div className="relative w-full h-full flex flex-col justify-between p-6 bg-[#FFFDF7] text-center my-auto">
            <div className="my-auto space-y-4 max-w-lg mx-auto mt-6">
              <div className="inline-block px-3 py-1 bg-[#FF8426] text-white border-2 border-[#151C45] rounded-full font-heading font-black text-xs shadow-[2px_2px_0px_#151C45]">
                ⏳ THỬ THÁCH THẢO LUẬN 2 PHÚT
              </div>

              <h3 className="font-heading font-black text-base sm:text-xl text-[#151C45] leading-snug">
                "Hãy giúp nhân vật xây dựng một kế hoạch để THỰC SỰ BẮT ĐẦU thay vì tiếp tục trì hoãn?"
              </h3>

              {/* Timer Display */}
              <div className="p-4 bg-[#FFF4DF] border-3 border-[#151C45] rounded-3xl shadow-[4px_4px_0px_#151C45] flex items-center justify-center gap-4 max-w-xs mx-auto">
                <div className="flex items-center gap-2 font-comic text-4xl sm:text-5xl text-[#151C45]">
                  <Clock className={`w-8 h-8 ${isTimerRunning ? 'text-[#FF8426] animate-spin' : 'text-[#7965F2]'}`} />
                  <span>
                    {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:
                    {(timerSeconds % 60).toString().padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setIsTimerRunning(prev => !prev)}
                    className="px-3 py-1 bg-[#55C7AA] text-[#151C45] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs"
                  >
                    {isTimerRunning ? 'Dừng' : 'Bắt đầu'}
                  </button>
                  <button
                    onClick={() => { setIsTimerRunning(false); setTimerSeconds(120); }}
                    className="p-1 bg-white border border-[#151C45] rounded-lg text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mx-auto" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setCurrentScene('SMART_KEYS')}
                className="px-6 py-2.5 bg-[#7965F2] hover:bg-[#6853E8] text-white border-3 border-[#151C45] rounded-2xl font-heading font-black text-xs sm:text-sm shadow-[3px_3px_0px_#151C45]"
              >
                KHÁM PHÁ 5 CHÌA KHÓA SMART ►
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 6: SMART KEYS & 5-DAY PLAN ================= */}
        {currentScene === 'SMART_KEYS' && (
          <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-[#FFFDF7] overflow-y-auto">
            <div className="mt-8 border-b-2 border-[#151C45]/20 pb-2 flex items-center justify-between">
              <span className="font-heading font-black text-xs sm:text-sm text-[#FF8426]">
                5 TRỤ CỘT SMART & KẾ HOẠCH HÀNH ĐỘNG 5 NGÀY
              </span>
              <span className="text-[11px] font-bold text-[#151C45]/70">
                Ôn 9 chương trước 22:00
              </span>
            </div>

            {/* 5 Pillars Row */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 my-auto pt-2">
              {SMART_PILLARS.map((p) => (
                <div key={p.letter} className="p-2 sm:p-2.5 bg-white border-2 border-[#151C45] rounded-xl sm:rounded-2xl shadow-[2px_2px_0px_#151C45] flex flex-col justify-between">
                  <div>
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#151C45] text-white flex items-center justify-center font-comic font-black text-xs mb-1">
                      {p.letter}
                    </span>
                    <h5 className="font-heading font-black text-[11px] sm:text-xs text-[#151C45]">{p.nameVi}</h5>
                    <p className="font-sans text-[10px] text-[#151C45]/80 mt-1 line-clamp-3">{p.application}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Target & 9 Chapters Checklist */}
            <div className="p-3 bg-[#FFF4DF] border-2 border-[#151C45] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
              <div className="text-left">
                <span className="font-heading font-black text-[11px] text-[#FF8426] block">MỤC TIÊU SMART HOÀN CHỈNH:</span>
                <p className="font-heading font-bold text-xs text-[#151C45] leading-snug">
                  "Trong 5 ngày tới, hoàn thành 9 chương bằng cách học tối thiểu 2 chương/ngày và tích hoàn thành trước 22:00 ngày trước thi."
                </p>
              </div>

              {/* Checklist mini */}
              <div className="flex gap-1 flex-shrink-0">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ch) => {
                  const isChecked = checkedChapters.includes(ch);
                  return (
                    <button
                      key={ch}
                      onClick={() => toggleChapter(ch)}
                      className={`w-6 h-6 rounded border border-[#151C45] font-heading font-black text-[10px] flex items-center justify-center ${
                        isChecked ? 'bg-[#55C7AA] text-[#151C45]' : 'bg-white text-gray-400'
                      }`}
                    >
                      {ch}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setCurrentScene('VICTORY');
                  triggerConfetti();
                }}
                className="px-6 py-2 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs sm:text-sm shadow-[2px_2px_0px_#151C45]"
              >
                HOÀN THÀNH & CHIẾN THẮNG ►
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 7: VICTORY ================= */}
        {currentScene === 'VICTORY' && (
          <div className="relative w-full h-full flex flex-col justify-between p-6 bg-[#FFFDF7] text-center my-auto">
            <div className="my-auto space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#FFD343] border-4 border-[#151C45] flex items-center justify-center shadow-[4px_4px_0px_#151C45] animate-bounce">
                <Award className="w-10 h-10 text-[#FF8426]" />
              </div>

              <div>
                <span className="px-3 py-1 bg-[#7965F2] text-white border-2 border-[#151C45] rounded-full text-xs font-black font-heading">
                  NHIỆM VỤ HOÀN THÀNH
                </span>
                <h2 className="text-2xl sm:text-4xl font-comic font-black text-[#151C45] mt-1">
                  BẠN ĐÃ CHÍNH THỨC LEVEL UP!
                </h2>
                <p className="text-xs sm:text-sm text-[#FF8426] font-heading font-bold mt-1">
                  "Hiểu bản thân – Làm chủ mục tiêu. Tự tin bước vào kỳ thi!"
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentScene('PROLOGUE');
                    setScene1Idx(0);
                    setCheckedChapters([]);
                  }}
                  className="px-5 py-2.5 bg-white border-2 border-[#151C45] rounded-xl font-heading font-black text-xs text-[#151C45] shadow-[2px_2px_0px_#151C45]"
                >
                  CHƠI LẠI TỪ ĐẦU 🔄
                </button>
                <button
                  onClick={() => setIsPresenterOpen(true)}
                  className="px-5 py-2.5 bg-[#FFAA2B] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs text-[#151C45] shadow-[2px_2px_0px_#151C45]"
                >
                  PRESENTER MODE ⚙️
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= PRESENTER CONTROL MODAL ================= */}
      {isPresenterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151C45]/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#FFFDF7] border-4 border-[#151C45] rounded-3xl shadow-[8px_8px_0px_#151C45] p-5 max-h-[85vh] flex flex-col justify-between">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-[#151C45] pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#FF8426]" />
                <h3 className="font-heading font-black text-base text-[#151C45]">
                  PRESENTER CONTROL PANEL
                </h3>
              </div>
              <button
                onClick={() => setIsPresenterOpen(false)}
                className="p-1.5 bg-white hover:bg-[#F47E93] hover:text-white border-2 border-[#151C45] rounded-xl text-[#151C45]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex gap-2 pt-3 border-b border-[#151C45]/20">
              <button
                onClick={() => setPresenterTab('SCENES')}
                className={`px-3 py-1.5 font-heading font-black text-xs rounded-t-xl border-t-2 border-x-2 border-[#151C45] ${
                  presenterTab === 'SCENES' ? 'bg-[#FFF4DF] text-[#151C45]' : 'bg-white text-gray-500'
                }`}
              >
                ĐIỀU HƯỚNG CẢNH
              </button>
              <button
                onClick={() => setPresenterTab('ANSWERS')}
                className={`px-3 py-1.5 font-heading font-black text-xs rounded-t-xl border-t-2 border-x-2 border-[#151C45] ${
                  presenterTab === 'ANSWERS' ? 'bg-[#FFF4DF] text-[#151C45]' : 'bg-white text-gray-500'
                }`}
              >
                ĐÁP ÁN 8 CÂU SWOT
              </button>
              <button
                onClick={() => setPresenterTab('FAQ')}
                className={`px-3 py-1.5 font-heading font-black text-xs rounded-t-xl border-t-2 border-x-2 border-[#151C45] ${
                  presenterTab === 'FAQ' ? 'bg-[#FFF4DF] text-[#151C45]' : 'bg-white text-gray-500'
                }`}
              >
                FAQ GIẢI THÍCH SMART
              </button>
            </div>

            {/* Tab Body */}
            <div className="py-4 overflow-y-auto flex-1">
              {presenterTab === 'SCENES' && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleJumpToScene('PROLOGUE')}
                    className="p-2.5 bg-white hover:bg-[#FFD343] border-2 border-[#151C45] rounded-xl text-left font-heading font-bold text-xs"
                  >
                    1. Scene 1: Minh ở nhà (Còn 6 ngày nữa!)
                  </button>
                  <button
                    onClick={() => handleJumpToScene('MEET_LINH')}
                    className="p-2.5 bg-white hover:bg-[#FFD343] border-2 border-[#151C45] rounded-xl text-left font-heading font-bold text-xs"
                  >
                    2. Scene 2: Gặp Linh & Tick (Giới thiệu SWOT)
                  </button>
                  <button
                    onClick={() => handleJumpToScene('SWOT_QUIZ', 0)}
                    className="p-2.5 bg-white hover:bg-[#55C7AA] border-2 border-[#151C45] rounded-xl text-left font-heading font-bold text-xs"
                  >
                    3. Scene 3: Bắt đầu 8 câu SWOT (Câu 1)
                  </button>
                  <button
                    onClick={() => handleJumpToScene('SMART_DISCUSSION')}
                    className="p-2.5 bg-white hover:bg-[#FF8426] hover:text-white border-2 border-[#151C45] rounded-xl text-left font-heading font-bold text-xs"
                  >
                    4. Scene 4: Thảo luận 2 phút
                  </button>
                  <button
                    onClick={() => handleJumpToScene('SMART_KEYS')}
                    className="p-2.5 bg-white hover:bg-[#7965F2] hover:text-white border-2 border-[#151C45] rounded-xl text-left font-heading font-bold text-xs"
                  >
                    5. Scene 5: 5 Chìa khóa SMART & Lịch
                  </button>
                  <button
                    onClick={() => handleJumpToScene('VICTORY')}
                    className="p-2.5 bg-[#FFD343] border-2 border-[#151C45] rounded-xl text-left font-heading font-bold text-xs"
                  >
                    6. Scene 6: Chiến thắng (Victory)
                  </button>
                </div>
              )}

              {presenterTab === 'ANSWERS' && (
                <div className="space-y-2">
                  <div className="p-2.5 bg-[#FFD343] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs text-[#151C45] flex items-center justify-between">
                    <span>ĐÁP ÁN NHANH:</span>
                    <span className="text-[#FF8426] tracking-widest text-sm">B - A - C - B - A - C - C - A</span>
                  </div>
                  {SWOT_QUESTIONS.map(q => (
                    <div key={q.id} className="p-2 bg-white border border-[#151C45] rounded-lg text-xs font-heading">
                      <span className="font-bold">{q.title}: </span>
                      <span className="px-1.5 py-0.5 bg-[#55C7AA] text-[#151C45] font-black rounded">
                        Đáp án {q.correctKey}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {presenterTab === 'FAQ' && (
                <div className="space-y-2">
                  {PRESENTER_FAQ.map((f, i) => (
                    <div key={i} className="p-2.5 bg-white border border-[#151C45] rounded-xl text-xs font-heading">
                      <p className="font-bold text-[#FF8426]">❓ {f.q}</p>
                      <p className="font-sans text-[11px] text-[#151C45]/80 mt-1">💡 {f.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
