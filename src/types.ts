export type Language = 'en' | 'ar';

export type UserRole = 'ProductOwner' | 'ScrumMaster' | 'Teacher' | 'Employer';

export interface Sprint {
  id: string;
  nameEn: string;
  nameAr: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isCompleted: boolean;
}

export type TaskStatus = 'todo' | 'inprogress' | 'review' | 'done';

export interface Task {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  sprintId: string; // "backlog" or a specific sprint id
  status: TaskStatus;
  assigneeEn: string;
  assigneeAr: string;
  assigneeRole: 'Teacher' | 'ScrumMaster' | 'ProductOwner';
  categoryEn: string;
  categoryAr: string;
  dodChecked: string[]; // List of DoD requirement keys checked
}

export interface Impediment {
  id: string;
  titleEn: string;
  titleAr: string;
  raisedByEn: string;
  raisedByAr: string;
  severity: 'low' | 'medium' | 'high';
  dateRaised: string;
  resolved: boolean;
  resolutionEn?: string;
  resolutionAr?: string;
}

export type ResourceStatus = 'Draft' | 'Reviewed' | 'Approved' | 'Published';

export interface DictionaryItem {
  termEn: string;
  termAr: string;
  definitionEn: string;
  definitionAr: string;
}

export interface BilingualResource {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: 'Lesson Plan' | 'Worksheet' | 'Activity' | 'Exam Prep' | 'Glossary';
  categoryAr: 'خطة درس' | 'ورقة عمل' | 'نشاط' | 'تحضير اختبار' | 'مسرد مصطلحات';
  gradeEn: string;
  gradeAr: string;
  subjectEn: string;
  subjectAr: string;
  descriptionEn: string;
  descriptionAr: string;
  uploaderEn: string;
  uploaderAr: string;
  status: ResourceStatus;
  dateAdded: string;
  fileSize: string;
  keyTerminology: DictionaryItem[];
}

export interface StandupLog {
  id: string;
  date: string;
  teacherEn: string;
  teacherAr: string;
  didYesterdayEn: string;
  didYesterdayAr: string;
  willDoTodayEn: string;
  willDoTodayAr: string;
  obstaclesEn: string;
  obstaclesAr: string;
}

export interface DoDRequirement {
  id: string;
  labelEn: string;
  labelAr: string;
}
