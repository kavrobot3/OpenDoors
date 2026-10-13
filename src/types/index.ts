export interface University {
  id: string;
  name: string;
  location: string;
  country: string;
  field?: 'engineering' | 'medicine' | 'law' | 'management' | 'sciences' | 'humanities' | string;
  rankBadge: string;
  badgeType?: 'nirf' | 'qs' | 'special';
  entryBenchmark: string;
  costReality: string;
  costCategory?: 'public' | 'nominal' | 'free' | 'private' | 'aid';
  editorialObservation?: string;
  livingExpenseAlert?: string;
  careerYield?: string;
  clinicalVolume?: string;
  officialPortal: string;
  admissionsEmail: string;
  image?: string;
  specialtyTag?: string;
  auditedDate?: string;
  isAiEstimate?: boolean;
  aiProvider?: string;
  aiModelUsed?: string;
  sourceRow?: string | number;
  alphaTwoCode?: string;
  stateProvince?: string;
  domains?: string[];
}

export interface StudentDilemma {
  id: string;
  studentName: string;
  email: string;
  phone?: string;
  stream: string;
  boardState: string;
  dilemma: string;
  strictFeeConstraints: boolean;
  createdAt: string;
  status: 'received' | 'reviewing' | 'answered';
  destination: 'supabase' | 'local_fallback' | 'firebase';
}

export interface TopologyNode {
  id: number;
  title: string;
  tag: string;
  tagClass: string;
  shortDesc: string;
  fullDesc: string;
  exitMetric: string;
  prerequisites: string[];
  risks: string;
}

export type DeviceMode = 'auto' | 'desktop' | 'mobile';
export type ActiveTab = 'pathways' | 'universities' | 'ask-us' | 'exam-resources' | 'about' | 'saved' | 'folio' | 'correction-report';
