import { useState, useCallback } from 'react';
import type { GameState, Card, DreamDepth } from '../types/dreamGame';
import { INITIAL_CARDS, EVOLVED_CARDS, RANDOM_CARDS } from '../data/cards';

const INITIAL_STATE: GameState = {
  currentDepth: 'surface',
  depthLevel: 0,
  madness: 0,
  reality: 10,
  dream: 0,
  hand: [],
  deck: [...INITIAL_CARDS],
  discardPile: [],
  turn: 0,
  gameOver: false,
  victory: false,
  score: 0,
};

export function useDreamGame() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const state = { ...INITIAL_STATE };
    state.deck = shuffleDeck([...INITIAL_CARDS]);
    state.hand = drawCards(state.deck, 3);
    return state;
  });

  const playCard = useCallback((card: Card) => {
    setGameState(prev => {
      if (prev.gameOver || prev.victory) return prev;
      
      const newState = { ...prev };
      
      // カード効果を適用
      card.effects.forEach(effect => {
        switch (effect.type) {
          case 'dream':
            newState.dream += effect.value;
            break;
          case 'reality':
            newState.reality += effect.value;
            break;
          case 'madness':
            newState.madness += effect.value;
            break;
          case 'transcend':
            newState.score += effect.value * 100;
            newState.dream += effect.value * 5;
            break;
        }
      });
      
      // 狂気度と深度の変化
      newState.madness += card.madnessChange;
      newState.depthLevel = Math.max(0, newState.depthLevel + card.depthChange);
      
      // 深度レベルに応じて深度を更新
      const depths: DreamDepth[] = ['surface', 'shallow', 'middle', 'deep', 'abyss'];
      const depthIndex = Math.min(Math.floor(newState.depthLevel / 5), 4);
      newState.currentDepth = depths[depthIndex];
      
      // カードを捨て札に
      newState.hand = newState.hand.filter(c => c.id !== card.id);
      newState.discardPile.push(card);
      
      // ターン進行
      newState.turn++;
      
      // イベントメッセージ
      newState.currentEvent = generateEvent(card, newState);
      
      // カード進化チェック
      if (newState.depthLevel > prev.depthLevel && Math.random() < 0.3) {
        evolveRandomCard(newState);
      }
      
      // 新しいカードを引く
      if (newState.deck.length === 0) {
        newState.deck = shuffleDeck(newState.discardPile);
        newState.discardPile = [];
      }
      if (newState.hand.length < 3) {
        const newCards = drawCards(newState.deck, 3 - newState.hand.length);
        newState.hand.push(...newCards);
      }
      
      // ランダムカード追加
      if (Math.random() < 0.2) {
        const randomCard = { ...RANDOM_CARDS[Math.floor(Math.random() * RANDOM_CARDS.length)] };
        randomCard.id = `${randomCard.id}_${Date.now()}`;
        newState.hand.push(randomCard);
      }
      
      // スコア計算
      newState.score = newState.turn * 10 + newState.depthLevel * 50 + newState.dream * 5;
      
      // 現実感が高すぎると夢から覚める
      if (newState.reality >= 20) {
        newState.gameOver = true;
        newState.currentEvent = '現実感が強すぎて夢から覚めてしまった...';
      }
      
      // ゲーム終了判定
      if (newState.madness >= 100) {
        newState.gameOver = true;
        newState.currentEvent = '狂気に飲まれて、永遠の夢の中へ...';
      } else if (newState.reality <= 0) {
        newState.gameOver = true;
        newState.currentEvent = '現実との繋がりが切れた...';
      } else if (newState.currentDepth === 'abyss' && newState.depthLevel >= 20) {
        newState.victory = true;
        newState.currentEvent = '深淵の真理に到達した！';
        newState.score += 1000;
      }
      
      return newState;
    });
  }, []);

  const resetGame = useCallback(() => {
    const state = { ...INITIAL_STATE };
    state.deck = shuffleDeck([...INITIAL_CARDS]);
    state.hand = drawCards(state.deck, 3);
    setGameState(state);
  }, []);

  return { gameState, playCard, resetGame };
}

function shuffleDeck(cards: Card[]): Card[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function drawCards(deck: Card[], count: number): Card[] {
  return deck.splice(0, count);
}

function generateEvent(card: Card, state: GameState): string {
  const events = [
    `${card.name}を使った...`,
    '夢が深まっていく...',
    '現実が遠のく...',
    '意識が拡張される...',
  ];
  
  if (state.madness > 50) {
    events.push('何かがおかしい...');
    events.push('境界が曖昧になる...');
  }
  
  if (state.currentDepth === 'deep' || state.currentDepth === 'abyss') {
    events.push('存在の意味を問う...');
    events.push('時空が歪む...');
  }
  
  return events[Math.floor(Math.random() * events.length)];
}

function evolveRandomCard(state: GameState): void {
  const baseCard = state.hand[Math.floor(Math.random() * state.hand.length)];
  if (!baseCard) return;
  
  const evolutionKey = `${baseCard.id.split('_')[0]}_${state.currentDepth}`;
  const evolutions = EVOLVED_CARDS[evolutionKey];
  
  if (evolutions && evolutions.length > 0) {
    const evolvedCard = { ...evolutions[0] };
    evolvedCard.id = `${evolvedCard.id}_${Date.now()}`;
    state.hand.push(evolvedCard);
    state.currentEvent = `カードが進化した！「${evolvedCard.name}」を獲得`;
  }
}