import React from 'react';
import type { GameState } from '../types/dreamGame';
import { DEPTH_NAMES } from '../types/dreamGame';

interface GameStatusProps {
  gameState: GameState;
}

export const GameStatus: React.FC<GameStatusProps> = ({ gameState }) => {
  const getMadnessColor = (madness: number) => {
    if (madness < 30) return '#4caf50';
    if (madness < 60) return '#ff9800';
    if (madness < 90) return '#f44336';
    return '#9c27b0';
  };

  const getRealityColor = (reality: number) => {
    if (reality >= 18) return '#f44336'; // 危険：覚めそう
    if (reality > 15) return '#ff9800'; // 警告
    if (reality > 5) return '#4caf50'; // 理想
    if (reality > 2) return '#ff9800'; // 警告
    return '#f44336'; // 危険：消失
  };

  const getDepthEmoji = () => {
    switch (gameState.currentDepth) {
      case 'surface': return '🌅';
      case 'shallow': return '🌊';
      case 'middle': return '🌀';
      case 'deep': return '🕳️';
      case 'abyss': return '⚫';
      default: return '😴';
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '15px',
      marginBottom: '20px',
      color: '#333',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        marginBottom: '15px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '5px' }}>
            {getDepthEmoji()}
          </div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
            {DEPTH_NAMES[gameState.currentDepth]}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            深度レベル: {gameState.depthLevel}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: getMadnessColor(gameState.madness),
            marginBottom: '5px',
          }}>
            🧠 {gameState.madness}/100
          </div>
          <div style={{ fontSize: '12px' }}>狂気度</div>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#ddd',
            borderRadius: '3px',
            overflow: 'hidden',
            marginTop: '5px',
          }}>
            <div style={{
              width: `${gameState.madness}%`,
              height: '100%',
              backgroundColor: getMadnessColor(gameState.madness),
              transition: 'all 0.3s ease',
            }} />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: getRealityColor(gameState.reality),
            marginBottom: '5px',
          }}>
            🌍 {gameState.reality}/20
          </div>
          <div style={{ fontSize: '12px' }}>現実感</div>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#ddd',
            borderRadius: '3px',
            overflow: 'hidden',
            marginTop: '5px',
          }}>
            <div style={{
              width: `${Math.max(0, gameState.reality * 5)}%`,
              height: '100%',
              backgroundColor: getRealityColor(gameState.reality),
              transition: 'all 0.3s ease',
            }} />
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: '#9c27b0',
            marginBottom: '5px',
          }}>
            ✨ {gameState.dream}
          </div>
          <div style={{ fontSize: '12px' }}>夢の力</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: '#2196f3',
            marginBottom: '5px',
          }}>
            🎯 {gameState.score}
          </div>
          <div style={{ fontSize: '12px' }}>スコア</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: '#666',
            marginBottom: '5px',
          }}>
            ⏱️ {gameState.turn}
          </div>
          <div style={{ fontSize: '12px' }}>ターン</div>
        </div>
      </div>

      {gameState.currentEvent && (
        <div style={{
          padding: '10px',
          backgroundColor: 'rgba(156, 39, 176, 0.1)',
          borderLeft: '4px solid #9c27b0',
          borderRadius: '5px',
          fontSize: '14px',
          fontStyle: 'italic',
          animation: 'fadeIn 0.5s ease',
        }}>
          {gameState.currentEvent}
        </div>
      )}
    </div>
  );
};