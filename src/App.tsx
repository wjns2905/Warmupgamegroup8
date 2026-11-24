import React, { useState, useEffect } from 'react';
import { GameScene } from './types/game';
import { 
  PROLOGUE_DIALOGUES, 
  MEET_LINH_DIALOGUES, 
  SWOT_QUESTIONS, 
  SMART_PILLARS, 
  SMART_GOAL_FULL, 
  FIVE_DAY_SCHEDULE 
} from './data/gameContent';
import { GameHeader } from './components/GameHeader';
import { VNDialogueBox } from './components/VNDialogueBox';
import { PresenterModal } from './components/PresenterModal';
import confetti from 'canvas-confetti';
import { 
  Play, 
  HelpCircle, 
  ShieldCheck, 
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
  Smartphone,
  AlertTriangle
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<GameScene>('TITLE');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [xp, setXp] = useState(0);
  const [checkedChapters, setCheckedChapters] = useState<number[]>([1]);
  
  // Timer for 2-minute discussion
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Presenter Modal
  const [isPresenterOpen, setIsPresenterOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

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
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === ' ' && !isPresenterOpen) {
        if (currentScene === 'PROLOGUE') {
          handleNextPrologue();
        } else if (currentScene === 'MEET_LINH') {
          handleNextMeetLinh();
        }
      } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key) && currentScene === 'SWOT_QUIZ' && !isAnswerSubmitted) {
        handleSelectAnswer(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, dialogueIndex, isAnswerSubmitted, isPresenterOpen]);

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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Navigation handlers
  const handleStartGame = () => {
    setCurrentScene('PROLOGUE');
    setDialogueIndex(0);
  };

  const handleNextPrologue = () => {
    if (dialogueIndex < PROLOGUE_DIALOGUES.length - 1) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setCurrentScene('MEET_LINH');
      setDialogueIndex(0);
    }
  };

  const handleNextMeetLinh = () => {
    if (dialogueIndex < MEET_LINH_DIALOGUES.length - 1) {
      setDialogueIndex(prev => prev + 1);
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
    setDialogueIndex(0);
    if (qIdx !== undefined) {
      setCurrentQuestionIdx(qIdx);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    }
  };

  const toggleChapter = (chNum: number) => {
    setCheckedChapters(prev => 
      prev.includes(chNum) ? prev.filter(c => c !== chNum) : [...prev, chNum]
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col bg-cream text-navy select-none font-sans">
      {/* Universal Top Header */}
      <GameHeader
        currentScene={currentScene}
        xp={xp}
        onOpenPresenter={() => setIsPresenterOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(prev => !prev)}
        chapterProgress={checkedChapters.length}
      />

      {/* Main Game Stage Area */}
      <main className="relative flex-1 w-full h-full overflow-hidden flex flex-col justify-between p-3 sm:p-5">
        
        {/* ================= SCENE 0: TITLE ================= */}
        {currentScene === 'TITLE' && (
          <div className="w-full h-full max-w-6xl mx-auto flex flex-col justify-between py-2 sm:py-4">
            {/* Top Tagline */}
            <div className="flex items-center justify-between border-b-2 border-navy/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-yellow border-2 border-navy rounded-full font-heading font-black text-xs text-navy shadow-comic-sm">
                  ★ PHIÊN BẢN TRÌNH CHIẾU LỚP HỌC 2.0
                </span>
                <span className="text-xs font-heading font-bold text-navy/70 hidden sm:inline">
                  Western 2D Cartoon Style • SWOT & SMART Interactive Visual Novel
                </span>
              </div>
              <span className="text-xs font-heading font-bold text-navy/60">
                1920 × 1080 • Thời lượng: 15–20 phút
              </span>
            </div>

            {/* Center Content: Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center">
              {/* Left Column: Title & CTAs */}
              <div className="lg:col-span-6 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-mint/30 border-2 border-navy rounded-xl text-xs font-heading font-black text-navy shadow-comic-sm">
                  <span>🎓 KHÁM PHÁ BẢN THÂN • THIẾT LẬP KẾ HOẠCH</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-comic font-black text-navy leading-none tracking-tight">
                  LEVEL <span className="text-orange underline decoration-purple decoration-wavy">UP!</span>
                </h1>

                <div className="p-4 bg-white border-3 border-navy rounded-2xl shadow-comic space-y-1">
                  <h2 className="font-heading font-black text-lg sm:text-xl text-purple">
                    SWOT & SMART: HIỂU BẢN THÂN – LÀM CHỦ MỤC TIÊU
                  </h2>
                  <p className="text-xs sm:text-sm font-sans text-navy/80 leading-relaxed">
                    Đồng hành cùng nam sinh viên <b>Minh</b>, bạn hỗ trợ <b>Linh</b> và mascot <b>Tick</b> vượt qua 8 thử thách SWOT, phá vỡ thói quen trì hoãn và xây dựng mục tiêu SMART giải cứu kỳ thi 9 chương!
                  </p>
                </div>

                {/* Main Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleStartGame}
                    className="btn-comic px-6 sm:px-8 py-3.5 bg-orange hover:bg-orange-light text-white text-base sm:text-lg flex items-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>BẮT ĐẦU CHƠI NGAY</span>
                  </button>

                  <button
                    onClick={() => setIsPresenterOpen(true)}
                    className="btn-comic px-5 py-3.5 bg-white hover:bg-cream-dark text-navy text-sm flex items-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5 text-purple" />
                    <span>PRESENTER MODE [P]</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Character Trio Showcase */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="card-comic p-3 bg-white w-full max-w-lg aspect-video overflow-hidden relative group">
                  <img 
                    src="/assets/brand/character_sheet.jpg" 
                    alt="Master Character Trio"
                    className="w-full h-full object-cover rounded-xl border-2 border-navy"
                  />
                  <div className="absolute bottom-4 inset-x-4 p-2 bg-navy/90 text-white border-2 border-navy rounded-xl text-xs font-heading font-bold flex items-center justify-between">
                    <span>Bộ ba: Minh (Mint) • Linh (Orange) • Tick (Purple)</span>
                    <span className="text-yellow font-comic text-[10px]">100% CARTOON</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Keyboard Guide */}
            <div className="border-t-2 border-navy/20 pt-2 flex flex-wrap items-center justify-between text-xs font-heading font-bold text-navy/60">
              <div className="flex items-center gap-4">
                <span>[Space] / Click: Tiếp tục</span>
                <span>[A, B, C, D]: Trắc nghiệm</span>
                <span>[P]: Menu Thuyết trình</span>
                <span>[F]: Toàn màn hình</span>
              </div>
              <span className="text-orange">Bản quyền thiết kế Western 2D Cartoon © LEVEL UP!</span>
            </div>
          </div>
        )}

        {/* ================= SCENE 1: PROLOGUE (MINH'S BEDROOM SCENE) ================= */}
        {currentScene === 'PROLOGUE' && (
          <div className="w-full h-full flex flex-col justify-between">
            {/* Visual Novel Stage: Minh at study desk */}
            <div className="relative flex-1 w-full max-w-4xl mx-auto my-auto flex items-center justify-center">
              <div className="card-comic relative w-full h-[320px] sm:h-[400px] overflow-hidden bg-white border-4 border-navy shadow-comic-lg flex items-center justify-center">
                {/* Background Artwork: Minh at his study desk */}
                <img 
                  src="/assets/characters/minh_scene_stage.png" 
                  alt="Minh tại bàn học"
                  className="w-full h-full object-cover"
                />

                {/* Day / Night ambient transition */}
                {dialogueIndex >= 5 && (
                  <div className="absolute inset-0 bg-navy/60 backdrop-blur-[0.5px] transition-all duration-700 flex items-center justify-center">
                    <div className="p-3 bg-navy text-yellow border-2 border-yellow rounded-2xl shadow-comic font-heading font-black text-sm flex items-center gap-2 animate-bounce-gentle">
                      <Clock className="w-5 h-5 text-orange animate-spin" />
                      <span>ĐÃ 23:30 ĐÊM! SÁCH VẪN CHƯA MỞ!</span>
                    </div>
                  </div>
                )}

                {/* Top Corner HUD badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-coral text-white border-2 border-navy rounded-xl font-heading font-black text-xs shadow-comic-sm flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>EXAM: CÒN 6 NGÀY NỮA!</span>
                  </div>
                  <div className="px-3 py-1 bg-yellow text-navy border-2 border-navy rounded-xl font-heading font-black text-xs shadow-comic-sm">
                    📚 9 CHƯƠNG CHƯA ÔN
                  </div>
                </div>

                {/* Smartphone distraction pop-up */}
                {dialogueIndex === 4 && (
                  <div className="absolute top-1/3 right-6 p-3 bg-white border-3 border-navy rounded-2xl shadow-comic max-w-xs animate-bounce-gentle">
                    <div className="flex items-center gap-2 text-xs font-heading font-black text-purple">
                      <Smartphone className="w-4 h-4 text-orange" />
                      <span>THÔNG BÁO VIDEO MỚI!</span>
                    </div>
                    <p className="text-[11px] font-sans text-navy/80 mt-1">
                      "Xem lướt 5 phút thôi mà..."
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Visual Novel Dialogue Box with Minh's Avatar */}
            <VNDialogueBox
              speaker={PROLOGUE_DIALOGUES[dialogueIndex].speaker}
              name={PROLOGUE_DIALOGUES[dialogueIndex].name}
              subtext={PROLOGUE_DIALOGUES[dialogueIndex].subtext}
              text={PROLOGUE_DIALOGUES[dialogueIndex].text}
              onNext={handleNextPrologue}
            />
          </div>
        )}

        {/* ================= SCENE 2: MEET LINH & TICK ================= */}
        {currentScene === 'MEET_LINH' && (
          <div className="w-full h-full flex flex-col justify-between">
            {/* Stage: Linh, Tick and Minh in dialogue */}
            <div className="relative flex-1 w-full max-w-4xl mx-auto my-auto flex items-center justify-center">
              <div className="card-comic relative w-full h-[320px] sm:h-[400px] overflow-hidden bg-gradient-to-b from-cream to-white border-4 border-navy shadow-comic-lg flex items-end justify-around px-6 pb-2">
                
                {/* Left: Minh standing */}
                <div className="flex flex-col items-center">
                  <div className="h-60 sm:h-72 flex items-end">
                    <img 
                      src="/assets/characters/minh_standing.png" 
                      alt="Minh" 
                      className="max-h-full object-contain filter drop-shadow-[0_4px_8px_rgba(21,28,69,0.3)]"
                    />
                  </div>
                  <span className="px-3 py-0.5 bg-mint text-navy border-2 border-navy rounded-full font-heading font-black text-xs shadow-comic-sm -mt-2 z-10">
                    Minh
                  </span>
                </div>

                {/* Center: Tick mascot */}
                <div className="flex flex-col items-center animate-bounce-gentle">
                  <div className="h-32 sm:h-40 flex items-end">
                    <img 
                      src="/assets/characters/tick_mascot.png" 
                      alt="Tick" 
                      className="max-h-full object-contain filter drop-shadow-[0_4px_8px_rgba(21,28,69,0.3)]"
                    />
                  </div>
                  <span className="px-3 py-0.5 bg-purple text-white border-2 border-navy rounded-full font-heading font-black text-xs shadow-comic-sm -mt-2 z-10">
                    Tick
                  </span>
                </div>

                {/* Right: Linh standing */}
                <div className="flex flex-col items-center">
                  <div className="h-60 sm:h-72 flex items-end">
                    <img 
                      src="/assets/characters/linh_standing.png" 
                      alt="Linh" 
                      className="max-h-full object-contain filter drop-shadow-[0_4px_8px_rgba(21,28,69,0.3)]"
                    />
                  </div>
                  <span className="px-3 py-0.5 bg-orange text-white border-2 border-navy rounded-full font-heading font-black text-xs shadow-comic-sm -mt-2 z-10">
                    Linh
                  </span>
                </div>

                {/* Floating SWOT quadrant preview */}
                <div className="absolute top-4 inset-x-6 flex justify-between items-center pointer-events-none">
                  <div className="px-3 py-1 bg-white border-2 border-navy rounded-xl text-xs font-heading font-black text-purple shadow-comic-sm">
                    CHƯƠNG 01: MA TRẬN SWOT
                  </div>
                  <div className="flex gap-1.5">
                    <span className="px-2 py-0.5 bg-mint border border-navy rounded font-black text-xs">S</span>
                    <span className="px-2 py-0.5 bg-coral border border-navy rounded font-black text-xs text-white">W</span>
                    <span className="px-2 py-0.5 bg-yellow border border-navy rounded font-black text-xs">O</span>
                    <span className="px-2 py-0.5 bg-purple border border-navy rounded font-black text-xs text-white">T</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Novel Dialogue Box with Speaking Character Avatar */}
            <VNDialogueBox
              speaker={MEET_LINH_DIALOGUES[dialogueIndex].speaker}
              name={MEET_LINH_DIALOGUES[dialogueIndex].name}
              subtext={MEET_LINH_DIALOGUES[dialogueIndex].subtext}
              text={MEET_LINH_DIALOGUES[dialogueIndex].text}
              onNext={handleNextMeetLinh}
            />
          </div>
        )}

        {/* ================= SCENE 3: SWOT QUIZ ================= */}
        {currentScene === 'SWOT_QUIZ' && (
          <div className="w-full h-full max-w-4xl mx-auto flex flex-col justify-between py-2">
            {/* Question Progress Bar */}
            <div className="flex items-center justify-between bg-white px-4 py-2 border-2 border-navy rounded-2xl shadow-comic-sm">
              <span className="font-heading font-black text-xs text-purple">
                CÂU HỎI {currentQuestionIdx + 1} / {SWOT_QUESTIONS.length}
              </span>
              <div className="flex gap-1.5">
                {SWOT_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-2.5 rounded-full border border-navy ${
                      i < currentQuestionIdx ? 'bg-mint' : i === currentQuestionIdx ? 'bg-orange animate-pulse' : 'bg-cream-dark'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-heading font-bold text-navy/70">
                +100 XP khi đúng
              </span>
            </div>

            {/* Question Card */}
            <div className="card-comic p-5 sm:p-6 bg-white my-auto space-y-4">
              <div className="inline-block px-3 py-1 bg-yellow border-2 border-navy rounded-xl font-heading font-black text-xs text-navy shadow-comic-sm">
                {SWOT_QUESTIONS[currentQuestionIdx].title}
              </div>

              <h3 className="text-base sm:text-xl font-heading font-bold text-navy leading-relaxed">
                {SWOT_QUESTIONS[currentQuestionIdx].question}
              </h3>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {SWOT_QUESTIONS[currentQuestionIdx].options.map((opt) => {
                  const isSelected = selectedAnswer === opt.key;
                  const isCorrect = opt.key === SWOT_QUESTIONS[currentQuestionIdx].correctKey;
                  
                  let btnColor = "bg-white hover:bg-cream border-navy text-navy";
                  if (isAnswerSubmitted) {
                    if (isCorrect) btnColor = "bg-mint text-navy border-navy font-black";
                    else if (isSelected) btnColor = "bg-coral text-white border-navy";
                    else btnColor = "bg-white/60 border-navy/40 text-navy/40";
                  } else if (isSelected) {
                    btnColor = "bg-purple text-white border-navy";
                  }

                  return (
                    <button
                      key={opt.key}
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectAnswer(opt.key)}
                      className={`p-3.5 border-3 rounded-2xl shadow-comic-sm text-left flex items-start gap-3 transition-all ${btnColor} ${
                        !isAnswerSubmitted ? 'active:translate-x-0.5 active:translate-y-0.5' : ''
                      }`}
                    >
                      <span className="w-7 h-7 flex-shrink-0 flex items-center justify-center border-2 border-navy rounded-xl bg-white text-navy font-heading font-black text-xs shadow-comic-sm">
                        {opt.key}
                      </span>
                      <span className="text-xs sm:text-sm font-heading font-bold leading-snug">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Banner */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-2xl border-2 border-navy text-xs sm:text-sm font-heading font-bold animate-fadeIn ${
                  selectedAnswer === SWOT_QUESTIONS[currentQuestionIdx].correctKey 
                    ? 'bg-mint/20 text-navy' 
                    : 'bg-coral/20 text-navy'
                }`}>
                  <div className="flex items-center gap-2 font-black mb-1">
                    {selectedAnswer === SWOT_QUESTIONS[currentQuestionIdx].correctKey ? (
                      <span className="text-mint-dark flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> CHÍNH XÁC! (+100 XP)
                      </span>
                    ) : (
                      <span className="text-coral-dark flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> CHƯA CHÍNH XÁC!
                      </span>
                    )}
                    <span>Đáp án đúng là: <b>{SWOT_QUESTIONS[currentQuestionIdx].correctKey}</b></span>
                  </div>
                  <p className="font-sans text-xs text-navy/80">{SWOT_QUESTIONS[currentQuestionIdx].explanation}</p>
                </div>
              )}
            </div>

            {/* Bottom Next Button */}
            <div className="flex justify-end">
              {isAnswerSubmitted ? (
                <button
                  onClick={handleNextQuestion}
                  className="btn-comic px-6 py-3 bg-orange hover:bg-orange-light text-white text-sm flex items-center gap-2"
                >
                  <span>{currentQuestionIdx < SWOT_QUESTIONS.length - 1 ? 'CÂU TIẾP THEO' : 'XEM KẾT QUẢ SWOT'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="text-xs font-heading font-bold text-navy/60 self-center">
                  Chọn 1 trong 4 đáp án trên (hoặc phím A, B, C, D)
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= SCENE 4: SWOT COMPLETE ================= */}
        {currentScene === 'SWOT_COMPLETE' && (
          <div className="w-full h-full max-w-3xl mx-auto flex flex-col justify-between my-auto text-center py-6">
            <div className="card-comic p-8 bg-white my-auto space-y-5">
              <div className="w-24 h-24 mx-auto rounded-full bg-yellow border-3 border-navy flex items-center justify-center shadow-comic">
                <Award className="w-12 h-12 text-orange" />
              </div>

              <div>
                <span className="px-3 py-1 bg-mint border-2 border-navy rounded-full font-heading font-black text-xs text-navy shadow-comic-sm">
                  CHƯƠNG 01 HOÀN TẤT
                </span>
                <h2 className="text-2xl sm:text-4xl font-comic font-black text-navy mt-2">
                  BẠN ĐÃ MỞ KHÓA: SWOT EXPLORER!
                </h2>
                <p className="text-xs sm:text-sm font-sans text-navy/70 max-w-md mx-auto mt-1">
                  Chúc mừng bạn đã hiểu rõ 4 yếu tố ma trận: Điểm mạnh (S), Điểm yếu (W), Cơ hội (O) và Thách thức (T)!
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="p-3 bg-mint/20 border-2 border-navy rounded-xl text-xs font-heading font-bold">
                  💪 Strengths: Ngoại ngữ, tiềm năng
                </div>
                <div className="p-3 bg-coral/20 border-2 border-navy rounded-xl text-xs font-heading font-bold">
                  🔗 Weaknesses: Trì hoãn 5 phút
                </div>
                <div className="p-3 bg-yellow/20 border-2 border-navy rounded-xl text-xs font-heading font-bold">
                  🎯 Opportunities: Ngày hội, bạn bè
                </div>
                <div className="p-3 bg-purple/20 border-2 border-navy rounded-xl text-xs font-heading font-bold">
                  ⚠️ Threats: Đối thủ & Deadline 6 ngày
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setCurrentScene('SMART_VIDEO')}
                  className="btn-comic px-8 py-3.5 bg-orange hover:bg-orange-light text-white text-base flex items-center gap-2 mx-auto"
                >
                  <span>MỞ KHÓA CHƯƠNG 02: SMART</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCENE 5: SMART VIDEO ================= */}
        {currentScene === 'SMART_VIDEO' && (
          <div className="w-full h-full max-w-4xl mx-auto flex flex-col justify-between py-2">
            <div className="border-b-2 border-navy/20 pb-2 flex items-center justify-between">
              <span className="font-heading font-black text-sm text-purple">
                🎬 TÌNH HUỐNG THỰC TẾ: VÒNG LẶP TRÌ HOÃN (6 DAYS → 1 DAY)
              </span>
              <a
                href="https://www.youtube.com/watch?v=uHRSBmStC5g"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-heading font-bold text-orange hover:underline flex items-center gap-1"
              >
                <span>Xem trên YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Video Player Embed Card */}
            <div className="card-comic p-3 bg-white my-auto">
              <div className="aspect-video w-full rounded-xl overflow-hidden border-2 border-navy relative">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/uHRSBmStC5g?autoplay=0&rel=0"
                  title="Study Procrastination Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-xs text-navy/70 font-sans mt-2 text-center">
                *Nếu video không tải được do kết nối mạng, người thuyết trình có thể tóm tắt: Nhân vật có 6 ngày cho 9 chương nhưng liên tục mất kiểm soát vì lướt điện thoại "thêm 5 phút".
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-heading font-bold text-navy/60">
                Quan sát hành vi của nhân vật trước kỳ thi
              </span>
              <button
                onClick={() => {
                  setCurrentScene('SMART_DISCUSSION');
                  setTimerSeconds(120);
                  setIsTimerRunning(false);
                }}
                className="btn-comic px-6 py-3 bg-orange hover:bg-orange-light text-white text-xs sm:text-sm flex items-center gap-2"
              >
                <span>VÀO THỬ THÁCH THẢO LUẬN 2 PHÚT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 6: SMART DISCUSSION ================= */}
        {currentScene === 'SMART_DISCUSSION' && (
          <div className="w-full h-full max-w-4xl mx-auto flex flex-col justify-between py-2 my-auto">
            <div className="card-comic p-6 sm:p-8 bg-white my-auto text-center space-y-6">
              <div className="inline-block px-4 py-1.5 bg-orange text-white border-2 border-navy rounded-full font-heading font-black text-xs shadow-comic-sm">
                ⏳ THỬ THÁCH TƯ DUY TẬP THỂ
              </div>

              <h2 className="text-xl sm:text-3xl font-heading font-black text-navy max-w-2xl mx-auto leading-snug">
                "Trong 2 phút, hãy giúp nhân vật xây dựng một kế hoạch để THỰC SỰ BẮT ĐẦU thay vì tiếp tục trì hoãn?"
              </h2>

              {/* Timer Box with Tick Avatar */}
              <div className="p-6 bg-cream border-3 border-navy rounded-3xl shadow-comic max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-navy overflow-hidden p-1 shadow-comic-sm flex-shrink-0 animate-bounce-gentle">
                  <img src="/assets/characters/tick_avatar.png" alt="Tick" className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col items-center sm:items-start gap-2">
                  <div className="flex items-center gap-2 font-comic text-4xl sm:text-5xl text-navy">
                    <Clock className={`w-8 h-8 ${isTimerRunning ? 'text-orange animate-spin' : 'text-purple'}`} />
                    <span>
                      {Math.floor(timerSeconds / 60).toString().padStart(2, '0')}:
                      {(timerSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsTimerRunning(prev => !prev)}
                      className={`btn-comic px-4 py-1.5 text-xs text-white ${
                        isTimerRunning ? 'bg-coral' : 'bg-mint text-navy'
                      }`}
                    >
                      {isTimerRunning ? 'TẠM DỪNG' : 'BẮT ĐẦU'}
                    </button>
                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(120);
                      }}
                      className="p-1.5 bg-white border-2 border-navy rounded-xl shadow-comic-sm hover:bg-cream"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-navy" />
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-xs font-sans text-navy/70 max-w-md mx-auto">
                Cả lớp hãy đưa ra các giải pháp: Loại bỏ điện thoại? Chia nhỏ chương? Đặt deadline cụ thể?
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setCurrentScene('SMART_KEYS')}
                  className="btn-comic px-6 sm:px-8 py-3 bg-purple hover:bg-purple-light text-white text-sm flex items-center gap-2 mx-auto"
                >
                  <span>GIẢI MÃ BÍ QUYẾT: 5 CHÌA KHÓA SMART</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= SCENE 7: SMART KEYS ================= */}
        {currentScene === 'SMART_KEYS' && (
          <div className="w-full h-full max-w-5xl mx-auto flex flex-col justify-between py-2">
            <div className="text-center space-y-1">
              <span className="px-3 py-1 bg-yellow border-2 border-navy rounded-full font-heading font-black text-xs text-navy shadow-comic-sm">
                CÔNG THỨC THÀNH CÔNG
              </span>
              <h2 className="text-2xl sm:text-3xl font-comic font-black text-navy">
                5 TRỤ CỘT MỤC TIÊU S - M - A - R - T
              </h2>
            </div>

            {/* 5 Pillars Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-auto">
              {SMART_PILLARS.map((pillar) => {
                const getPillarColor = () => {
                  switch (pillar.letter) {
                    case 'S': return 'bg-purple/15 border-purple';
                    case 'M': return 'bg-orange/15 border-orange';
                    case 'A': return 'bg-mint/20 border-mint';
                    case 'R': return 'bg-yellow/20 border-yellow';
                    case 'T': return 'bg-coral/20 border-coral';
                  }
                };

                return (
                  <div key={pillar.letter} className={`card-comic p-4 bg-white flex flex-col justify-between ${getPillarColor()}`}>
                    <div className="space-y-2">
                      <div className="w-10 h-10 rounded-2xl bg-white border-2 border-navy flex items-center justify-center font-comic text-xl font-black text-navy shadow-comic-sm">
                        {pillar.letter}
                      </div>
                      <h4 className="font-heading font-black text-sm text-navy">
                        {pillar.nameVi}
                        <span className="block text-[10px] text-navy/60 font-sans font-normal">{pillar.nameEn}</span>
                      </h4>
                      <p className="text-[11px] font-sans text-navy/80 leading-snug">
                        {pillar.application}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-navy/20 text-[10px] font-heading font-bold text-navy/60">
                      ✔ {pillar.detailPoints[0]}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-heading font-bold text-navy/60">
                Bấm tiếp theo để xem mục tiêu hoàn chỉnh & Lịch 5 ngày
              </span>
              <button
                onClick={() => setCurrentScene('SMART_PLAN')}
                className="btn-comic px-6 py-3 bg-orange hover:bg-orange-light text-white text-xs sm:text-sm flex items-center gap-2"
              >
                <span>XEM KẾ HOẠCH HÀNH ĐỘNG 5 NGÀY</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 8: SMART PLAN ================= */}
        {currentScene === 'SMART_PLAN' && (
          <div className="w-full h-full max-w-4xl mx-auto flex flex-col justify-between py-2">
            {/* Top Target Sentence */}
            <div className="card-comic p-4 bg-yellow">
              <span className="font-heading font-black text-xs text-orange uppercase tracking-wider block mb-1">
                🎯 MỤC TIÊU SMART HOÀN CHỈNH:
              </span>
              <p className="text-xs sm:text-sm font-heading font-bold text-navy leading-relaxed">
                "{SMART_GOAL_FULL}"
              </p>
            </div>

            {/* Middle: 5-Day Schedule & 9-Chapter Interactive Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-auto">
              {/* 5-Day Schedule */}
              <div className="md:col-span-7 card-comic p-4 bg-white space-y-2">
                <h4 className="font-heading font-black text-xs text-purple flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>LỘ TRÌNH 5 NGÀY (2-2-2-2-1 CHƯƠNG)</span>
                </h4>
                <div className="space-y-1.5">
                  {FIVE_DAY_SCHEDULE.map((item) => (
                    <div key={item.day} className="p-2.5 bg-cream/60 border border-navy rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-heading font-black text-navy mr-2">{item.title}:</span>
                        <span className="font-bold text-orange">{item.chapters}</span>
                      </div>
                      <span className="text-[10px] text-navy/60 font-sans">{item.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9 Chapters Checklist */}
              <div className="md:col-span-5 card-comic p-4 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-black text-xs text-mint-dark flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4" />
                    <span>CHECKLIST 9 CHƯƠNG</span>
                  </h4>
                  <span className="text-xs font-black text-navy">{checkedChapters.length}/9</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((ch) => {
                    const isChecked = checkedChapters.includes(ch);
                    return (
                      <button
                        key={ch}
                        onClick={() => toggleChapter(ch)}
                        className={`p-2 rounded-xl border-2 border-navy text-xs font-heading font-black flex items-center justify-center gap-1 transition-all ${
                          isChecked ? 'bg-mint text-navy shadow-comic-sm' : 'bg-cream text-navy/40'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                        <span>Ch.{ch}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-navy/60 text-center font-sans">
                  Click vào các ô để đánh dấu hoàn thành chương!
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-heading font-bold text-navy/60">
                Chốt mốc trước 22:00 ngày trước kỳ thi!
              </span>
              <button
                onClick={() => {
                  setCurrentScene('VICTORY');
                  triggerConfetti();
                }}
                className="btn-comic px-8 py-3.5 bg-orange hover:bg-orange-light text-white text-sm sm:text-base flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 fill-current" />
                <span>CHINH PHỤC KỲ THI & LEVEL UP!</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= SCENE 9: VICTORY ================= */}
        {currentScene === 'VICTORY' && (
          <div className="w-full h-full max-w-3xl mx-auto flex flex-col justify-between my-auto text-center py-6">
            <div className="card-comic p-8 bg-white my-auto space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-yellow border-4 border-navy flex items-center justify-center shadow-comic-lg animate-bounce-gentle">
                <Award className="w-14 h-14 text-orange" />
              </div>

              <div className="space-y-2">
                <span className="px-4 py-1.5 bg-purple text-white border-2 border-navy rounded-full font-heading font-black text-xs shadow-comic-sm">
                  🏆 NHIỆM VỤ HOÀN THÀNH XUẤT SẮC
                </span>
                <h1 className="text-3xl sm:text-5xl font-comic font-black text-navy tracking-wide">
                  BẠN ĐÃ CHÍNH THỨC LEVEL UP!
                </h1>
                <p className="text-sm sm:text-base font-heading font-bold text-orange max-w-lg mx-auto">
                  "Hiểu bản thân – Làm chủ mục tiêu. Tự tin bước vào phòng thi và đạt kết quả cao nhất!"
                </p>
              </div>

              <div className="p-4 bg-cream border-2 border-navy rounded-2xl max-w-md mx-auto text-xs font-heading font-bold text-navy/80 space-y-1">
                <p>✔ Hoàn thành 8 thử thách tư duy SWOT</p>
                <p>✔ Mở khóa 5 chìa khóa SMART (S-M-A-R-T)</p>
                <p>✔ Hoàn tất kế hoạch 5 ngày cho 9 chương kiến thức</p>
                <p>✔ Đạt tổng điểm kinh nghiệm: <b>{xp} XP</b></p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setCurrentScene('TITLE');
                    setXp(0);
                    setCheckedChapters([1]);
                  }}
                  className="btn-comic px-6 py-3 bg-white hover:bg-cream-dark text-navy text-xs sm:text-sm flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>CHƠI LẠI TỪ ĐẦU</span>
                </button>

                <button
                  onClick={() => setIsPresenterOpen(true)}
                  className="btn-comic px-6 py-3 bg-purple hover:bg-purple-light text-white text-xs sm:text-sm flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>XEM LẠI ĐÁP ÁN & FAQ [P]</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Presenter Mode Modal */}
      <PresenterModal
        isOpen={isPresenterOpen}
        onClose={() => setIsPresenterOpen(false)}
        onJumpToScene={handleJumpToScene}
      />
    </div>
  );
};

export default App;
