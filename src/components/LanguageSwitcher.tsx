import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitcher({
  variant = 'header',
  className = '',
}: {
  variant?: 'header' | 'footer' | 'mobile';
  className?: string;
}) {
  const { language, toggleLanguage, t } = useLanguage();
  const nextLangLabel = language === 'ar' ? 'English' : 'العربية';
  const nextLangCode = language === 'ar' ? 'EN' : 'عربي';

  if (variant === 'footer') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-2 rounded-control border border-[#3f3f46] bg-[#1f1f23] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#27272a] hover:border-line transition-colors ${className}`}
        aria-label={`${t('lang.label')}: ${nextLangLabel}`}
        title={`${t('lang.label')}: ${nextLangLabel}`}
      >
        <Globe className="h-3.5 w-3.5 text-[#34d399]" aria-hidden="true" />
        <span>{nextLangLabel}</span>
      </button>
    );
  }

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={`flex h-11 w-full items-center justify-between rounded-control border border-[#3f3f46] bg-[#1f1f23] px-4 text-sm font-bold text-white hover:bg-[#27272a] transition-colors ${className}`}
        aria-label={`${t('lang.label')}: ${nextLangLabel}`}
      >
        <div className="flex items-center gap-2.5">
          <Globe className="h-4 w-4 text-[#34d399]" aria-hidden="true" />
          <span>{t('lang.label')}</span>
        </div>
        <span className="rounded bg-accent/20 px-2 py-0.5 text-xs text-[#34d399] font-latin">
          {nextLangLabel}
        </span>
      </button>
    );
  }

  // Header desktop variant
  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`inline-flex items-center gap-1.5 rounded-control border border-[#3f3f46] px-2.5 py-1.5 text-xs font-bold text-[#d4d4d8] hover:text-white hover:bg-[#1f1f23] transition-colors focus-visible:outline-white ${className}`}
      aria-label={`${t('lang.label')}: ${nextLangLabel}`}
      title={`${t('lang.label')}: ${nextLangLabel}`}
    >
      <Globe className="h-3.5 w-3.5 text-[#34d399]" aria-hidden="true" />
      <span className="font-latin tracking-wide">{nextLangCode}</span>
    </button>
  );
}
