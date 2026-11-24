import React, { useState, useEffect } from 'react';
import { GameScene } from './types/game';
import { 
  SWOT_QUESTIONS, 
  SMART_GAME_QUESTIONS,
  SMART_PILLARS, 
  SMART_GOAL_FULL, 
  VIDEO_DATA,
  PRESENTER_FAQ
} from './data/gameContent';
import { PresenterModal } from './components/PresenterModal';
import confetti from 'canvas-confetti';
import { 
  Settings, 
  Clock, 
  Award, 
  RotateCcw, 
  ExternalLink,
  BookOpen,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Play
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<GameScene>('WARMUP_INTRO');
  
  // SWOT Quiz State (10 questions)
  const [currentSwotIdx, setCurrentSwotIdx] = useState(0);
  const [selectedSwotAnswer, setSelectedSwotAnswer] = useState<string | null>(null);
  const [isSwotSubmitted, setIsSwotSubmitted] = useState(false);
  
  // SMART Game State (5 questions)
  const [currentSmartIdx, setCurrentSmartIdx] = useState(0);
  const [selectedSmartAnswer, setSelectedSmartAnswer] = useState<string | null>(null);
  const [isSmartSubmitted, setIsSmartSubmitted] = useState(false);

  // Score & Checklist
  const [xp, setXp] = useState(0);
  const [checkedChapters, setCheckedChapters] = useState<number[]>([]);
  
  // Timer for 2-minute discussion
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Presenter Modal
  const [isPresenterOpen, setIsPresenterOpen] = useState(false);

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
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
        const key = e.key.toUpperCase();
        if (currentScene === 'SWOT_QUIZ' && !isSwotSubmitted) {
          handleSelectSwotAnswer(key);
        } else if (currentScene === 'SMART_GAME' && !isSmartSubmitted) {
          handleSelectSmartAnswer(key);
        }
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (currentScene === 'WARMUP_INTRO') {
          setCurrentScene('SWOT_QUIZ');
        } else if (currentScene === 'SWOT_QUIZ' && isSwotSubmitted) {
          handleNextSwotQuestion();
        } else if (currentScene === 'SMART_GAME' && isSmartSubmitted) {
          handleNextSmartQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, currentSwotIdx, isSwotSubmitted, currentSmartIdx, isSmartSubmitted, isPresenterOpen]);

  // Timer interval for 2-minute discussion
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

  // SWOT Quiz Handlers
  const handleSelectSwotAnswer = (key: string) => {
    setSelectedSwotAnswer(key);
    setIsSwotSubmitted(true);
    const q = SWOT_QUESTIONS[currentSwotIdx];
    if (key === q.correctKey) {
      setXp(prev => prev + q.rewardXP);
      triggerConfetti();
    }
  };

  const handleNextSwotQuestion = () => {
    if (currentSwotIdx < SWOT_QUESTIONS.length - 1) {
      setCurrentSwotIdx(prev => prev + 1);
      setSelectedSwotAnswer(null);
      setIsSwotSubmitted(false);
    } else {
      setCurrentScene('SWOT_COMPLETE');
      triggerConfetti();
    }
  };

  // SMART Game Handlers
  const handleSelectSmartAnswer = (key: string) => {
    setSelectedSmartAnswer(key);
    setIsSmartSubmitted(true);
    const q = SMART_GAME_QUESTIONS[currentSmartIdx];
    if (key === q.correctKey) {
      setXp(prev => prev + q.rewardXP);
      triggerConfetti();
    }
  };

  const handleNextSmartQuestion = () => {
    if (currentSmartIdx < SMART_GAME_QUESTIONS.length - 1) {
      setCurrentSmartIdx(prev => prev + 1);
      setSelectedSmartAnswer(null);
      setIsSmartSubmitted(false);
    } else {
      setCurrentScene('VICTORY');
      triggerConfetti();
    }
  };

  const handleJumpToScene = (scene: GameScene, qIdx?: number) => {
    setCurrentScene(scene);
    if (scene === 'SWOT_QUIZ') {
      setCurrentSwotIdx(qIdx !== undefined ? qIdx : 0);
      setSelectedSwotAnswer(null);
      setIsSwotSubmitted(false);
    } else if (scene === 'SMART_GAME') {
      setCurrentSmartIdx(qIdx !== undefined ? qIdx : 0);
      setSelectedSmartAnswer(null);
      setIsSmartSubmitted(false);
    }
    setIsPresenterOpen(false);
  };

  const toggleChapter = (chNum: number) => {
    setCheckedChapters(prev => 
      prev.includes(chNum) ? prev.filter(c => c !== chNum) : [...prev, chNum]
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center p-2 sm:p-5 bg-[#FFF4DF] select-none font-sans">
      
      {/* ================= MAIN 16:9 GAME STAGE ================= */}
      <div className="relative w-full max-w-5xl aspect-[16/10] sm:aspect-video rounded-[24px] sm:rounded-[36px] border-4 sm:border-6 border-[#151C45] overflow-hidden bg-[#151C45] shadow-[8px_8px_0px_#151C45] flex flex-col justify-between">
        
        {/* ================= TOP HUD: WARM UP GAME ================= */}
        <div className="absolute top-2.5 sm:top-3.5 inset-x-3 sm:inset-x-5 flex items-center justify-between z-30 pointer-events-auto">
          {/* Left: Warm Up Game Title Capsule */}
          <div className="flex items-center gap-2 px-3 py-1 sm:py-1.5 bg-[#151C45] text-white border-2 border-white/25 rounded-full text-xs sm:text-sm font-black font-heading shadow-[2px_2px_0px_rgba(0,0,0,0.4)]">
            <span className="w-5 h-5 rounded-full bg-[#FFD343] text-[#151C45] flex items-center justify-center text-xs">🎮</span>
            <span>WARM UP GAME</span>
            <span className="text-[#FFD343] font-medium hidden sm:inline">• SWOT & SMART</span>
          </div>

          {/* Center: Stage Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-white/95 border-2 border-[#151C45] rounded-full text-xs font-black text-[#151C45] shadow-[2px_2px_0px_#151C45]">
            {currentScene === 'WARMUP_INTRO' && <span>🚀 KHỞI ĐỘNG</span>}
            {currentScene === 'SWOT_QUIZ' && <span>📝 CÂU HỎI SWOT {currentSwotIdx + 1}/10</span>}
            {currentScene === 'SWOT_COMPLETE' && <span>🎉 HOÀN THÀNH SWOT</span>}
            {currentScene === 'SMART_VIDEO' && <span>🎬 VIDEO TÌNH HUỐNG</span>}
            {currentScene === 'SMART_DISCUSSION' && <span>⏳ THẢO LUẬN 2 PHÚT</span>}
            {currentScene === 'SMART_THEORY' && <span>💡 NGUYÊN TẮC SMART</span>}
            {currentScene === 'SMART_GAME' && <span>🎯 THỰC HÀNH SMART {currentSmartIdx + 1}/5</span>}
            {currentScene === 'VICTORY' && <span>🏆 TỔNG KẾT CHIẾN THẮNG</span>}
          </div>

          {/* Right: XP & Settings Gear */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#FFD343] border-2 border-[#151C45] rounded-full text-xs sm:text-sm font-black text-[#151C45] shadow-[2px_2px_0px_#151C45]">
              <span>⭐</span>
              <span>{xp} XP</span>
            </div>

            <button
              onClick={() => setIsPresenterOpen(true)}
              title="Cài đặt & Bảng điều khiển thuyết trình (Phím P)"
              className="p-1.5 sm:p-2 bg-white hover:bg-[#FFD343] border-2 border-[#151C45] rounded-full text-[#151C45] shadow-[2px_2px_0px_#151C45] transition-all"
            >
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* ================= 1. WARMUP INTRO SCREEN ================= */}
        {currentScene === 'WARMUP_INTRO' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Pristine Classroom Stage Background */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="./assets/scenes/strategy_classroom_pristine.png" 
                alt="Pristine Classroom Stage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#151C45]/20 backdrop-blur-[1px]" />
            </div>

            {/* Impeccable Clean Character Sprites */}
            <img 
              src="./assets/characters/linh_threequarter_clean.png" 
              alt="Linh"
              className="absolute bottom-0 left-4 sm:left-10 h-[52%] sm:h-[62%] object-contain drop-shadow-[4px_4px_0px_#151C45] z-10 hidden sm:block pointer-events-none" 
            />
            <img 
              src="./assets/characters/tick_greeting_clean.png" 
              alt="Tick Mascot"
              className="absolute bottom-6 right-6 sm:right-12 h-[26%] sm:h-[32%] object-contain drop-shadow-[3px_3px_0px_#151C45] z-10 hidden sm:block animate-pulse pointer-events-none" 
            />

            {/* Content Card */}
            <div className="relative z-20 my-auto p-4 sm:p-8 text-center max-w-xl mx-auto">
              <div className="bg-[#FFFDF7]/95 border-4 border-[#151C45] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#151C45] space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF8426] text-white border-2 border-[#151C45] rounded-full font-heading font-black text-xs shadow-[2px_2px_0px_#151C45]">
                  <span>✨ HOẠT ĐỘNG KHỞI ĐỘNG LỚP HỌC</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-comic font-black text-[#151C45] leading-tight">
                  WARM UP GAME
                  <span className="block text-lg sm:text-xl text-[#7965F2] font-heading font-bold mt-1">
                    MA TRẬN SWOT & NGUYÊN TẮC SMART
                  </span>
                </h1>

                <p className="text-xs sm:text-sm text-[#151C45]/80 font-sans leading-relaxed">
                  Chào mừng cả lớp đến với trò chơi khởi động! Cùng trải nghiệm 2 chặng thử thách tư duy chiến lược và thực hành lập kế hoạch học tập.
                </p>

                {/* 2 Track Roadmap */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-left">
                  <div className="p-3 bg-[#FFF4DF] border-2 border-[#151C45] rounded-2xl shadow-[2px_2px_0px_#151C45]">
                    <span className="font-heading font-black text-xs text-[#55C7AA] block">CHẶNG 1: SWOT</span>
                    <p className="font-sans text-[11px] text-[#151C45]/80 mt-0.5">10 câu hỏi thử thách tư duy từ cơ bản đến tình huống thực tế.</p>
                  </div>
                  <div className="p-3 bg-[#FFF4DF] border-2 border-[#151C45] rounded-2xl shadow-[2px_2px_0px_#151C45]">
                    <span className="font-heading font-black text-xs text-[#FF8426] block">CHẶNG 2: SMART</span>
                    <p className="font-sans text-[11px] text-[#151C45]/80 mt-0.5">Xem video tình huống, thảo luận 2 phút & thực hành trò chơi SMART.</p>
                  </div>
                </div>

                {/* Start Button */}
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentScene('SWOT_QUIZ')}
                    className="w-full sm:w-auto px-8 py-3 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-3 border-[#151C45] rounded-2xl font-heading font-black text-sm sm:text-base shadow-[4px_4px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 mx-auto"
                  >
                    <span>► BẮT ĐẦU 10 CÂU SWOT</span>
                    <span className="text-xs bg-[#151C45] text-white px-2 py-0.5 rounded-full font-mono">[Space]</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. SWOT QUIZ (10 QUESTIONS) ================= */}
        {currentScene === 'SWOT_QUIZ' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Pristine Classroom Stage Background */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="./assets/scenes/strategy_classroom_pristine.png" 
                alt="Pristine Classroom Stage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#151C45]/15 backdrop-blur-[1px]" />
            </div>

            {/* Impeccable Clean Mascot Tick (Pointing at Questions) */}
            <img 
              src="./assets/characters/tick_pointing_clean.png" 
              alt="Tick Mascot Pointing" 
              className="absolute bottom-4 right-4 sm:right-8 h-[32%] sm:h-[40%] object-contain drop-shadow-[3px_3px_0px_#151C45] z-10 hidden md:block pointer-events-none"
            />

            {/* Content Container */}
            <div className="relative z-20 w-full h-full flex flex-col justify-between p-3 sm:p-5 overflow-y-auto">
              {/* Top Indicator */}
              <div className="mt-8 sm:mt-10 flex items-center justify-between border-2 border-[#151C45] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#151C45]">
                <span className="font-heading font-black text-xs sm:text-sm text-[#7965F2]">
                  CÂU HỎI {currentSwotIdx + 1} / {SWOT_QUESTIONS.length}: {SWOT_QUESTIONS[currentSwotIdx].title}
                </span>
                <div className="flex gap-1">
                  {SWOT_QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3.5 sm:w-5 h-2 rounded-full border border-[#151C45] ${
                        i < currentSwotIdx ? 'bg-[#55C7AA]' : i === currentSwotIdx ? 'bg-[#FF8426] animate-pulse' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Text & Options Card */}
              <div className="my-auto py-2 space-y-3 max-w-2xl bg-[#FFFDF7]/95 border-3 border-[#151C45] rounded-3xl p-4 sm:p-5 shadow-[6px_6px_0px_#151C45]">
                <h3 className="font-heading font-black text-base sm:text-lg text-[#151C45] leading-snug">
                  {SWOT_QUESTIONS[currentSwotIdx].question}
                </h3>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SWOT_QUESTIONS[currentSwotIdx].options.map((opt) => {
                    const isSelected = selectedSwotAnswer === opt.key;
                    const isCorrect = opt.key === SWOT_QUESTIONS[currentSwotIdx].correctKey;
                    
                    let btnColor = "bg-white hover:bg-[#FFF4DF] border-[#151C45] text-[#151C45]";
                    if (isSwotSubmitted) {
                      if (isCorrect) btnColor = "bg-[#55C7AA] text-[#151C45] font-black";
                      else if (isSelected) btnColor = "bg-[#F47E93] text-white";
                      else btnColor = "bg-white/50 text-[#151C45]/40";
                    }

                    return (
                      <button
                        key={opt.key}
                        disabled={isSwotSubmitted}
                        onClick={() => handleSelectSwotAnswer(opt.key)}
                        className={`p-2 sm:p-2.5 border-2 sm:border-3 rounded-xl sm:rounded-2xl shadow-[2px_2px_0px_#151C45] text-left flex items-start gap-2 transition-all ${btnColor}`}
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

                {/* Feedback Alert with full explanation from document */}
                {isSwotSubmitted && (
                  <div className={`p-2.5 sm:p-3 rounded-xl border-2 border-[#151C45] text-xs font-heading font-bold ${
                    selectedSwotAnswer === SWOT_QUESTIONS[currentSwotIdx].correctKey 
                      ? 'bg-[#55C7AA]/35 text-[#151C45]' 
                      : 'bg-[#F47E93]/35 text-[#151C45]'
                  }`}>
                    <div className="font-black mb-0.5">
                      {selectedSwotAnswer === SWOT_QUESTIONS[currentSwotIdx].correctKey ? '🎉 CHÍNH XÁC! (+100 XP)' : '❌ CHƯA CHÍNH XÁC!'}
                      <span className="ml-2 font-normal">Đáp án đúng là: <b>{SWOT_QUESTIONS[currentSwotIdx].correctKey}</b></span>
                    </div>
                    <p className="font-sans text-[11px] text-[#151C45]/90">{SWOT_QUESTIONS[currentSwotIdx].explanation}</p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-end pt-1">
                {isSwotSubmitted ? (
                  <button
                    onClick={handleNextSwotQuestion}
                    className="px-5 py-2 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-3 border-[#151C45] rounded-xl font-heading font-black text-xs sm:text-sm shadow-[3px_3px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <span>{currentSwotIdx < SWOT_QUESTIONS.length - 1 ? 'CÂU TIẾP THEO ►' : 'HOÀN THÀNH 10 CÂU SWOT ►'}</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-heading font-bold text-[#151C45] bg-white/80 px-3 py-1 rounded-full border border-[#151C45] self-center">
                    Bấm phím A, B, C, D hoặc click chọn đáp án
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. SWOT COMPLETE ================= */}
        {currentScene === 'SWOT_COMPLETE' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="./assets/scenes/strategy_classroom_pristine.png" 
                alt="Pristine Classroom Stage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#151C45]/20 backdrop-blur-[1px]" />
            </div>

            {/* Impeccable Clean Cheering Sprites */}
            <img 
              src="./assets/characters/linh_action_clean.png" 
              alt="Linh Cheering" 
              className="absolute bottom-0 left-6 sm:left-12 h-[52%] sm:h-[62%] object-contain drop-shadow-[4px_4px_0px_#151C45] z-10 hidden sm:block pointer-events-none" 
            />
            <img 
              src="./assets/characters/tick_cheering_clean.png" 
              alt="Tick Cheering" 
              className="absolute bottom-6 right-6 sm:right-14 h-[28%] sm:h-[35%] object-contain drop-shadow-[3px_3px_0px_#151C45] z-10 hidden sm:block pointer-events-none" 
            />

            <div className="relative z-20 my-auto p-4 sm:p-6 text-center max-w-lg mx-auto">
              <div className="bg-[#FFFDF7]/95 border-4 border-[#151C45] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#151C45] space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#FFD343] border-3 border-[#151C45] flex items-center justify-center shadow-[4px_4px_0px_#151C45] animate-pulse">
                  <Award className="w-10 h-10 text-[#FF8426]" />
                </div>

                <div>
                  <span className="px-3 py-1 bg-[#55C7AA] text-[#151C45] border-2 border-[#151C45] rounded-full text-xs font-black font-heading">
                    CHẶNG 1 HOÀN TẤT
                  </span>
                  <h2 className="text-xl sm:text-3xl font-comic font-black text-[#151C45] mt-2">
                    MỞ KHÓA: SWOT MASTER!
                  </h2>
                  <p className="text-xs sm:text-sm text-[#151C45]/80 font-sans mt-1">
                    Cả lớp đã xuất sắc hoàn thành 10 câu hỏi tư duy SWOT. Tiếp theo, hãy cùng xem một video tình huống thực tế về sự trì hoãn trong học tập!
                  </p>
                </div>

                <button
                  onClick={() => setCurrentScene('SMART_VIDEO')}
                  className="px-6 py-3 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-3 border-[#151C45] rounded-2xl font-heading font-black text-sm shadow-[4px_4px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  SANG PHẦN 2: VIDEO TÌNH HUỐNG ►
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. SMART VIDEO (YOUTUBE EMBED) ================= */}
        {currentScene === 'SMART_VIDEO' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-[#151C45]" />

            <div className="relative z-20 w-full h-full flex flex-col justify-between p-3 sm:p-5 overflow-y-auto">
              {/* Header Bar */}
              <div className="mt-8 flex items-center justify-between border-2 border-[#151C45] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#151C45]">
                <span className="font-heading font-black text-xs sm:text-sm text-[#FF8426]">
                  PHẦN 2: TRÌNH CHIẾU VIDEO TÌNH HUỐNG TRÌ HOÃN TRONG HỌC TẬP
                </span>
                <a
                  href={VIDEO_DATA.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-heading font-black text-[#7965F2] hover:underline"
                >
                  <span>Mở YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Video Player & Reflection Container */}
              <div className="my-auto py-2 grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                {/* 2 Cols: YouTube Embed */}
                <div className="md:col-span-2 aspect-video w-full rounded-2xl border-3 border-[#151C45] overflow-hidden shadow-[4px_4px_0px_#151C45] bg-black">
                  <iframe
                    src={VIDEO_DATA.embedUrl}
                    title="Video tình huống học tập thiếu kế hoạch"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* 1 Col: Reflection Script from Document */}
                <div className="p-3 sm:p-4 bg-[#FFFDF7] border-3 border-[#151C45] rounded-2xl shadow-[4px_4px_0px_#151C45] space-y-2 text-left">
                  <span className="px-2.5 py-0.5 bg-[#FF8426] text-white border border-[#151C45] rounded-full text-[10px] font-black font-heading">
                    LỜI DẪN DIỄN GIẢ (SAU VIDEO)
                  </span>
                  <p className="font-sans text-xs text-[#151C45] leading-relaxed">
                    "{VIDEO_DATA.afterVideoReflection[0]}"
                  </p>
                  <p className="font-heading font-bold text-xs text-[#7965F2] leading-snug">
                    "{VIDEO_DATA.afterVideoReflection[1]}"
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => setCurrentScene('SMART_DISCUSSION')}
                  className="px-6 py-2 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-3 border-[#151C45] rounded-xl font-heading font-black text-xs sm:text-sm shadow-[3px_3px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  BẮT ĐẦU THẢO LUẬN 2 PHÚT ►
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 5. SMART DISCUSSION (2 MINUTES TIMER) ================= */}
        {currentScene === 'SMART_DISCUSSION' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="./assets/scenes/strategy_classroom_pristine.png" 
                alt="Pristine Classroom Stage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#151C45]/20 backdrop-blur-[1px]" />
            </div>

            {/* Impeccable Clean Tick Countdown Sprite with "2 MIN" Sign */}
            <img 
              src="./assets/characters/tick_countdown_clean.png" 
              alt="Tick 2 MIN Countdown" 
              className="absolute bottom-6 right-6 sm:right-14 h-[30%] sm:h-[38%] object-contain drop-shadow-[4px_4px_0px_#151C45] z-10 hidden md:block animate-pulse pointer-events-none" 
            />

            <div className="relative z-20 my-auto p-4 sm:p-6 text-center max-w-lg mx-auto">
              <div className="bg-[#FFFDF7]/95 border-4 border-[#151C45] rounded-3xl p-5 sm:p-7 shadow-[8px_8px_0px_#151C45] space-y-4">
                <div className="inline-block px-3 py-1 bg-[#FF8426] text-white border-2 border-[#151C45] rounded-full font-heading font-black text-xs shadow-[2px_2px_0px_#151C45]">
                  ⏳ CÂU HỎI THẢO LUẬN 2 PHÚT
                </div>

                <h3 className="font-heading font-black text-base sm:text-lg text-[#151C45] leading-snug">
                  "{VIDEO_DATA.discussionPrompt}"
                </h3>

                {/* Timer Display */}
                <div className="p-3 sm:p-4 bg-[#FFF4DF] border-3 border-[#151C45] rounded-2xl shadow-[4px_4px_0px_#151C45] flex items-center justify-center gap-4 max-w-xs mx-auto">
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
                      className="px-3 py-1 bg-[#55C7AA] hover:bg-[#46b397] text-[#151C45] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs shadow-[1px_1px_0px_#151C45]"
                    >
                      {isTimerRunning ? 'Dừng' : 'Bắt đầu'}
                    </button>
                    <button
                      onClick={() => { setIsTimerRunning(false); setTimerSeconds(120); }}
                      className="p-1 bg-white hover:bg-gray-100 border border-[#151C45] rounded-lg text-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5 mx-auto" />
                    </button>
                  </div>
                </div>

                {/* Remark text */}
                <p className="font-sans text-[11px] text-[#151C45]/80 italic">
                  "{VIDEO_DATA.afterDiscussionRemark}"
                </p>

                <button
                  onClick={() => setCurrentScene('SMART_THEORY')}
                  className="px-6 py-2.5 bg-[#7965F2] hover:bg-[#6853E8] text-white border-3 border-[#151C45] rounded-2xl font-heading font-black text-xs sm:text-sm shadow-[3px_3px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  KHÁM PHÁ NGUYÊN TẮC SMART ►
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. SMART THEORY & COMPLETE GOAL ================= */}
        {currentScene === 'SMART_THEORY' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="./assets/scenes/strategy_classroom_pristine.png" 
                alt="Pristine Classroom Stage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#151C45]/15 backdrop-blur-[1px]" />
            </div>

            <div className="relative z-20 w-full h-full flex flex-col justify-between p-3 sm:p-5 overflow-y-auto">
              <div className="mt-8 border-2 border-[#151C45] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center justify-between shadow-[2px_2px_0px_#151C45]">
                <span className="font-heading font-black text-xs sm:text-sm text-[#FF8426]">
                  PHẦN 4: 5 TRỤ CỘT SMART & MỤC TIÊU HOÀN CHỈNH
                </span>
                <span className="text-[11px] font-bold text-[#151C45]/70">
                  Dựa trên bối cảnh video
                </span>
              </div>

              {/* Complete SMART Goal Card */}
              <div className="p-3 bg-[#FFD343]/95 border-3 border-[#151C45] rounded-2xl shadow-[4px_4px_0px_#151C45] my-1 text-left">
                <span className="font-heading font-black text-[11px] text-[#151C45] uppercase tracking-wide block">
                  🎯 MỤC TIÊU SMART HOÀN CHỈNH (CHÍNH TÀI LIỆU):
                </span>
                <p className="font-heading font-bold text-xs sm:text-sm text-[#151C45] leading-snug mt-0.5">
                  "{SMART_GOAL_FULL}"
                </p>
              </div>

              {/* 5 Pillars Row */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 my-auto">
                {SMART_PILLARS.map((p) => (
                  <div key={p.letter} className="p-2 sm:p-2.5 bg-[#FFFDF7]/95 border-2 border-[#151C45] rounded-xl sm:rounded-2xl shadow-[3px_3px_0px_#151C45] flex flex-col justify-between">
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

              {/* Bottom Actions */}
              <div className="flex justify-between items-center pt-1">
                <button
                  onClick={() => setIsPresenterOpen(true)}
                  className="text-xs font-heading font-bold text-[#7965F2] hover:underline"
                >
                  💡 Xem phương án phản biện khi khán giả góp ý khác (Phím P)
                </button>

                <button
                  onClick={() => setCurrentScene('SMART_GAME')}
                  className="px-6 py-2 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs sm:text-sm shadow-[2px_2px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  VÀO TRÒ CHƠI THỰC HÀNH SMART ►
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= 7. SMART GAME (5 INTERACTIVE CHALLENGES) ================= */}
        {currentScene === 'SMART_GAME' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="./assets/scenes/strategy_classroom_pristine.png" 
                alt="Pristine Classroom Stage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#151C45]/15 backdrop-blur-[1px]" />
            </div>

            {/* Impeccable Clean Mascot Tick Pointing */}
            <img 
              src="./assets/characters/tick_pointing_clean.png" 
              alt="Tick Mascot Pointing" 
              className="absolute bottom-4 right-4 sm:right-8 h-[30%] sm:h-[38%] object-contain drop-shadow-[3px_3px_0px_#151C45] z-10 hidden md:block pointer-events-none" 
            />

            <div className="relative z-20 w-full h-full flex flex-col justify-between p-3 sm:p-5 overflow-y-auto">
              {/* Top Indicator */}
              <div className="mt-8 sm:mt-10 flex items-center justify-between border-2 border-[#151C45] bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_#151C45]">
                <span className="font-heading font-black text-xs sm:text-sm text-[#FF8426]">
                  THỬ THÁCH SMART {currentSmartIdx + 1} / {SMART_GAME_QUESTIONS.length}: {SMART_GAME_QUESTIONS[currentSmartIdx].title}
                </span>
                
                {/* 9 Chapters Checklist Mini widget */}
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black text-[#151C45] mr-1 hidden sm:inline">Checklist 9 chương:</span>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ch) => {
                    const isChecked = checkedChapters.includes(ch);
                    return (
                      <button
                        key={ch}
                        onClick={() => toggleChapter(ch)}
                        title={`Chương ${ch}`}
                        className={`w-5 h-5 rounded border border-[#151C45] font-heading font-black text-[9px] flex items-center justify-center ${
                          isChecked ? 'bg-[#55C7AA] text-[#151C45]' : 'bg-white text-gray-400'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Text & Options Card */}
              <div className="my-auto py-2 space-y-3 max-w-2xl bg-[#FFFDF7]/95 border-3 border-[#151C45] rounded-3xl p-4 sm:p-5 shadow-[6px_6px_0px_#151C45]">
                <h3 className="font-heading font-black text-base sm:text-lg text-[#151C45] leading-snug">
                  {SMART_GAME_QUESTIONS[currentSmartIdx].question}
                </h3>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SMART_GAME_QUESTIONS[currentSmartIdx].options.map((opt) => {
                    const isSelected = selectedSmartAnswer === opt.key;
                    const isCorrect = opt.key === SMART_GAME_QUESTIONS[currentSmartIdx].correctKey;
                    
                    let btnColor = "bg-white hover:bg-[#FFF4DF] border-[#151C45] text-[#151C45]";
                    if (isSmartSubmitted) {
                      if (isCorrect) btnColor = "bg-[#55C7AA] text-[#151C45] font-black";
                      else if (isSelected) btnColor = "bg-[#F47E93] text-white";
                      else btnColor = "bg-white/50 text-[#151C45]/40";
                    }

                    return (
                      <button
                        key={opt.key}
                        disabled={isSmartSubmitted}
                        onClick={() => handleSelectSmartAnswer(opt.key)}
                        className={`p-2 sm:p-2.5 border-2 sm:border-3 rounded-xl sm:rounded-2xl shadow-[2px_2px_0px_#151C45] text-left flex items-start gap-2 transition-all ${btnColor}`}
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
                {isSmartSubmitted && (
                  <div className={`p-2.5 sm:p-3 rounded-xl border-2 border-[#151C45] text-xs font-heading font-bold ${
                    selectedSmartAnswer === SMART_GAME_QUESTIONS[currentSmartIdx].correctKey 
                      ? 'bg-[#55C7AA]/35 text-[#151C45]' 
                      : 'bg-[#F47E93]/35 text-[#151C45]'
                  }`}>
                    <div className="font-black mb-0.5">
                      {selectedSmartAnswer === SMART_GAME_QUESTIONS[currentSmartIdx].correctKey ? '🎉 CHÍNH XÁC! (+100 XP)' : '❌ CHƯA CHÍNH XÁC!'}
                      <span className="ml-2 font-normal">Đáp án đúng là: <b>{SMART_GAME_QUESTIONS[currentSmartIdx].correctKey}</b></span>
                    </div>
                    <p className="font-sans text-[11px] text-[#151C45]/90">{SMART_GAME_QUESTIONS[currentSmartIdx].explanation}</p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-end pt-1">
                {isSmartSubmitted ? (
                  <button
                    onClick={handleNextSmartQuestion}
                    className="px-5 py-2 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-3 border-[#151C45] rounded-xl font-heading font-black text-xs sm:text-sm shadow-[3px_3px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <span>{currentSmartIdx < SMART_GAME_QUESTIONS.length - 1 ? 'THỬ THÁCH TIẾP THEO ►' : 'TỔNG KẾT CHIẾN THẮNG ►'}</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-heading font-bold text-[#151C45] bg-white/80 px-3 py-1 rounded-full border border-[#151C45] self-center">
                    Bấm phím A, B, C, D hoặc click chọn đáp án
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= 8. VICTORY ================= */}
        {currentScene === 'VICTORY' && (
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
              <img 
                src="./assets/scenes/strategy_classroom_pristine.png" 
                alt="Pristine Classroom Stage" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#151C45]/20 backdrop-blur-[1px]" />
            </div>

            {/* Impeccable Clean Characters Celebrating */}
            <img 
              src="./assets/characters/minh_front_clean.png" 
              alt="Minh" 
              className="absolute bottom-0 left-4 sm:left-10 h-[50%] sm:h-[60%] object-contain drop-shadow-[4px_4px_0px_#151C45] z-10 hidden sm:block pointer-events-none" 
            />
            <img 
              src="./assets/characters/linh_action_clean.png" 
              alt="Linh" 
              className="absolute bottom-0 left-24 sm:left-32 h-[52%] sm:h-[62%] object-contain drop-shadow-[4px_4px_0px_#151C45] z-10 hidden md:block pointer-events-none" 
            />
            <img 
              src="./assets/characters/tick_cheering_clean.png" 
              alt="Tick Cheering" 
              className="absolute bottom-6 right-6 sm:right-14 h-[28%] sm:h-[35%] object-contain drop-shadow-[3px_3px_0px_#151C45] z-10 hidden sm:block pointer-events-none" 
            />

            <div className="relative z-20 my-auto p-4 sm:p-6 text-center max-w-lg mx-auto">
              <div className="bg-[#FFFDF7]/95 border-4 border-[#151C45] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_#151C45] space-y-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#FFD343] border-4 border-[#151C45] flex items-center justify-center shadow-[4px_4px_0px_#151C45] animate-pulse">
                  <Award className="w-10 h-10 text-[#FF8426]" />
                </div>

                <div>
                  <span className="px-3 py-1 bg-[#55C7AA] text-[#151C45] border-2 border-[#151C45] rounded-full text-xs font-black font-heading">
                    CHIẾN THẮNG XUẤT SẮC
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-comic font-black text-[#151C45] mt-2">
                    HOÀN THÀNH WARM UP GAME!
                  </h2>
                  <p className="text-xs sm:text-sm text-[#151C45]/80 font-sans mt-1">
                    Cả lớp đã xuất sắc làm chủ 10 câu hỏi SWOT, phân tích video tình huống và chinh phục 5 tiêu chí SMART!
                  </p>
                </div>

                <div className="p-3 bg-[#FFF4DF] border-2 border-[#151C45] rounded-2xl flex items-center justify-around shadow-[2px_2px_0px_#151C45]">
                  <div>
                    <span className="text-[11px] font-heading font-bold text-[#151C45]/70 block">TỔNG ĐIỂM:</span>
                    <span className="text-xl font-comic font-black text-[#FF8426]">{xp} XP</span>
                  </div>
                  <div className="h-8 w-0.5 bg-[#151C45]/20" />
                  <div>
                    <span className="text-[11px] font-heading font-bold text-[#151C45]/70 block">TIẾN ĐỘ 9 CHƯƠNG:</span>
                    <span className="text-xl font-comic font-black text-[#55C7AA]">{checkedChapters.length}/9</span>
                  </div>
                </div>

                <div className="flex gap-2 justify-center pt-2">
                  <button
                    onClick={() => {
                      setCurrentScene('WARMUP_INTRO');
                      setXp(0);
                      setCurrentSwotIdx(0);
                      setCurrentSmartIdx(0);
                      setCheckedChapters([]);
                    }}
                    className="px-5 py-2.5 bg-white hover:bg-[#FFF4DF] text-[#151C45] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs sm:text-sm shadow-[2px_2px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    🔄 CHƠI LẠI TỪ ĐẦU
                  </button>

                  <button
                    onClick={() => setIsPresenterOpen(true)}
                    className="px-5 py-2.5 bg-[#FFAA2B] hover:bg-[#FF9B0F] text-[#151C45] border-2 border-[#151C45] rounded-xl font-heading font-black text-xs sm:text-sm shadow-[2px_2px_0px_#151C45] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    📋 BẢNG ĐIỀU KHIỂN (PHÍM P)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ================= PRESENTER MODAL ================= */}
      <PresenterModal
        isOpen={isPresenterOpen}
        onClose={() => setIsPresenterOpen(false)}
        onJumpToScene={handleJumpToScene}
      />
    </div>
  );
};

export default App;
