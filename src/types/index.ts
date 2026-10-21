export type UserRole = 'student' | 'teacher' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  grade: number; // 6, 7, 8, 9
  school: string;
  avatar: string;
  badges: string[];
  points: number;
}

export type MindMapLayout = 'radial' | 'horizontal_tree' | 'vertical_tree' | 'bilateral';

export interface MindMapNode {
  id: string;
  parentId: string | null;
  label: string;
  description?: string;
  color: string;
  icon?: string;
  x: number;
  y: number;
  level: number; // 0 = central, 1 = main branch, 2 = subbranch, 3+ = leaf
  collapsed?: boolean;
}

export interface MindMapData {
  id: string;
  title: string;
  grade: number;
  layout: MindMapLayout;
  nodes: MindMapNode[];
  createdAt: string;
  updatedAt: string;
  isCustom?: boolean;
  sourceModule?: string;
}

export interface ReadingQuestion {
  id: number;
  level: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
  question: string;
  options?: string[];
  correctOptionIndex?: number;
  textEvidence?: string;
  explanation?: string;
  hint?: string;
  sampleAnswer?: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  author: string;
  grade: number;
  bookSet: string;
  topic: string;
  content: string;
  questions: ReadingQuestion[];
}

export interface EssaySubmission {
  id: string;
  essayType: string;
  prompt: string;
  content: string;
  createdAt: string;
  score?: number;
  feedback?: {
    totalScore: number;
    generalFeedback: string;
    criteriaScores: Record<string, number>;
    strengths: string[];
    improvements: Array<{
      originalSentence: string;
      reason: string;
      suggestion: string;
    }>;
    nextStepAdvice: string;
  };
}

export interface CourtDebateMessage {
  id: string;
  speaker: string;
  role: string;
  text: string;
  timestamp: string;
  isAi?: boolean;
}

export interface CourtCase {
  id: string;
  title: string;
  literaryWork: string;
  character: string;
  conflict: string;
  context: string;
  defaultRoles: string[];
}

export interface EthicsDilemma {
  id: string;
  title: string;
  gdcdTopic: string;
  literaryConnection: string;
  scenario: string;
  choices: Array<{
    id: string;
    text: string;
    consequence: string;
    moralAnalysis: string;
    recommended: boolean;
  }>;
}

export interface ArenaQuizQuestion {
  id: string;
  gameType: string; // 'author_work' | 'rhetoric' | 'crossword' | 'trivia' | 'bell'
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  grade: number;
}

export interface TeacherResource {
  id: string;
  title: string;
  grade: number;
  type: 'worksheet' | 'lesson_plan' | 'rubric' | 'quiz_bank';
  topic: string;
  content: string;
  status: 'draft' | 'approved';
  createdAt: string;
}

export interface LearningProgress {
  readingCompleted: number;
  essaysWritten: number;
  courtTrialsJoined: number;
  speechesDelivered: number;
  ethicsResolved: number;
  arenaMatchesWon: number;
  mindMapsCreated: number;
  totalStudyMinutes: number;
  skillScores: {
    reading: number;
    writing: number;
    speaking: number;
    ethics: number;
    criticalThinking: number;
  };
}
