import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { FAQS, FAQ_GROUPS, LEGAL, SITE } from '../content';
import { FAQS_EN } from '../content-en';
import { useDocumentTitle } from '../components/Layout';
import { PageHeader } from '../components/PageHeader';
import { Container, SectionHeading, StatusNotice } from '../components/ui';
import { Art } from '../components/Art';
import { useDemo, DemoPanel } from '../demo';
import { useLanguage } from '../context/LanguageContext';

// ==========================================
// 1. About Page (/about)
// ==========================================
export function AboutPage() {
  const { language, t } = useLanguage();
  useDocumentTitle(language === 'en' ? 'About Us' : 'من نحن');

  return (
    <div>
      <PageHeader
        title={t('about.title')}
        intro={t('about.intro')}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('nav.about') }]}
      />

      {/* Feature section */}
      <section className="py-16 sm:py-20 bg-surface border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
                {t('about.ownership.title')}
              </h2>
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                {t('about.ownership.body')}
              </p>

              {/* Responsibilities Table */}
              <div className="rounded-panel border border-line overflow-hidden mt-6 bg-canvas">
                <div className="grid grid-cols-2 bg-surface border-b border-line p-3.5 font-bold text-sm text-ink">
                  <div>{t('about.table.weHandle')}</div>
                  <div>{t('about.table.youKeep')}</div>
                </div>
                <div className="divide-y divide-line/60 text-xs sm:text-sm">
                  <div className="grid grid-cols-2 p-3 text-muted">
                    <span className="text-ink font-medium">{t('about.table.row1We')}</span>
                    <span>{t('about.table.row1You')}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3 text-muted">
                    <span className="text-ink font-medium">{t('about.table.row2We')}</span>
                    <span>{t('about.table.row2You')}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3 text-muted">
                    <span className="text-ink font-medium">{t('about.table.row3We')}</span>
                    <span>{t('about.table.row3You')}</span>
                  </div>
                  <div className="grid grid-cols-2 p-3 text-muted">
                    <span className="text-ink font-medium">{t('about.table.row4We')}</span>
                    <span>{t('about.table.row4You')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-feature border border-line bg-canvas p-3 shadow-soft overflow-hidden">
                <div className="aspect-[480/380] rounded-xl overflow-hidden bg-white border border-line/60">
                  <Art kind="storage" label={language === 'en' ? 'Organized warehouse and shelving' : 'مستودع منظم وأرفف تخزين'} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 Principles */}
      <section className="py-16 sm:py-20 bg-canvas border-b border-line">
        <Container>
          <SectionHeading
            eyebrow={t('about.principles.eyebrow')}
            title={t('about.principles.title')}
            intro={t('about.principles.intro')}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-panel border border-line bg-surface p-6">
              <span className="text-2xl font-black text-accent/40 font-latin block mb-3">01</span>
              <h3 className="text-lg font-bold text-ink mb-2">{t('about.p1.title')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('about.p1.desc')}
              </p>
            </div>

            <div className="rounded-panel border border-line bg-surface p-6">
              <span className="text-2xl font-black text-accent/40 font-latin block mb-3">02</span>
              <h3 className="text-lg font-bold text-ink mb-2">{t('about.p2.title')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('about.p2.desc')}
              </p>
            </div>

            <div className="rounded-panel border border-line bg-surface p-6">
              <span className="text-2xl font-black text-accent/40 font-latin block mb-3">03</span>
              <h3 className="text-lg font-bold text-ink mb-2">{t('about.p3.title')}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {t('about.p3.desc')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink text-white text-center">
        <Container>
          <div className="max-w-xl mx-auto space-y-5">
            <h2 className="text-3xl font-extrabold">{t('about.cta.title')}</h2>
            <p className="text-[#a1a1aa] text-base">
              {t('about.cta.desc')}
            </p>
            <div className="pt-2">
              <Link
                to="/merchant-sign-up"
                className="inline-flex h-12 items-center justify-center rounded-control bg-white px-8 text-sm font-bold text-ink hover:bg-canvas transition-colors"
              >
                {t('nav.signup')}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

// ==========================================
// 2. Full FAQ Page (/faq)
// ==========================================
export function FaqPage() {
  const { language, t } = useLanguage();
  useDocumentTitle(language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const groupsList =
    language === 'en'
      ? ['Account & Registration', 'Inventory & Orders', 'Shipping & Returns', 'Pricing & Services']
      : FAQ_GROUPS;

  const currentFaqs = language === 'en' ? FAQS_EN : FAQS;

  return (
    <div>
      <PageHeader
        title={t('faq.title')}
        intro={t('faq.intro')}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('faq.title') }]}
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-[900px] mx-auto">
            {/* Quick group jumps */}
            <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-line">
              <span className="text-xs font-bold text-muted ml-2">{t('faq.sections')}</span>
              {groupsList.map((grp) => (
                <a
                  key={grp}
                  href={`#grp-${grp}`}
                  className="px-3 py-1.5 rounded-control text-xs font-semibold bg-surface border border-line hover:border-ink/30 text-ink transition-colors"
                >
                  {grp}
                </a>
              ))}
            </div>

            {/* Questions by group */}
            <div className="space-y-12">
              {groupsList.map((grp) => {
                const groupQuestions = currentFaqs.filter((f) => f.group === grp);
                return (
                  <div key={grp} id={`grp-${grp}`} className="scroll-mt-28">
                    <h2 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      <span>{grp}</span>
                    </h2>

                    <div className="space-y-3">
                      {groupQuestions.map((item, idx) => {
                        const globalIdx = currentFaqs.indexOf(item);
                        const isOpen = openFaq === globalIdx;

                        return (
                          <div
                            key={idx}
                            className="rounded-panel border border-line bg-surface overflow-hidden"
                          >
                            <button
                              type="button"
                              onClick={() => setOpenFaq(isOpen ? null : globalIdx)}
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
                  </div>
                );
              })}
            </div>

            {/* Bottom Help Card */}
            <div className="mt-14 rounded-panel border border-line bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
              <div>
                <h3 className="text-lg font-bold text-ink">{t('faq.notFound')}</h3>
                <p className="text-sm text-muted mt-1">
                  {t('faq.notFoundSub')}
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center rounded-control bg-ink px-6 text-sm font-bold text-white hover:bg-black transition-colors shrink-0"
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

// ==========================================
// 3. Contact Page (/contact)
// ==========================================
export function ContactPage() {
  const { language, t } = useLanguage();
  useDocumentTitle(language === 'en' ? 'Contact Us' : 'تواصل معنا');
  const { scenario, resetCount } = useDemo();
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    topic: 'services' as 'services' | 'signup' | 'general',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const contactTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (contactTimerRef.current) {
        clearTimeout(contactTimerRef.current);
      }
    };
  }, []);

  // Reset when demo reset button is clicked
  useEffect(() => {
    if (contactTimerRef.current) {
      clearTimeout(contactTimerRef.current);
    }
    setFormData({
      name: '',
      email: '',
      phone: '',
      topic: 'services',
      message: '',
    });
    setErrors({});
    setStatus('idle');
  }, [resetCount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = language === 'en' ? 'Please enter your name' : 'أدخل اسمك';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = language === 'en' ? 'Enter a valid email address' : 'أدخل بريدا إلكترونيا صحيحا';
    }
    if (!['services', 'signup', 'general'].includes(formData.topic)) {
      newErrors.topic = language === 'en' ? 'Select a valid topic' : 'اختر موضوعا صالحا';
    }
    if (!formData.message.trim()) {
      newErrors.message = language === 'en' ? 'Please write your message' : 'اكتب رسالتك';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    // Simulated 1200ms submit with scenario support
    contactTimerRef.current = setTimeout(() => {
      if (scenario === 'contact-fail') {
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          topic: 'services',
          message: '',
        });
      }
    }, 1200);
  };

  return (
    <div>
      <PageHeader
        title={t('contact.title')}
        intro={t('contact.intro')}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: t('nav.contact') }]}
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Form Panel */}
            <div className="lg:col-span-7 rounded-panel border border-line bg-surface p-6 sm:p-8 shadow-xs">
              {status === 'success' ? (
                <div className="space-y-6 text-center py-8">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ok-soft text-ok">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-ink">
                      {t('contact.success')}
                    </h3>
                    <p className="text-sm text-muted mt-2 max-w-md mx-auto leading-relaxed">
                      {t('contact.successSub')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex h-11 items-center justify-center rounded-control bg-ink px-6 text-sm font-bold text-white hover:bg-black transition-colors"
                  >
                    {t('action.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {status === 'error' && (
                    <StatusNotice
                      type="danger"
                      title={t('contact.error')}
                    >
                      {t('contact.errorSub')}
                    </StatusNotice>
                  )}

                  {/* Name */}
                  <div>
                    <label htmlFor="field-name" className="block text-sm font-bold text-ink mb-1.5">
                      {t('contact.name')} <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="field-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      className={`w-full h-12 rounded-control border px-3.5 text-sm bg-white text-ink transition-colors ${
                        errors.name ? 'border-danger focus:border-danger' : 'border-line focus:border-accent'
                      }`}
                      placeholder={t('contact.namePlaceholder')}
                    />
                    {errors.name && (
                      <p id="err-name" className="mt-1.5 text-xs text-danger font-medium">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="field-email" className="block text-sm font-bold text-ink mb-1.5">
                      {t('contact.email')} <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="field-email"
                      name="email"
                      required
                      dir="ltr"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      className={`w-full h-12 rounded-control border px-3.5 text-sm bg-white text-ink dir-ltr transition-colors ${
                        errors.email ? 'border-danger focus:border-danger' : 'border-line focus:border-accent'
                      }`}
                      placeholder="merchant@example.com"
                    />
                    {errors.email && (
                      <p id="err-email" className="mt-1.5 text-xs text-danger font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label htmlFor="field-phone" className="block text-sm font-bold text-ink mb-1.5">
                      {t('contact.phone')} <span className="text-xs font-normal text-muted">{t('contact.optional')}</span>
                    </label>
                    <input
                      type="tel"
                      id="field-phone"
                      name="phone"
                      dir="ltr"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full h-12 rounded-control border border-line px-3.5 text-sm bg-white text-ink dir-ltr focus:border-accent"
                      placeholder="+966 5X XXX XXXX"
                    />
                  </div>

                  {/* Topic */}
                  <div>
                    <label htmlFor="field-topic" className="block text-sm font-bold text-ink mb-1.5">
                      {t('contact.topic')} <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="field-topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className="w-full h-12 rounded-control border border-line px-3.5 text-sm bg-white text-ink focus:border-accent"
                    >
                      <option value="services">{t('contact.topicServices')}</option>
                      <option value="signup">{t('contact.topicSignup')}</option>
                      <option value="general">{t('contact.topicGeneral')}</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="field-message" className="block text-sm font-bold text-ink mb-1.5">
                      {t('contact.message')} <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="field-message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'err-message' : undefined}
                      className={`w-full rounded-control border p-3.5 text-sm bg-white text-ink transition-colors ${
                        errors.message ? 'border-danger focus:border-danger' : 'border-line focus:border-accent'
                      }`}
                      placeholder={t('contact.messagePlaceholder')}
                    />
                    {errors.message && (
                      <p id="err-message" className="mt-1.5 text-xs text-danger font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button & Notice */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-control bg-ink px-8 text-sm font-bold text-white hover:bg-black transition-colors disabled:opacity-60"
                    >
                      {status === 'loading' ? t('action.sendingInquiry') : t('action.sendInquiry')}
                    </button>

                    <p className="mt-3 text-xs text-muted">
                      {t('contact.demoNotice')}
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Secondary Help Panel */}
            <div className="lg:col-span-5 rounded-panel border border-line bg-canvas p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-ink mb-2">{t('contact.sidebar.title')}</h3>
                <p className="text-sm text-muted leading-relaxed">
                  {t('contact.sidebar.desc')}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  to="/faq"
                  className="flex items-center justify-between p-4 rounded-control bg-surface border border-line hover:border-ink/20 transition-all text-sm font-bold text-ink"
                >
                  <span>{t('contact.sidebar.faq')}</span>
                  <ArrowIcon className="w-4 h-4 text-accent" />
                </Link>

                <Link
                  to="/merchant-sign-up"
                  className="flex items-center justify-between p-4 rounded-control bg-surface border border-line hover:border-ink/20 transition-all text-sm font-bold text-ink"
                >
                  <span>{t('contact.sidebar.signup')}</span>
                  <ArrowIcon className="w-4 h-4 text-accent" />
                </Link>
              </div>

              <div className="border-t border-line/80 pt-6 text-xs text-muted space-y-1.5">
                <div className="font-bold text-ink mb-1">{t('contact.sidebar.official')}</div>
                <div>{SITE.legalName}</div>
                <div>{t('footer.cr')}: <span className="dir-ltr inline-block">{SITE.cr}</span></div>
                <div>{t('footer.vat')}: <span className="dir-ltr inline-block">{SITE.vat}</span></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Demo helper panel */}
      <DemoPanel mode="contact" />
    </div>
  );
}

// ==========================================
// 4. Legal Pages (/privacy & /terms)
// ==========================================
export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const { language, t } = useLanguage();
  const content = LEGAL[kind];
  const pageTitle = language === 'en' ? (kind === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions') : content.title;
  const pageIntro = language === 'en' ? (kind === 'privacy' ? 'This page explains how the approved Privacy Policy layout is organized for clear readability.' : 'This page outlines the approved Terms & Conditions layout for clear readability.') : content.intro;

  useDocumentTitle(pageTitle);

  return (
    <div>
      <PageHeader
        title={pageTitle}
        intro={pageIntro}
        breadcrumbs={[{ label: t('nav.home'), to: '/' }, { label: pageTitle }]}
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Table of Contents */}
            <aside className="lg:col-span-4 rounded-panel border border-line bg-surface p-5 sticky top-28">
              <h3 className="font-bold text-ink text-sm mb-3 pb-2 border-b border-line">
                {language === 'en' ? `${pageTitle} Sections` : `بنود ${content.title}`}
              </h3>
              <nav aria-label={language === 'en' ? 'Table of contents' : 'فهرس المحتوى'}>
                <ul className="space-y-1.5 text-xs sm:text-sm text-muted">
                  {content.sections.map((sec, idx) => (
                    <li key={idx}>
                      <a
                        href={`#sec-${idx}`}
                        className="block py-1 hover:text-ink transition-colors"
                      >
                        {idx + 1}. {sec}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-6 pt-4 border-t border-line text-xs">
                <Link
                  to={kind === 'privacy' ? '/terms' : '/privacy'}
                  className="text-accent font-bold hover:underline"
                >
                  {kind === 'privacy' ? t('footer.terms') : t('footer.privacy')}
                </Link>
              </div>
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-8 max-w-[720px] space-y-10">
              {/* Notice */}
              <StatusNotice
                type="pending"
                title={language === 'en' ? 'Design Prototype Notice' : 'ملاحظة هامة للتصميم'}
              >
                {language === 'en'
                  ? 'Placeholder mockup text for layout design—to be replaced with verified legal text prior to live production.'
                  : 'محتوى توضيحي للتصميم — يستبدل بالنص القانوني المعتمد قبل النشر.'}
              </StatusNotice>

              {content.sections.map((sec, idx) => (
                <section
                  key={idx}
                  id={`sec-${idx}`}
                  className="rounded-panel border border-line bg-surface p-6 sm:p-7 scroll-mt-28"
                >
                  <h2 className="text-xl font-bold text-ink mb-3 pb-2 border-b border-line/60">
                    {sec}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed">
                    {language === 'en'
                      ? `Approved official legal text for section “${sec}” will be inserted here.`
                      : `يوضع هنا النص المعتمد الذي يوضح بند «${sec}».`}
                  </p>
                </section>
              ))}

              <div className="text-xs text-muted text-center pt-4">
                <a href="#focused-main" className="hover:underline">
                  {t('action.backToTop')}
                </a>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </div>
  );
}

// ==========================================
// 5. 404 Not Found Page
// ==========================================
export function NotFoundPage() {
  const { language, t } = useLanguage();
  useDocumentTitle(language === 'en' ? 'Page Not Found' : 'الصفحة غير موجودة');

  return (
    <div className="py-20 sm:py-28 text-center">
      <Container>
        <div className="max-w-md mx-auto space-y-6">
          <div className="h-44 w-44 mx-auto rounded-feature bg-canvas border border-line p-2 overflow-hidden shadow-xs">
            <Art kind="returns" label={t('404.title')} />
          </div>

          <div className="text-5xl font-black text-ink font-latin tracking-wider">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
            {t('404.title')}
          </h1>

          <p className="text-base text-muted leading-relaxed">
            {t('404.desc')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center rounded-control bg-ink px-6 text-sm font-bold text-white hover:bg-black transition-colors"
            >
              {t('nav.backHome')}
            </Link>
            <Link
              to="/services"
              className="inline-flex h-12 items-center justify-center rounded-control border border-line bg-surface px-6 text-sm font-bold text-ink hover:bg-canvas transition-colors"
            >
              {t('404.explore')}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
