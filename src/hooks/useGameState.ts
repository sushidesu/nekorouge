import { useState, useCallback, useEffect } from 'react';
import type { GameState, Position } from '../types/game';
import { generateMap, revealArea } from '../utils/mapGenerator';
import { getRandomEvent } from '../utils/randomEvents';

const INITIAL_CAT = {
  position: { x: 10, y: 7 },
  mood: 'curious' as const,
  energy: 100,
  happiness: 50
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const map = generateMap();
    revealArea(map, INITIAL_CAT.position.x, INITIAL_CAT.position.y, 3);
    
    return {
      cat: INITIAL_CAT,
      map,
      turn: 0,
      discoveries: [],
    };
  });

  const moveCat = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    setGameState(prev => {
      const newPos: Position = { ...prev.cat.position };
      
      switch (direction) {
        case 'up': newPos.y -= 1; break;
        case 'down': newPos.y += 1; break;
        case 'left': newPos.x -= 1; break;
        case 'right': newPos.x += 1; break;
      }
      
      if (newPos.x < 0 || newPos.x >= prev.map.width || 
          newPos.y < 0 || newPos.y >= prev.map.height) {
        return prev;
      }
      
      const targetTile = prev.map.tiles[newPos.y][newPos.x];
      if (targetTile.type === 'wall') {
        return prev;
      }
      
      const newState = { ...prev };
      newState.cat = { ...prev.cat, position: newPos };
      newState.turn = prev.turn + 1;
      
      revealArea(newState.map, newPos.x, newPos.y, 3);
      
      if (targetTile.interaction && targetTile.type !== 'floor') {
        newState.currentActivity = targetTile.interaction;
        
        if (!newState.discoveries.includes(targetTile.interaction)) {
          newState.discoveries = [...newState.discoveries, targetTile.interaction];
        }
        
        updateCatMood(newState, targetTile.type);
      } else {
        const randomEvent = getRandomEvent();
        if (randomEvent) {
          newState.currentActivity = randomEvent;
        } else {
          newState.currentActivity = undefined;
        }
      }
      
      newState.cat.energy = Math.max(0, newState.cat.energy - 1);
      
      if (newState.cat.energy < 30) {
        newState.cat.mood = 'sleepy';
      }
      
      return newState;
    });
  }, []);

  const resetGame = useCallback(() => {
    const map = generateMap();
    revealArea(map, INITIAL_CAT.position.x, INITIAL_CAT.position.y, 3);
    
    setGameState({
      cat: INITIAL_CAT,
      map,
      turn: 0,
      discoveries: [],
    });
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w': moveCat('up'); break;
        case 'ArrowDown':
        case 's': moveCat('down'); break;
        case 'ArrowLeft':
        case 'a': moveCat('left'); break;
        case 'ArrowRight':
        case 'd': moveCat('right'); break;
        case 'r': resetGame(); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveCat, resetGame]);

  return { gameState, moveCat, resetGame };
}

function updateCatMood(state: GameState, tileType: string) {
  switch (tileType) {
    case 'toy':
      state.cat.mood = 'playful';
      state.cat.happiness = Math.min(100, state.cat.happiness + 20);
      break;
    case 'bed':
      state.cat.mood = 'sleepy';
      state.cat.energy = Math.min(100, state.cat.energy + 30);
      break;
    case 'food':
      state.cat.mood = 'happy';
      state.cat.energy = Math.min(100, state.cat.energy + 20);
      state.cat.happiness = Math.min(100, state.cat.happiness + 10);
      break;
    case 'butterfly':
      state.cat.mood = 'playful';
      state.cat.happiness = Math.min(100, state.cat.happiness + 15);
      break;
    case 'box':
      state.cat.mood = 'curious';
      state.cat.happiness = Math.min(100, state.cat.happiness + 10);
      break;
    case 'sunspot':
      state.cat.mood = 'happy';
      state.cat.energy = Math.min(100, state.cat.energy + 10);
      state.cat.happiness = Math.min(100, state.cat.happiness + 15);
      break;
  }
}