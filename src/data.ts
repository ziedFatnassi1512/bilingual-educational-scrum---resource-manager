import { 
  Sprint, 
  Task, 
  Impediment, 
  BilingualResource, 
  StandupLog, 
  DoDRequirement 
} from './types';

export const DOD_REQUIREMENTS: DoDRequirement[] = [
  { id: 'signed', labelEn: 'Signed & approved by Coordinator', labelAr: 'الخطة موقعة ومعتمدة من المنسق' },
  { id: 'uploaded', labelEn: 'Uploaded to MS Teams / Portal', labelAr: 'مرفوعة على Teams أو لوحة البوابة التعليمية' },
  { id: 'bilingual', labelEn: 'Bilingual terminology matched', labelAr: 'تطابق كامل للمصطلحات العلمية ثنائية اللغة' },
  { id: 'objectives', labelEn: 'Contains measurable & SMART goals', labelAr: 'يحتوي على أهداف ذكية وقابلة للقياس' },
  { id: 'reviewed', labelEn: 'Free of spelling & editorial errors', labelAr: 'خالٍ تماماً من الأخطاء اللغوية والإملائية' }
];

export const INITIAL_SPRINTS: Sprint[] = [
  {
    id: 'sprint-1',
    nameEn: 'Sprint 1: Semester Kickstarter',
    nameAr: 'السباق 1: انطلاقة الفصل الدراسي الأول',
    startDate: '2026-05-10',
    endDate: '2026-05-24',
    isActive: false,
    isCompleted: true
  },
  {
    id: 'sprint-2',
    nameEn: 'Sprint 2: Midterm Prep & Review',
    nameAr: 'السباق 2: التحضير للاختبارات النصفية والمراجعة',
    startDate: '2026-05-25',
    endDate: '2026-06-08',
    isActive: true,
    isCompleted: false
  },
  {
    id: 'sprint-3',
    nameEn: 'Sprint 3: Finals & Reports Delivery',
    nameAr: 'السباق 3: الاختبارات النهائية وتسليم التقارير',
    startDate: '2026-06-09',
    endDate: '2026-06-23',
    isActive: false,
    isCompleted: false
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    titleEn: 'Draft Grade 5 Math Lesson: Fractions & Decimals',
    titleAr: 'صياغة خطة درس رياضيات الصف الخامس: الكسور والعشريات',
    descriptionEn: 'Formulate explanations and design active learning worksheets for fractions.',
    descriptionAr: 'كتابة أهداف الدرس، وتصميم أوراق النشاط لشرح تحويل الكسور العادية إلى عشرية.',
    sprintId: 'sprint-2',
    status: 'inprogress',
    assigneeEn: 'Sarah Al-Mansoori',
    assigneeAr: 'سارة المنصوري',
    assigneeRole: 'Teacher',
    categoryEn: 'Lesson Plan',
    categoryAr: 'خطة درس',
    dodChecked: ['objectives', 'bilingual']
  },
  {
    id: 'task-2',
    titleEn: 'Science Bilingual Vocabulary Review: Grade 8',
    titleAr: 'ورقة عمل ومراجعة مصطلحات العلوم للصف الثامن',
    descriptionEn: 'Translate terms for energy transformations and heat transfer.',
    descriptionAr: 'ترجمة ومواءمة مصطلحات تحولات الطاقة وانتقال الحرارة مع أمثلة سياقية باللغتين.',
    sprintId: 'sprint-2',
    status: 'review',
    assigneeEn: 'Ahmad Al-Harbi',
    assigneeAr: 'أحمد الحربي',
    assigneeRole: 'Teacher',
    categoryEn: 'Worksheet',
    categoryAr: 'ورقة عمل',
    dodChecked: ['uploaded', 'bilingual', 'objectives']
  },
  {
    id: 'task-3',
    titleEn: 'Record Grade 10 Physics Video Explanation: Momentum',
    titleAr: 'تسجيل فيديو مراجعة فيزياء الصف العاشر: الزخم وقوانين التصادم',
    descriptionEn: 'Record a bilingual mini-lecture summary matching the curriculum timeline.',
    descriptionAr: 'تسجيل شرح مصور ثنائي اللغة ملخص لقوانين الزخم والتصادم المرن لمرفقات المنهج.',
    sprintId: 'sprint-2',
    status: 'todo',
    assigneeEn: 'John Doe',
    assigneeAr: 'جون دو',
    assigneeRole: 'Teacher',
    categoryEn: 'Activity',
    categoryAr: 'نشاط',
    dodChecked: []
  },
  {
    id: 'task-4',
    titleEn: 'Coordinators Bi-weekly Progress Reporting',
    titleAr: 'تجهيز التقرير ثنائي الأسبوعي لمستوى الإنجاز الأكاديمي',
    descriptionEn: 'Synthesize velocity charts and resource statuses for the Academic Principal.',
    descriptionAr: 'تجميع بيانات سرعة الفريق وحالة جاهزية الموارد لتقديمها للنائب الأكاديمي.',
    sprintId: 'sprint-2',
    status: 'inprogress',
    assigneeEn: 'Fatima Al-Kamali',
    assigneeAr: 'فاطمة الكمالي',
    assigneeRole: 'ScrumMaster',
    categoryEn: 'Glossary',
    categoryAr: 'مسرد مصطلحات',
    dodChecked: ['signed']
  },
  {
    id: 'task-5',
    titleEn: 'Bilingual Grade 12 Advanced Chemistry Exam Blueprint',
    titleAr: 'جدول مواصفات اختبار الكيمياء المتقدمة التجريبي للصف الثاني عشر',
    descriptionEn: 'Aligning test questions with MOE standards in Arabic and English.',
    descriptionAr: 'مطابقة وتأطير بنود الاختبار مع معايير الوزارة باللغتين لضمان التجانس الكامل.',
    sprintId: 'sprint-1',
    status: 'done',
    assigneeEn: 'Ahmad Al-Harbi',
    assigneeAr: 'أحمد الحربي',
    assigneeRole: 'Teacher',
    categoryEn: 'Exam Prep',
    categoryAr: 'تحضير اختبار',
    dodChecked: ['signed', 'uploaded', 'bilingual', 'objectives', 'reviewed']
  }
];

export const INITIAL_IMPEDIMENTS: Impediment[] = [
  {
    id: 'imp-1',
    titleEn: 'Weak School Lab Internet delays Teams resource uploads',
    titleAr: 'ضعف الإنترنت في معمل المدرسة يعوق رفع الموارد الثنائية على Teams',
    raisedByEn: 'Sarah Al-Mansoori',
    raisedByAr: 'سارة المنصوري',
    severity: 'high',
    dateRaised: '2026-05-26',
    resolved: false
  },
  {
    id: 'imp-2',
    titleEn: 'Delay in exporting Student Performance summaries from central database',
    titleAr: 'تأخر سحب تقارير الأداء الفصلي للطلاب من قاعدة البيانات الموحدة',
    raisedByEn: 'Fatima Al-Kamali',
    raisedByAr: 'فاطمة الكمالي',
    severity: 'medium',
    dateRaised: '2026-05-20',
    resolved: true,
    resolutionEn: 'Obtained temporary offline Excel extracts directly from registry supervisor.',
    resolutionAr: 'تم التنسيق مع مشرف التسجيل وإرسال ملخصات Excel مؤقتة لحين عودة النظام.'
  }
];

export const INITIAL_RESOURCES: BilingualResource[] = [
  {
    id: 'res-1',
    titleEn: 'Bilingual Mathematics Toolkit: Fractions',
    titleAr: 'حقيبة الرياضيات ثنائية اللغة: الكسور العادية والعشرية',
    categoryEn: 'Lesson Plan',
    categoryAr: 'خطة درس',
    gradeEn: 'Grade 5',
    gradeAr: 'الصف الخامس',
    subjectEn: 'Mathematics',
    subjectAr: 'الرياضيات',
    descriptionEn: 'Comprehensive lesson roadmap integrating step-by-step translation structures for fractional parts.',
    descriptionAr: 'خريطة طريق متكاملة لتأسيس الكسور وتحويلاتها ثنائية اللغة مع أنشطة تطبيقية غامرة للطلاب.',
    uploaderEn: 'Sarah Al-Mansoori',
    uploaderAr: 'سارة المنصوري',
    status: 'Approved',
    dateAdded: '2026-05-23',
    fileSize: '1.4 MB',
    keyTerminology: [
      {
        termEn: 'Numerator',
        termAr: 'البسط',
        definitionEn: 'The upper part of a fraction indicating the number of parts taken.',
        definitionAr: 'الجزء العلوي من الكسر المعبر عن عدد الأجزاء المأخوذة أو المحددة.'
      },
      {
        termEn: 'Denominator',
        termAr: 'المقام',
        definitionEn: 'The bottom part of a fraction representing the total parts in a whole.',
        definitionAr: 'الجزء السفلي من الكسر المعبر عن العدد الإجمالي للأجزاء التي يتألف منها الكل.'
      },
      {
        termEn: 'Decimal Point',
        termAr: 'الفاصلة العشرية',
        definitionEn: 'The dot separating whole numbers from their smaller fractional components.',
        definitionAr: 'العلامة الفاصلة المستعملة لفصل الآحاد عن الأجزاء العشرية في النظام العشري.'
      }
    ]
  },
  {
    id: 'res-2',
    titleEn: 'Bilingual Biology Worksheet: Photosynthesis & Plants',
    titleAr: 'ورقة عمل علم الأحياء ثنائية اللغة: البناء الضوئي والطاقة النباتية',
    categoryEn: 'Worksheet',
    categoryAr: 'ورقة عمل',
    gradeEn: 'Grade 8',
    gradeAr: 'الصف الثامن',
    subjectEn: 'Biology',
    subjectAr: 'الأحياء',
    descriptionEn: 'Interactive diagram worksheet for chlorophyll absorption with English & Arabic translations.',
    descriptionAr: 'ورقة عمل تفاعلية لشرح امتصاص الكلوروفيل للضوء وتصنيع الغذاء بنسخة مطابقة باللغتين.',
    uploaderEn: 'Ahmad Al-Harbi',
    uploaderAr: 'أحمد الحربي',
    status: 'Published',
    dateAdded: '2026-05-26',
    fileSize: '2.1 MB',
    keyTerminology: [
      {
        termEn: 'Photosynthesis',
        termAr: 'البناء الضوئي / التمثيل الضوئي',
        definitionEn: 'Process by which green plants use sunlight to synthesize nutrients.',
        definitionAr: 'العملية التي تستخدم بها النباتات الخضراء ضوء الشمس لصنع الغذاء الكربوهيدراتي.'
      },
      {
        termEn: 'Chlorophyll',
        termAr: 'اليخضور / الكلوروفيل',
        definitionEn: 'Green pigment responsible for light absorption in plants.',
        definitionAr: 'الصبغة الخضراء المتواجدة داخل الصانعات الصخرية والمسؤولة عن التقاط الطاقة الضوئية.'
      }
    ]
  },
  {
    id: 'res-3',
    titleEn: 'Bilingual Chemistry Exam Review Sheet',
    titleAr: 'مذكرة مراجعة الكيمياء المتقدمة للاختبار الفصلي الموحد',
    categoryEn: 'Exam Prep',
    categoryAr: 'تحضير اختبار',
    gradeEn: 'Grade 12',
    gradeAr: 'الصف الثاني عشر',
    subjectEn: 'Chemistry',
    subjectAr: 'الكيمياء',
    descriptionEn: 'Standard exam-style questions aligned to ministry blueprint with side-by-side glossary definitions.',
    descriptionAr: 'نماذج اختبارات تفصيلية متطابقة باللغتين متوافقة مع معايير وزارة التربية لطلاب المسار المتقدم.',
    uploaderEn: 'Ahmad Al-Harbi',
    uploaderAr: 'أحمد الحربي',
    status: 'Published',
    dateAdded: '2026-05-18',
    fileSize: '4.8 MB',
    keyTerminology: [
      {
        termEn: 'Catalytic Converter',
        termAr: 'المحول الحفّاز / مرشح العادم',
        definitionEn: 'Device that alters harmful exhaust gases into less destructive output.',
        definitionAr: 'جهاز يحول المكونات السامة لغازات العوادم المنبعثة من الاحتراق إلى نواتج آمنة.'
      },
      {
        termEn: 'Exothermic Reaction',
        termAr: 'تفاعل طارد للحرارة',
        definitionEn: 'A chemical cycle releasing thermal or radiant energy to its surroundings.',
        definitionAr: 'التفاعل الكيميائي المصحوب بانبعاث طاقة حرارية أو إشعاعية إلى الوسط الخارجي المحيط.'
      }
    ]
  }
];

export const INITIAL_STANDUPS: StandupLog[] = [
  {
    id: 'log-1',
    date: '2026-05-27',
    teacherEn: 'Sarah Al-Mansoori',
    teacherAr: 'سارة المنصوري',
    didYesterdayEn: 'Drafted lesson roadmap on Fractions & Decimals for Class 5.',
    didYesterdayAr: 'صغْتُ مخطط درس الرياضيات المتعلق بالكسور لطلاب الصف الخامس.',
    willDoTodayEn: 'Integrate bilingual mathematical terminology and map to MS Teams folder.',
    willDoTodayAr: 'إضافة ومواءمة المصطلحات الرياضية باللغتين ونقلها لمجلد Teams.',
    obstaclesEn: 'Unstable internet is hindering fast document sharing on the central school portal.',
    obstaclesAr: 'ضعف شبكة الإنترنت المدرسية يبطئ عمليات مشاركة الملفات ونماذج التقييم الجماعي.'
  },
  {
    id: 'log-2',
    date: '2026-05-28',
    teacherEn: 'Ahmad Al-Harbi',
    teacherAr: 'أحمد الحربي',
    didYesterdayEn: 'Finalized energy transfer diagrams translation checklist.',
    didYesterdayAr: 'أنهيتُ إعداد وتدقيق ترجمة مخططات ورقة عمل تحولات الطاقة للصف الثامن.',
    willDoTodayEn: 'Structure simulated test answers for Grade 12 Advanced chemistry blueprint.',
    willDoTodayAr: 'شغل أجهزة محاكاة الاختبار التجريبي للصف الثاني عشر لمراجعة الكيمياء المتقدمة.',
    obstaclesEn: 'None. Smooth progress is achieved so far.',
    obstaclesAr: 'لا توجد معوقات، تسير الأنشطة المجدولة بمرونة تامة.'
  }
];

// Scrum Glossary Content translated perfectly from User request.
export interface ScrumGlossarySection {
  categoryEn: string;
  categoryAr: string;
  items: {
    termEn: string;
    termAr: string;
    defEn: string;
    defAr: string;
    schoolScopeEn: string;
    schoolScopeAr: string;
  }[];
}

export const SCRUM_GLOSSARY: ScrumGlossarySection[] = [
  {
    categoryEn: 'Core Roles (Who are they?)',
    categoryAr: 'أدوار Scrum (من هم؟ وماذا يفعلون؟)',
    items: [
      {
        termEn: 'Product Owner',
        termAr: 'Product Owner (صاحب المنتج)',
        defEn: 'The representative who prioritizes the backlog and defines goals. They accept or decline final works.',
        defAr: 'الشخص الذي يحدد الأولويات ويقول للفريق "ما المهم أولاً؟" ويقبل العمل النهائي أو يرفضه.',
        schoolScopeEn: 'School Principal or Academic Director (e.g. coordinates lesson timelines and quality audits).',
        schoolScopeAr: 'مدير المدرسة / النائب الأكاديمي'
      },
      {
        termEn: 'Scrum Master',
        termAr: 'Scrum Master (قائد السكرام)',
        defEn: 'A servant-leader who facilitates workflows, shields the team, removes blockers, and sustains agile standards.',
        defAr: 'الشخص الذي يُسهل العمل ويزيل العوائق، وليس "مديراً" بالمعنى التقليدي. دوره التيسير والخدمة.',
        schoolScopeEn: 'Subject Coordinator or Level Team Head (e.g. helps teachers resolve training or IT challenges).',
        schoolScopeAr: 'منسق المادة / رئيس فريق المستوى الدراسي'
      },
      {
        termEn: 'Development Team',
        termAr: 'Development Team (فريق التطوير)',
        defEn: 'The cross-functional specialists who execute the product increments directly.',
        defAr: 'مجموعة الأشخاص الذين ينفذون المهام فعلياً (تخطيط الدروس، التدريس، وصناعة الموارد).',
        schoolScopeEn: 'Active Classroom Teachers (collaborating on worksheets, assignments & translation directories).',
        schoolScopeAr: 'المعلمون القائمون بالتدريس والتحضير الفعلي'
      },
      {
        termEn: 'Stakeholders',
        termAr: 'Stakeholders (الأطراف المعنية)',
        defEn: 'All external entities interested in outcomes and offering valuable feedback.',
        defAr: 'كل من يهتم بالنتيجة النهائية ويقدم ملاحظات أو يدعم، للتأكد من موافقة السياسات.',
        schoolScopeEn: 'Evaluation Department, Educational Supervisors, Ministry Advisors, and Parents.',
        schoolScopeAr: 'إدارة التقييم، التوجيه التربوي، أولياء الأمور أو المفتشون'
      }
    ]
  },
  {
    categoryEn: 'Events (Structured Meetings)',
    categoryAr: 'أحداث Scrum (الاجتماعات الدورية)',
    items: [
      {
        termEn: 'Sprint',
        termAr: 'Sprint (السباق / الدورة الزمنية)',
        defEn: 'A fixed, short cycle (e.g. 2 weeks) where a specific subset of educational resources is finalized.',
        defAr: 'فترة زمنية قصيرة وثابتة يتم خلالها إنجاز مجموعة محددة من المهام المتفق عليها مسبقاً طوال العام الدراسي.',
        schoolScopeEn: '2-Week cycle containing lesson roadmap generation, teacher review sessions, and backup staging.',
        schoolScopeAr: 'أسبوعان - وتتكرر طوال العام بانتظام'
      },
      {
        termEn: 'Sprint Planning',
        termAr: 'Sprint Planning (اجتماع التخطيط للسباق)',
        defEn: 'Inception meeting to pick priority items from the backlog, break down into tasks, and establish commitments.',
        defAr: 'اجتماع في بداية كل Sprint لتحديد: ما الذي سننجزه في الأسبوعين القادمين؟ ومن سينفذ ماذا؟',
        schoolScopeEn: '30-60 Minutes session to delegate upcoming bilingual term collections & assessment setups.',
        schoolScopeAr: '30 إلى 60 دقيقة في بداية کل سباق'
      },
      {
        termEn: 'Daily Stand-up',
        termAr: 'Daily Stand-up (الوقفة اليومية السريعة)',
        defEn: 'A ultra-focused 5-10 minute meeting while standing to monitor velocity, outline today\'s agenda, and flag blockers.',
        defAr: 'اجتماع قصير جداً يومياً، واقفين للحفاظ على نسبة عالية من التركيز وللإجابة على الأسئلة الثلاثة الأساسية.',
        schoolScopeEn: 'Morning briefing before the first classroom shift. Each teacher names yesterdays work, todays focus, and internet blocks.',
        schoolScopeAr: '5 إلى 10 دقائق صباحاً بصفة يومية سريعة'
      },
      {
        termEn: 'Sprint Review',
        termAr: 'Sprint Review (مراجعة الإنجاز والدروس المستفادة)',
        defEn: 'Demo of ready deliverables showcasing completed lessons, blueprints and matching bilingual dictionaries to the Product Owner.',
        defAr: 'اجتماع في نهاية كل Sprint لعرض ما تم إنجازه وصناعته على Product Owner لتقييمه وأخذ ملاحظاته.',
        schoolScopeEn: 'Meeting with Academic VP on Friday to audit the uploaded documents quality score.',
        schoolScopeAr: '30 إلى 60 دقيقة في نهاية كل سباق'
      },
      {
        termEn: 'Sprint Retrospective',
        termAr: 'Sprint Retrospective (اجتماع التحسين والتأمل الذاتي)',
        defEn: 'Inner-team meeting of Scrum Master and teachers to evaluate internal pipeline dynamics and commit to 1-2 upgrades.',
        defAr: 'اجتماع التنسيق المغلق لمناقشة: ما الذي سار بشكل جيد بمصلحتنا؟ وكيف نحسن كفاءتنا الدورة القادمة؟',
        schoolScopeEn: 'Coordinators & Teachers share techniques for translating scientific terms faster without extra burden.',
        schoolScopeAr: '30-60 دقيقة، مع استبعاد الإدارة لضمان المكاشفة والصدق'
      }
    ]
  },
  {
    categoryEn: 'Artifacts & Key Metrics',
    categoryAr: 'أدوات وقطع وعناصر Scrum الأخرى',
    items: [
      {
        termEn: 'Product Backlog',
        termAr: 'Backlog (قائمة الانتظار الشاملة)',
        defEn: 'The full priority-ordered roster of required milestones to produce during the academic term.',
        defAr: 'قائمة بكل المهام والأوراق والأنشطة المطلوب إنجازها في المدرسة مرتبة تنازلياً حسب الألوية والحاجة.',
        schoolScopeEn: 'School Planner Excel list containing: "Design worksheets, peer observations, exam validation".',
        schoolScopeAr: 'جدول تحضير المهام الشامل لكل مادة على Teams'
      },
      {
        termEn: 'Sprint Backlog',
        termAr: 'Sprint Backlog (قائمة مهام السباق الحالي)',
        defEn: 'The subset of high-priority backlog tasks selected for completion within the active Sprint boundary.',
        defAr: 'المهام التي تم اختيارها من قائمة الانتظار للتركيز عليها وإنجازها بالكامل في غضون الـ Sprint الحالي.',
        schoolScopeEn: 'e.g., "Maths Grade 5 Fractions plan + Chemistry Grade 12 review sheet" during this fortnight.',
        schoolScopeAr: 'مجلد المهام للأسبوعين الحاليين في ميكروسوفت Teams'
      },
      {
        termEn: 'Definition of Done (DoD)',
        termAr: 'Definition of Done - DoD (معيار الإنجاز المتكامل)',
        defEn: 'The pre-agreed strict quality filters which must all be checked before any task is certified as complete.',
        defAr: 'قائمة شروط محددة مسبقاً بجودة العمل يجب توفرها حتى نعتبر المهمة منتهية وليس نصف جاهزة.',
        schoolScopeEn: 'Checklist: "Bilingual terms verified, lessons signed, folder backup completed on portal".',
        schoolScopeAr: 'معيار: الخطة موقعة، مرفوعة، ثنائية اللغة، خالية من الأخطاء'
      },
      {
        termEn: 'Impediment',
        termAr: 'Impediment (العائق أو العقبة المانعة)',
        defEn: 'Any blocker hindering a teacher from achieving optimal sprint progression that needs Scrum Master action.',
        defAr: 'أي شيء يحول بين المعلم وبين إتمام مهمته بكفاءة ويحتاج لتدخل فوري لتسهيله.',
        schoolScopeEn: 'Examples: Portal login failures, lack of printer toners, delayed guidelines from MOE.',
        schoolScopeAr: 'الشبكة معطلة، تأخر استلام درجات نور، نقص الأقلام المقررة'
      },
      {
        termEn: 'Velocity',
        termAr: 'Velocity (سرعة ومعدل إنتاجية الفريق)',
        defEn: 'The measure of work an agile team completes in a full sprint, used to gauge upcoming cycle bandwidth.',
        defAr: 'متوسط المهام التي يستطيع المعلمون إنجازها وتمرير شروط DoD في السباق المنقضي.',
        schoolScopeEn: 'Enables the Academic Coordinator to predict whether 8 lessons can be mapped for the next fortnight.',
        schoolScopeAr: 'سعة الفريق للتوقع الدقيق لحجم التحضيرات دون التسبب في إجهاد المعلمين'
      }
    ]
  }
];
