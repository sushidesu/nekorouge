import type { Card } from '../types/dreamGame';

export const INITIAL_CARDS: Card[] = [
  // 表層カード
  {
    id: 'eat_1',
    name: 'ごはんを食べる',
    description: 'おいしいごはん。現実感+2',
    depth: 'surface',
    madnessChange: 0,
    depthChange: 0,
    effects: [{ type: 'reality', value: 2 }],
  },
  {
    id: 'sleep_1',
    name: 'お昼寝',
    description: 'すやすや...夢+1、深度+1',
    depth: 'surface',
    madnessChange: 0,
    depthChange: 1,
    effects: [{ type: 'dream', value: 1 }],
  },
  {
    id: 'groom_1',
    name: '毛づくろい',
    description: 'きれいにする。現実感+1',
    depth: 'surface',
    madnessChange: 0,
    depthChange: 0,
    effects: [{ type: 'reality', value: 1 }],
  },
  {
    id: 'box_1',
    name: '箱に入る',
    description: '安心する箱。夢+2',
    depth: 'surface',
    madnessChange: 0,
    depthChange: 0,
    effects: [{ type: 'dream', value: 2 }],
  },
];

export const EVOLVED_CARDS: Record<string, Card[]> = {
  // 浅層進化
  eat_shallow: [
    {
      id: 'eat_2',
      name: '光を食べる',
      description: '光子を摂取。狂気+1、夢+3',
      depth: 'shallow',
      madnessChange: 1,
      depthChange: 0,
      effects: [{ type: 'dream', value: 3 }, { type: 'madness', value: 1 }],
      evolved: true,
    },
  ],
  sleep_shallow: [
    {
      id: 'sleep_2',
      name: '夢の中で目覚める',
      description: '夢の階層を認識。深度+2',
      depth: 'shallow',
      madnessChange: 1,
      depthChange: 2,
      effects: [{ type: 'dream', value: 2 }],
      evolved: true,
    },
  ],
  
  // 中層進化
  eat_middle: [
    {
      id: 'eat_3',
      name: '概念を捕食',
      description: '抽象的な何かを噛む。狂気+2、夢+5',
      depth: 'middle',
      madnessChange: 2,
      depthChange: 1,
      effects: [{ type: 'dream', value: 5 }, { type: 'madness', value: 2 }],
      evolved: true,
    },
  ],
  groom_middle: [
    {
      id: 'groom_3',
      name: '存在を整える',
      description: '自己の輪郭を定義。現実-2、夢+4',
      depth: 'middle',
      madnessChange: 1,
      depthChange: 0,
      effects: [{ type: 'reality', value: -2 }, { type: 'dream', value: 4 }],
      evolved: true,
    },
  ],
  
  // 深層進化
  eat_deep: [
    {
      id: 'eat_4',
      name: '時間を味わう',
      description: '過去と未来を同時に体験。狂気+3、超越+1',
      depth: 'deep',
      madnessChange: 3,
      depthChange: 1,
      effects: [{ type: 'transcend', value: 1 }, { type: 'madness', value: 3 }],
      evolved: true,
    },
  ],
  box_deep: [
    {
      id: 'box_4',
      name: '次元の隙間に潜む',
      description: '3次元と4次元の間。深度+3、狂気+2',
      depth: 'deep',
      madnessChange: 2,
      depthChange: 3,
      effects: [{ type: 'dream', value: 6 }],
      evolved: true,
    },
  ],
  
  // 深淵進化
  groom_abyss: [
    {
      id: 'groom_5',
      name: '因果律を撫でる',
      description: '原因と結果の糸を整理。超越+2',
      depth: 'abyss',
      madnessChange: 4,
      depthChange: 0,
      effects: [{ type: 'transcend', value: 2 }],
      evolved: true,
    },
  ],
  box_abyss: [
    {
      id: 'box_5',
      name: '観測されるまで生死が重なる',
      description: '量子の箱の中で存在と非存在が共存。超越+3',
      depth: 'abyss',
      madnessChange: 5,
      depthChange: 0,
      effects: [{ type: 'transcend', value: 3 }],
      evolved: true,
    },
  ],
};

export const RANDOM_CARDS: Card[] = [
  {
    id: 'chaos_1',
    name: '夢の断片',
    description: '何かの記憶。ランダム効果',
    depth: 'shallow',
    madnessChange: 1,
    depthChange: 0,
    effects: [{ type: 'dream', value: Math.floor(Math.random() * 4) + 1 }],
  },
  {
    id: 'reality_anchor',
    name: '飼い主の声',
    description: '現実に引き戻される。現実+5、深度-1',
    depth: 'surface',
    madnessChange: -2,
    depthChange: -1,
    effects: [{ type: 'reality', value: 5 }],
  },
  {
    id: 'void_glimpse',
    name: '虚無を覗く',
    description: '何もない場所。狂気+4、深度+2',
    depth: 'deep',
    madnessChange: 4,
    depthChange: 2,
    effects: [{ type: 'madness', value: 4 }],
  },
];