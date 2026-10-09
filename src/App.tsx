import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { Layout, FocusedLayout } from './components/Layout';
import { MetaManager } from './components/MetaManager';
import { DemoProvider } from './demo';
import { LanguageProvider } from './context/LanguageContext';
import { HomePage } from './pages/Home';
import { ServicesOverviewPage, ServiceDetailPage } from './pages/Services';
import {
  AboutPage,
  ContactPage,
  FaqPage,
  LegalPage,
  NotFoundPage,
} from './pages/Company';
import { RegisterPage } from './pages/Register';
import { PendingPage } from './pages/Pending';

// Scroll to top on route change unless hash is present
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <DemoProvider>
        <BrowserRouter>
          <MetaManager />
          <ScrollToTop />
          <Routes>
          {/* Full Shell Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/services"
            element={
              <Layout>
                <ServicesOverviewPage />
              </Layout>
            }
          />
          <Route
            path="/services/:slug"
            element={
              <Layout>
                <ServiceDetailPage />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <AboutPage />
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <ContactPage />
              </Layout>
            }
          />
          <Route
            path="/faq"
            element={
              <Layout>
                <FaqPage />
              </Layout>
            }
          />
          <Route
            path="/privacy"
            element={
              <Layout>
                <LegalPage kind="privacy" />
              </Layout>
            }
          />
          <Route
            path="/terms"
            element={
              <Layout>
                <LegalPage kind="terms" />
              </Layout>
            }
          />

          {/* Focused Shell Routes */}
          <Route
            path="/merchant-sign-up"
            element={
              <FocusedLayout>
                <RegisterPage />
              </FocusedLayout>
            }
          />
          <Route
            path="/merchant-sign-up/pending"
            element={
              <FocusedLayout>
                <PendingPage />
              </FocusedLayout>
            }
          />

          {/* Wildcard 404 Route */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </DemoProvider>
    </LanguageProvider>
  );
}
