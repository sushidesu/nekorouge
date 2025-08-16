import React from 'react';
import type { Card } from '../types/dreamGame';
import { DreamCard } from './DreamCard';

interface HandCardsProps {
  cards: Card[];
  onPlayCard: (card: Card) => void;
  disabled?: boolean;
}

export const HandCards: React.FC<HandCardsProps> = ({ cards, onPlayCard, disabled = false }) => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '15px',
        textAlign: 'center',
        color: '#333',
      }}>
        🃏 手札 ({cards.length})
      </h3>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        minHeight: '300px',
      }}>
        {cards.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            color: '#666',
            fontSize: '16px',
            fontStyle: 'italic',
          }}>
            手札がありません
          </div>
        ) : (
          cards.map((card) => (
            <DreamCard
              key={card.id}
              card={card}
              onPlay={onPlayCard}
              disabled={disabled}
            />
          ))
        )}
      </div>
      
      {!disabled && cards.length > 0 && (
        <div style={{
          textAlign: 'center',
          marginTop: '15px',
          fontSize: '14px',
          color: '#666',
        }}>
          カードをクリックして使用
        </div>
      )}
    </div>
  );
};