export enum Sender {
  USER = 'USER',
  BOT = 'BOT'
}

export interface Citation {
  id: string;
  text: string;
  section: string;
  page: number;
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  citations?: Citation[];
  relatedQuestions?: string[];
  isTyping?: boolean;
}

export interface ThesisSection {
  id: string;
  title: string;
  content: string;
  pageStart: number;
  keywords: string[];
}

export type ComplexityLevel = 'simple' | 'rigorous';