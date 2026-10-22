/**
 * Types for ECONOMY DECODE: 통합사회 경제 개념 마스터 클래스
 */

export type UnitId = 
  | 'unit-1'
  | 'unit-2'
  | 'unit-3'
  | 'unit-4'
  | 'unit-5'
  | 'unit-6';

export interface UnitInfo {
  id: UnitId;
  number: string;
  title: string;
  subtitle: string;
  targetObjective: string;
}

export interface UnitOneKeyword {
  id: string;
  name: string;
  shortTag: string;
  definition: string;
  realWorldExample: string;
  examTrap: string;
  teacherTip: string;
}

export interface UnitTwoFeature {
  id: string;
  title: string;
  shortDesc: string;
  definition: string;
  mechanism: string;
  realCase: string;
  examCaution: string;
  teacherNote: string;
}

export type HistoryEraId = 'commercial' | 'industrial' | 'modified' | 'neoliberal';

export interface HistoryEra {
  id: HistoryEraId;
  name: string;
  eraPeriod: string;
  kicker: string;
  background: string[];
  keyThoughts: {
    title: string;
    thinker?: string;
    concepts: string[];
    description: string;
  };
  roles: {
    stateRole: string;
    marketRole: string;
    balanceSummary: string;
  };
  problems: {
    title: string;
    items: string[];
  };
  transitionToNext: {
    whyNext: string;
    causeAndEffect: string;
  };
  caution: string;
  teacherTip: string;
}

export type EconomicSystemType = 'market' | 'planned' | 'mixed';

export interface EconomicSystemDetails {
  id: EconomicSystemType;
  name: string;
  colorName: string;
  themeColor: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  summary: string;
  resourceAllocation: string;
  economicActivity: string;
  meansOfProduction: string;
  roleOfGovernment: string;
  economicIncentive: string;
  advantages: string[];
  limitations: string[];
  vitalCaveat: string;
  teacherNote: string;
}

export interface LabScenario {
  id: string;
  title: string;
  situation: string;
  contextKicker: string;
  responses: {
    market: {
      mechanism: string;
      outcome: string;
      evaluation: string;
    };
    planned: {
      mechanism: string;
      outcome: string;
      evaluation: string;
    };
    mixed: {
      mechanism: string;
      outcome: string;
      evaluation: string;
    };
  };
  pedagogicalTakeaway: string;
}

export interface MatrixRow {
  id: string;
  category: string;
  marketValue: string;
  plannedValue: string;
  mixedValue: string;
  keyExamCheck: string;
}

export type QuizCategory = 
  | '자본주의의 의미와 특징'
  | '역사적 전개'
  | '주요 경제사상가'
  | '경제체제 비교'
  | '혼합 경제체제'
  | '정부와 시장의 역할';

export interface QuizQuestion {
  id: number;
  category: QuizCategory;
  question: string;
  correctAnswer: boolean; // true = O, false = X
  explanation: string;
  wrongStatementCorrection?: {
    originalWrongPart: string;
    correctedStatement: string;
  };
  misconceptionAlert: string;
  examTip: string;
}

export interface TeacherSettings {
  teacherNotesVisible: boolean;
  highlightKeyTerms: boolean;
  skipAnimations: boolean;
  stepRevealed: number; // For progressive disclosure
  maxSteps: number;
}
