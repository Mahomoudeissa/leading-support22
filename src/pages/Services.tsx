import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ChevronDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SERVICES, serviceBySlug, FAQS, Service } from '../content';
import { SERVICES_EN, FAQS_EN } from '../content-en';
import { useDocumentTitle } from '../components/Layout';
import { PageHeader } from '../components/PageHeader';
import { Container, SectionHeading } from '../components/ui';
import { Art } from '../components/Art';
import { ServiceCard, ServiceMiniCard, SERVICE_ICONS } from '../components/Service';
import { NotFoundPage } from './Company';
import { useLanguage } from '../context/LanguageContext';

export function ServicesOverviewPage() {
  const { language, t } = useLanguage();
  useDocumentTitle(language === 'en' ? 'Our Services' : 'خدماتنا');
  const [filter, setFilter] = useState<'all' | 'core' | 'extra'>('all');

  const coreServices = SERVICES.filter((s) => s.group === 'core');
  const extraServices = SERVICES.filter((s) => s.group === 'extra');

  return (
    <div>
      <PageHeader
        title={t('services.listing.title')}
        intro={t('services.listing.intro')}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('nav.services') }]}
      />

      <section className="py-12 sm:py-16">
        <Container>
          {/* Filter Bar */}
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-control text-xs sm:text-sm font-bold border transition-colors ${
                filter === 'all'
                  ? 'bg-ink text-white border-ink'
                  : 'bg-surface text-muted border-line hover:border-ink/40'
              }`}
            >
              {t('action.filterAll')} (7)
            </button>
            <button
              type="button"
              aria-pressed={filter === 'core'}
              onClick={() => setFilter('core')}
              className={`px-4 py-2 rounded-control text-xs sm:text-sm font-bold border transition-colors ${
                filter === 'core'
                  ? 'bg-ink text-white border-ink'
                  : 'bg-surface text-muted border-line hover:border-ink/40'
              }`}
            >
              {t('action.filterCore')} (4)
            </button>
            <button
              type="button"
              aria-pressed={filter === 'extra'}
              onClick={() => setFilter('extra')}
              className={`px-4 py-2 rounded-control text-xs sm:text-sm font-bold border transition-colors ${
                filter === 'extra'
                  ? 'bg-ink text-white border-ink'
                  : 'bg-surface text-muted border-line hover:border-ink/40'
              }`}
            >
              {t('action.filterExtra')} (3)
            </button>
          </div>

          {/* Core Services Section */}
          {(filter === 'all' || filter === 'core') && (
            <div className="mb-14">
              <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span>{t('services.core')}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {coreServices.map((service) => (
                  <ServiceCard key={service.slug} service={service} />
                ))}
              </div>
            </div>
          )}

          {/* Extra Services Section */}
          {(filter === 'all' || filter === 'extra') && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-muted" />
                <span>{t('services.extra')}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {extraServices.map((service) => (
                  <ServiceMiniCard key={service.slug} service={service} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const service = slug ? serviceBySlug(slug) : undefined;
  const enData = slug ? SERVICES_EN[slug] : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const displayTitle = language === 'en' && enData ? enData.title : service?.title;
  const displayHero = language === 'en' && enData ? enData.hero : service?.hero;
  const displayIncludes = language === 'en' && enData ? enData.includes : service?.includes;
  const displaySteps = language === 'en' && enData ? enData.steps : service?.steps;
  const displayFragment = language === 'en' && enData ? enData.fragment : service?.fragment;

  useDocumentTitle(displayTitle);

  if (!service || !displayTitle) {
    return <NotFoundPage />;
  }

  const IconComponent = SERVICE_ICONS[service.kind];
  const relatedServices = service.related
    .map((s) => serviceBySlug(s))
    .filter((s): s is Service => !!s);

  return (
    <div>
      {/* 1. Header with Breadcrumbs */}
      <PageHeader
        title={displayTitle}
        breadcrumbs={[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.services'), to: '/services' },
          { label: displayTitle },
        ]}
      />

      {/* 2. Hero Section */}
      <section className="bg-surface py-12 sm:py-16 border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-control bg-accent-soft text-accent">
                  <IconComponent className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-muted uppercase">
                  {service.group === 'core' ? t('services.core') : t('services.extra')}
                </span>
              </div>

              <p className="text-lg sm:text-xl text-ink leading-relaxed font-semibold">
                {displayHero}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/merchant-sign-up"
                  className="inline-flex h-12 items-center justify-center rounded-control bg-ink px-7 text-sm font-bold text-white hover:bg-black transition-colors"
                >
                  {t('nav.signup')}
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-control border border-line bg-surface px-6 text-sm font-bold text-ink hover:bg-canvas transition-colors"
                >
                  {t('action.inquire')}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-feature border border-line bg-canvas p-3 shadow-soft overflow-hidden">
                <div className="aspect-[480/380] rounded-xl overflow-hidden bg-white border border-line/60">
                  <Art kind={service.kind} label={displayTitle} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. ما الذي تشمله الخدمة؟ */}
      <section className="py-16 sm:py-20 bg-surface border-b border-line">
        <Container>
          <SectionHeading
            eyebrow={language === 'en' ? 'Service Scope' : 'محتوى الخدمة'}
            title={t('services.whatIncluded')}
            intro={t('services.whatIncludedIntro')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayIncludes?.map(([title, desc], idx) => (
              <div
                key={idx}
                className="rounded-panel border border-line bg-canvas p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft text-accent text-xs font-bold font-latin">
                      {idx + 1}
                    </span>
                    <h3 className="font-bold text-ink text-base">{title}</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. كيف تستفيد منها؟ (Steps + Fragment preview) */}
      <section className="py-16 sm:py-20 bg-canvas border-b border-line">
        <Container>
          <SectionHeading
            eyebrow={language === 'en' ? 'Operational Workflow' : 'آلية الاستفادة'}
            title={t('services.howBeneficial')}
            intro={t('services.howBeneficialIntro')}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Steps */}
            <div className="lg:col-span-7 space-y-4">
              {displaySteps?.map(([title, desc], idx) => (
                <div
                  key={idx}
                  className="rounded-panel border border-line bg-surface p-5 flex items-start gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-control bg-canvas text-ink text-xs font-bold font-latin border border-line">
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-ink text-base mb-1">{title}</h4>
                    <p className="text-sm text-muted leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform Fragment Illustration */}
            <div className="lg:col-span-5">
              <div className="rounded-panel border border-line bg-surface p-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                  <h4 className="font-bold text-ink text-sm">{displayFragment?.title}</h4>
                  <span className="text-[11px] font-semibold text-accent bg-accent-soft px-2.5 py-0.5 rounded-full border border-accent/20">
                    {t('portal.demoBadge')}
                  </span>
                </div>

                <div className="space-y-3">
                  {displayFragment?.rows.map(([label, val], idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-control bg-canvas border border-line/60 text-xs"
                    >
                      <span className="font-semibold text-ink">{label}</span>
                      <span className="text-muted">{val}</span>
                    </div>
                  ))}
                </div>

                {service.group === 'extra' && (
                  <p className="mt-4 pt-3 border-t border-line text-xs text-muted leading-relaxed">
                    {t('services.extraNotice')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. أسئلة عن هذه الخدمة */}
      {service.faq.length > 0 && (
        <section className="py-16 sm:py-20 bg-surface border-b border-line">
          <Container>
            <SectionHeading
              eyebrow={language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
              title={t('services.serviceFaq')}
            />

            <div className="max-w-3xl mx-auto space-y-3">
              {service.faq.map((fIdx) => {
                const item = language === 'en' ? FAQS_EN[fIdx] : FAQS[fIdx];
                if (!item) return null;
                const isOpen = openFaq === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="rounded-panel border border-line bg-canvas overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between gap-4 p-5 text-start font-bold text-ink hover:text-accent transition-colors"
                    >
                      <span className="text-base">{item.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-muted shrink-0 transition-transform ${
                          isOpen ? 'rotate-180 text-accent' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-muted leading-relaxed border-t border-line/60">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 6. خدمات مرتبطة */}
      {relatedServices.length > 0 && (
        <section className="py-16 sm:py-20 bg-canvas border-b border-line">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-ink">{t('services.related')}</h3>
              <Link to="/services" className="text-sm font-bold text-accent hover:underline">
                {t('home.services.viewAll')}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedServices.map((rel) => (
                <ServiceMiniCard key={rel.slug} service={rel} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 7. Closing Call To Action */}
      <section className="py-20 bg-ink text-white text-center">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-black">{t('services.readySignup')}</h2>
            <p className="text-base text-[#a1a1aa]">
              {t('services.readySignupDesc')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/merchant-sign-up"
                className="inline-flex h-12 items-center justify-center rounded-control bg-white px-8 text-sm font-bold text-ink hover:bg-canvas transition-colors"
              >
                {t('nav.signup')}
              </Link>
              <Link
                to="/contact"
                className="inline-flex h-12 items-center justify-center rounded-control border border-[#3f3f46] px-6 text-sm font-bold text-white hover:bg-[#1f1f23] transition-colors"
              >
                {t('action.inquire')}
              </Link>
            </div>

            <p className="text-xs text-[#71717a]">
              {t('cta.helper')}
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
