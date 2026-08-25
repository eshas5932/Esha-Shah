export type EraId = 
  | 'early-internet' 
  | 'social-internet' 
  | 'aesthetic-internet' 
  | 'algorithm-era' 
  | 'modern-internet' 
  | 'cyber-cafe';

export interface Exhibit {
  id: string;
  name: string;
  era: EraId;
  years: string;
  tagline: string;
  whatWasIt: string;
  whyItMattered: string;
  theMemory: string;
  icon: string;
  previewColor: string;
  tags: string[];
}

export interface EraRoom {
  id: EraId;
  title: string;
  subTitle: string;
  years: string;
  theme: string;
  description: string;
  atmosphereBg: string;
  accentColor: string;
  bannerQuote: string;
  exhibits: Exhibit[];
  name?: string;
  tagline?: string;
  badgeIcon?: string;
  soundEffect?: string;
  atmosphere?: string;
  visualTheme?: {
    designParadigm: string;
    typography: string;
  };
  artifacts?: Array<{
    name: string;
    description: string;
  }>;
}

export interface UnlockedMemory {
  id: string;
  title: string;
  era?: EraId | string;
  unlockedAt: string;
  flavorText: string;
  category?: string;
}

export type MemoryUnlocked = UnlockedMemory;

export interface EasterEgg {
  id: string;
  name: string;
  description: string;
  foundAt: string;
}

export interface VisitorTicket {
  ticketNumber: string;
  visitorName: string;
  enteredAt: string;
  visitedExhibits: string[];
  unlockedMemories: UnlockedMemory[];
  foundEasterEggs: string[] | EasterEgg[];
  internetGeneration?: string;
  childhoodEra?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  scenario: string;
  options: {
    text: string;
    subtext: string;
    generation: 'digital-pioneer' | 'social-native' | 'tumblr-gen' | 'algorithm-native';
    icon: string;
  }[];
}

export interface GenerationResult {
  id: string;
  title: string;
  eraRange: string;
  quote: string;
  archetype: string;
  traits: string[];
  signatureMemory: string;
  techStack: string[];
  badgeColor: string;
}

export interface CommunityMemory {
  id: string;
  author: string;
  era: '90s' | '00s' | '10s' | '20s';
  text: string;
  likes: number;
  location?: string;
  timestamp: string;
}
