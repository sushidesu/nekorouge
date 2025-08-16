export type DreamDepth = 'surface' | 'shallow' | 'middle' | 'deep' | 'abyss';

export interface Card {
  id: string;
  name: string;
  description: string;
  depth: DreamDepth;
  madnessChange: number;
  depthChange: number;
  effects: CardEffect[];
  evolved?: boolean;
}

export interface CardEffect {
  type: 'dream' | 'reality' | 'madness' | 'transcend';
  value: number;
  description?: string;
}

export interface GameState {
  currentDepth: DreamDepth;
  depthLevel: number;
  madness: number;
  reality: number;
  dream: number;
  hand: Card[];
  deck: Card[];
  discardPile: Card[];
  turn: number;
  gameOver: boolean;
  victory: boolean;
  currentEvent?: string;
  score: number;
}

export const DEPTH_LEVELS: Record<DreamDepth, number> = {
  surface: 0,
  shallow: 1,
  middle: 2,
  deep: 3,
  abyss: 4,
};

export const DEPTH_NAMES: Record<DreamDepth, string> = {
  surface: '表層',
  shallow: '浅層',
  middle: '中層',
  deep: '深層',
  abyss: '深淵',
};