import React from 'react';
import { Card } from '../types/dreamGame';

interface DreamCardProps {
  card: Card;
  onPlay: (card: Card) => void;
  disabled?: boolean;
}

const DEPTH_COLORS = {
  surface: '#e8f5e9',
  shallow: '#e3f2fd',
  middle: '#f3e5f5',
  deep: '#fce4ec',
  abyss: '#e0f2f1',
};

const DEPTH_BORDERS = {
  surface: '#4caf50',
  shallow: '#2196f3',
  middle: '#9c27b0',
  deep: '#e91e63',
  abyss: '#00695c',
};

export const DreamCard: React.FC<DreamCardProps> = ({ card, onPlay, disabled = false }) => {
  const handleClick = () => {
    if (!disabled) {
      onPlay(card);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: '200px',
        minHeight: '280px',
        backgroundColor: DEPTH_COLORS[card.depth],
        border: `3px solid ${DEPTH_BORDERS[card.depth]}`,
        borderRadius: '15px',
        padding: '15px',
        margin: '10px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        transform: disabled ? 'scale(0.95)' : 'scale(1)',
        opacity: disabled ? 0.6 : 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: disabled ? 'none' : '0 4px 8px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        }
      }}
    >
      {card.evolved && (
        <div style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          backgroundColor: '#ffd700',
          color: '#333',
          padding: '2px 6px',
          borderRadius: '10px',
          fontSize: '10px',
          fontWeight: 'bold',
        }}>
          進化
        </div>
      )}
      
      <div>
        <h3 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          margin: '0 0 10px 0',
          color: '#333',
          textAlign: 'center',
          lineHeight: '1.2',
        }}>
          {card.name}
        </h3>
        
        <p style={{
          fontSize: '12px',
          color: '#555',
          margin: '0 0 15px 0',
          lineHeight: '1.4',
          textAlign: 'center',
          minHeight: '60px',
        }}>
          {card.description}
        </p>
      </div>
      
      <div style={{
        borderTop: '1px solid rgba(0,0,0,0.1)',
        paddingTop: '10px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          marginBottom: '8px',
        }}>
          {card.madnessChange !== 0 && (
            <span style={{ color: card.madnessChange > 0 ? '#d32f2f' : '#388e3c' }}>
              狂気{card.madnessChange > 0 ? '+' : ''}{card.madnessChange}
            </span>
          )}
          {card.depthChange !== 0 && (
            <span style={{ color: card.depthChange > 0 ? '#7b1fa2' : '#1976d2' }}>
              深度{card.depthChange > 0 ? '+' : ''}{card.depthChange}
            </span>
          )}
        </div>
        
        <div style={{ fontSize: '10px', color: '#666' }}>
          {card.effects.map((effect, index) => (
            <div key={index} style={{ marginBottom: '2px' }}>
              {effect.type === 'dream' && `夢+${effect.value}`}
              {effect.type === 'reality' && `現実${effect.value > 0 ? '+' : ''}${effect.value}`}
              {effect.type === 'madness' && `狂気+${effect.value}`}
              {effect.type === 'transcend' && `超越+${effect.value}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};