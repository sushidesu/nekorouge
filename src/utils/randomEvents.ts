export const RANDOM_EVENTS = [
  '🌸 さくらの花びらがひらひら舞っている',
  '🐦 小鳥がさえずっている',
  '🌈 窓の外に虹が見える！',
  '💤 とってもいい天気でねむくなる',
  '🎵 どこかから楽しい音楽が聞こえる',
  '🍃 そよ風が気持ちいい',
  '☁️ ふわふわの雲が流れていく',
  '✨ キラキラ光るものを見つけた',
  '🐛 てんとう虫がお散歩中',
  '🌻 ひまわりが元気に咲いている',
];

export function getRandomEvent(): string | null {
  if (Math.random() < 0.1) {
    return RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
  }
  return null;
}