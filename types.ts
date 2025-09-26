
export interface PointEvent {
  id: string;
  behaviorId: string;
  timestamp: number;
  points: number;
}

export interface GrantedRewardEvent {
  id: string;
  rewardId: string;
  timestamp: number;
  grantedBy: 'parent' | 'redeem';
}

export interface Kid {
  id: string;
  name: string;
  avatar: string;
  points: number;
  history: PointEvent[];
  rewardHistory: GrantedRewardEvent[];
}

export interface Behavior {
  id: string;
  name: string;
  points: number; // can be positive or negative
  icon: string;
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  icon: string;
}

export interface User {
  id: string;
  name:string;
  role: 'parent' | 'child';
}

export enum View {
  Login,
  Parent,
  Child,
}

// This type is for the geminiService
export interface AISuggestion {
  name: string;
  description?: string;
  points?: number;
  cost?: number;
}