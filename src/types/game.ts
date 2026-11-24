export type CharacterId = 'minh' | 'linh' | 'tick' | 'system';

export type MinhExpression = 'neutral' | 'confused' | 'worried' | 'determined' | 'happy' | 'distracted' | 'victory';
export type LinhExpression = 'neutral' | 'greeting' | 'explaining' | 'thinking' | 'encouraging' | 'celebrating';
export type TickExpression = 'neutral' | 'countdown' | 'warning' | 'cheering' | 'laughing';

export type CharacterExpression = MinhExpression | LinhExpression | TickExpression | string;

export type GameScene = 
  | 'WARMUP_INTRO'
  | 'SWOT_QUIZ'
  | 'SWOT_COMPLETE'
  | 'SMART_VIDEO'
  | 'SMART_DISCUSSION'
  | 'SMART_INTRO'
  | 'SMART_THEORY'
  | 'SMART_GAME'
  | 'VICTORY';

export interface DialogueLine {
  id: string;
  speaker: CharacterId;
  name: string;
  expression: CharacterExpression;
  text: string;
  subtext?: string;
  actionText?: string;
}

export interface QuizQuestion {
  id: number;
  category: 'S' | 'W' | 'O' | 'T' | 'ALL' | 'M' | 'A' | 'R' | string;
  title: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  rewardXP: number;
}

export interface SmartPillar {
  letter: 'S' | 'M' | 'A' | 'R' | 'T';
  nameVi: string;
  nameEn: string;
  tagline: string;
  description: string;
  application: string;
  detailPoints: string[];
}
