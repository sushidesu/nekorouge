import React from 'react';
import type { GameState } from '../types/game';

interface GameMapProps {
  gameState: GameState;
}

const TILE_EMOJIS = {
  floor: '　',
  wall: '🧱',
  grass: '🌿',
  water: '💧',
  toy: '🧶',
  bed: '🛏️',
  food: '🍖',
  butterfly: '🦋',
  box: '📦',
  sunspot: '☀️',
};

const CAT_EMOJI = {
  happy: '😸',
  sleepy: '😴',
  playful: '😹',
  curious: '🐱',
};

export const GameMap: React.FC<GameMapProps> = ({ gameState }) => {
  const { map, cat } = gameState;

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${map.width}, 30px)`,
        gap: '0px',
        backgroundColor: '#2a2a2a',
        padding: '20px',
        borderRadius: '10px',
        fontFamily: 'monospace',
        fontSize: '20px',
      }}
    >
      {map.tiles.map((row, y) =>
        row.map((tile, x) => {
          const isCatHere = cat.position.x === x && cat.position.y === y;
          const isDiscovered = tile.discovered;
          
          return (
            <div
              key={`${x}-${y}`}
              style={{
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDiscovered 
                  ? (tile.type === 'wall' ? '#4a4a4a' : '#fff8dc')
                  : '#1a1a1a',
                border: '1px solid #333',
                transition: 'all 0.3s ease',
              }}
            >
              {!isDiscovered ? '　' : 
                isCatHere ? CAT_EMOJI[cat.mood] : 
                TILE_EMOJIS[tile.type]}
            </div>
          );
        })
      )}
    </div>
  );
};