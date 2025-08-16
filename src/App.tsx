import { useDreamGame } from './hooks/useDreamGame';
import { GameStatus } from './components/GameStatus';
import { HandCards } from './components/HandCards';
import { GameOverScreen } from './components/GameOverScreen';
import './App.css';

function App() {
  const { gameState, playCard, resetGame } = useDreamGame();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a2e',
      backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h1 style={{
        fontSize: '36px',
        color: '#ffffff',
        marginBottom: '20px',
        textAlign: 'center',
        textShadow: '0 0 20px rgba(156, 39, 176, 0.5)',
        background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        🌙 ねこの深層夢境 🌙
      </h1>
      
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}>
        <GameStatus gameState={gameState} />
        
        <HandCards 
          cards={gameState.hand}
          onPlayCard={playCard}
          disabled={gameState.gameOver || gameState.victory}
        />
        
        <div style={{
          textAlign: 'center',
          padding: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          color: '#ffffff',
          fontSize: '14px',
        }}>
          <p style={{ margin: '5px 0' }}>
            <strong>遊び方:</strong> カードをクリックして夢を深めていこう
          </p>
          <p style={{ margin: '5px 0', color: '#ccc' }}>
            狂気度100で敗北、現実感0または20で敗北、深淵レベル20で勝利
          </p>
        </div>
        
        <button
          onClick={resetGame}
          style={{
            padding: '12px 30px',
            backgroundColor: '#9c27b0',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            alignSelf: 'center',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7b1fa2'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#9c27b0'}
        >
          🔄 新しい夢を見る
        </button>
      </div>
      
      {(gameState.gameOver || gameState.victory) && (
        <GameOverScreen 
          gameState={gameState}
          onRestart={resetGame}
        />
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default App
