import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { NAV, SITE, SERVICES } from '../content';
import { Logo } from './Logo';
import { Container } from './ui';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export function useDocumentTitle(title?: string) {
  const { language } = useLanguage();
  useEffect(() => {
    if (!title) {
      document.title =
        language === 'ar'
          ? 'الدعم الرائدة — تخزين وتجهيز طلبات للمتاجر الإلكترونية'
          : 'Leading Support — E-commerce Warehousing & Order Fulfilment';
    } else {
      const suffix = language === 'ar' ? 'الدعم الرائدة' : 'Leading Support';
      document.title = `${title} — ${suffix}`;
    }
  }, [title, language]);
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    if (to.startsWith('/#')) return location.hash === to.slice(1);
    return location.pathname.startsWith(to);
  };

  const getNavLabel = (item: (typeof NAV)[0]) => {
    switch (item.to) {
      case '/':
        return t('nav.home');
      case '/services':
        return t('nav.services');
      case '/#how-it-works':
        return t('nav.howItWorks');
      case '/about':
        return t('nav.about');
      case '/contact':
        return t('nav.contact');
      default:
        return item.label;
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-ink text-white border-b border-[#232326] transition-colors">
      <Container className="flex h-20 items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 focus-visible:outline-white focus-visible:rounded"
          aria-label={language === 'ar' ? 'الانتقال إلى الصفحة الرئيسية' : 'Go to homepage'}
        >
          <Logo height={52} />
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
          className="hidden lg:flex items-center gap-7"
        >
          {NAV.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative py-2 text-sm font-semibold transition-colors hover:text-white ${
                  active ? 'text-white' : 'text-[#a1a1aa]'
                }`}
              >
                {getNavLabel(item)}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Language Switcher */}
        <div className="hidden lg:flex items-center gap-3.5">
          <LanguageSwitcher variant="header" />

          <a
            href={SITE.portal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#d4d4d8] hover:text-white transition-colors"
          >
            <span>{t('nav.login')}</span>
            <ArrowUpRight className="h-4 w-4 text-[#a1a1aa]" aria-hidden="true" />
            <span className="sr-only">{t('footer.newWindow')}</span>
          </a>

          <Link
            to="/merchant-sign-up"
            className="inline-flex h-11 items-center justify-center rounded-control bg-white px-5 text-sm font-bold text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {t('nav.signup')}
          </Link>
        </div>

        {/* Mobile menu button & Language switch */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher variant="header" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-control text-white hover:bg-[#232326] transition-colors focus-visible:outline-white"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة الرئيسية'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col justify-between bg-ink px-6 py-8 text-white lg:hidden overflow-y-auto"
        >
          <nav aria-label="قائمة الهاتف" className="flex flex-col space-y-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 text-lg font-bold border-b border-[#232326] ${
                  isActive(item.to) ? 'text-[#34d399]' : 'text-white'
                }`}
              >
                {getNavLabel(item)}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3.5 pt-6 border-t border-[#232326]">
            <LanguageSwitcher variant="mobile" />

            <a
              href={SITE.portal}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center justify-center gap-2 rounded-control border border-[#3f3f46] text-sm font-bold text-white hover:bg-[#232326]"
            >
              <span>{t('nav.login')}</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{t('footer.newWindow')}</span>
            </a>

            <Link
              to="/merchant-sign-up"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-12 items-center justify-center rounded-control bg-white text-sm font-bold text-ink"
            >
              {t('nav.signup')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="bg-ink text-[#a1a1aa] border-t border-[#232326] pt-14 pb-12 font-sans">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Identity */}
          <div className="space-y-4">
            <Link to="/" aria-label="الانتقال إلى الرئيسية">
              <Logo height={64} />
            </Link>
            <p className="text-sm leading-relaxed text-[#d4d4d8] mt-3">
              {t('footer.desc')}
            </p>
            <div className="pt-2 text-xs space-y-1 text-[#71717a]">
              <div>{t('footer.entity')}: <span className="text-[#a1a1aa]">{SITE.legalName}</span></div>
              <div>{t('footer.cr')}: <bdi className="text-[#d4d4d8] dir-ltr inline-block">{SITE.cr}</bdi></div>
              <div>{t('footer.unified')}: <bdi className="text-[#d4d4d8] dir-ltr inline-block">{SITE.unified}</bdi></div>
              <div>{t('footer.vat')}: <bdi className="text-[#d4d4d8] dir-ltr inline-block">{SITE.vat}</bdi></div>
            </div>
            <div className="pt-2">
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white text-base font-bold mb-4">{t('footer.coreServices')}</h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.filter((s) => s.group === 'core').map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Extra Services & Overview */}
          <div>
            <h4 className="text-white text-base font-bold mb-4">{t('footer.extraServices')}</h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.filter((s) => s.group === 'extra').map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/services"
                  className="text-[#34d399] hover:underline font-semibold text-xs inline-flex items-center gap-1"
                >
                  <span>{t('footer.viewAllServices')}</span>
                  <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links & Merchant Portal */}
          <div>
            <h4 className="text-white text-base font-bold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5 text-sm mb-6">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/merchant-sign-up" className="hover:text-white transition-colors">
                  {t('footer.registerNew')}
                </Link>
              </li>
            </ul>

            <a
              href={SITE.portal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#1f1f23] hover:bg-[#27272a] border border-[#3f3f46] px-3.5 py-2 rounded-control transition-colors"
            >
              <span>{t('footer.merchantPortal')}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#34d399]" aria-hidden="true" />
              <span className="sr-only">{t('footer.newWindow')}</span>
            </a>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t border-[#232326] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            {t('footer.rights')} © {currentYear} {SITE.legalName}.
          </div>
          <div className="flex items-center gap-6 text-[#a1a1aa]">
            <Link to="/privacy" className="hover:text-white transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:rounded-control focus:bg-ink focus:px-4 focus:py-2.5 focus:text-white focus:shadow-lg"
      >
        {language === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>
      <SiteHeader />
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function FocusedLayout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <a
        href="#focused-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:rounded-control focus:bg-ink focus:px-4 focus:py-2.5 focus:text-white focus:shadow-lg"
      >
        {language === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>
      <header className="bg-ink text-white border-b border-[#232326] py-4">
        <Container className="flex items-center justify-between">
          <Link to="/" aria-label="الانتقال إلى الرئيسية">
            <Logo height={44} />
          </Link>
          <div className="flex items-center gap-3.5 text-xs sm:text-sm">
            <LanguageSwitcher variant="header" />

            <Link to="/" className="text-[#a1a1aa] hover:text-white transition-colors">
              {t('nav.backHome')}
            </Link>
            <a
              href={SITE.portal}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-white hover:text-[#34d399] transition-colors"
            >
              <span>{t('nav.login')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </header>

      <main id="focused-main" className="flex-1 focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      <footer className="py-6 border-t border-line bg-surface text-center text-xs text-muted">
        <Container>
          {t('footer.rights')} © {currentYear} {SITE.legalName}.
        </Container>
      </footer>
    </div>
  );
}
