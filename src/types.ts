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
  source?: string;
  pageSuggestions?: { pageId: PageId; label: string; icon?: string }[];
  pageContext?: PageId;
}

export type TickerSpeed = 'paused' | 'slow' | 'normal' | 'fast';

export type PageId =
  | 'home'
  | 'entertainment'
  | 'plans'
  | 'career-guide'
  | 'services'
  | 'compressor'
  | 'study-hub'
  | 'jobs-news'
  | 'panchang'
  | 'rashifal'
  | 'weather'
  | 'utilities'
  | 'parent-guide'
  | 'about'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'contact'
  | 'admin';

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  createdAt: string;
}

export interface SmartTvBroadcast {
  videoUrl: string;
  title: string;
  description: string;
  isLive: boolean;
  updatedAt: string;
}

export interface CommunityChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  avatar?: string;
}

export interface SliderItem {
  id: string;
  url: string;
  title: string;
  subtitle?: string;
  targetPage?: PageId;
  active: boolean;
  createdAt?: string;
}

export interface CustomQAItem {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  createdAt?: string;
}

export interface RegisteredUserRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  state?: string;
  qualification?: string;
  selectedPlan?: string;
  sponsorId?: string;
  payoutUpiId?: string;
  utrNumber?: string;
  source?: string;
  notes?: string;
  createdAt: string;
}

export interface ResumeData {
  fullName: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  objective: string;
  education: string;
  skills: string;
  experience: string;
  languages: string;
}
