import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import {
  Boxes,
  PackageCheck,
  Check,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES, STEPS, FAQS, HOME_FAQ } from '../content';
import { STEPS_EN, FAQS_EN } from '../content-en';
import { useDocumentTitle } from '../components/Layout';
import { Container, SectionHeading } from '../components/ui';
import { Art } from '../components/Art';
import { ServiceCard } from '../components/Service';
import { useLanguage } from '../context/LanguageContext';

export function HomePage() {
  useDocumentTitle();
  const location = useLocation();
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'invoices'>('inventory');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  // Smooth scroll to #how-it-works if requested
  useEffect(() => {
    if (location.hash === '#how-it-works') {
      const element = document.getElementById('how-it-works');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const tabs: ('inventory' | 'orders' | 'invoices')[] = ['inventory', 'orders', 'invoices'];

  const handleKeyDownTab = (e: React.KeyboardEvent, current: 'inventory' | 'orders' | 'invoices') => {
    const currentIndex = tabs.indexOf(current);
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex]);
      document.getElementById(`tab-${tabs[nextIndex]}`)?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex]);
      document.getElementById(`tab-${tabs[prevIndex]}`)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveTab(tabs[0]);
      document.getElementById(`tab-${tabs[0]}`)?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveTab(tabs[tabs.length - 1]);
      document.getElementById(`tab-${tabs[tabs.length - 1]}`)?.focus();
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const stepsList = language === 'en' ? STEPS_EN : STEPS;

  return (
    <div>
      {/* H01. Hero */}
      <section className="bg-surface py-14 sm:py-20 lg:py-24 border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Copy */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <span className="inline-block text-xs sm:text-sm font-bold text-accent bg-accent-soft px-3.5 py-1.5 rounded-full border border-accent/20">
                {t('hero.eyebrow')}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ink tracking-tight leading-[1.25]">
                {t('hero.titleLine1')} <br />
                <span className="relative inline-block mt-2">
                  {t('hero.titleLine2')}
                  <span className="absolute bottom-1 right-0 left-0 h-2 bg-accent/20 -z-10 rounded-full" />
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-xl">
                {t('hero.body')}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/merchant-sign-up"
                  className="inline-flex h-13 items-center justify-center rounded-control bg-ink px-8 text-base font-bold text-white shadow-sm hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t('nav.signup')}
                </Link>

                <Link
                  to="/services"
                  className="inline-flex h-13 items-center justify-center rounded-control border border-line bg-surface px-7 text-base font-bold text-ink hover:bg-canvas transition-colors"
                >
                  {t('action.exploreServices')}
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-muted/90 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
                <span>{t('hero.helper')}</span>
              </p>
            </div>

            {/* Art Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-feature border border-line bg-canvas p-3 sm:p-4 shadow-soft overflow-hidden">
                <div className="aspect-[480/380] rounded-xl overflow-hidden bg-white border border-line/60">
                  <Art kind="hero" label={t('hero.artLabel')} />
                </div>

                {/* Floating Status Badges */}
                <div className="absolute top-7 right-7 flex items-center gap-2 rounded-panel bg-white/95 px-3.5 py-2 text-xs font-bold text-ink shadow-md border border-line/80 backdrop-blur-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ok-soft text-ok">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{t('hero.badgeAvailable')}</span>
                </div>

                <div className="absolute bottom-7 left-7 flex items-center gap-2 rounded-panel bg-ink/95 px-3.5 py-2 text-xs font-bold text-white shadow-md border border-ink/40 backdrop-blur-sm">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <PackageCheck className="h-3 w-3" />
                  </span>
                  <span>{t('hero.badgeProcessing')}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* H02. Value strip */}
      <section className="bg-canvas border-b border-line py-8">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-line">
            <div className="flex items-center gap-4 pt-4 md:pt-0">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-panel bg-surface text-accent shadow-xs border border-line">
                <Boxes className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-ink text-base">{t('value.storage.title')}</h3>
                <p className="text-xs text-muted mt-0.5">{t('value.storage.desc')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-panel bg-surface text-accent shadow-xs border border-line">
                <PackageCheck className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-ink text-base">{t('value.fulfil.title')}</h3>
                <p className="text-xs text-muted mt-0.5">{t('value.fulfil.desc')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 md:pt-0 md:px-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-panel bg-surface text-accent shadow-xs border border-line">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-bold text-ink text-base">{t('value.tracking.title')}</h3>
                <p className="text-xs text-muted mt-0.5">{t('value.tracking.desc')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* H03. Services overview */}
      <section className="py-20 sm:py-24 bg-surface border-b border-line">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-block text-xs sm:text-sm font-bold text-accent mb-2">
                {t('home.services.eyebrow')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
                {t('home.services.title')}
              </h2>
              <p className="mt-3 text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
                {t('home.services.intro')}
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-accent self-start md:self-end transition-colors"
            >
              <span>{t('home.services.viewAll')}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          {/* 4 Core Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {SERVICES.filter((s) => s.group === 'core').map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          {/* Extra services bar */}
          <div className="rounded-panel border border-line bg-canvas p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-ink">{t('home.services.extraTitle')}</h3>
                <p className="text-xs sm:text-sm text-muted mt-1">
                  {t('home.services.extraDesc')}
                </p>
              </div>
              <Link
                to="/services"
                className="text-xs font-bold text-accent hover:underline shrink-0"
              >
                {t('home.services.extraLink')}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SERVICES.filter((s) => s.group === 'extra').map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="rounded-control bg-surface p-4 border border-line/80 hover:border-ink/20 hover:shadow-xs transition-all flex items-center justify-between"
                >
                  <span className="font-bold text-sm text-ink">
                    {language === 'en'
                      ? s.slug === 'product-photography'
                        ? 'Product Photography'
                        : s.slug === 'labelling'
                        ? 'Custom Labelling'
                        : 'Repackaging'
                      : s.title}
                  </span>
                  <ArrowIcon className="w-3.5 h-3.5 text-muted" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* H04. How it works */}
      <section id="how-it-works" className="py-20 sm:py-24 bg-canvas border-b border-line scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow={t('howItWorks.eyebrow')}
            title={t('howItWorks.title')}
            intro={t('howItWorks.intro')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsList.map(([title, desc], idx) => (
              <div
                key={idx}
                className="rounded-panel border border-line bg-surface p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-line/60">
                    <span className="text-2xl font-black text-muted/30 font-latin">
                      0{idx + 1}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* H05. Merchant portal preview */}
      <section className="py-20 sm:py-24 bg-ink text-white border-b border-[#232326]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Copy */}
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-block text-xs sm:text-sm font-bold text-[#34d399] bg-accent/20 px-3.5 py-1.5 rounded-full border border-accent/40">
                {t('portal.eyebrow')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                {t('portal.title')}
              </h2>
              <p className="text-base leading-relaxed text-[#a1a1aa]">
                {t('portal.body')}
              </p>

              <div className="pt-2">
                <a
                  href="https://merchant.leading-support.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-control bg-white px-6 text-sm font-bold text-ink hover:bg-canvas transition-colors"
                >
                  {t('action.loginPortal')}
                </a>
              </div>
            </div>

            {/* Interactive Preview */}
            <div className="lg:col-span-7">
              <div className="rounded-panel border border-[#27272a] bg-[#141416] p-5 sm:p-7 shadow-2xl">
                {/* Header row with badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#27272a]">
                  <div
                    role="tablist"
                    aria-label={t('portal.eyebrow')}
                    className="flex items-center gap-1.5 rounded-control bg-[#1f1f23] p-1 border border-[#2e2e33]"
                  >
                    <button
                      type="button"
                      role="tab"
                      id="tab-inventory"
                      aria-controls="panel-inventory"
                      aria-selected={activeTab === 'inventory'}
                      tabIndex={activeTab === 'inventory' ? 0 : -1}
                      onKeyDown={(e) => handleKeyDownTab(e, 'inventory')}
                      onClick={() => setActiveTab('inventory')}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-control transition-all ${
                        activeTab === 'inventory'
                          ? 'bg-white text-ink shadow-xs'
                          : 'text-[#a1a1aa] hover:text-white'
                      }`}
                    >
                      {t('portal.tab.inventory')}
                    </button>
                    <button
                      type="button"
                      role="tab"
                      id="tab-orders"
                      aria-controls="panel-orders"
                      aria-selected={activeTab === 'orders'}
                      tabIndex={activeTab === 'orders' ? 0 : -1}
                      onKeyDown={(e) => handleKeyDownTab(e, 'orders')}
                      onClick={() => setActiveTab('orders')}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-control transition-all ${
                        activeTab === 'orders'
                          ? 'bg-white text-ink shadow-xs'
                          : 'text-[#a1a1aa] hover:text-white'
                      }`}
                    >
                      {t('portal.tab.orders')}
                    </button>
                    <button
                      type="button"
                      role="tab"
                      id="tab-invoices"
                      aria-controls="panel-invoices"
                      aria-selected={activeTab === 'invoices'}
                      tabIndex={activeTab === 'invoices' ? 0 : -1}
                      onKeyDown={(e) => handleKeyDownTab(e, 'invoices')}
                      onClick={() => setActiveTab('invoices')}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-control transition-all ${
                        activeTab === 'invoices'
                          ? 'bg-white text-ink shadow-xs'
                          : 'text-[#a1a1aa] hover:text-white'
                      }`}
                    >
                      {t('portal.tab.invoices')}
                    </button>
                  </div>

                  <span className="self-start sm:self-auto inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#34d399] bg-[#047857]/20 border border-[#047857]/40 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                    <span>{t('portal.demoBadge')}</span>
                  </span>
                </div>

                {/* Tab 1: Inventory */}
                <div
                  id="panel-inventory"
                  role="tabpanel"
                  aria-labelledby="tab-inventory"
                  hidden={activeTab !== 'inventory'}
                  className="space-y-4 font-sans"
                >
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-control bg-[#1f1f23] p-3 text-center border border-[#2e2e33]">
                      <div className="text-xl font-bold text-white font-latin">128</div>
                      <div className="text-[11px] text-[#a1a1aa] mt-0.5">{t('portal.inv.available')}</div>
                    </div>
                    <div className="rounded-control bg-[#1f1f23] p-3 text-center border border-[#2e2e33]">
                      <div className="text-xl font-bold text-white font-latin">14</div>
                      <div className="text-[11px] text-[#a1a1aa] mt-0.5">{t('portal.inv.reserved')}</div>
                    </div>
                    <div className="rounded-control bg-[#1f1f23] p-3 text-center border border-[#2e2e33]">
                      <div className="text-xl font-bold text-[#f87171] font-latin">2</div>
                      <div className="text-[11px] text-[#a1a1aa] mt-0.5">{t('portal.inv.damaged')}</div>
                    </div>
                  </div>

                  <div className="rounded-control bg-[#1a1a1d] p-3.5 space-y-3 border border-[#2e2e33]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white font-medium">{t('portal.inv.item1')}</span>
                      <span className="text-[#a1a1aa] font-latin">78%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#27272a] rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: '78%' }} />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-white font-medium">{t('portal.inv.item2')}</span>
                      <span className="text-[#a1a1aa] font-latin">54%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#27272a] rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: '54%' }} />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-white font-medium">{t('portal.inv.item3')}</span>
                      <span className="text-[#a1a1aa] font-latin">32%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#27272a] rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: '32%' }} />
                    </div>
                  </div>
                </div>

                {/* Tab 2: Orders */}
                <div
                  id="panel-orders"
                  role="tabpanel"
                  aria-labelledby="tab-orders"
                  hidden={activeTab !== 'orders'}
                  className="space-y-3"
                >
                  <div className="rounded-control bg-[#1f1f23] p-3.5 border border-[#2e2e33] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t('portal.order1.title')}</div>
                      <div className="text-[11px] text-[#a1a1aa]">{t('portal.order1.desc')}</div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-accent/20 text-[#34d399] border border-accent/30">
                      {t('portal.order1.status')}
                    </span>
                  </div>

                  <div className="rounded-control bg-[#1f1f23] p-3.5 border border-[#2e2e33] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t('portal.order2.title')}</div>
                      <div className="text-[11px] text-[#a1a1aa]">{t('portal.order2.desc')}</div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#3b82f6]/20 text-[#60a5fa] border border-[#3b82f6]/30">
                      {t('portal.order2.status')}
                    </span>
                  </div>

                  <div className="rounded-control bg-[#1f1f23] p-3.5 border border-[#2e2e33] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t('portal.order3.title')}</div>
                      <div className="text-[11px] text-[#a1a1aa]">{t('portal.order3.desc')}</div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-ok-soft/10 text-[#4ade80] border border-ok/30">
                      {t('portal.order3.status')}
                    </span>
                  </div>
                </div>

                {/* Tab 3: Invoices */}
                <div
                  id="panel-invoices"
                  role="tabpanel"
                  aria-labelledby="tab-invoices"
                  hidden={activeTab !== 'invoices'}
                  className="space-y-3"
                >
                  <div className="rounded-control bg-[#1f1f23] p-3.5 border border-[#2e2e33] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t('portal.inv1.title')}</div>
                      <div className="text-[11px] text-[#a1a1aa]">{t('portal.inv1.desc')}</div>
                    </div>
                    <span className="text-xs text-[#a1a1aa] bg-[#27272a] px-2.5 py-1 rounded">
                      {t('portal.demoData')}
                    </span>
                  </div>

                  <div className="rounded-control bg-[#1f1f23] p-3.5 border border-[#2e2e33] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t('portal.inv2.title')}</div>
                      <div className="text-[11px] text-[#a1a1aa]">{t('portal.inv2.desc')}</div>
                    </div>
                    <span className="text-xs text-[#a1a1aa] bg-[#27272a] px-2.5 py-1 rounded">
                      {t('portal.demoData')}
                    </span>
                  </div>

                  <div className="rounded-control bg-[#1f1f23] p-3.5 border border-[#2e2e33] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t('portal.inv3.title')}</div>
                      <div className="text-[11px] text-[#a1a1aa]">{t('portal.inv3.desc')}</div>
                    </div>
                    <span className="text-xs text-[#a1a1aa] bg-[#27272a] px-2.5 py-1 rounded">
                      {t('portal.demoData')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* H06. Charging explanation */}
      <section className="py-20 sm:py-24 bg-surface border-b border-line">
        <Container>
          <SectionHeading
            eyebrow={t('fees.eyebrow')}
            title={t('fees.title')}
            intro={t('fees.intro')}
          />

          <dl className="max-w-3xl mx-auto rounded-panel border border-line bg-canvas divide-y divide-line overflow-hidden mb-10">
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <dt className="font-bold text-ink text-base">{t('fees.fulfil.label')}</dt>
              <dd className="text-sm text-muted">{t('fees.fulfil.desc')}</dd>
            </div>

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <dt className="font-bold text-ink text-base">{t('fees.shipping.label')}</dt>
              <dd className="text-sm text-muted">{t('fees.shipping.desc')}</dd>
            </div>

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <dt className="font-bold text-ink text-base">{t('fees.storage.label')}</dt>
              <dd className="text-sm text-muted">{t('fees.storage.desc')}</dd>
            </div>

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <dt className="font-bold text-ink text-base">{t('fees.extra.label')}</dt>
              <dd className="text-sm text-muted">{t('fees.extra.desc')}</dd>
            </div>
          </dl>

          <div className="text-center">
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center rounded-control bg-ink px-7 text-sm font-bold text-white hover:bg-black transition-colors"
            >
              {t('action.inquireDetails')}
            </Link>
          </div>
        </Container>
      </section>

      {/* H07. FAQ preview */}
      <section className="py-20 sm:py-24 bg-canvas border-b border-line">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="inline-block text-xs sm:text-sm font-bold text-accent mb-2">
                {t('faqPreview.eyebrow')}
              </span>
              <h2 className="text-3xl font-extrabold text-ink">{t('faqPreview.title')}</h2>
            </div>
            <Link
              to="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-accent"
            >
              <span>{t('action.allFaqs')}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          <div className="max-w-3xl space-y-3">
            {HOME_FAQ.map((faqIdx) => {
              const item = language === 'en' ? FAQS_EN[faqIdx] : FAQS[faqIdx];
              const isOpen = openFaq === faqIdx;
              return (
                <div
                  key={faqIdx}
                  className="rounded-panel border border-line bg-surface overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faqIdx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 text-start font-bold text-ink hover:text-accent transition-colors"
                  >
                    <span className="text-base">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted shrink-0 transition-transform duration-200 ${
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

      {/* H08. Closing CTA */}
      <section className="py-20 sm:py-24 bg-ink text-white text-center">
        <Container>
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="inline-block w-8 h-1 bg-accent rounded-full mx-auto" />
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">
              {t('cta.body')}
            </p>

            <div className="pt-2">
              <Link
                to="/merchant-sign-up"
                className="inline-flex h-13 items-center justify-center rounded-control bg-white px-8 text-base font-bold text-ink hover:bg-canvas transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t('nav.signup')}
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
