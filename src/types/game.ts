export interface Position {
  x: number;
  y: number;
}

export interface Cat {
  position: Position;
  mood: 'happy' | 'sleepy' | 'playful' | 'curious';
  energy: number;
  happiness: number;
}

export type TileType = 'floor' | 'wall' | 'grass' | 'water' | 'toy' | 'bed' | 'food' | 'butterfly' | 'box' | 'sunspot';

export interface Tile {
  type: TileType;
  discovered: boolean;
  interaction?: string;
}

export interface GameMap {
  tiles: Tile[][];
  width: number;
  height: number;
}

export interface GameState {
  cat: Cat;
  map: GameMap;
  turn: number;
  discoveries: string[];
  currentActivity?: string;
}