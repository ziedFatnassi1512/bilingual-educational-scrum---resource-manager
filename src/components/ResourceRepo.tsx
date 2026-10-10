import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, FileText, CheckCircle2, AlertCircle, BookOpen, Layers, User, Tag, Trash2, Calendar, FileDown } from 'lucide-react';
import { BilingualResource, ResourceStatus, Language, DictionaryItem } from '../types';

interface ResourceRepoProps {
  resources: BilingualResource[];
  onAddResource: (resource: BilingualResource) => void;
  onDeleteResource: (id: string) => void;
  language: Language;
}

export default function ResourceRepo({ resources, onAddResource, onDeleteResource, language }: ResourceRepoProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedResource, setSelectedResource] = useState<BilingualResource | null>(resources[0] || null);

  // Form State for creating a new resource
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleAr, setNewTitleAr] = useState('');
  const [newCategoryEn, setNewCategoryEn] = useState<'Lesson Plan' | 'Worksheet' | 'Activity' | 'Exam Prep' | 'Glossary'>('Lesson Plan');
  const [newGradeEn, setNewGradeEn] = useState('Grade 5');
  const [newSubjectEn, setNewSubjectEn] = useState('Mathematics');
  const [newDescEn, setNewDescEn] = useState('');
  const [newDescAr, setNewDescAr] = useState('');
  const [newUploaderEn, setNewUploaderEn] = useState('Sarah Al-Mansoori');
  const [newStatus, setNewStatus] = useState<ResourceStatus>('Draft');
  
  // Term Vocabulary list state inside form
  const [terms, setTerms] = useState<DictionaryItem[]>([
    { termEn: '', termAr: '', definitionEn: '', definitionAr: '' }
  ]);

  const isAr = language === 'ar';

  // Available subjects/genres
  const subjects = [
    { en: 'Mathematics', ar: 'الرياضيات' },
    { en: 'Biology', ar: 'علم الأحياء' },
    { en: 'Chemistry', ar: 'الكيمياء' },
    { en: 'Physics', ar: 'الفيزياء' },
    { en: 'English English', ar: 'اللغة الإنجليزية' }
  ];

  const handleAddTermField = () => {
    setTerms([...terms, { termEn: '', termAr: '', definitionEn: '', definitionAr: '' }]);
  };

  const handleUpdateTerm = (index: number, key: keyof DictionaryItem, value: string) => {
    const updated = [...terms];
    updated[index][key] = value;
    setTerms(updated);
  };

  const handleRemoveTermField = (index: number) => {
    if (terms.length > 1) {
      setTerms(terms.filter((_, i) => i !== index));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleEn || !newTitleAr) return;

    // Map Category to Arabic automatically
    const catMap: Record<string, 'خطة درس' | 'ورقة عمل' | 'نشاط' | 'تحضير اختبار' | 'مسرد مصطلحات'> = {
      'Lesson Plan': 'خطة درس',
      'Worksheet': 'ورقة عمل',
      'Activity': 'نشاط',
      'Exam Prep': 'تحضير اختبار',
      'Glossary': 'مسرد مصطلحات'
    };

    const gradeMap: Record<string, string> = {
      'Grade 5': 'الصف الخامس',
      'Grade 8': 'الصف الثامن',
      'Grade 10': 'الصف العاشر',
      'Grade 12': 'الصف الثاني عشر'
    };

    const subjMap: Record<string, string> = {
      'Mathematics': 'الرياضيات',
      'Biology': 'الأحياء',
      'Chemistry': 'الكيمياء',
      'Physics': 'الفيزياء',
      'English English': 'اللغة الإنجليزية'
    };

    const newResource: BilingualResource = {
      id: 'res-' + Date.now(),
      titleEn: newTitleEn,
      titleAr: newTitleAr,
      categoryEn: newCategoryEn,
      categoryAr: catMap[newCategoryEn] || 'خطة درس',
      gradeEn: newGradeEn,
      gradeAr: gradeMap[newGradeEn] || newGradeEn,
      subjectEn: newSubjectEn,
      subjectAr: subjMap[newSubjectEn] || newSubjectEn,
      descriptionEn: newDescEn,
      descriptionAr: newDescAr,
      uploaderEn: newUploaderEn,
      uploaderAr: isAr ? 'منسق المادة' : 'Sarah Al-Mansoori',
      status: newStatus,
      dateAdded: new Date().toISOString().split('T')[0],
      fileSize: '1.2 MB',
      keyTerminology: terms.filter(t => t.termEn.trim() !== '')
    };

    onAddResource(newResource);
    setSelectedResource(newResource);

    // Reset Form
    setNewTitleEn('');
    setNewTitleAr('');
    setNewCategoryEn('Lesson Plan');
    setNewDescEn('');
    setNewDescAr('');
    setTerms([{ termEn: '', termAr: '', definitionEn: '', definitionAr: '' }]);
    setShowAddForm(false);
  };

  const handleExportResource = (resource: BilingualResource) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resource, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resource.titleEn.toLowerCase().replace(/ /g, "_")}_bilingual.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Searching logic
  const filteredResources = resources.filter(res => {
    const searchString = searchTerm.toLowerCase();
    const titleMatch = res.titleEn.toLowerCase().includes(searchString) || res.titleAr.includes(searchString);
    const descMatch = res.descriptionEn.toLowerCase().includes(searchString) || res.descriptionAr.includes(searchString);
    const termMatch = res.keyTerminology.some(
      t => t.termEn.toLowerCase().includes(searchString) || t.termAr.includes(searchString)
    );

    const matchesSearch = titleMatch || descMatch || termMatch;

    const matchesCategory = filterCategory === 'all' || res.categoryEn === filterCategory;
    const matchesSubject = filterSubject === 'all' || res.subjectEn === filterSubject;
    const matchesStatus = filterStatus === 'all' || res.status === filterStatus;

    return matchesSearch && matchesCategory && matchesSubject && matchesStatus;
  });

  const getStatusBadgeClass = (status: ResourceStatus) => {
    switch (status) {
      case 'Published':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Approved':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Reviewed':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Draft':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6" id="resource-repo-container">
      {/* Search and Action Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch">
        <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 w-full lg:w-auto shadow-xs">
          {/* Search Box */}
          <div className="relative w-full md:w-60">
            <span className={`absolute inset-y-0 ${isAr ? 'left-3' : 'right-3'} flex items-center pointer-events-none text-slate-400`}>
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isAr ? 'ابحث في العناوين والمصطلحات...' : 'Search titles / vocabularies...'}
              className={`w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 ${
                isAr ? 'pl-9 text-right' : 'pr-9 text-left'
              }`}
            />
          </div>

          {/* Subject Filter */}
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-sans"
          >
            <option value="all">{isAr ? 'كل المواد' : 'All Subjects'}</option>
            {subjects.map(s => (
              <option key={s.en} value={s.en}>{isAr ? s.ar : s.en}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-sans"
          >
            <option value="all">{isAr ? 'كل الفئات' : 'All Categories'}</option>
            <option value="Lesson Plan">{isAr ? 'خطة درس' : 'Lesson Plan'}</option>
            <option value="Worksheet">{isAr ? 'ورقة عمل' : 'Worksheet'}</option>
            <option value="Activity">{isAr ? 'نشاط تعليمي' : 'Activity'}</option>
            <option value="Exam Prep">{isAr ? 'تحضير اختبار' : 'Exam Prep'}</option>
            <option value="Glossary">{isAr ? 'مسرد مصطلحات' : 'Glossary'}</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-sans"
          >
            <option value="all">{isAr ? 'حالات الاعتماد' : 'All Statuses'}</option>
            <option value="Draft">{isAr ? 'مسودة' : 'Draft'}</option>
            <option value="Reviewed">{isAr ? 'تم التدقيق' : 'Reviewed'}</option>
            <option value="Approved">{isAr ? 'معتمد' : 'Approved'}</option>
            <option value="Published">{isAr ? 'منشور للجميع' : 'Published'}</option>
          </select>
        </div>

        {/* Add New Resource Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-3 px-5 rounded-2xl border border-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden shadow-xs shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{isAr ? 'إضافة مورد ثنائي جديد' : 'New Bilingual Resource'}</span>
        </button>
      </div>

      {/* Add Resource Full Dialog Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border border-indigo-100 shadow-md p-6 overflow-hidden"
          >
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <Layers className="text-indigo-600 h-4 w-4" />
                  {isAr ? 'إضافة بطاقة تحضير أو مورد جديد' : 'Assemble a New Bilingual Curriculum Module'}
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">STEPPER CONFIG</span>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title En */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {isAr ? 'العنوان باللغة الإنجليزية *' : 'Title in English *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitleEn}
                    onChange={(e) => setNewTitleEn(e.target.value)}
                    placeholder="e.g. Fractions and Parts"
                    className="w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Title Ar */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block text-right">
                    * العنوان باللغة العربية
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitleAr}
                    onChange={(e) => setNewTitleAr(e.target.value)}
                    placeholder="مثال: الكسور والنسبة المئوية"
                    className="w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-right focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Categories & Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {isAr ? 'الفئة الدراسية / نوع المورد' : 'Category / Type'}
                  </label>
                  <select
                    value={newCategoryEn}
                    onChange={(e: any) => setNewCategoryEn(e.target.value)}
                    className="w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-indigo-500"
                  >
                    <option value="Lesson Plan">Lesson Plan / خطة درس</option>
                    <option value="Worksheet">Worksheet / ورقة عمل</option>
                    <option value="Activity">Active Exercise / نشاط حركي</option>
                    <option value="Exam Prep">Exam Blueprint / تحضير اختبار</option>
                    <option value="Glossary">Terminology / مسرد مصطلحات</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {isAr ? 'الصف المستهدف' : 'Target Grade'}
                    </label>
                    <select
                      value={newGradeEn}
                      onChange={(e) => setNewGradeEn(e.target.value)}
                      className="w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl py-2 px-3"
                    >
                      <option value="Grade 5">Grade 5 / الخامس</option>
                      <option value="Grade 8">Grade 8 / الثامن</option>
                      <option value="Grade 10">Grade 10 / العاشر</option>
                      <option value="Grade 12">Grade 12 / الثاني عشر</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {isAr ? 'المادة العلمية' : 'Curricular Subject'}
                    </label>
                    <select
                      value={newSubjectEn}
                      onChange={(e) => setNewSubjectEn(e.target.value)}
                      className="w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl py-2 px-3"
                    >
                      {subjects.map(s => (
                        <option key={s.en} value={s.en}>{s.en} / {s.ar}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description En */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    {isAr ? 'الوصف التلخيصي للدرس (English)' : 'Summary Description (English)'}
                  </label>
                  <textarea
                    rows={2}
                    value={newDescEn}
                    onChange={(e) => setNewDescEn(e.target.value)}
                    placeholder="Aim, measurable objectives, and sequence..."
                    className="w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden"
                  />
                </div>

                {/* Description Ar */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block text-right">
                    الوصف المختصر باللغة العربية
                  </label>
                  <textarea
                    rows={2}
                    value={newDescAr}
                    onChange={(e) => setNewDescAr(e.target.value)}
                    placeholder="الأهداف والوسائل التعليمية المستخدمة وطرق تقييم الاستيعاب..."
                    className="w-full text-xs font-sans bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-right focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Terminology Dictionary Mapping (Sub-Form) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                    {isAr ? 'مسرد المصطلحات والقاموس المصغّر للمورد *' : 'Matched Billingual Glossary Keys *'}
                  </span>
                  <button
                    type="button"
                    onClick={handleAddTermField}
                    className="text-[10px] font-bold text-indigo-600 border border-indigo-200 bg-white hover:bg-indigo-50 px-2 py-1 rounded-sm cursor-pointer"
                  >
                    {isAr ? '+ أضف مصطلحاً جديداً' : '+ Add Vocabulary Pair'}
                  </button>
                </div>

                <div className="space-y-3">
                  {terms.map((term, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white p-3 rounded-lg border border-slate-200 relative">
                      <input
                        type="text"
                        placeholder="English Term"
                        value={term.termEn}
                        onChange={(e) => handleUpdateTerm(index, 'termEn', e.target.value)}
                        className="text-xs font-sans bg-slate-50 border border-slate-200 rounded-lg p-2"
                      />
                      <input
                        type="text"
                        placeholder="المصطلح بالعربية"
                        value={term.termAr}
                        onChange={(e) => handleUpdateTerm(index, 'termAr', e.target.value)}
                        className="text-xs font-sans bg-slate-50 border border-slate-200 rounded-lg p-2 text-right"
                      />
                      <input
                        type="text"
                        placeholder="English definition / context"
                        value={term.definitionEn}
                        onChange={(e) => handleUpdateTerm(index, 'definitionEn', e.target.value)}
                        className="text-xs font-sans bg-slate-50 border border-slate-200 rounded-lg p-2 md:col-span-1"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="التعريف بالعربية"
                          value={term.definitionAr}
                          onChange={(e) => handleUpdateTerm(index, 'definitionAr', e.target.value)}
                          className="text-xs font-sans bg-slate-50 border border-slate-200 rounded-lg p-2 text-right w-full"
                        />
                        {terms.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTermField(index)}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-md cursor-pointer shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status and Actions Row */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50 p-4 rounded-xl">
                <div className="flex gap-4 items-center">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {isAr ? 'حالة الاعتماد الأولية' : 'Initial Resource Status'}
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as ResourceStatus)}
                      className="text-xs bg-white border border-slate-200 rounded-lg p-2"
                    >
                      <option value="Draft">Draft / مسودة أولية</option>
                      <option value="Reviewed">Reviewed / تمت مراجعته</option>
                      <option value="Approved">Approved / معتمد للتدريس</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 block">
                      {isAr ? 'المقترح المرفوع بواسطة' : 'Author Credits'}
                    </label>
                    <input
                      type="text"
                      value={newUploaderEn}
                      onChange={(e) => setNewUploaderEn(e.target.value)}
                      className="text-xs bg-white border border-slate-200 rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 font-semibold text-xs text-slate-600 hover:text-slate-800"
                  >
                    {isAr ? 'إلغاء الأمر' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    {isAr ? 'حفظ وإدراج المورد' : 'Validate & Upload'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid: Split selection viewing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Resources List (5 columns) */}
        <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-1">
          <div className="text-xs text-slate-400 font-bold mb-1 tracking-wider uppercase">
            {isAr ? `الموارد المتاحة لمدارسنا (${filteredResources.length})` : `AVAILABLE RESOURCE MODULES (${filteredResources.length})`}
          </div>

          {filteredResources.map((res) => (
            <div
              key={res.id}
              onClick={() => setSelectedResource(res)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedResource?.id === res.id
                  ? 'bg-indigo-50/75 border-indigo-400 shadow-sm'
                  : 'bg-white border-slate-150 hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-1.5">
                <span className="text-[10px] font-bold text-slate-400 tracking-wide bg-slate-100 px-2 py-0.5 rounded-sm uppercase">
                  {isAr ? res.categoryAr : res.categoryEn}
                </span>

                <span className={`text-[10px] font-bold border px-1.5 py-0.2 rounded-xs ${getStatusBadgeClass(res.status)}`}>
                  {isAr 
                    ? (res.status === 'Draft' ? 'مسودة' : res.status === 'Reviewed' ? 'مُدقق' : res.status === 'Approved' ? 'معتمد' : 'مُعمم منشور')
                    : res.status
                  }
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm leading-snug">
                {isAr ? res.titleAr : res.titleEn}
              </h4>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5 text-slate-400" />
                  {isAr ? res.subjectAr : res.subjectEn}
                </span>
                <span>•</span>
                <span>{isAr ? res.gradeAr : res.gradeEn}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3 text-slate-400" />
                  {isAr ? res.uploaderAr : res.uploaderEn}
                </span>
              </div>
            </div>
          ))}

          {filteredResources.length === 0 && (
            <div className="text-center py-10 bg-white border border-dashed border-slate-200 rounded-2xl">
              <AlertCircle className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs text-slate-500">{isAr ? 'لا يوجد ملف مبوب متوافق.' : 'No modules correspond with current filters.'}</p>
            </div>
          )}
        </div>

        {/* Right Side: Detailed Showcase and Terms (7 columns) */}
        <div className="lg:col-span-7">
          {selectedResource ? (
            <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs space-y-6">
              {/* Header Showcase */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex flex-wrap gap-2 items-center justify-between mb-3">
                  <div className="flex gap-2 text-[10px] font-bold text-slate-500">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                      {isAr ? selectedResource.gradeAr : selectedResource.gradeEn}
                    </span>
                    <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-sm">
                      {isAr ? selectedResource.categoryAr : selectedResource.categoryEn}
                    </span>
                    <span className="bg-sky-50 text-sky-700 px-2 py-0.5 rounded-sm">
                      {isAr ? selectedResource.subjectAr : selectedResource.subjectEn}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExportResource(selectedResource)}
                      title={isAr ? 'تحميل حزمة المورد كملف JSON' : 'Download package metadata'}
                      className="border border-slate-200 hover:bg-slate-50 p-1.5 rounded-lg text-slate-600 transition-colors cursor-pointer"
                    >
                      <FileDown className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDeleteResource(selectedResource.id)}
                      title={isAr ? 'حذف هذا المورد' : 'Delete resource'}
                      className="border border-red-200 hover:bg-red-50 p-1.5 rounded-lg text-rose-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {isAr ? selectedResource.titleAr : selectedResource.titleEn}
                </h3>
                
                {/* Secondary Title and Date Metadata */}
                <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 font-mono">
                  <span>
                    {isAr ? `ترجمة: ${selectedResource.titleEn}` : `Bilingual: ${selectedResource.titleAr}`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {selectedResource.dateAdded} • {selectedResource.fileSize}
                  </span>
                </div>
              </div>

              {/* Description summary */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  {isAr ? 'ملخص خطة العمل والمحتوى' : 'MODULE OUTLINE & FLOW'}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 font-serif">
                  {isAr ? selectedResource.descriptionAr : selectedResource.descriptionEn}
                </p>
                {/* Underlay in fallback translation language */}
                <p className="text-[11px] text-slate-400 italic">
                  {isAr ? selectedResource.descriptionEn : selectedResource.descriptionAr}
                </p>
              </div>

              {/* Key Terminology Side-by-Side Dictionary */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4" />
                    {isAr ? 'قاموس مصطلحات الدرس (Bilingual Glossary)' : 'Bilingual Lesson Vocabulary Pairs'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold bg-white px-2 py-0.5 rounded-xs">
                    {selectedResource.keyTerminology.length} {isAr ? 'مفاهيم مضافة' : 'Words Listed'}
                  </span>
                </div>

                {selectedResource.keyTerminology.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {selectedResource.keyTerminology.map((term, tIdx) => (
                      <div key={tIdx} className="bg-slate-50/70 hover:bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2 border-b border-dashed border-slate-100 pb-1.5 mb-1.5">
                          <span className="font-bold text-xs text-indigo-900">{term.termEn}</span>
                          <span className="font-bold text-xs text-indigo-700 text-right">{term.termAr}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-500 leading-relaxed">
                          <div>
                            <span className="text-[9px] font-bold text-indigo-600 block uppercase">Context Definition</span>
                            <span>{term.definitionEn}</span>
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-indigo-600 block text-right uppercase">التعريف السياقي</span>
                            <span className="text-right block">{term.definitionAr}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    {isAr ? 'لا يوجد مصطلحات مدرجة في هذا التحضير.' : 'No matched vocabulary pairs mapped to this file yet.'}
                  </div>
                )}
              </div>

              {/* QA Checklist Integration (Definition of Done) */}
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {isAr ? 'معيار إتمام المعلم (Definition of Done - DoD)' : 'Curriculum Definition of Done Metric'}
                </h4>
                <p className="text-[10px] text-slate-600 leading-relaxed">
                  {isAr 
                    ? 'في مدرستنا، هذا الملف جاهز بنسبة 100% ويُسمح بطباعته فقط إذا طابق معيار التميز بالكامل.' 
                    : 'This resource is only cleared for active teaching once it is signed and aligned to standardized spelling tests.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-slate-150 rounded-2xl">
              <BookOpen className="h-10 w-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500 text-sm font-semibold">{isAr ? 'يرجى اختيار مورد لاستعراض المخطط التفصيلي' : 'Select a curriculum resource file to audit'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
