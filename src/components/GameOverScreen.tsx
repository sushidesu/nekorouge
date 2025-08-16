import React from 'react';
import { GameState } from '../types/dreamGame';

interface GameOverScreenProps {
  gameState: GameState;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ gameState, onRestart }) => {
  const isVictory = gameState.victory;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px',
        }}>
          {isVictory ? '🌟' : '🌙'}
        </div>
        
        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '15px',
          color: isVictory ? '#2e7d32' : '#d32f2f',
        }}>
          {isVictory ? '深淵到達！' : '夢の終わり'}
        </h2>
        
        <p style={{
          fontSize: '16px',
          color: '#495057',
          marginBottom: '25px',
          lineHeight: '1.6',
        }}>
          {isVictory 
            ? '深淵の真理に到達しました。存在の意味を理解したねこは、新たな次元へと旅立ちます。'
            : gameState.madness >= 100
              ? '狂気に飲まれて、現実に戻れなくなってしまいました。永遠の夢の中で、ねこは静かに眠り続けます。'
              : gameState.reality >= 20
                ? '現実感が強すぎて夢から覚めてしまいました。おいしい朝ごはんが待っています。'
                : '現実との繋がりが切れてしまいました。夢の世界に迷い込んだねこの物語は、ここで終わります。'
          }
        </p>
        
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '25px',
          border: '1px solid #dee2e6',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#212529',
          }}>
            📊 結果
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
            fontSize: '14px',
            color: '#495057',
          }}>
            <div>
              <strong style={{ color: '#212529' }}>最終スコア:</strong> {gameState.score}
            </div>
            <div>
              <strong style={{ color: '#212529' }}>ターン数:</strong> {gameState.turn}
            </div>
            <div>
              <strong style={{ color: '#212529' }}>到達深度:</strong> {gameState.depthLevel}
            </div>
            <div>
              <strong style={{ color: '#212529' }}>夢の力:</strong> {gameState.dream}
            </div>
            <div>
              <strong style={{ color: '#212529' }}>狂気度:</strong> {gameState.madness}/100
            </div>
            <div>
              <strong style={{ color: '#212529' }}>現実感:</strong> {gameState.reality}
            </div>
          </div>
        </div>
        
        <button
          onClick={onRestart}
          style={{
            backgroundColor: '#9c27b0',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 30px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7b1fa2'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#9c27b0'}
        >
          🔄 新しい夢を見る
        </button>
      </div>
    </div>
  );
};