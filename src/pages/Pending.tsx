import React from 'react';
import { Link } from 'react-router';
import { Check, Clock, Lock } from 'lucide-react';
import { useDocumentTitle } from '../components/Layout';
import { Container, StatusNotice } from '../components/ui';
import { useLanguage } from '../context/LanguageContext';

export function PendingPage() {
  const { language, t } = useLanguage();
  useDocumentTitle(language === 'en' ? 'Account Pending Approval' : 'حسابك بانتظار الموافقة');

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="max-w-[760px] mx-auto rounded-panel border border-line bg-surface p-6 sm:p-10 shadow-soft">
          {/* Top Demo Notice */}
          <StatusNotice
            type="pending"
            title={language === 'en' ? 'Design Prototype Notice' : 'نموذج تجريبي للتصميم'}
            className="mb-8"
          >
            {t('pending.demoNotice')}
          </StatusNotice>

          <div className="text-center space-y-4 mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pending-soft text-pending border border-pending/30">
              <Clock className="w-3.5 h-3.5" />
              <span>{t('pending.badge')}</span>
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
              {t('pending.title')}
            </h1>

            <p className="text-base text-muted max-w-lg mx-auto leading-relaxed">
              {t('pending.desc')}
            </p>
          </div>

          {/* 3-Stage Progress Timeline */}
          <div className="rounded-panel border border-line bg-canvas p-6 mb-10">
            <h2 className="text-sm font-bold text-ink mb-6">{t('pending.timelineTitle')}</h2>

            <div className="space-y-6">
              {/* Stage 1: Done */}
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ok text-white">
                  <Check className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-ink text-sm">{t('pending.stage1.title')}</h3>
                    <span className="text-xs font-bold text-ok">{t('pending.stage1.status')}</span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {t('pending.stage1.desc')}
                  </p>
                </div>
              </div>

              {/* Stage 2: In progress / Pending */}
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pending text-white animate-pulse">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-ink text-sm">{t('pending.stage2.title')}</h3>
                    <span className="text-xs font-bold text-pending">{t('pending.stage2.status')}</span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {t('pending.stage2.desc')}
                  </p>
                </div>
              </div>

              {/* Stage 3: Future */}
              <div className="flex items-start gap-4 opacity-70">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-line text-muted">
                  <Lock className="h-4 w-4" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-ink text-sm">{t('pending.stage3.title')}</h3>
                    <span className="text-xs text-muted">{t('pending.stage3.status')}</span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">
                    {t('pending.stage3.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-control bg-ink px-8 text-sm font-bold text-white hover:bg-black transition-colors"
            >
              {t('nav.backHome')}
            </Link>

            <Link
              to="/contact"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-control border border-line bg-surface px-8 text-sm font-bold text-ink hover:bg-canvas transition-colors"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
