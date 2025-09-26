import { Kid, Behavior, Reward } from './types';
import { EMOJIS } from './lib/emojis';


export const INITIAL_KIDS: Kid[] = [
  {
    id: 'kid-1',
    name: 'أحمد',
    avatar: EMOJIS[0],
    points: 125,
    history: [
      { id: 'evt-1', behaviorId: 'b-1', timestamp: Date.now() - 86400000 * 2, points: 10 },
      { id: 'evt-2', behaviorId: 'b-2', timestamp: Date.now() - 86400000, points: 5 },
      { id: 'evt-3', behaviorId: 'b-neg-1', timestamp: Date.now() - 3600000, points: -5 },
    ],
    rewardHistory: [],
  },
  {
    id: 'kid-2',
    name: 'سارة',
    avatar: EMOJIS[1],
    points: 250,
    history: [
        { id: 'evt-4', behaviorId: 'b-1', timestamp: Date.now() - 86400000 * 3, points: 10 },
        { id: 'evt-5', behaviorId: 'b-3', timestamp: Date.now() - 86400000 * 1, points: 15 },
        { id: 'evt-6', behaviorId: 'b-2', timestamp: Date.now() - 7200000, points: 5 },
    ],
    rewardHistory: [
      { id: 'grant-1', rewardId: 'r-3', timestamp: Date.now() - 86400000 * 4, grantedBy: 'redeem' }
    ],
  },
];

export const INITIAL_BEHAVIORS: Behavior[] = [
  { id: 'b-1', name: 'تنظيف الغرفة', points: 10, icon: '🧹' },
  { id: 'b-2', name: 'حل الواجبات', points: 5, icon: '📚' },
  { id: 'b-3', name: 'المساعدة في غسل الأطباق', points: 15, icon: '🍽️' },
  { id: 'b-neg-1', name: 'الشجار مع الإخوة', points: -5, icon: '😠' },
  { id: 'b-neg-2', name: 'عدم إنهاء العشاء', points: -5, icon: '🥦' },
];

export const INITIAL_REWARDS: Reward[] = [
  { id: 'r-1', name: '30 دقيقة لمشاهدة التلفاز', cost: 50, icon: '📺' },
  { id: 'r-2', name: 'آيس كريم', cost: 100, icon: '🍦' },
  { id: 'r-3', name: 'لعبة جديدة', cost: 250, icon: '🧸' },
  { id: 'r-4', name: 'نزهة في الحديقة', cost: 150, icon: '🌳' },
];

export const PARENT_USER = {
    id: 'parent-user',
    name: 'ولي الأمر',
    role: 'parent' as const,
    avatar: '👑'
};