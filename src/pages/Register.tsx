import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import {
  Check,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowLeft,
  ChevronLeft,
  ExternalLink,
} from 'lucide-react';
import { useDocumentTitle } from '../components/Layout';
import { Container, StatusNotice } from '../components/ui';
import { useDemo, DemoPanel } from '../demo';
import { useLanguage } from '../context/LanguageContext';

export interface RegistrationValues {
  commercial_entity_ar: string;
  commercial_entity_en: string;
  brand_ar: string;
  brand_en: string;
  store_ar: string;
  store_en: string;
  responsible_person_ar: string;
  responsible_person_en: string;
  email: string;
  phone_country: string;
  phone_number: string;
  national_id: string;
  short_national_address: string;
  bank_name: string;
  iban: string;
  password: string;
  password_confirmation: string;
  terms_accepted: boolean;
}

export type RegistrationErrors = Partial<Record<keyof RegistrationValues, string>>;

export const INITIAL_REGISTRATION: RegistrationValues = {
  commercial_entity_ar: '',
  commercial_entity_en: '',
  brand_ar: '',
  brand_en: '',
  store_ar: '',
  store_en: '',
  responsible_person_ar: '',
  responsible_person_en: '',
  email: '',
  phone_country: '+966',
  phone_number: '',
  national_id: '',
  short_national_address: '',
  bank_name: '',
  iban: '',
  password: '',
  password_confirmation: '',
  terms_accepted: false,
};

const COUNTRIES = [
  { label: 'السعودية (+966)', code: '+966' },
  { label: 'الإمارات (+971)', code: '+971' },
  { label: 'الكويت (+965)', code: '+965' },
  { label: 'البحرين (+973)', code: '+973' },
  { label: 'قطر (+974)', code: '+974' },
  { label: 'عمان (+968)', code: '+968' },
  { label: 'مصر (+20)', code: '+20' },
];

const STEP_TITLES_AR = [
  'بيانات المنشأة والمتجر',
  'المسؤول وبيانات التواصل',
  'الهوية والعنوان والحساب البنكي',
  'أمان الحساب والمراجعة',
];

const STEP_TITLES_EN = [
  'Entity & Store Information',
  'Person & Contact Details',
  'Identity, Address & Bank Details',
  'Account Security & Review',
];

// Helper to normalize Arabic-Indic digits (٠-٩) and Persian digits to standard ASCII (0-9)
function normalizeDigits(str: string): string {
  return str.replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632 + 48))
            .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1776 + 48));
}

export function RegisterPage() {
  const { language, t } = useLanguage();
  useDocumentTitle(language === 'en' ? 'Register Store' : 'تسجيل متجر جديد');
  const navigate = useNavigate();
  const { scenario, resetCount } = useDemo();

  const stepTitles = language === 'en' ? STEP_TITLES_EN : STEP_TITLES_AR;

  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState<RegistrationValues>(INITIAL_REGISTRATION);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isMountedRef = useRef(true);
  const submitTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (submitTimerRef.current) {
        clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  // Demo reset integration
  useEffect(() => {
    if (submitTimerRef.current) {
      clearTimeout(submitTimerRef.current);
    }
    setValues(INITIAL_REGISTRATION);
    setErrors({});
    setCurrentStep(1);
    setSubmitError(null);
    setIsSubmitting(false);
  }, [resetCount]);

  const handleChange = (name: keyof RegistrationValues, val: any) => {
    setValues((prev) => ({ ...prev, [name]: val }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Validation function
  const validateStep = (stepNumber: number): { isValid: boolean; errs: RegistrationErrors } => {
    const errs: RegistrationErrors = {};

    if (stepNumber === 1) {
      if (!values.commercial_entity_ar.trim()) {
        errs.commercial_entity_ar = 'أدخل اسم الكيان التجاري بالعربية';
      }
      if (!values.commercial_entity_en.trim()) {
        errs.commercial_entity_en = 'أدخل اسم الكيان التجاري بالإنجليزية';
      }
      if (!values.brand_ar.trim()) {
        errs.brand_ar = 'أدخل اسم العلامة التجارية بالعربية';
      }
      if (!values.brand_en.trim()) {
        errs.brand_en = 'أدخل اسم العلامة التجارية بالإنجليزية';
      }
      if (!values.store_ar.trim()) {
        errs.store_ar = 'أدخل اسم المتجر بالعربية';
      }
      if (!values.store_en.trim()) {
        errs.store_en = 'أدخل اسم المتجر بالإنجليزية';
      }
    } else if (stepNumber === 2) {
      if (!values.responsible_person_ar.trim()) {
        errs.responsible_person_ar = 'أدخل اسم المسؤول بالعربية';
      }
      if (!values.responsible_person_en.trim()) {
        errs.responsible_person_en = 'أدخل اسم المسؤول بالإنجليزية';
      }
      if (!values.email.trim() || !values.email.includes('@')) {
        errs.email = 'أدخل بريدا إلكترونيا صحيحا';
      }
      if (!values.phone_country) {
        errs.phone_country = 'اختر مفتاح الدولة';
      }
      const rawPhone = normalizeDigits(values.phone_number).replace(/\D/g, '');
      if (rawPhone.length < 7) {
        errs.phone_number = 'أدخل رقم جوال صحيحا';
      }
    } else if (stepNumber === 3) {
      // National ID
      const rawId = normalizeDigits(values.national_id).replace(/\D/g, '');
      if (rawId.length !== 10) {
        errs.national_id = 'أدخل رقم الهوية الوطنية من 10 أرقام';
      } else if (scenario === 'id-error') {
        errs.national_id = 'رقم الهوية غير صالح. تأكد من الرقم وحاول مرة أخرى';
      }

      // Short address (e.g. JDJA7200)
      const cleanAddress = normalizeDigits(values.short_national_address).trim().toUpperCase();
      const addressRegex = /^[A-Z]{4}[0-9]{4}$/;
      if (!addressRegex.test(cleanAddress)) {
        errs.short_national_address = 'أدخل 4 أحرف متبوعة بـ 4 أرقام';
      }

      // Bank name
      if (!values.bank_name.trim()) {
        errs.bank_name = 'أدخل اسم البنك';
      }

      // IBAN
      const cleanIban = normalizeDigits(values.iban).replace(/\s+/g, '');
      if (!cleanIban) {
        errs.iban = 'أدخل رقم الآيبان';
      } else if (scenario === 'iban-error') {
        errs.iban = 'رقم الآيبان غير صالح. تأكد من الرقم وحاول مرة أخرى';
      }
    } else if (stepNumber === 4) {
      if (!values.password) {
        errs.password = 'أدخل كلمة المرور';
      }
      if (!values.password_confirmation || values.password !== values.password_confirmation) {
        errs.password_confirmation = 'تأكد من تطابق كلمتي المرور';
      }
      if (!values.terms_accepted) {
        errs.terms_accepted = 'يلزم الموافقة على الشروط والأحكام وسياسة الخصوصية';
      }
    }

    return { isValid: Object.keys(errs).length === 0, errs };
  };

  const handleNext = () => {
    const { isValid, errs } = validateStep(currentStep);
    if (!isValid) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (isSubmitting) return;
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepJump = (step: number) => {
    if (isSubmitting) return;
    if (step < currentStep) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Full form revalidation (Steps 1 through 4)
    for (let s = 1; s <= 4; s++) {
      const { isValid, errs } = validateStep(s);
      if (!isValid) {
        setErrors(errs);
        setCurrentStep(s);
        setSubmitError('راجع الحقول المحددة قبل المتابعة.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setErrors({});
    setSubmitError(null);
    setIsSubmitting(true);

    const activeScenario = scenario;

    // 1500ms simulated submission delay
    submitTimerRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      if (activeScenario === 'submit-fail') {
        setIsSubmitting(false);
        setSubmitError('تعذر إرسال الحساب للمراجعة. حاول مرة أخرى');
      } else {
        setIsSubmitting(false);
        // Clear sensitive credentials before navigation
        setValues((v) => ({ ...v, password: '', password_confirmation: '' }));
        navigate('/merchant-sign-up/pending', { state: { fromSignUp: true } });
      }
    }, 1500);
  };

  // Masking helpers for step 4 review
  const maskId = (id: string) => {
    const clean = id.trim();
    if (clean.length < 3) return '••••••';
    return `•••••••${clean.slice(-3)}`;
  };

  const maskIban = (iban: string) => {
    const clean = iban.replace(/\s+/g, '');
    if (clean.length < 4) return '••••••••';
    return `••••••••••••${clean.slice(-4)}`;
  };

  return (
    <div className="py-10 sm:py-16">
      <Container>
        {/* Page title and initial guidance */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-10 text-center sm:text-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-2">
            {t('reg.title')}
          </h1>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            {t('reg.intro')}
          </p>

          <StatusNotice type="pending" className="mt-4">
            {t('reg.notice')}
          </StatusNotice>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 cols on lg) */}
          <div className="lg:col-span-8 rounded-panel border border-line bg-surface p-5 sm:p-8 shadow-xs">
            {/* Step header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-line">
              <div>
                <span className="text-xs font-bold text-accent">
                  {t('reg.stepOf').replace('{step}', String(currentStep))}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-ink mt-0.5">
                  {stepTitles[currentStep - 1]}
                </h2>
              </div>
              <span className="text-xs text-muted">
                {t('reg.allRequired')} <span className="text-danger">*</span>
              </span>
            </div>

            {submitError && (
              <StatusNotice type="danger" className="mb-6">
                {submitError}
              </StatusNotice>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1: المنشأة والمتجر */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  {/* Entity bilingual */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="comm-ar" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        اسم الكيان التجاري بالعربية <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="comm-ar"
                        value={values.commercial_entity_ar}
                        onChange={(e) => handleChange('commercial_entity_ar', e.target.value)}
                        className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink ${
                          errors.commercial_entity_ar ? 'border-danger' : 'border-line focus:border-accent'
                        }`}
                        placeholder="مؤسسة ..."
                      />
                      {errors.commercial_entity_ar && (
                        <p className="mt-1 text-xs text-danger">{errors.commercial_entity_ar}</p>
                      )}
                      <p className="mt-1 text-[11px] text-muted">الاسم المسجل للكيان التجاري</p>
                    </div>

                    <div>
                      <label htmlFor="comm-en" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        اسم الكيان التجاري بالإنجليزية <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="comm-en"
                        dir="ltr"
                        value={values.commercial_entity_en}
                        onChange={(e) => handleChange('commercial_entity_en', e.target.value)}
                        className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink dir-ltr ${
                          errors.commercial_entity_en ? 'border-danger' : 'border-line focus:border-accent'
                        }`}
                        placeholder="Company Est."
                      />
                      {errors.commercial_entity_en && (
                        <p className="mt-1 text-xs text-danger">{errors.commercial_entity_en}</p>
                      )}
                    </div>
                  </div>

                  {/* Brand bilingual */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label htmlFor="brand-ar" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        اسم العلامة التجارية بالعربية <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="brand-ar"
                        value={values.brand_ar}
                        onChange={(e) => handleChange('brand_ar', e.target.value)}
                        className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink ${
                          errors.brand_ar ? 'border-danger' : 'border-line focus:border-accent'
                        }`}
                        placeholder="العلامة التجارية"
                      />
                      {errors.brand_ar && (
                        <p className="mt-1 text-xs text-danger">{errors.brand_ar}</p>
                      )}
                      <p className="mt-1 text-[11px] text-muted">الاسم الذي يعرف به عملاؤك علامتك التجارية</p>
                    </div>

                    <div>
                      <label htmlFor="brand-en" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        اسم العلامة التجارية بالإنجليزية <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="brand-en"
                        dir="ltr"
                        value={values.brand_en}
                        onChange={(e) => handleChange('brand_en', e.target.value)}
                        className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink dir-ltr ${
                          errors.brand_en ? 'border-danger' : 'border-line focus:border-accent'
                        }`}
                        placeholder="Brand Name"
                      />
                      {errors.brand_en && (
                        <p className="mt-1 text-xs text-danger">{errors.brand_en}</p>
                      )}
                    </div>
                  </div>

                  {/* Store bilingual */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label htmlFor="store-ar" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        اسم المتجر بالعربية <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="store-ar"
                        value={values.store_ar}
                        onChange={(e) => handleChange('store_ar', e.target.value)}
                        className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink ${
                          errors.store_ar ? 'border-danger' : 'border-line focus:border-accent'
                        }`}
                        placeholder="متجر ..."
                      />
                      {errors.store_ar && (
                        <p className="mt-1 text-xs text-danger">{errors.store_ar}</p>
                      )}
                      <p className="mt-1 text-[11px] text-muted">اسم متجرك داخل المنصة</p>
                    </div>

                    <div>
                      <label htmlFor="store-en" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        اسم المتجر بالإنجليزية <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="store-en"
                        dir="ltr"
                        value={values.store_en}
                        onChange={(e) => handleChange('store_en', e.target.value)}
                        className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink dir-ltr ${
                          errors.store_en ? 'border-danger' : 'border-line focus:border-accent'
                        }`}
                        placeholder="Store Name"
                      />
                      {errors.store_en && (
                        <p className="mt-1 text-xs text-danger">{errors.store_en}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: المسؤول وبيانات التواصل */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  {/* Person bilingual */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="resp-ar" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        اسم المسؤول بالعربية <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="resp-ar"
                        value={values.responsible_person_ar}
                        onChange={(e) => handleChange('responsible_person_ar', e.target.value)}
                        className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink ${
                          errors.responsible_person_ar ? 'border-danger' : 'border-line focus:border-accent'
                        }`}
                        placeholder="الاسم الثلاثي"
                      />
                      {errors.responsible_person_ar && (
                        <p className="mt-1 text-xs text-danger">{errors.responsible_person_ar}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="resp-en" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        اسم المسؤول بالإنجليزية <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="resp-en"
                        dir="ltr"
                        value={values.responsible_person_en}
                        onChange={(e) => handleChange('responsible_person_en', e.target.value)}
                        className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink dir-ltr ${
                          errors.responsible_person_en ? 'border-danger' : 'border-line focus:border-accent'
                        }`}
                        placeholder="Full Name"
                      />
                      {errors.responsible_person_en && (
                        <p className="mt-1 text-xs text-danger">{errors.responsible_person_en}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="reg-email" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                      البريد الإلكتروني <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id="reg-email"
                      dir="ltr"
                      value={values.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink dir-ltr ${
                        errors.email ? 'border-danger' : 'border-line focus:border-accent'
                      }`}
                      placeholder="merchant@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-danger">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone with Country selector */}
                  <div>
                    <label htmlFor="reg-phone" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                      رقم الجوال <span className="text-danger">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <select
                        value={values.phone_country}
                        onChange={(e) => handleChange('phone_country', e.target.value)}
                        className="h-11 rounded-control border border-line bg-white px-2.5 text-xs text-ink focus:border-accent"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                      <div className="sm:col-span-2">
                        <input
                          type="tel"
                          id="reg-phone"
                          dir="ltr"
                          value={values.phone_number}
                          onChange={(e) => handleChange('phone_number', e.target.value)}
                          className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink dir-ltr ${
                            errors.phone_number ? 'border-danger' : 'border-line focus:border-accent'
                          }`}
                          placeholder="5X XXX XXXX"
                        />
                      </div>
                    </div>
                    {errors.phone_number && (
                      <p className="mt-1 text-xs text-danger">{errors.phone_number}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: الهوية والعنوان والحساب البنكي */}
              {currentStep === 3 && (
                <div className="space-y-5">
                  {/* National ID */}
                  <div>
                    <label htmlFor="reg-id" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                      رقم الهوية الوطنية <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="reg-id"
                      dir="ltr"
                      value={values.national_id}
                      onChange={(e) => handleChange('national_id', e.target.value)}
                      className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink dir-ltr ${
                        errors.national_id ? 'border-danger' : 'border-line focus:border-accent'
                      }`}
                      placeholder="10 أرقام"
                    />
                    {errors.national_id && (
                      <p className="mt-1 text-xs text-danger">{errors.national_id}</p>
                    )}
                    <p className="mt-1 text-[11px] text-muted">
                      التحقق الفعلي من الهوية غير متصل في هذا النموذج التجريبي.
                    </p>
                  </div>

                  {/* Short national address */}
                  <div>
                    <label htmlFor="reg-address" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                      العنوان الوطني المختصر <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="reg-address"
                      dir="ltr"
                      value={values.short_national_address}
                      onChange={(e) => handleChange('short_national_address', e.target.value.toUpperCase())}
                      className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink dir-ltr ${
                        errors.short_national_address ? 'border-danger' : 'border-line focus:border-accent'
                      }`}
                      placeholder="JDJA7200"
                    />
                    {errors.short_national_address && (
                      <p className="mt-1 text-xs text-danger">{errors.short_national_address}</p>
                    )}
                    <p className="mt-1 text-[11px] text-muted">
                      أدخل 4 أحرف متبوعة بـ 4 أرقام، مثل JDJA7200
                    </p>
                  </div>

                  {/* Bank Name */}
                  <div>
                    <label htmlFor="reg-bank" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                      اسم البنك <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="reg-bank"
                      value={values.bank_name}
                      onChange={(e) => handleChange('bank_name', e.target.value)}
                      className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink ${
                        errors.bank_name ? 'border-danger' : 'border-line focus:border-accent'
                      }`}
                      placeholder="مثال: مصرف الراجحي / البنك الأهلي"
                    />
                    {errors.bank_name && (
                      <p className="mt-1 text-xs text-danger">{errors.bank_name}</p>
                    )}
                  </div>

                  {/* IBAN */}
                  <div>
                    <label htmlFor="reg-iban" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                      رقم الآيبان <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="reg-iban"
                      dir="ltr"
                      value={values.iban}
                      onChange={(e) => handleChange('iban', e.target.value)}
                      className={`w-full h-11 rounded-control border px-3 text-sm bg-white text-ink dir-ltr ${
                        errors.iban ? 'border-danger' : 'border-line focus:border-accent'
                      }`}
                      placeholder="SA..."
                    />
                    {errors.iban && (
                      <p className="mt-1 text-xs text-danger">{errors.iban}</p>
                    )}
                    <p className="mt-1 text-[11px] text-muted">
                      التحقق الفعلي من الآيبان غير متصل في هذا النموذج التجريبي.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 4: أمان الحساب والمراجعة */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Review of Steps 1-3 */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-ink text-sm pb-2 border-b border-line">
                      {t('reg.reviewData')}
                    </h3>

                    {/* Step 1 review */}
                    <div className="rounded-panel border border-line bg-canvas p-4 text-xs">
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-line/60">
                        <span className="font-bold text-ink">{t('reg.step1Short')}</span>
                        <button
                          type="button"
                          onClick={() => handleStepJump(1)}
                          disabled={isSubmitting}
                          className="text-accent hover:underline font-bold"
                          aria-label={t('action.edit')}
                        >
                          {t('action.edit')}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-muted">
                        <div>{language === 'en' ? 'Entity' : 'الكيان'}: <span className="text-ink font-medium">{values.commercial_entity_ar} / <span className="dir-ltr">{values.commercial_entity_en}</span></span></div>
                        <div>{language === 'en' ? 'Brand' : 'العلامة'}: <span className="text-ink font-medium">{values.brand_ar} / <span className="dir-ltr">{values.brand_en}</span></span></div>
                        <div>{language === 'en' ? 'Store' : 'المتجر'}: <span className="text-ink font-medium">{values.store_ar} / <span className="dir-ltr">{values.store_en}</span></span></div>
                      </div>
                    </div>

                    {/* Step 2 review */}
                    <div className="rounded-panel border border-line bg-canvas p-4 text-xs">
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-line/60">
                        <span className="font-bold text-ink">{t('reg.step2Short')}</span>
                        <button
                          type="button"
                          onClick={() => handleStepJump(2)}
                          disabled={isSubmitting}
                          className="text-accent hover:underline font-bold"
                          aria-label={t('action.edit')}
                        >
                          {t('action.edit')}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-muted">
                        <div>{language === 'en' ? 'Person' : 'المسؤول'}: <span className="text-ink font-medium">{values.responsible_person_ar}</span></div>
                        <div>{language === 'en' ? 'Email' : 'البريد'}: <span className="text-ink font-medium dir-ltr inline-block">{values.email}</span></div>
                        <div>{language === 'en' ? 'Phone' : 'الجوال'}: <span className="text-ink font-medium dir-ltr inline-block">{values.phone_country} {values.phone_number}</span></div>
                      </div>
                    </div>

                    {/* Step 3 review */}
                    <div className="rounded-panel border border-line bg-canvas p-4 text-xs">
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-line/60">
                        <span className="font-bold text-ink">{t('reg.step3Short')}</span>
                        <button
                          type="button"
                          onClick={() => handleStepJump(3)}
                          disabled={isSubmitting}
                          className="text-accent hover:underline font-bold"
                          aria-label={t('action.edit')}
                        >
                          {t('action.edit')}
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-muted">
                        <div>{language === 'en' ? 'National ID' : 'الهوية'}: <span className="text-ink font-medium dir-ltr inline-block">{maskId(values.national_id)}</span></div>
                        <div>{language === 'en' ? 'National Address' : 'العنوان الوطني'}: <span className="text-ink font-medium dir-ltr inline-block">{values.short_national_address}</span></div>
                        <div>{language === 'en' ? 'Bank' : 'البنك'}: <span className="text-ink font-medium">{values.bank_name}</span></div>
                        <div>{language === 'en' ? 'IBAN' : 'الآيبان'}: <span className="text-ink font-medium dir-ltr inline-block">{maskIban(values.iban)}</span></div>
                      </div>
                    </div>
                  </div>

                  {/* Passwords */}
                  <div className="pt-2 border-t border-line space-y-4">
                    <h3 className="font-bold text-ink text-sm">{t('reg.security')}</h3>

                    <div>
                      <label htmlFor="reg-pwd" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        {t('reg.pwd')} <span className="text-danger">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="reg-pwd"
                          autoComplete="new-password"
                          dir="ltr"
                          value={values.password}
                          onChange={(e) => handleChange('password', e.target.value)}
                          className={`w-full h-11 rounded-control border px-3 pl-10 text-sm bg-white text-ink dir-ltr ${
                            errors.password ? 'border-danger' : 'border-line focus:border-accent'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink p-1"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-danger">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="reg-pwd-conf" className="block text-xs sm:text-sm font-bold text-ink mb-1">
                        {t('reg.pwdConf')} <span className="text-danger">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          id="reg-pwd-conf"
                          autoComplete="new-password"
                          dir="ltr"
                          value={values.password_confirmation}
                          onChange={(e) => handleChange('password_confirmation', e.target.value)}
                          className={`w-full h-11 rounded-control border px-3 pl-10 text-sm bg-white text-ink dir-ltr ${
                            errors.password_confirmation ? 'border-danger' : 'border-line focus:border-accent'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink p-1"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password_confirmation && (
                        <p className="mt-1 text-xs text-danger">{errors.password_confirmation}</p>
                      )}
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={values.terms_accepted}
                        onChange={(e) => handleChange('terms_accepted', e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-line text-accent focus:ring-accent"
                      />
                      <span className="text-xs sm:text-sm text-ink leading-relaxed">
                        {t('reg.consent1')}{' '}
                        <Link
                          to="/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-accent hover:underline inline-flex items-center gap-0.5"
                        >
                          {t('reg.consent2')}
                          <ExternalLink className="w-3 h-3" />
                        </Link>{' '}
                        {t('reg.consent3')}{' '}
                        <Link
                          to="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-accent hover:underline inline-flex items-center gap-0.5"
                        >
                          {t('reg.consent4')}
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </span>
                    </label>
                    <p className="mt-1 text-[11px] text-muted mr-6">
                      {t('reg.consentHelper')}
                    </p>
                    {errors.terms_accepted && (
                      <p className="mt-1 text-xs text-danger mr-6">{errors.terms_accepted}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 h-11 rounded-control border border-line bg-surface text-ink text-sm font-bold hover:bg-canvas transition-colors disabled:opacity-50"
                  >
                    {t('action.prev')}
                  </button>
                ) : <div />}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto px-8 h-11 rounded-control bg-ink text-white text-sm font-bold hover:bg-black transition-colors"
                  >
                    {t('action.next')}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 h-12 rounded-control bg-ink text-white text-sm font-bold hover:bg-black transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        <span>{t('action.submitting')}</span>
                      </>
                    ) : (
                      t('action.submitRegistration')
                    )}
                  </button>
                )}
              </div>

              <p className="mt-4 text-center text-xs text-muted">
                {t('contact.demoNotice')}
              </p>
            </form>
          </div>

          {/* Stepper Rail (Desktop sidebar on right in RTL) */}
          <aside className="lg:col-span-4 rounded-panel border border-line bg-surface p-5 sm:p-6 sticky top-28">
            <h3 className="font-bold text-ink text-sm mb-4 pb-2 border-b border-line">
              {t('reg.stepsRail')}
            </h3>

            <ol className="space-y-4">
              {stepTitles.map((itemTitle, idx) => {
                const sNum = idx + 1;
                const isCurrent = sNum === currentStep;
                const isCompleted = sNum < currentStep;

                return (
                  <li key={sNum}>
                    <button
                      type="button"
                      disabled={isSubmitting || sNum > currentStep}
                      onClick={() => handleStepJump(sNum)}
                      className={`w-full flex items-center gap-3 text-start p-2 rounded-control transition-colors ${
                        isCurrent
                          ? 'bg-accent-soft text-accent font-bold'
                          : isCompleted
                          ? 'text-ink font-semibold hover:bg-canvas'
                          : 'text-muted/60 cursor-not-allowed'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold font-latin ${
                          isCurrent
                            ? 'bg-accent text-white'
                            : isCompleted
                            ? 'bg-ok-soft text-ok border border-ok/30'
                            : 'bg-canvas text-muted border border-line'
                        }`}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : sNum}
                      </span>
                      <span className="text-xs sm:text-sm">{itemTitle}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-8 pt-4 border-t border-line text-xs text-muted leading-relaxed">
              {t('reg.stepsNote')}
            </div>
          </aside>
        </div>
      </Container>

      {/* Demo error injection tool */}
      <DemoPanel mode="register" />
    </div>
  );
}
