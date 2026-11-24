export type CharacterId = 'alex' | 'nova' | 'iris' | 'glitch' | 'system';

export type AlexExpression = 'neutral' | 'sleepy' | 'confused' | 'worried' | 'thinking' | 'determined' | 'happy' | 'victory';
export type NovaExpression = 'neutral' | 'confident' | 'thinking' | 'smile' | 'explain' | 'celebrate';
export type IrisExpression = 'neutral' | 'smile' | 'thinking' | 'explain' | 'encourage' | 'celebrate';
export type GlitchExpression = 'neutral' | 'sneaky' | 'laugh' | 'defeated' | 'angry' | 'shocked';

export type CharacterExpression = AlexExpression | NovaExpression | IrisExpression | GlitchExpression;

export type BackgroundId = 
  | 'campus'
  | 'bedroom'
  | 'gateway'
  | 'swot_room'
  | 'smart_lab'
  | 'fashion_store'
  | 'career_fair'
  | 'library'
  | 'victory';

export type GameScene = 
  | 'TITLE'
  | 'PROLOGUE'
  | 'MEET_NOVA'
  | 'SWOT_INTRO'
  | 'SWOT_QUIZ'
  | 'SWOT_COMPLETE'
  | 'SMART_INTRO'
  | 'SMART_VIDEO'
  | 'SMART_DISCUSSION'
  | 'SMART_KEYS'
  | 'SMART_MINIGAME'
  | 'SMART_GOAL_REVEAL'
  | 'ACTION_PLAN'
  | 'DEFEAT_GLITCH'
  | 'VICTORY';

export interface DialogueLine {
  id: string;
  speaker: CharacterId;
  name: string;
  expression: CharacterExpression;
  text: string;
  subtext?: string;
  background?: BackgroundId;
  soundCue?: string;
}

export interface ChoiceOption {
  key: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
  isCorrect?: boolean;
  feedback?: string;
  nextScene?: GameScene;
  nextStep?: number;
}

export interface QuizQuestion {
  id: number;
  title: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  correctDialogue: {
    speaker: CharacterId;
    expression: CharacterExpression;
    text: string;
  };
  rewardXP: number;
  unlockedEffect: string;
  background?: BackgroundId;
}

export interface SmartCard {
  key: 'S' | 'M' | 'A' | 'R' | 'T';
  letter: string;
  titleVi: string;
  titleEn: string;
  iconName: string;
  guidingQuestion: string;
  definition: string;
  caseApplication: string[];
  alexDialogue: string;
  unlockedNotification: string;
}

export interface SmartMinigameQuestion {
  key: 'S' | 'M' | 'A' | 'R' | 'T';
  element: string;
  options: {
    key: 'A' | 'B' | 'C';
    text: string;
  }[];
  correctKey: 'A' | 'B' | 'C';
  rewardXP: number;
}

export interface GameState {
  currentScene: GameScene;
  dialogueIndex: number;
  xp: number;
  level: number;
  levelName: string;
  
  // SWOT stats
  currentSwotIndex: number;
  swotAnswers: Record<number, { selected: string; isCorrect: boolean; firstAttempt: boolean }>;
  swotFirstAttemptCount: number;
  swotUnlockedSymbols: string[];
  
  // SMART stats
  unlockedSmartCards: ('S' | 'M' | 'A' | 'R' | 'T')[];
  smartMinigameAnswers: Record<string, { selected: string; isCorrect: boolean }>;
  smartMinigameScore: number;
  
  // Action Plan
  completedChapters: boolean[]; // 9 chapters
  
  // Badges
  unlockedBadges: string[];
  
  // Settings
  bgmMuted: boolean;
  sfxMuted: boolean;
  autoPlay: boolean;
  textSpeed: number; // ms per char
  isFullscreen: boolean;
  presenterMode: boolean;
  
  // Dialog log history
  log: DialogueLine[];
}
