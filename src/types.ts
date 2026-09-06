export interface Plan {
  id: number;
  code: string;
  name: string;
  tagline: string;
  price: number;
  instantPayout: number;
  percentage: number;
  themeColor: string;
  borderColor: string;
  bgGradient: string;
  resources: string[];
  description: string;
  realWorldScenario: string;
  storyTitle: string;
  storyPerson: string;
  storyDescription: string;
  recommendedFor: string;
  formLink: string;
  telegramLink: string;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: {
    text: string;
    score: number;
    planHint?: number;
    insight: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export type TickerSpeed = 'paused' | 'slow' | 'normal' | 'fast';
