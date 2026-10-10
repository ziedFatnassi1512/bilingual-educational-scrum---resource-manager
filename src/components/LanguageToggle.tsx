import { motion } from 'motion/react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageToggle({ currentLanguage, onLanguageChange }: LanguageToggleProps) {
  const isArabic = currentLanguage === 'ar';

  return (
    <button
      id="lang-toggle-btn"
      onClick={() => onLanguageChange(isArabic ? 'en' : 'ar')}
      className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 font-medium px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      title={isArabic ? 'Switch to English' : 'التحويل إلى العربية'}
    >
      <Globe className="h-4 w-4 text-slate-500 animate-spin-slow" />
      <span className="text-sm font-semibold tracking-wide">
        {isArabic ? 'English' : 'العربية'}
      </span>
      <motion.span
        className="text-xs bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded-sm"
        layoutId="active-lang-indicator"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isArabic ? 'AR' : 'EN'}
      </motion.span>
    </button>
  );
}
