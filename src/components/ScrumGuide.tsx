import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Info, HelpCircle, Users, CheckSquare, RefreshCw, Calendar, ArrowRightLeft } from 'lucide-react';
import { SCRUM_GLOSSARY, ScrumGlossarySection } from '../data';
import { Language } from '../types';

interface ScrumGuideProps {
  language: Language;
}

export default function ScrumGuide({ language }: ScrumGuideProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const isAr = language === 'ar';

  const filterSections = (): ScrumGlossarySection[] => {
    let filtered = [...SCRUM_GLOSSARY];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(section => 
        activeCategory === 'roles' ? section.categoryEn.includes('Role') :
        activeCategory === 'events' ? section.categoryEn.includes('Event') :
        section.categoryEn.includes('Artifact')
      );
    }

    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase();
      filtered = filtered.map(section => {
        const items = section.items.filter(item => 
          item.termEn.toLowerCase().includes(q) ||
          item.termAr.toLowerCase().includes(q) ||
          item.defEn.toLowerCase().includes(q) ||
          item.defAr.toLowerCase().includes(q) ||
          item.schoolScopeEn.toLowerCase().includes(q) ||
          item.schoolScopeAr.toLowerCase().includes(q)
        );
        return { ...section, items };
      }).filter(section => section.items.length > 0);
    }

    return filtered;
  };

  const sections = filterSections();

  return (
    <div className="space-y-8" id="scrum-guide-container">
      {/* Introduction Banner */}
      <div className="bg-gradient-to-r from-indigo-50 to-sky-50 rounded-2xl p-6 border border-indigo-100 shadow-xs flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="bg-indigo-600 text-white p-3 rounded-xl shadow-md shrink-0">
          <Info className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 leading-tight">
            {isAr ? 'منهجية Scrum المدرسية: مرجع سريع للمنسقين والمعلمين والإدارة' : 'School Agile Scrum Framework: Rapid Reference Handbook'}
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            {isAr
              ? 'نهج إداري مرن يسعى لتبسيط العملية التعليمية وإزالة العقبات المعطلة من خلال دورات مصغرة ذات تقييم وتصحيح مستمر للأدلة التحضيرية.'
              : 'An agile, streamlined educational methodology aimed at removing academic roadblocks through periodic sprint cycles and continuous quality assessment.'}
          </p>
        </div>
      </div>

      {/* Guide Interactive Nav */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2" id="scrum-guide-categories">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isAr ? 'جميع الأقسام' : 'All Sections'}
          </button>
          <button
            onClick={() => setActiveCategory('roles')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              activeCategory === 'roles'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            {isAr ? 'الأدوار (من هم؟)' : 'Roles (Who\'s Who)'}
          </button>
          <button
            onClick={() => setActiveCategory('events')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              activeCategory === 'events'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            {isAr ? 'الفعاليات (الاجتماعات)' : 'Events (Meetings)'}
          </button>
          <button
            onClick={() => setActiveCategory('artifacts')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              activeCategory === 'artifacts'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" />
            {isAr ? 'الأدوات والمقاييس' : 'Artifacts & Metrics'}
          </button>
        </div>

        {/* Searching Guide Terminology */}
        <div className="relative w-full md:w-72" id="scrum-guide-search">
          <span className={`absolute inset-y-0 ${isAr ? 'left-3' : 'right-3'} flex items-center pointer-events-none text-slate-400`}>
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isAr ? 'ابحث عن مصطلح (مثال: سبرنت)...' : 'Search term (e.g. Sprint)...'}
            className={`w-full text-xs bg-white border border-slate-200 rounded-xl py-2 px-3 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-xs ${
              isAr ? 'pl-9 text-right font-sans' : 'pr-9 text-left font-sans'
            }`}
          />
        </div>
      </div>

      {/* Glossary Terms Cards Layout */}
      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
          {sections.map((section, sIndex) => (
            <motion.div
              key={section.categoryEn}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs relative"
            >
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5 flex items-center gap-2">
                <span className="h-2 w-2 bg-indigo-600 rounded-full"></span>
                {isAr ? section.categoryAr : section.categoryEn}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {section.items.map((item, iIndex) => (
                  <div
                    key={item.termEn}
                    className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100/70 border border-slate-100 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-bold text-indigo-900 text-sm">
                          {isAr ? item.termAr : item.termEn}
                        </h4>
                        <span className="font-mono text-[10px] text-slate-400 font-medium tracking-wide bg-slate-200/50 px-1.5 py-0.5 rounded-sm">
                          {isAr ? item.termEn : item.termAr}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {isAr ? item.defAr : item.defEn}
                      </p>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border border-slate-100">
                      <div className="text-[10px] font-bold text-indigo-600 mb-1 tracking-wider uppercase">
                        {isAr ? 'التطبيق العملي في مدرستنا' : 'PRACTICAL SCHOOL CONTEXT'}
                      </div>
                      <p className="text-xs text-slate-700 font-medium">
                        {isAr ? item.schoolScopeAr : item.schoolScopeEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {sections.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium text-sm">
              {isAr ? 'لم نجد أي طروحات مطابقة لبحثك.' : 'No matching terms found.'}
            </p>
          </div>
        )}
      </div>

      {/* Daily Stand-up Questions Highlight Banner */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 bg-indigo-500/10 rounded-full blur-xl"></div>
        <div className="relative">
          <div className="flex gap-2.5 items-center mb-4">
            <RefreshCw className="h-5 w-5 text-indigo-400 animate-spin-slow" />
            <h3 className="text-md font-bold text-white tracking-wide">
              {isAr ? '❓ الأسئلة الثلاثة للوقفة اليومية (Daily Stand-up)' : '❓ The 3 Daily Stand-up Questions'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-5 max-w-2xl leading-relaxed">
            {isAr
              ? 'يجيب كل معلم في الاجتماع الصباحي الحركي القصير (5-10 دقائق) على هذه الأسئلة الثلاثة فقط لضمان التحفيز والتواصل واكتشاف العراقيل باكراً:'
              : 'Every teacher in the fast stand-up answers these 3 questions, driving updates, tiny wins, and early roadblock flags:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-indigo-400">01</span>
              <p className="font-bold text-sm text-white mt-1">
                {isAr ? 'ماذا أنجزتُ بـالأمـس؟' : 'What did I achieve yesterday?'}
              </p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {isAr ? 'متابعة التقدم وتحقيق المكاسب الصغيرة الملموسة.' : 'Trace sprint momentum and celebrate continuous tiny milestones.'}
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-sky-400">02</span>
              <p className="font-bold text-sm text-white mt-1">
                {isAr ? 'ماذا سأنـجز الـيـوم المعين؟' : 'What will I act on today?'}
              </p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {isAr ? 'الالتزام بمخرجات ومهام محددة مرتبطة بالسباق الحالي.' : 'Commit to single-day objectives associated with active tasks.'}
              </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
              <span className="text-xs font-bold text-rose-400">03</span>
              <p className="font-bold text-sm text-white mt-1">
                {isAr ? 'ما هي الـعوائق التي تـعطل طريقي؟' : 'Are there any obstacles / impediments?'}
              </p>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {isAr ? 'إبلاغ المنسق (Scrum Master) بالمشاكل لإزالتها فوراً.' : 'Alert the coordinator right away so roadblocks can be cleared.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Traditional vs Scrum Agile comparison Grid */}
      <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRightLeft className="text-indigo-600 h-5 w-5" />
          <h3 className="text-md font-bold text-slate-800">
            {isAr ? '🆚 مقارنة: نظام مدرسة سكرام المرن ضد الطرق التقليدية السنوية' : '🆚 Methodology Duel: Agile Scrum vs. Traditional Annual Operations'}
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-800 border-y border-slate-200">
                <th className={`p-3 font-semibold ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'وجه مقارنة السير الأكاديمي' : 'Comparison Dimension'}
                </th>
                <th className={`p-3 font-semibold ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'الطريقة التقليدية المعتادة (الخطية)' : 'Traditional Planning (Waterfall-like)'}
                </th>
                <th className={`p-3 font-bold text-indigo-700 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'طريقة Scrum السريعة بالمدرسة' : 'Agile School Scrum Method'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className={`p-3 font-semibold text-slate-800 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'التخطيط' : 'Planning'}
                </td>
                <td className={`p-3 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'تخطيط طويل الأجل لعام دراسي كامل ثم تطبيق صارم.' : 'Long-term rigid schedules set at year start, resisting changes.'}
                </td>
                <td className={`p-3 font-medium text-slate-900 bg-indigo-50/20 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'تخطيط لسباقات قصيرة (أسبوعين) مع مراجعة وتقييم مستمر.' : 'Short-cycle sprints (2 weeks) which allow fast adjustments.'}
                </td>
              </tr>
              <tr>
                <td className={`p-3 font-semibold text-slate-800 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'الاستجابة للتعديل' : 'Response to Change'}
                </td>
                <td className={`p-3 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'صعب، مكلف، ويحتاج تعاميم معقدة وتأشيرات طويلة.' : 'Slow, tedious, requires massive updates & administrative tiers.'}
                </td>
                <td className={`p-3 font-medium text-slate-900 bg-indigo-50/20 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'مرن وسهل لأننا نعمل ونخطط على دفعات صغيرة.' : 'Seamless & painless, modifications are discussed incrementally.'}
                </td>
              </tr>
              <tr>
                <td className={`p-3 font-semibold text-slate-800 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'المتابعة والشفافية' : 'Transparency & Visibility'}
                </td>
                <td className={`p-3 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'عبر تقارير ورقة روتينية طويلة تصعب قراءتها وتتراكم.' : 'Cumbersome paper files that are hard to analyze on time.'}
                </td>
                <td className={`p-3 font-medium text-slate-900 bg-indigo-50/20 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'لوحة مرئية تفاعلية (Sprint Board) واجتماعات سريعة.' : 'Highly visual Task Boards and responsive live coordination views.'}
                </td>
              </tr>
              <tr>
                <td className={`p-3 font-semibold text-slate-800 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'المسؤوليات اليومية' : 'Daily Cooperation'}
                </td>
                <td className={`p-3 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'يعمل كل معلم منعزلاً في فصه أو مكتبه المنفر.' : 'Isolation inside silos with minimum daily horizontal dialogue.'}
                </td>
                <td className={`p-3 font-medium text-slate-900 bg-indigo-50/20 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'الجميع يرى تقدم الآخرين ويتشارك الموارد والمصطلحات.' : 'Shared visual dashboard, instant translation, values alignment.'}
                </td>
              </tr>
              <tr>
                <td className={`p-3 font-semibold text-slate-800 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'التقويم والتصحيح' : 'Self-Correction'}
                </td>
                <td className={`p-3 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'يحدث غالباً في نهاية العام (وعامّة لا يحدث).' : 'Happens near the close of school year when it is too late to fix.'}
                </td>
                <td className={`p-3 font-medium text-slate-900 bg-indigo-50/20 ${isAr ? 'text-right' : 'text-left'}`}>
                  {isAr ? 'يحدث دورياً كل أسبوعين في مراجعة السباق (Retrospective).' : 'Happens naturally every 2 weeks, optimizing processes on the fly.'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
