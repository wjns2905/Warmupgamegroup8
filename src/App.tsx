import React, { useState, useEffect, useCallback } from 'react';
import { GameScene, DialogueLine } from './types/game';
import { soundManager } from './utils/audio';

// Components
import { GameHUD } from './components/GameHUD';
import { PresenterModal } from './components/PresenterModal';
import { DialogueLogModal } from './components/DialogueLogModal';

// Scenes
import { TitleScene } from './scenes/TitleScene';
import { PrologueScene } from './scenes/PrologueScene';
import { MeetNovaScene } from './scenes/MeetNovaScene';
import { SwotQuizScene } from './scenes/SwotQuizScene';
import { SwotCompleteScene } from './scenes/SwotCompleteScene';
import { SmartIntroScene } from './scenes/SmartIntroScene';
import { SmartVideoScene } from './scenes/SmartVideoScene';
import { SmartDiscussionScene } from './scenes/SmartDiscussionScene';
import { SmartKeysScene } from './scenes/SmartKeysScene';
import { SmartMinigameScene } from './scenes/SmartMinigameScene';
import { SmartGoalRevealScene } from './scenes/SmartGoalRevealScene';
import { ActionPlanScene } from './scenes/ActionPlanScene';
import { DefeatGlitchScene } from './scenes/DefeatGlitchScene';
import { VictoryScene } from './scenes/VictoryScene';

const SAVE_KEY = 'levelup_vn_quest_save_v1';

export const App: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<GameScene>('TITLE');
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [levelName, setLevelName] = useState<string>('Beginner');

  const [currentSwotIndex, setCurrentSwotIndex] = useState<number>(0);
  const [swotCorrectFirstAttempt, setSwotCorrectFirstAttempt] = useState<number>(0);

  const [smartMinigameScore, setSmartMinigameScore] = useState<number>(0);
  const [completedChapters, setCompletedChapters] = useState<boolean[]>(new Array(9).fill(false));

  const [bgmMuted, setBgmMuted] = useState<boolean>(false);
  const [sfxMuted, setSfxMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isPresenterOpen, setIsPresenterOpen] = useState<boolean>(false);
  const [isLogOpen, setIsLogOpen] = useState<boolean>(false);
  const [dialogueHistory, setDialogueHistory] = useState<DialogueLine[]>([]);
  const [hasSavedGame, setHasSavedGame] = useState<boolean>(false);

  useEffect(() => {
    if (xp >= 1300) {
      setLevel(5);
      setLevelName('Level Up Hero');
    } else if (xp >= 1000) {
      setLevel(4);
      setLevelName('Goal Architect');
    } else if (xp >= 600) {
      setLevel(3);
      setLevelName('Strategist');
    } else if (xp >= 300) {
      setLevel(2);
      setLevelName('Explorer');
    } else {
      setLevel(1);
      setLevelName('Beginner');
    }
  }, [xp]);

  useEffect(() => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.currentScene && parsed.currentScene !== 'TITLE') {
          setHasSavedGame(true);
        }
      } catch {}
    }
  }, []);

  const saveCurrentState = useCallback(() => {
    if (currentScene === 'TITLE') return;
    const saveObj = {
      currentScene,
      xp,
      currentSwotIndex,
      swotCorrectFirstAttempt,
      smartMinigameScore,
      completedChapters,
    };
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveObj));
      setHasSavedGame(true);
    } catch {}
  }, [currentScene, xp, currentSwotIndex, swotCorrectFirstAttempt, smartMinigameScore, completedChapters]);

  useEffect(() => {
    saveCurrentState();
  }, [saveCurrentState]);

  useEffect(() => {
    switch (currentScene) {
      case 'TITLE':
        soundManager.playBGM('menu');
        break;
      case 'PROLOGUE':
        soundManager.playBGM('prologue');
        break;
      case 'MEET_NOVA':
      case 'SWOT_QUIZ':
      case 'SWOT_COMPLETE':
        soundManager.playBGM('swot');
        break;
      case 'SMART_INTRO':
      case 'SMART_VIDEO':
      case 'SMART_DISCUSSION':
      case 'SMART_KEYS':
      case 'SMART_MINIGAME':
      case 'SMART_GOAL_REVEAL':
      case 'ACTION_PLAN':
      case 'DEFEAT_GLITCH':
        soundManager.playBGM('smart');
        break;
      case 'VICTORY':
        soundManager.playBGM('victory');
        break;
    }
  }, [currentScene]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!e.ctrlKey && !e.metaKey) {
          toggleFullscreen();
        }
      }
      if (e.key === 'm' || e.key === 'M') {
        toggleBgm();
      }
      if (e.key === 'p' || e.key === 'P') {
        setIsPresenterOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsPresenterOpen(false);
        setIsLogOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const toggleBgm = () => {
    const next = !bgmMuted;
    setBgmMuted(next);
    soundManager.setBgmMuted(next);
  };

  const toggleSfx = () => {
    const next = !sfxMuted;
    setSfxMuted(next);
    soundManager.setSfxMuted(next);
  };

  const handleContinueGame = () => {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentScene(parsed.currentScene || 'PROLOGUE');
        setXp(parsed.xp || 0);
        setCurrentSwotIndex(parsed.currentSwotIndex || 0);
        setSwotCorrectFirstAttempt(parsed.swotCorrectFirstAttempt || 0);
        setSmartMinigameScore(parsed.smartMinigameScore || 0);
        setCompletedChapters(parsed.completedChapters || new Array(9).fill(false));
      } catch {
        setCurrentScene('PROLOGUE');
      }
    } else {
      setCurrentScene('PROLOGUE');
    }
  };

  const handleResetGame = () => {
    localStorage.removeItem(SAVE_KEY);
    setHasSavedGame(false);
    setCurrentScene('TITLE');
    setXp(0);
    setCurrentSwotIndex(0);
    setSwotCorrectFirstAttempt(0);
    setSmartMinigameScore(0);
    setCompletedChapters(new Array(9).fill(false));
    soundManager.playBGM('menu');
  };

  const handleAnswerSwotQuestion = (questionId: number, isCorrect: boolean, isFirstAttempt: boolean) => {
    if (isCorrect && isFirstAttempt) {
      setXp(prev => prev + 100);
      setSwotCorrectFirstAttempt(prev => prev + 1);
    }
  };

  const handleToggleChapter = (index: number) => {
    setCompletedChapters(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleSetAllChapters = (status: boolean) => {
    setCompletedChapters(new Array(9).fill(status));
  };

  const handleJumpToScene = (scene: GameScene, swotIndex: number = 0) => {
    setCurrentScene(scene);
    if (scene === 'SWOT_QUIZ') {
      setCurrentSwotIndex(swotIndex);
    }
    setIsPresenterOpen(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-midnight-dark flex items-center justify-center font-sans">
      <div className="relative w-full h-full max-w-[1920px] max-h-[1080px] aspect-video overflow-hidden shadow-2xl bg-midnight flex flex-col justify-between">
        <GameHUD
          currentScene={currentScene}
          xp={xp}
          level={level}
          levelName={levelName}
          completedChaptersCount={completedChapters.filter(Boolean).length}
          bgmMuted={bgmMuted}
          sfxMuted={sfxMuted}
          isFullscreen={isFullscreen}
          onToggleBgm={toggleBgm}
          onToggleSfx={toggleSfx}
          onToggleFullscreen={toggleFullscreen}
          onOpenPresenterMode={() => setIsPresenterOpen(true)}
        />

        <div className="relative w-full h-full flex-1">
          {currentScene === 'TITLE' && (
            <TitleScene
              onStartGame={() => setCurrentScene('PROLOGUE')}
              onOpenPresenter={() => setIsPresenterOpen(true)}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
              hasSavedGame={hasSavedGame}
              onContinueGame={handleContinueGame}
            />
          )}

          {currentScene === 'PROLOGUE' && (
            <PrologueScene
              onQuestAccepted={() => setCurrentScene('MEET_NOVA')}
              onOpenLog={() => setIsLogOpen(true)}
            />
          )}

          {currentScene === 'MEET_NOVA' && (
            <MeetNovaScene
              onStartSwot={() => {
                setCurrentSwotIndex(0);
                setCurrentScene('SWOT_QUIZ');
              }}
              onOpenLog={() => setIsLogOpen(true)}
            />
          )}

          {currentScene === 'SWOT_QUIZ' && (
            <SwotQuizScene
              currentQuestionIndex={currentSwotIndex}
              onAnswerQuestion={handleAnswerSwotQuestion}
              onNextQuestion={() => setCurrentSwotIndex(prev => prev + 1)}
              onFinishSwot={() => setCurrentScene('SWOT_COMPLETE')}
            />
          )}

          {currentScene === 'SWOT_COMPLETE' && (
            <SwotCompleteScene
              firstAttemptCount={swotCorrectFirstAttempt}
              totalXP={xp}
              onUnlockSmart={() => setCurrentScene('SMART_INTRO')}
              onOpenLog={() => setIsLogOpen(true)}
            />
          )}

          {currentScene === 'SMART_INTRO' && (
            <SmartIntroScene
              onContinueToVideo={() => setCurrentScene('SMART_VIDEO')}
              onOpenLog={() => setIsLogOpen(true)}
            />
          )}

          {currentScene === 'SMART_VIDEO' && (
            <SmartVideoScene
              onContinueToDiscussion={() => setCurrentScene('SMART_DISCUSSION')}
              onOpenLog={() => setIsLogOpen(true)}
            />
          )}

          {currentScene === 'SMART_DISCUSSION' && (
            <SmartDiscussionScene
              onCompleteDiscussion={() => setCurrentScene('SMART_KEYS')}
            />
          )}

          {currentScene === 'SMART_KEYS' && (
            <SmartKeysScene
              onAllKeysUnlocked={() => setCurrentScene('SMART_MINIGAME')}
              onOpenLog={() => setIsLogOpen(true)}
            />
          )}

          {currentScene === 'SMART_MINIGAME' && (
            <SmartMinigameScene
              onCompleteMinigame={(score) => {
                setSmartMinigameScore(score);
                setXp(prev => prev + score);
                setCurrentScene('SMART_GOAL_REVEAL');
              }}
              onSkipMinigame={() => setCurrentScene('SMART_GOAL_REVEAL')}
            />
          )}

          {currentScene === 'SMART_GOAL_REVEAL' && (
            <SmartGoalRevealScene
              onGoToActionPlan={() => setCurrentScene('ACTION_PLAN')}
            />
          )}

          {currentScene === 'ACTION_PLAN' && (
            <ActionPlanScene
              completedChapters={completedChapters}
              onToggleChapter={handleToggleChapter}
              onSetAllChapters={handleSetAllChapters}
              onGoToDefeatGlitch={() => setCurrentScene('DEFEAT_GLITCH')}
            />
          )}

          {currentScene === 'DEFEAT_GLITCH' && (
            <DefeatGlitchScene
              onGlitchDefeated={() => setCurrentScene('VICTORY')}
              onOpenLog={() => setIsLogOpen(true)}
            />
          )}

          {currentScene === 'VICTORY' && (
            <VictoryScene
              totalXP={xp}
              level={level}
              levelName={levelName}
              swotCorrectFirstAttempt={swotCorrectFirstAttempt}
              smartMinigameScore={smartMinigameScore}
              onPlayAgain={handleResetGame}
              onReviewSwot={() => handleJumpToScene('SWOT_QUIZ', 0)}
              onReviewSmart={() => handleJumpToScene('SMART_GOAL_REVEAL')}
              onReturnToMenu={() => setCurrentScene('TITLE')}
            />
          )}
        </div>

        <PresenterModal
          isOpen={isPresenterOpen}
          onClose={() => setIsPresenterOpen(false)}
          currentScene={currentScene}
          onJumpToScene={handleJumpToScene}
          onResetGame={handleResetGame}
          onUnlockAllChapters={() => handleSetAllChapters(true)}
          onMaxXP={() => setXp(1300)}
        />

        <DialogueLogModal
          isOpen={isLogOpen}
          onClose={() => setIsLogOpen(false)}
          history={dialogueHistory}
        />
      </div>
    </div>
  );
};

export default App;
