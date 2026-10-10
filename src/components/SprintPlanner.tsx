import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Check, Calendar, Plus, MessageSquare, AlertTriangle, 
  HelpCircle, ChevronRight, User, MoreHorizontal, CheckSquare, 
  Settings, CheckCircle, Info, RefreshCcw, Send 
} from 'lucide-react';
import { 
  Sprint, Task, Impediment, TaskStatus, StandupLog, Language, 
  DoDRequirement 
} from '../types';
import { DOD_REQUIREMENTS } from '../data';

interface SprintPlannerProps {
  sprints: Sprint[];
  tasks: Task[];
  impediments: Impediment[];
  standups: StandupLog[];
  onUpdateTaskStatus: (taskId: string, status: TaskStatus) => void;
  onUpdateTaskDoD: (taskId: string, dodChecked: string[]) => void;
  onAddTask: (task: Task) => void;
  onAddImpediment: (imp: Impediment) => void;
  onResolveImpediment: (impId: string, resolutionEn: string, resolutionAr: string) => void;
  onAddStandup: (log: StandupLog) => void;
  onStartSprint: (sprintId: string) => void;
  onCompleteSprint: (sprintId: string) => void;
  language: Language;
}

export default function SprintPlanner({
  sprints, tasks, impediments, standups,
  onUpdateTaskStatus, onUpdateTaskDoD, onAddTask,
  onAddImpediment, onResolveImpediment, onAddStandup,
  onStartSprint, onCompleteSprint, language
}: SprintPlannerProps) {
  
  const isAr = language === 'ar';

  // Active view states
  const [activeSprintId, setActiveSprintId] = useState<string>(sprints.find(s => s.isActive)?.id || sprints[0]?.id || '');
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showStandupForm, setShowStandupForm] = useState(false);
  const [showImpedimentForm, setShowImpedimentForm] = useState(false);

  // New Task form inputs
  const [taskTitleEn, setTaskTitleEn] = useState('');
  const [taskTitleAr, setTaskTitleAr] = useState('');
  const [taskDescEn, setTaskDescEn] = useState('');
  const [taskDescAr, setTaskDescAr] = useState('');
  const [taskAssigneeEn, setTaskAssigneeEn] = useState('Sarah Al-Mansoori');
  const [taskCategoryEn, setTaskCategoryEn] = useState('Lesson Plan');

  // New Standup form inputs
  const [standupAuthor, setStandupAuthor] = useState('Sarah Al-Mansoori');
  const [standupDidYEn, setStandupDidYEn] = useState('');
  const [standupDidYAr, setStandupDidYAr] = useState('');
  const [standupWillTEn, setStandupWillTEn] = useState('');
  const [standupWillTAr, setStandupWillTAr] = useState('');
  const [standupBlockEn, setStandupBlockEn] = useState('');
  const [standupBlockAr, setStandupBlockAr] = useState('');

  // New Blocker form inputs
  const [blockerTitleEn, setBlockerTitleEn] = useState('');
  const [blockerTitleAr, setBlockerTitleAr] = useState('');
  const [blockerAuthorEn, setBlockerAuthorEn] = useState('Sarah Al-Mansoori');
  const [blockerSeverity, setBlockerSeverity] = useState<'low' | 'medium' | 'high'>('medium');

  // Resolution modal helpers
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resNotesEn, setResNotesEn] = useState('');
  const [resNotesAr, setResNotesAr] = useState('');

  const activeSprint = sprints.find(s => s.id === activeSprintId);
  const activeTasks = tasks.filter(t => t.sprintId === activeSprintId);

  // Handle task addition
  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitleEn || !taskTitleAr) return;

    const catAr: Record<string, string> = {
      'Lesson Plan': 'خطة درس',
      'Worksheet': 'ورقة عمل',
      'Activity': 'نشاط',
      'Exam Prep': 'تحضير اختبار',
      'Glossary': 'مسرد مصطلحات'
    };

    const assigneeAr: Record<string, string> = {
      'Sarah Al-Mansoori': 'سارة المنصوري',
      'Ahmad Al-Harbi': 'أحمد الحربي',
      'John Doe': 'جون دو',
      'Fatima Al-Kamali': 'فاطمة الكمالي'
    };

    const newTask: Task = {
      id: 'task-' + Date.now(),
      titleEn: taskTitleEn,
      titleAr: taskTitleAr,
      descriptionEn: taskDescEn,
      descriptionAr: taskDescAr,
      sprintId: activeSprintId,
      status: 'todo',
      assigneeEn: taskAssigneeEn,
      assigneeAr: assigneeAr[taskAssigneeEn] || 'معلم مبدع',
      assigneeRole: taskAssigneeEn === 'Fatima Al-Kamali' ? 'ScrumMaster' : 'Teacher',
      categoryEn: taskCategoryEn,
      categoryAr: catAr[taskCategoryEn] || 'خطة درس',
      dodChecked: []
    };

    onAddTask(newTask);
    setTaskTitleEn('');
    setTaskTitleAr('');
    setTaskDescEn('');
    setTaskDescAr('');
    setShowAddTaskForm(false);
  };

  // Handle standup addition
  const handleAddStandupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!standupDidYEn || !standupDidYAr) return;

    const autMapAr: Record<string, string> = {
      'Sarah Al-Mansoori': 'سارة المنصوري',
      'Ahmad Al-Harbi': 'أحمد الحربي',
      'John Doe': 'جون دو',
      'Fatima Al-Kamali': 'فاطمة الكمالي'
    };

    const newLog: StandupLog = {
      id: 'log-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      teacherEn: standupAuthor,
      teacherAr: autMapAr[standupAuthor] || 'معلم مبدع',
      didYesterdayEn: standupDidYEn,
      didYesterdayAr: standupDidYAr,
      willDoTodayEn: standupWillTEn,
      willDoTodayAr: standupWillTAr,
      obstaclesEn: standupBlockEn || 'None',
      obstaclesAr: standupBlockAr || 'لا توجد'
    };

    onAddStandup(newLog);
    setStandupDidYEn('');
    setStandupDidYAr('');
    setStandupWillTEn('');
    setStandupWillTAr('');
    setStandupBlockEn('');
    setStandupBlockAr('');
    setShowStandupForm(false);
  };

  // Handle Blocker submission
  const handleAddBlockerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockerTitleEn || !blockerTitleAr) return;

    const autMapAr: Record<string, string> = {
      'Sarah Al-Mansoori': 'سارة المنصوري',
      'Ahmad Al-Harbi': 'أحمد الحربي',
      'John Doe': 'جون دو',
      'Fatima Al-Kamali': 'فاطمة الكمالي'
    };

    const newImp: Impediment = {
      id: 'imp-' + Date.now(),
      titleEn: blockerTitleEn,
      titleAr: blockerTitleAr,
      raisedByEn: blockerAuthorEn,
      raisedByAr: autMapAr[blockerAuthorEn] || 'معلم مبدع',
      severity: blockerSeverity,
      dateRaised: new Date().toISOString().split('T')[0],
      resolved: false
    };

    onAddImpediment(newImp);
    setBlockerTitleEn('');
    setBlockerTitleAr('');
    setShowImpedimentForm(false);
  };

  // Handle resolution submit
  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingId) return;

    onResolveImpediment(resolvingId, resNotesEn || 'Resolved successfully.', resNotesAr || 'تم حل العقبة وإخلاء الطريق للمعلم.');
    setResolvingId(null);
    setResNotesEn('');
    setResNotesAr('');
  };

  // Switch DoD validation item
  const handleToggleDoD = (task: Task, reqId: string) => {
    const isChecked = task.dodChecked.includes(reqId);
    const newChecked = isChecked 
      ? task.dodChecked.filter(id => id !== reqId)
      : [...task.dodChecked, reqId];
    
    onUpdateTaskDoD(task.id, newChecked);
  };

  // Kanban status cards config
  const columns: { status: TaskStatus; labelEn: string; labelAr: string; colorClass: string; barClass: string }[] = [
    { status: 'todo', labelEn: 'To Do', labelAr: 'قيد المراجعة المسبقة', colorClass: 'bg-slate-100', barClass: 'bg-slate-400' },
    { status: 'inprogress', labelEn: 'In Progress', labelAr: 'قيد التنفيذ العملي', colorClass: 'bg-indigo-50/50', barClass: 'bg-indigo-500' },
    { status: 'review', labelEn: 'In Review', labelAr: 'قيد مراجعة المنسق', colorClass: 'bg-amber-50/50', barClass: 'bg-amber-500' },
    { status: 'done', labelEn: 'Approved (Done)', labelAr: 'مكتمل ومعتمد (Done)', colorClass: 'bg-emerald-50/40', barClass: 'bg-emerald-500' }
  ];

  // Calculations
  const totalCount = activeTasks.length;
  const completedCount = activeTasks.filter(t => t.status === 'done').length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-8" id="sprint-planner-root">
      
      {/* Target Sprints navigation hub */}
      <div className="bg-white rounded-2xl border border-slate-150 p-5 shadow-xs flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Dropdown selectors for Sprints */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <span className="text-xs font-bold text-slate-500 block">
            {isAr ? 'السباق الأسبوعي النشط:' : 'Academic Sprint Target:'}
          </span>
          <div className="flex gap-2">
            {sprints.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSprintId(s.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  activeSprintId === s.id
                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {isAr ? s.nameAr : s.nameEn}
                {s.isActive && (
                  <span className={`inline-block w-2 h-2 rounded-full bg-emerald-400 ${isAr ? 'margin-right mr-1.5' : 'ml-1.5'}`} />
                )}
                {s.isCompleted && (
                  <span className={`text-[9px] uppercase px-1 py-0.2 rounded-sm bg-slate-200 text-slate-700 ${isAr ? 'mr-1' : 'ml-1'}`}>
                    {isAr ? 'منقضٍ' : 'Done'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sprint active command center */}
        {activeSprint && (
          <div className="flex flex-wrap items-center gap-2">
            {!activeSprint.isActive && !activeSprint.isCompleted && (
              <button
                onClick={() => onStartSprint(activeSprint.id)}
                className="flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2 rounded-xl border border-indigo-700 cursor-pointer shadow-xs transition-colors"
              >
                <Play className="h-3.5 w-3.5" />
                {isAr ? 'بدء هذا السباق' : 'Initiate Active Sprint'}
              </button>
            )}

            {activeSprint.isActive && (
              <button
                onClick={() => onCompleteSprint(activeSprint.id)}
                className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl border border-emerald-700 cursor-pointer shadow-xs transition-colors"
              >
                <Check className="h-3.5 w-3.5" />
                {isAr ? 'إنهاء معايير السباق' : 'Publish & Finalize Sprint'}
              </button>
            )}

            <button
              onClick={() => setShowAddTaskForm(!showAddTaskForm)}
              className="flex items-center gap-1 text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5 text-slate-500" />
              {isAr ? 'إدراج مهمة مدرسية' : 'Insert Class Task'}
            </button>
          </div>
        )}
      </div>

      {/* Target Sprint statistical panel */}
      {activeSprint && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-3xl shadow-md">
          <div>
            <span className="text-[10px] font-bold text-indigo-300 uppercase block tracking-wider">
              {isAr ? 'النطاق الزمني للسباق' : 'CURRICULUM TIMELINE'}
            </span>
            <span className="text-sm font-semibold mt-1 flex items-center gap-1">
              <Calendar className="h-4 w-4 text-slate-400" />
              {activeSprint.startDate} → {activeSprint.endDate}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold text-indigo-300 uppercase block tracking-wider">
              {isAr ? 'جاهزية الملفات المقررة' : 'FILES READINESS COMPLIANCE'}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold">{progressPercent}%</span>
              <span className="text-xs text-slate-400">({completedCount} / {totalCount} {isAr ? 'ملتمة' : 'tasks'})</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <span className="text-[10px] font-bold text-indigo-300 uppercase block tracking-wider">
              {isAr ? 'سرعة الفريق ومعدل التطوير الحالي' : 'SPRINT DEVELOPMENT VELOCITY'}
            </span>
            <div className="mt-2.5 w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent || 5}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">
              {isAr 
                ? 'متوسط كفاءة جمع الموارد مع مطابقة التوثيق المعتمد بالوزارة.' 
                : 'Aggregate readiness quotient matching central spelling, translation and verification checks.'}
            </span>
          </div>
        </div>
      )}

      {/* Add Task Sub-Form */}
      <AnimatePresence>
        {showAddTaskForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border border-dashed border-slate-300 p-5 overflow-hidden shadow-xs"
          >
            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <h4 className="font-bold text-sm text-slate-800">
                {isAr ? 'إدراج مهمة تحضيرية للسباق الأسبوعي' : 'Integrate a New Task for this Fortnight'}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">{isAr ? 'اسم العمل (English)' : 'Task Title (English)'}</label>
                  <input
                    type="text" required value={taskTitleEn} onChange={(e) => setTaskTitleEn(e.target.value)}
                    placeholder="e.g. Translate Physics worksheet parts"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block text-right">{isAr ? 'عنونة العمل بالعربية *' : 'Task Title (Arabic)'}</label>
                  <input
                    type="text" required value={taskTitleAr} onChange={(e) => setTaskTitleAr(e.target.value)}
                    placeholder="مثال: ترجمة مصطلحات الفيزياء لأولياء الأمور"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-right"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">{isAr ? 'المعلم المسؤول' : 'Assignee Teacher'}</label>
                  <select
                    value={taskAssigneeEn} onChange={(e) => setTaskAssigneeEn(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2"
                  >
                    <option value="Sarah Al-Mansoori">Sarah Al-Mansoori (سارة المنصوري)</option>
                    <option value="Ahmad Al-Harbi">Ahmad Al-Harbi (أحمد الحربي)</option>
                    <option value="John Doe">John Doe (جون دو)</option>
                    <option value="Fatima Al-Kamali">Fatima Al-Kamali Coordinator (فاطمة الكمالي)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 block">{isAr ? 'نوع المورد المقترن' : 'Related Curricular Format'}</label>
                  <select
                    value={taskCategoryEn} onChange={(e) => setTaskCategoryEn(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2"
                  >
                    <option value="Lesson Plan">Lesson Plan (خطة تحضير صفية)</option>
                    <option value="Worksheet">Worksheet (ورقة تطبيق علمية)</option>
                    <option value="Activity">Class Activity (نشاط حركي تفاعلي)</option>
                    <option value="Exam Prep">Exam Blueprint (نموذج مراجعة اختبار)</option>
                    <option value="Glossary">Terminology (رصد ومواءمة مفاهيم)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button" onClick={() => setShowAddTaskForm(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-500"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white font-semibold text-xs px-4 py-1.5 rounded-lg border border-indigo-700 cursor-pointer"
                >
                  {isAr ? 'إدراج المهمة' : 'Assign to Sprint'}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Kanban Board Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5" id="kanban-grid">
        {columns.map((col) => {
          const colTasks = activeTasks.filter(t => t.status === col.status);
          return (
            <div key={col.status} className="flex flex-col space-y-3.5" id={`kanban-col-${col.status}`}>
              {/* Column Title Header Banner */}
              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${col.barClass}`} />
                  <span className="font-bold text-xs text-slate-700 font-sans">
                    {isAr ? col.labelAr : col.labelEn}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-full font-mono">
                  {colTasks.length}
                </span>
              </div>

              {/* Kanban Column Drag Arena Container Area */}
              <div className={`flex-1 min-h-[400px] p-3 rounded-2xl border border-slate-150 ${col.colorClass} space-y-3`}>
                {colTasks.map((task) => {
                  const dodDoneCount = task.dodChecked.length;
                  const totalDod = DOD_REQUIREMENTS.length;
                  const isDoDComplete = dodDoneCount === totalDod;

                  return (
                    <div 
                      key={task.id} 
                      className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 shadow-xs transition-all relative flex flex-col justify-between"
                    >
                      {/* Top labels */}
                      <div className="flex justify-between items-start gap-1 mb-2">
                        <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded-xs">
                          {isAr ? task.categoryAr : task.categoryEn}
                        </span>

                        {/* Dropdown status shift */}
                        <select
                          value={task.status}
                          onChange={(e) => onUpdateTaskStatus(task.id, e.target.value as TaskStatus)}
                          className="text-[9px] bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 py-0.5 px-1 rounded-sm focus:outline-hidden font-sans"
                        >
                          <option value="todo">{isAr ? 'انتظار' : 'To Do'}</option>
                          <option value="inprogress">{isAr ? 'تنفيذ' : 'Work'}</option>
                          <option value="review">{isAr ? 'تدقيق' : 'Review'}</option>
                          <option value="done">{isAr ? 'اعتماد' : 'Approved'}</option>
                        </select>
                      </div>

                      <h5 className="font-bold text-xs text-slate-900 leading-snug">
                        {isAr ? task.titleAr : task.titleEn}
                      </h5>

                      {/* Definition of Done Checker panel */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold mb-1 uppercase tracking-wide">
                          <span>{isAr ? 'شرط التدقيق DoD:' : 'DoD Checklist:'}</span>
                          <span className={isDoDComplete ? 'text-emerald-600 font-bold' : 'text-indigo-600 font-medium'}>
                            {dodDoneCount} / {totalDod}
                          </span>
                        </div>

                        {/* Interactive check items */}
                        <div className="space-y-1">
                          {DOD_REQUIREMENTS.map((req) => {
                            const isChecked = task.dodChecked.includes(req.id);
                            return (
                              <label 
                                key={req.id} 
                                className="flex items-center gap-1.5 text-[10px] text-slate-600 hover:text-slate-800 cursor-pointer select-none"
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleToggleDoD(task, req.id)}
                                  className="rounded-sm border-slate-300 text-indigo-600 focus:ring-indigo-500 h-3 w-3"
                                />
                                <span className={isChecked ? 'line-through text-slate-400' : ''}>
                                  {isAr ? req.labelAr : req.labelEn}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Bottom author and indicator */}
                      <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3 text-slate-400" />
                          {isAr ? task.assigneeAr : task.assigneeEn}
                        </span>
                        
                        {isDoDComplete && (
                          <span className="flex items-center gap-0.5 text-emerald-600 font-bold animate-pulse">
                            <CheckCircle className="h-3.5 w-3.5" />
                            {isAr ? 'جاز' : 'OK'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="text-center py-10 text-slate-300 font-semibold text-xs border border-dashed border-slate-200 rounded-xl">
                    {isAr ? 'الفئة فارغة حالياً' : 'Column Empty'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Stand-up Assistant Grid Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="scrum-daily-logins">
        
        {/* Left Side: logs lists (7 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-150 p-6 shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="text-indigo-600 h-4 w-4" />
              <h4 className="font-bold text-slate-800 text-sm">
                {isAr ? 'سجل مشاركات الوقفة اليومية (Daily Stand-up Logs)' : 'Bilingual Daily Stand-up logs feed'}
              </h4>
            </div>
            
            <button
              onClick={() => setShowStandupForm(!showStandupForm)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 border border-indigo-150 hover:bg-indigo-50 bg-white px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              {isAr ? '+ تسجيل وقفة صباحية' : '+ Record Morning Stand-up'}
            </button>
          </div>

          {/* Expanded Standup log form */}
          <AnimatePresence>
            {showStandupForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-4 overflow-hidden"
              >
                <form onSubmit={handleAddStandupSubmit} className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-indigo-900 uppercase">
                    <span>{isAr ? 'الوقوف الصباحي: إجابة الأسئلة الثلاثة' : 'Morning Stand-up Checklist'}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Bilingual Sync Grid</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 block">{isAr ? 'اسم المعلم المعني' : 'Logging Teacher'}</label>
                      <select 
                        value={standupAuthor} onChange={(e) => setStandupAuthor(e.target.value)}
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                      >
                        <option value="Sarah Al-Mansoori">Sarah Al-Mansoori (سارة المنصوري)</option>
                        <option value="Ahmad Al-Harbi">Ahmad Al-Harbi (أحمد الحربي)</option>
                        <option value="John Doe">John Doe (جون دو)</option>
                        <option value="Fatima Al-Kamali">Fatima Al-Kamali Coordinator (فاطمة الكمالي)</option>
                      </select>
                    </div>

                    <div className="hidden md:block"></div>

                    {/* Q1: Yesterday work */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-indigo-900 block">Q1: What did you achieve yesterday? (English)</label>
                      <input
                        type="text" required value={standupDidYEn} onChange={(e) => setStandupDidYEn(e.target.value)}
                        placeholder="e.g. Completed translating Biology notes"
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-indigo-950 block text-right">س1: ماذا أنجزت بالأمس؟ (عربي) *</label>
                      <input
                        type="text" required value={standupDidYAr} onChange={(e) => setStandupDidYAr(e.target.value)}
                        placeholder="مثال: أنهيتُ إعداد أوراق عمل الكيمياء ثنائية اللغة لـ الصف العاشر"
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-right focus:ring-indigo-500"
                      />
                    </div>

                    {/* Q2: Today work */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-indigo-900 block">Q2: What is your primary focus today? (English)</label>
                      <input
                        type="text" required value={standupWillTEn} onChange={(e) => setStandupWillTEn(e.target.value)}
                        placeholder="e.g. Uploading drafts onto the MS Teams folder"
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-indigo-955 block text-right">س2: ماذا سأعمل اليوم بمهمتي؟ (عربي) *</label>
                      <input
                        type="text" required value={standupWillTAr} onChange={(e) => setStandupWillTAr(e.target.value)}
                        placeholder="مثال: مراجعة المنسق للجدول وحفظ النسخة الاحتياطية"
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-right"
                      />
                    </div>

                    {/* Q3: Obstacles */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-indigo-900 block">Q3: Are there any obstacles blocking you? (English)</label>
                      <input
                        type="text" value={standupBlockEn} onChange={(e) => setStandupBlockEn(e.target.value)}
                        placeholder="e.g. Waiting on Academic VP sign-off, or slow laboratory Wi-Fi"
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-indigo-955 block text-right">س3: ما هي العوائق التي تصادفك؟ (عربي)</label>
                      <input
                        type="text" value={standupBlockAr} onChange={(e) => setStandupBlockAr(e.target.value)}
                        placeholder="مثال: تأخر استلام درجات الوزارة لتحديث التقويم"
                        className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 text-right"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button" onClick={() => setShowStandupForm(false)}
                      className="px-3 py-1.5 text-xs text-slate-500"
                    >
                      {isAr ? 'تراجع' : 'Discard'}
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg border border-indigo-700 cursor-pointer shadow-xs"
                    >
                      {isAr ? 'أرسل التحديث الصباحي' : 'Commit Daily Update'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live stream */}
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {standups.map((log) => (
              <div key={log.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 hover:bg-slate-50/20 transition-all">
                <div className="flex justify-between items-center mb-3 text-xs font-semibold text-slate-500 pb-2 border-b border-dashed border-slate-200">
                  <span className="flex items-center gap-1.5 text-slate-700 font-bold">
                    <User className="h-4 w-4 text-indigo-500" />
                    {isAr ? log.teacherAr : log.teacherEn}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-200 px-2 py-0.5 rounded-sm">
                    {log.date}
                  </span>
                </div>

                {/* Grid display of responses */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[9px] font-bold text-indigo-600 block uppercase">
                      {isAr ? 'ما تم إنجازه بالأمس' : 'ACHIEVED YESTERDAY'}
                    </span>
                    <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                      {isAr ? log.didYesterdayAr : log.didYesterdayEn}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-[9px] font-bold text-sky-600 block uppercase">
                      {isAr ? 'العمل المجدول اليوم' : 'PLANNED FOR TODAY'}
                    </span>
                    <p className="text-xs text-slate-700 font-medium mt-1 leading-relaxed">
                      {isAr ? log.willDoTodayAr : log.willDoTodayEn}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] font-bold text-rose-600 block uppercase">
                      {isAr ? 'العوائق المشخصة' : 'ROADBLOCKS / BLOCKS'}
                    </span>
                    <p className={`text-xs mt-1 leading-relaxed font-semibold ${log.obstaclesEn !== 'None' && log.obstaclesAr !== 'لا توجد' ? 'text-rose-600' : 'text-slate-500 font-medium'}`}>
                      {isAr ? log.obstaclesAr : log.obstaclesEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Impediment Track List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-150 p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                <AlertTriangle className="text-rose-500 h-4.5 w-4.5" />
                {isAr ? 'سجل تتبع عقبات المعلمين' : 'Impediment Obstacles Registry'}
              </span>

              <button
                onClick={() => setShowImpedimentForm(!showImpedimentForm)}
                className="p-1 hover:bg-slate-50 border border-slate-200 rounded-sm text-slate-600 cursor-pointer"
                title={isAr ? 'تسجيل عقبة جديدة فوراً' : 'Flag a new impediment blocker'}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Impediment dynamic dialog */}
            <AnimatePresence>
              {showImpedimentForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-amber-50 p-3 rounded-xl border border-amber-200 overflow-hidden"
                >
                  <form onSubmit={handleAddBlockerSubmit} className="space-y-3.5">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wide block">
                      {isAr ? 'تحذير: قم بالإبلاغ عن عقبة لمنسق المادة' : 'Raise Blocker to Scrum Master'}
                    </span>

                    <input
                      type="text" required value={blockerTitleEn} onChange={(e) => setBlockerTitleEn(e.target.value)}
                      placeholder="Impediment description (English)"
                      className="w-full text-xs font-sans bg-white border border-slate-200 rounded-lg p-2"
                    />

                    <input
                      type="text" required value={blockerTitleAr} onChange={(e) => setBlockerTitleAr(e.target.value)}
                      placeholder="وصف العقبة والمانع بالعربية"
                      className="w-full text-xs font-sans bg-white border border-slate-200 rounded-lg p-2 text-right"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={blockerSeverity} onChange={(e: any) => setBlockerSeverity(e.target.value)}
                        className="text-xs bg-white border border-slate-200 rounded-lg p-2 font-sans"
                      >
                        <option value="low">Low Severity</option>
                        <option value="medium">Medium Blocker</option>
                        <option value="high">Critical/High Block</option>
                      </select>

                      <select
                        value={blockerAuthorEn} onChange={(e) => setBlockerAuthorEn(e.target.value)}
                        className="text-xs bg-white border border-slate-200 rounded-lg p-2 font-sans"
                      >
                        <option value="Sarah Al-Mansoori">Sarah / سارة</option>
                        <option value="Ahmad Al-Harbi">Ahmad / أحمد</option>
                        <option value="John Doe">John / جون</option>
                      </select>
                    </div>

                    <div className="flex justify-end gap-1.5 pt-1">
                      <button
                        type="button" onClick={() => setShowImpedimentForm(false)}
                        className="text-[10px] font-bold text-slate-500 px-2 py-1"
                      >
                        {isAr ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="text-[10px] font-bold bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded-sm cursor-pointer"
                      >
                        {isAr ? 'إرسال للمنسق' : 'Escalate Blocker'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Impediment log scrolling list */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {impediments.map((imp) => (
                <div 
                  key={imp.id} 
                  className={`p-3 rounded-xl border ${
                    imp.resolved 
                      ? 'bg-slate-50 border-slate-250 text-slate-500' 
                      : imp.severity === 'high' 
                        ? 'bg-rose-50/50 border-rose-200' 
                        : 'bg-amber-50/40 border-amber-200'
                  }`}
                >
                  <div className="flex justify-between items-start gap-1">
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-sm ${
                      imp.resolved 
                        ? 'bg-slate-200 text-slate-600' 
                        : imp.severity === 'high' 
                          ? 'bg-rose-100 text-rose-700' 
                          : 'bg-amber-100 text-amber-700'
                    }`}>
                      {isAr 
                        ? (imp.resolved ? 'حُلَّت' : imp.severity === 'high' ? 'خطرة جداً' : 'متوسطة') 
                        : (imp.resolved ? 'RESOLVED' : imp.severity.toUpperCase())
                      }
                    </span>

                    <span className="text-[9px] text-slate-400 font-mono">{imp.dateRaised}</span>
                  </div>

                  <p className={`text-xs mt-2 leading-relaxed ${imp.resolved ? 'line-through' : 'font-semibold text-slate-800'}`}>
                    {isAr ? imp.titleAr : imp.titleEn}
                  </p>

                  <div className="text-[10px] text-slate-400 mt-2.5 border-t border-slate-100 pt-1.5 flex justify-between items-center">
                    <span>{isAr ? `مرفوع بـ: ${imp.raisedByAr}` : `By: ${imp.raisedByEn}`}</span>

                    {!imp.resolved && (
                      <button
                        onClick={() => {
                          setResolvingId(imp.id);
                          setResNotesEn('');
                          setResNotesAr('');
                        }}
                        className="text-[9px] font-bold text-indigo-600 hover:underline hover:text-indigo-800 cursor-pointer"
                      >
                        {isAr ? 'عالج المعوق الآن' : 'Unclog Blocker'}
                      </button>
                    )}
                  </div>

                  {/* Resolution Notes Display */}
                  {imp.resolved && (
                    <div className="bg-white p-2.5 rounded-lg border border-slate-100 mt-2 text-[10px] text-slate-600 font-serif leading-relaxed">
                      <span className="font-bold text-indigo-600 block uppercase mb-0.5">Scrum Master Clearance</span>
                      <p>{isAr ? imp.resolutionAr : imp.resolutionEn}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Resolution Light modal overlay popup */}
          {resolvingId && (
            <div className="bg-slate-900/65 backdrop-blur-xs fixed inset-0 flex items-center justify-center p-4 z-50">
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 max-w-sm w-full space-y-4"
              >
                <div className="flex gap-2 items-center text-indigo-900 font-bold text-sm">
                  <CheckSquare className="h-5 w-5" />
                  <h4>{isAr ? 'تحديث حل عقبة المعلم' : 'Provide Blocker Resolution'}</h4>
                </div>
                
                <form onSubmit={handleResolveSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block">Resolution Notes (English)</label>
                    <input
                      type="text" required value={resNotesEn} onChange={(e) => setResNotesEn(e.target.value)}
                      placeholder="e.g. Cleared space, IT team fixed Wi-Fi router"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-600 block text-right">خطوات وقرار حل العقبة بالعربية *</label>
                    <input
                      type="text" required value={resNotesAr} onChange={(e) => setResNotesAr(e.target.value)}
                      placeholder="مثال: تم توفير مودم إنترنت بديل وتحديث المجلد"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 text-right"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button" onClick={() => setResolvingId(null)}
                      className="px-3 py-1 text-xs text-slate-500"
                    >
                      {isAr ? 'تراجع' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg border border-emerald-700 cursor-pointer"
                    >
                      {isAr ? 'تأكيد الحل' : 'Clear Roadblock'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}

          {/* Role Advice Footer Card depending on Scrum context */}
          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/50 mt-4 text-[11px] text-slate-600 leading-relaxed font-sans">
            <span className="font-bold text-slate-700 block mb-0.5">
              💡 {isAr ? 'رسالة هامة للـ Scrum Master (المنسق):' : '💡 Message to School Scrum Master:'}
            </span>
            <p>
              {isAr
                ? 'دورك ليس آمراً أو مراقباً. دورك هو قائد خادم (Servant Leader) مُسرّع لمهمة التحضير ومُسهّل لعمل الزملاء المعلمين ومُزيل للعقبات اليومية من طريقهم.'
                : 'Your role is not of a traditional dictator or task-auditor. You are a servant-leader. Unclog roads, provide templates, and uplift your peers.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
