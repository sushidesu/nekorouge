import React from 'react';
import type { Cat } from '../types/game';

interface StatusBarProps {
  cat: Cat;
  turn: number;
  discoveries: number;
}

export const StatusBar: React.FC<StatusBarProps> = ({ cat, turn, discoveries }) => {
  const moodEmoji = {
    happy: '😸',
    sleepy: '😴',
    playful: '😹',
    curious: '🐱',
  };

  const moodText = {
    happy: 'ごきげん',
    sleepy: 'ねむい',
    playful: 'あそびたい',
    curious: 'きょうみしんしん',
  };

  return (
    <div style={{
      padding: '15px',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
    }}>
      <div>
        {moodEmoji[cat.mood]} きぶん: {moodText[cat.mood]}
      </div>
      <div>
        ⚡ げんき: {cat.energy}/100
      </div>
      <div>
        💖 しあわせ: {cat.happiness}/100
      </div>
      <div>
        🐾 ターン: {turn}
      </div>
      <div>
        ✨ はっけん: {discoveries}
      </div>
    </div>
  );
};