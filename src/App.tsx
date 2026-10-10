import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, BookOpen, CalendarRange, Users, CheckCircle, 
  AlertTriangle, ClipboardList, Info, Award, UserCheck 
} from 'lucide-react';

import { 
  Language, UserRole, Sprint, Task, Impediment, 
  BilingualResource, StandupLog, TaskStatus 
} from './types';

import { 
  INITIAL_RESOURCES, INITIAL_TASKS, INITIAL_SPRINTS, 
  INITIAL_IMPEDIMENTS, INITIAL_STANDUPS 
} from './data';

import LanguageToggle from './components/LanguageToggle';
import ResourceRepo from './components/ResourceRepo';
import SprintPlanner from './components/SprintPlanner';
import ScrumGuide from './components/ScrumGuide';

export default function App() {
  // Persistence-enabled States
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('scrum-edu-lang') as Language) || 'ar';
  });

  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    return (localStorage.getItem('scrum-edu-role') as UserRole) || 'Teacher';
  });

  const [activeTab, setActiveTab] = useState<'sprint' | 'resources' | 'guide'>(() => {
    return (localStorage.getItem('scrum-edu-tab') as 'sprint' | 'resources' | 'guide') || 'sprint';
  });

  const [resources, setResources] = useState<BilingualResource[]>(() => {
    const cached = localStorage.getItem('scrum-edu-resources');
    return cached ? JSON.parse(cached) : INITIAL_RESOURCES;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const cached = localStorage.getItem('scrum-edu-tasks');
    return cached ? JSON.parse(cached) : INITIAL_TASKS;
  });

  const [sprints, setSprints] = useState<Sprint[]>(() => {
    const cached = localStorage.getItem('scrum-edu-sprints');
    return cached ? JSON.parse(cached) : INITIAL_SPRINTS;
  });

  const [impediments, setImpediments] = useState<Impediment[]>(() => {
    const cached = localStorage.getItem('scrum-edu-impediments');
    return cached ? JSON.parse(cached) : INITIAL_IMPEDIMENTS;
  });

  const [standups, setStandups] = useState<StandupLog[]>(() => {
    const cached = localStorage.getItem('scrum-edu-standups');
    return cached ? JSON.parse(cached) : INITIAL_STANDUPS;
  });

  // Effects syncing states with localStorage
  useEffect(() => {
    localStorage.setItem('scrum-edu-lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('scrum-edu-role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('scrum-edu-tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('scrum-edu-resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('scrum-edu-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('scrum-edu-sprints', JSON.stringify(sprints));
  }, [sprints]);

  useEffect(() => {
    localStorage.setItem('scrum-edu-impediments', JSON.stringify(impediments));
  }, [impediments]);

  useEffect(() => {
    localStorage.setItem('scrum-edu-standups', JSON.stringify(standups));
  }, [standups]);

  // Handler Actions
  const handleAddResource = (newRes: BilingualResource) => {
    setResources([newRes, ...resources]);
  };

  const handleDeleteResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const handleUpdateTaskDoD = (taskId: string, dodChecked: string[]) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, dodChecked } : t));
  };

  const handleAddTask = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
  };

  const handleAddImpediment = (newImp: Impediment) => {
    setImpediments([newImp, ...impediments]);
  };

  const handleResolveImpediment = (impId: string, resEn: string, resAr: string) => {
    setImpediments(impediments.map(i => i.id === impId ? {
      ...i,
      resolved: true,
      resolutionEn: resEn,
      resolutionAr: resAr
    } : i));
  };

  const handleAddStandup = (newLog: StandupLog) => {
    setStandups([newLog, ...standups]);
  };

  const handleStartSprint = (sprintId: string) => {
    setSprints(sprints.map(s => {
      if (s.id === sprintId) return { ...s, isActive: true };
      if (s.isActive) return { ...s, isActive: false, isCompleted: true };
      return s;
    }));
  };

  const handleCompleteSprint = (sprintId: string) => {
    setSprints(sprints.map(s => s.id === sprintId ? { ...s, isActive: false, isCompleted: true } : s));
  };

  const isAr = language === 'ar';

  // Informative role banners depending on vantage perspective
  const roleHelpText = {
    Teacher: {
      en: 'Primary Role: Develop and review bilingual educational resources. Use this view to pick tasks, complete "Definition of Done" items, and submit daily stand-ups.',
      ar: 'دورك الأساسي: إعداد المناهج وتحضير الدروس ومطابقة المفاهيم باللغتين. استخدم اللوحة لإنجاز المهام، وتأصيل معايير الإنجاز DoD، ورفع وقفتك اليومية.'
    },
    ScrumMaster: {
      en: 'Facilitator Role: Monitor team velocity, clear impediments raised by teachers, and conduct the retrospective process.',
      ar: 'دور الميسِّر والمنسِّق: دورك يتمحور حول تفكيك العقبات وتسهيل عمل الزملاء المعلمين، ومتابعة سرعة ومؤشرات الجاهزية دون التسبب في أعباء روتينية.'
    },
    ProductOwner: {
      en: 'Quality Owner Role: Oversee final lesson approvals, specify grade priorities, and audit completed resources before ministry submissions.',
      ar: 'صاحب القرار والجودة: مدير ونائب المدرسة الأكاديمي. دورك هو ترتيب الأولويات في قائمة الانتظار، وتقييم المخرجات النهائية قبل تعميمها للتدريس.'
    },
    Employer: {
      en: 'Stakeholder Role: Visualizes ready-made bilingual worksheets and lesson plan completion graphs to evaluate current institution readiness.',
      ar: 'المستفيد والشريك المعني: متابعة سرعة وكفاءة العمل المدرسي، تقييم مدى مطابقة تحضير المدرسين للمقاييس التعليمية لتسهيل دعم الميزانيات والخطط.'
    }
  };

  return (
    <div 
      className="min-h-screen bg-slate-50 flex flex-col font-sans" 
      dir={isAr ? 'rtl' : 'ltr'}
      id="main-app-shell"
    >
      {/* Visual Navigation Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-2.5 rounded-xl shadow-md flex items-center justify-center shrink-0">
              <Layers className="h-5.5 w-5.5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                {isAr ? 'منصة سكرام للموارد التعليمية في المدارس' : 'Bilingual Agile Scrum School Planner'}
              </h1>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                {isAr ? 'مستودع التحضير المرن ثنائي اللغة • المعلمين والإدارة' : 'Curriculum Repository & Agile Coordination Dashboard'}
              </p>
            </div>
          </div>

          {/* Interactive Navigation Control Menu */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* View Role Simulator selector */}
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1 bg-slate-100/50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-500">
                {isAr ? 'منظور الدور:' : 'Simulation Perspective:'}
              </span>
              <select
                value={activeRole}
                onChange={(e) => setActiveRole(e.target.value as UserRole)}
                className="text-xs bg-transparent border-none text-slate-800 font-bold focus:outline-hidden py-1 cursor-pointer font-sans"
              >
                <option value="Teacher">{isAr ? 'المعلّم (فريق التطوير)' : 'Teacher (Dev Team)'}</option>
                <option value="ScrumMaster">{isAr ? 'منسق المادة (Scrum Master)' : 'Coordinator (Scrum Master)'}</option>
                <option value="ProductOwner">{isAr ? 'النائب الأكاديمي (Product Owner)' : 'VP Academic (Product Owner)'}</option>
                <option value="Employer">{isAr ? 'الإدارة العامة والمقرضين' : 'Sponsor / Employer'}</option>
              </select>
            </div>

            {/* Global Language Toggle Component */}
            <LanguageToggle 
              currentLanguage={language} 
              onLanguageChange={setLanguage} 
            />
          </div>
        </div>
      </header>

      {/* Main Workspace content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Helper Assist alert box depending on selected Simulated perspective */}
        <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 flex gap-3 items-center">
          <div className="p-2 bg-white rounded-lg border border-indigo-200">
            <UserCheck className="h-5 w-5 text-indigo-700" />
          </div>
          <div className="text-xs text-indigo-950 font-medium">
            <span className="font-bold uppercase drop-shadow-xs block mb-0.5">
              💡 {isAr ? 'إرشادات مواءمة الحساب ومستوى الصلاحية:' : 'Role-Specific Playbook Guidelines:'}
            </span>
            <span>{isAr ? roleHelpText[activeRole].ar : roleHelpText[activeRole].en}</span>
          </div>
        </div>

        {/* Global Statistics Hub Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="stats-ribbon">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {isAr ? 'الموارد المعتمدة والمنشورة' : 'PUBLISHED BILINGUAL LESSONS'}
              </span>
              <span className="text-xl font-extrabold text-slate-800 block mt-1">
                {resources.filter(r => r.status === 'Published' || r.status === 'Approved').length}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold">
                {resources.filter(r => r.status === 'Draft').length} {isAr ? 'مسودات معلقة التدقيق' : 'drafts pending review'}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-indigo-600">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {isAr ? 'مستويات إنجاز الـ Sprint الحالي' : 'ACTIVE SPRINT DELIVERABLES'}
              </span>
              <span className="text-xl font-extrabold text-slate-800 block mt-1">
                {tasks.filter(t => t.status === 'done').length} / {tasks.filter(t => t.sprintId === sprints.find(s => s.isActive)?.id).length}
              </span>
              <span className="text-[10px] text-indigo-600 font-bold uppercase">
                {isAr ? 'الأكثر إلحاحاً: المناهج العلمية' : 'Velocity aligned to targets'}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-indigo-600">
              <ClipboardList className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {isAr ? 'عقبات المدرسين النشطة' : 'ACTIVE TEACHING IMPEDIMENTS'}
              </span>
              <span className="text-xl font-extrabold text-rose-600 block mt-1">
                {impediments.filter(i => !i.resolved).length}
              </span>
              <span className="text-[10px] text-slate-400">
                {impediments.filter(i => i.resolved).length} {isAr ? 'عقبات جرى حلها كلياً' : 'blockers cleared by SM'}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-rose-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {isAr ? 'مشاركات تسجيل الحضور الصباحي' : 'STAND-UPS SUBMISSIONS'}
              </span>
              <span className="text-xl font-extrabold text-slate-800 block mt-1">
                {standups.filter(s => s.date === new Date().toISOString().split('T')[0] || s.date === '2026-05-28').length}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">
                {isAr ? 'معدل اتصال المعلمين 100%' : 'All levels synced today'}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-indigo-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Major Working Mode Tabs */}
        <div className="flex border-b border-slate-200 gap-1 overflow-x-auto pb-px" id="feature-tabs-bar">
          <button
            onClick={() => setActiveTab('sprint')}
            className={`px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'sprint'
                ? 'border-indigo-650 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <CalendarRange className="h-4 w-4" />
            {isAr ? 'لوحة السبرنت والمهام (Sprint Board)' : 'Agile Sprint Board'}
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'resources'
                ? 'border-indigo-650 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            {isAr ? 'مستودع المناهج والقاموس (Bilingual Repository)' : 'Bilingual Repository'}
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-5 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'guide'
                ? 'border-indigo-650 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Info className="h-4 w-4" />
            {isAr ? 'دليل مصطلحات سكرام المبسط بالفصول' : 'Agile Scrum Glossary'}
          </button>
        </div>

        {/* Interactive Tab Containers Rendering */}
        <div id="workspace-tab-viewport">
          {activeTab === 'sprint' && (
            <SprintPlanner 
              sprints={sprints}
              tasks={tasks}
              impediments={impediments}
              standups={standups}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onUpdateTaskDoD={handleUpdateTaskDoD}
              onAddTask={handleAddTask}
              onAddImpediment={handleAddImpediment}
              onResolveImpediment={handleResolveImpediment}
              onAddStandup={handleAddStandup}
              onStartSprint={handleStartSprint}
              onCompleteSprint={handleCompleteSprint}
              language={language}
            />
          )}

          {activeTab === 'resources' && (
            <ResourceRepo
              resources={resources}
              onAddResource={handleAddResource}
              onDeleteResource={handleDeleteResource}
              language={language}
            />
          )}

          {activeTab === 'guide' && (
            <ScrumGuide 
              language={language}
            />
          )}
        </div>
      </main>

      {/* Polish footer details and standards mapping */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 mt-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>
            {isAr 
              ? '© 2026 دليل التطوير المدرسي السريع. منصة المواءمة للمناهج باللغتين العربية والإنجليزية.' 
              : '© 2026 Bilingual Agile School Planner. Standardized Ministry Quality Alignment Framework.'}
          </p>
          <div className="flex gap-4">
            <span className="text-slate-500">
              {isAr ? 'معيار الإنجاز: DoD جاهز ومثبت' : 'Definition of Done Checked & Live'}
            </span>
            <span>•</span>
            <span className="text-slate-500">
              {isAr ? 'بنية سكرام: لجان التنسيق المنهجي' : 'Bilingual Terminology Vault'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
