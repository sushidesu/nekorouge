import type { GameMap, Tile, TileType } from '../types/game';

const ROOM_ITEMS: TileType[] = ['toy', 'bed', 'food', 'butterfly', 'box', 'sunspot'];

function randomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRoom(width: number, height: number): Tile[][] {
  const tiles: Tile[][] = [];
  
  for (let y = 0; y < height; y++) {
    tiles[y] = [];
    for (let x = 0; x < width; x++) {
      const isEdge = x === 0 || x === width - 1 || y === 0 || y === height - 1;
      
      if (isEdge) {
        tiles[y][x] = { type: 'wall', discovered: false };
      } else {
        tiles[y][x] = { type: 'floor', discovered: false };
      }
    }
  }
  
  const itemCount = Math.floor(width * height * 0.1);
  for (let i = 0; i < itemCount; i++) {
    const x = Math.floor(Math.random() * (width - 2)) + 1;
    const y = Math.floor(Math.random() * (height - 2)) + 1;
    
    if (tiles[y][x].type === 'floor') {
      const itemType = randomChoice(ROOM_ITEMS);
      tiles[y][x] = { 
        type: itemType, 
        discovered: false,
        interaction: getInteractionText(itemType)
      };
    }
  }
  
  return tiles;
}

function getInteractionText(type: TileType): string {
  switch (type) {
    case 'toy': return '🧶 毛糸玉を見つけた！転がして遊ぶ';
    case 'bed': return '🛏️ ふかふかのベッド。お昼寝しようかな';
    case 'food': return '🍖 おいしそうなごはん！もぐもぐ';
    case 'butterfly': return '🦋 ちょうちょだ！追いかける？';
    case 'box': return '📦 ダンボール箱。中に入ってみる';
    case 'sunspot': return '☀️ ひだまり。あったかくて気持ちいい';
    default: return '';
  }
}

export function generateMap(width: number = 20, height: number = 15): GameMap {
  const tiles = generateRoom(width, height);
  
  return {
    tiles,
    width,
    height
  };
}

export function revealArea(map: GameMap, centerX: number, centerY: number, radius: number = 2): void {
  for (let dy = -radius; dy <= radius; dy++) {
    for (let dx = -radius; dx <= radius; dx++) {
      const x = centerX + dx;
      const y = centerY + dy;
      
      if (x >= 0 && x < map.width && y >= 0 && y < map.height) {
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= radius) {
          map.tiles[y][x].discovered = true;
        }
      }
    }
  }
}