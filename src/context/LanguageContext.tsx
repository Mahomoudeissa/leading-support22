import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const DICTIONARY: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'خدماتنا',
    'nav.howItWorks': 'كيف نعمل',
    'nav.about': 'من نحن',
    'nav.contact': 'تواصل معنا',
    'nav.login': 'دخول التاجر',
    'nav.signup': 'سجل متجرك',
    'nav.backHome': 'العودة للرئيسية',

    // Language switcher
    'lang.switch': 'English',
    'lang.label': 'تغيير اللغة',
    'lang.current': 'العربية',

    // General footer
    'footer.desc': 'تخزين وتجهيز طلبات وشحن وإدارة مرتجعات للمتاجر الإلكترونية، مع متابعة واضحة من مكان واحد.',
    'footer.coreServices': 'الخدمات الأساسية',
    'footer.extraServices': 'الخدمات الإضافية',
    'footer.viewAllServices': 'عرض جميع الخدمات',
    'footer.quickLinks': 'روابط سريعة',
    'footer.merchantPortal': 'بوابة التاجر',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'الشروط والأحكام',
    'footer.faq': 'الأسئلة الشائعة',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.entity': 'الكيان',
    'footer.cr': 'السجل التجاري',
    'footer.unified': 'الرقم الموحد',
    'footer.vat': 'الرقم الضريبي',
    'footer.newWindow': '(يفتح في نافذة جديدة)',
    'footer.registerNew': 'تسجيل متجر جديد',

    // Common actions
    'action.exploreServices': 'اكتشف خدماتنا',
    'action.inquire': 'استفسر عن الخدمة',
    'action.inquireDetails': 'استفسر عن تفاصيل الخدمة',
    'action.allFaqs': 'جميع الأسئلة الشائعة',
    'action.learnMore': 'اعرف أكثر',
    'action.details': 'التفاصيل',
    'action.next': 'التالي',
    'action.prev': 'السابق',
    'action.edit': 'تعديل',
    'action.submitRegistration': 'إنشاء الحساب وإرساله للمراجعة',
    'action.submitting': 'جار إرسال الحساب للمراجعة…',
    'action.sendInquiry': 'إرسال الاستفسار',
    'action.sendingInquiry': 'جار الإرسال…',
    'action.sendAnother': 'إرسال استفسار آخر',
    'action.backToTop': 'العودة إلى أعلى الصفحة',
    'action.filterAll': 'الكل',
    'action.filterCore': 'الخدمات الأساسية',
    'action.filterExtra': 'الخدمات الإضافية',
    'action.loginPortal': 'الدخول إلى بوابة التاجر',

    // Hero & Home
    'hero.eyebrow': 'التخزين وتجهيز الطلبات للمتاجر الإلكترونية',
    'hero.titleLine1': 'أرسل مخزونك.',
    'hero.titleLine2': 'ودع الباقي علينا.',
    'hero.body': 'نخزن منتجاتك، ونجهز طلباتك، ونتولى شحنها وإدارة مرتجعاتها. وأنت تتابع مخزونك وطلباتك من مكان واحد.',
    'hero.helper': 'إنشاء الحساب يخضع لموافقة الإدارة.',
    'hero.badgeAvailable': 'المخزون متاح',
    'hero.badgeProcessing': 'الطلب قيد التجهيز',
    'hero.artLabel': 'تخزين منظم وطرود مهيأة للشحن',

    // Value Strip
    'value.storage.title': 'تخزين منظم',
    'value.storage.desc': 'تسجيل مواقع الأصناف وحركة كل كمية بدقة',
    'value.fulfil.title': 'تجهيز الطلبات',
    'value.fulfil.desc': 'جمع المنتجات والتغليف وتنسيق خيارات الشحن',
    'value.tracking.title': 'متابعة واضحة',
    'value.tracking.desc': 'اطلاع على المستودع والطلبات والمالية من البوابة',

    // Home Services Section
    'home.services.eyebrow': 'خدماتنا',
    'home.services.title': 'من تخزين المنتج إلى تجهيز الطلب',
    'home.services.intro': 'خدمات مترابطة تساعدك على إدارة مخزونك وتنفيذ طلباتك من مكان واحد.',
    'home.services.viewAll': 'عرض جميع الخدمات',
    'home.services.extraTitle': 'خدمات إضافية بحسب احتياج متجرك',
    'home.services.extraDesc': 'تطلب من بوابة التاجر بعد اعتماد الحساب وتشمل التصوير والتغليف وتجهيز الملصقات.',
    'home.services.extraLink': 'استعراض الخدمات الإضافية',

    // How it works
    'howItWorks.eyebrow': 'كيف نعمل',
    'howItWorks.title': 'خطوات واضحة لبداية منظمة',
    'howItWorks.intro': 'مسار متسلسل من تسجيل المتجر حتى متابعة العمليات اليومية.',

    // Merchant Portal Preview Section
    'portal.eyebrow': 'بوابة التاجر',
    'portal.title': 'صورة أوضح لمخزونك وطلباتك',
    'portal.body': 'تابع المتاح والمحجوز، واطلع على مراحل الطلبات وسجلات المحفظة والفواتير من بوابة التاجر.',
    'portal.demoBadge': 'عرض توضيحي للمنصة',
    'portal.tab.inventory': 'المخزون',
    'portal.tab.orders': 'الطلبات',
    'portal.tab.invoices': 'الفواتير',
    'portal.inv.available': 'متاح',
    'portal.inv.reserved': 'محجوز',
    'portal.inv.damaged': 'تالف',
    'portal.inv.item1': 'قهوة مختصة — عبوة توضيحية',
    'portal.inv.item2': 'كوب سيراميك — عبوة توضيحية',
    'portal.inv.item3': 'أدوات تحضير — عبوة توضيحية',
    'portal.order1.title': 'طلب توضيحي 1',
    'portal.order1.desc': '3 منتجات — شحن عبر المنصة',
    'portal.order1.status': 'قيد التجهيز',
    'portal.order2.title': 'طلب توضيحي 2',
    'portal.order2.desc': 'منتج واحد — بوليصة التاجر',
    'portal.order2.status': 'قيد التغليف',
    'portal.order3.title': 'طلب توضيحي 3',
    'portal.order3.desc': 'منتجان — تسليم شركة الشحن',
    'portal.order3.status': 'جاهز للاستلام',
    'portal.inv1.title': 'فاتورة توضيحية',
    'portal.inv1.desc': 'رسوم تخزين وتنفيذ شهرية',
    'portal.inv2.title': 'سجل محفظة توضيحي',
    'portal.inv2.desc': 'عمولة طلبات مكتملة',
    'portal.inv3.title': 'سجل محفظة توضيحي',
    'portal.inv3.desc': 'رسوم شحن مستحقة',
    'portal.demoData': 'بيانات توضيحية',

    // Fees Section
    'fees.eyebrow': 'الرسوم',
    'fees.title': 'تكلفة تتناسب مع استخدامك',
    'fees.intro': 'تتحدد الرسوم حسب اتفاق متجرك والخدمات المستخدمة.',
    'fees.fulfil.label': 'تنفيذ الطلبات',
    'fees.fulfil.desc': 'عمولة متفق عليها على قيمة المنتجات في الطلبات المكتملة.',
    'fees.shipping.label': 'الشحن عبر المنصة',
    'fees.shipping.desc': 'رسوم توصيل عند اختيار الشحن من خلالنا.',
    'fees.storage.label': 'التخزين',
    'fees.storage.desc': 'رسوم شهرية على الكميات التي تتجاوز السعة المجانية المتفق عليها لمتجرك.',
    'fees.extra.label': 'الخدمات الإضافية',
    'fees.extra.desc': 'تسعير بحسب نوع الخدمة ووحدة احتسابها.',

    // FAQ Section Preview
    'faqPreview.eyebrow': 'أسئلة شائعة',
    'faqPreview.title': 'إجابات سريعة قبل أن تبدأ',

    // Closing CTA
    'cta.title': 'خل تجهيز الطلبات علينا، وركز على نمو متجرك.',
    'cta.body': 'ابدأ بتسجيل بيانات متجرك، وخل الخطوة التالية واضحة.',
    'cta.helper': 'تتم مراجعة الحساب من الإدارة قبل التفعيل.',

    // Services Pages
    'services.listing.title': 'خدمات تدعم كل خطوة في متجرك',
    'services.listing.intro': 'اختر الخدمة التي تريد التعرف عليها، من التخزين وتجهيز الطلبات إلى الأعمال الإضافية للمنتجات',
    'services.core': 'خدمات أساسية',
    'services.extra': 'خدمات إضافية',
    'services.whatIncluded': 'ما الذي تشمله الخدمة؟',
    'services.whatIncludedIntro': 'تفاصيل الأنشطة المشمولة والمنظمة لضمان دقة العمليات.',
    'services.howBeneficial': 'كيف تستفيد منها؟',
    'services.howBeneficialIntro': 'خطوات تطبيق الخدمة مع صورة للمعلومات الظاهرة في بوابة التاجر.',
    'services.serviceFaq': 'أسئلة عن هذه الخدمة',
    'services.related': 'خدمات مرتبطة',
    'services.extraNotice': 'تقدم طلبات الخدمات الإضافية من بوابة التاجر بعد اعتماد الحساب.',
    'services.readySignup': 'ابدأ بتسجيل بيانات متجرك',
    'services.readySignupDesc': 'سجل متجرك الآن وانتظر اعتماد الإدارة للبدء في الاستفادة من الخدمات.',

    // About Page
    'about.title': 'نساند متجرك في كل خطوة تشغيلية',
    'about.intro': 'الدعم الرائدة تقدم خدمات التخزين وتجهيز الطلبات والشحن وإدارة المرتجعات للمتاجر الإلكترونية، مع بوابة تتيح للتاجر متابعة عملياته وسجلاته من مكان واحد.',
    'about.ownership.title': 'أنت تملك المنتج، ونحن نتولى التشغيل',
    'about.ownership.body': 'تظل المنتجات ملكا لمتجرك أثناء وجودها في المستودع. نقدم خدمات التخزين والتنفيذ نيابة عنك، وتتابع أنت المخزون والطلبات والمرتجعات والسجلات المالية من بوابة التاجر.',
    'about.table.weHandle': 'نتولى نحن',
    'about.table.youKeep': 'يبقى لك',
    'about.table.row1We': 'استلام المنتجات وتخزينها',
    'about.table.row1You': 'ملكية المنتجات',
    'about.table.row2We': 'تجهيز الطلبات وتغليفها',
    'about.table.row2You': 'متجرك وعلامتك التجارية',
    'about.table.row3We': 'تنسيق الشحن',
    'about.table.row3You': 'قرار مسار الشحن',
    'about.table.row4We': 'استقبال المرتجعات وفحصها',
    'about.table.row4You': 'متابعة السجلات والفواتير',
    'about.principles.eyebrow': 'قيمنا التشغيلية',
    'about.principles.title': 'ثلاثة مبادئ في عملنا',
    'about.principles.intro': 'الأسس التي نبني عليها عمليات التخزين والتنفيذ لكل متجر شريك.',
    'about.p1.title': 'وضوح المتابعة',
    'about.p1.desc': 'يتابع التاجر مخزونه وطلباته وسجلاته من بوابة واحدة.',
    'about.p2.title': 'تنظيم العمليات',
    'about.p2.desc': 'من الاستلام إلى التجهيز، لكل مرحلة تسجيل ومكان معروف.',
    'about.p3.title': 'ترابط الخدمات',
    'about.p3.desc': 'التخزين والتجهيز والشحن والمرتجعات تعمل معا كسلسلة واحدة.',
    'about.cta.title': 'جاهز لتسجيل متجرك؟',
    'about.cta.desc': 'أنشئ حسابك وأرسله لمراجعة الإدارة للبدء في تشغيل عملياتك معنا.',

    // Contact Page
    'contact.title': 'خلنا نفهم احتياج متجرك',
    'contact.intro': 'أرسل استفسارك عن الخدمات أو التسجيل، مع توضيح ما تحتاجه لمتجرك.',
    'contact.success': 'تمت محاكاة إرسال الاستفسار بنجاح',
    'contact.successSub': 'هذا نموذج تجريبي للتصميم — لم يتم إرسال بيانات إلى خادم حقيقي.',
    'contact.error': 'تعذر إرسال الاستفسار. حاول مرة أخرى',
    'contact.errorSub': 'حدث خطأ أثناء محاكاة الإرسال (بناء على سيناريو الأخطاء التجريبي المختار).',
    'contact.name': 'الاسم',
    'contact.namePlaceholder': 'اسمك الكريم',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'رقم الجوال',
    'contact.optional': '(اختياري)',
    'contact.topic': 'موضوع الاستفسار',
    'contact.topicServices': 'الخدمات',
    'contact.topicSignup': 'تسجيل متجر',
    'contact.topicGeneral': 'استفسار عام',
    'contact.message': 'الرسالة',
    'contact.messagePlaceholder': 'وضح ما يحتاجه متجرك من خدمات أو استفسارات...',
    'contact.demoNotice': 'نموذج تجريبي للتصميم — لا يتم إرسال البيانات.',
    'contact.sidebar.title': 'قبل أن تراسلنا',
    'contact.sidebar.desc': 'قد تجد إجابتك في صفحة الأسئلة الشائعة. وإن كنت جاهزا، يمكنك تسجيل متجرك مباشرة لبدء مراجعة الحساب.',
    'contact.sidebar.faq': 'استعراض الأسئلة الشائعة',
    'contact.sidebar.signup': 'تسجيل متجر جديد',
    'contact.sidebar.official': 'بيانات المنشأة الرسمية:',

    // FAQ Page
    'faq.title': 'الأسئلة الشائعة',
    'faq.intro': 'إجابات عملية عن التسجيل والمخزون والشحن والمرتجعات والرسوم.',
    'faq.sections': 'الأقسام:',
    'faq.notFound': 'لم تجد إجابة سؤالك؟',
    'faq.notFoundSub': 'فريقنا مستعد للإجابة عن أي استفسار يتعلق بخدمات التخزين والتنفيذ.',

    // 404
    '404.title': 'الصفحة غير موجودة',
    '404.desc': 'قد يكون الرابط غير صحيح أو تم تغيير الصفحة.',
    '404.explore': 'استعرض الخدمات',

    // Registration Page
    'reg.title': 'سجل متجرك في الدعم الرائدة',
    'reg.intro': 'أكمل بيانات متجرك لإنشاء حساب وإرساله لمراجعة الإدارة. يمكنك استخدام خدمات المنصة بعد الموافقة على الحساب.',
    'reg.notice': 'يخضع الحساب لمراجعة الإدارة، ولا تتاح عمليات المخزون والطلبات قبل الموافقة.',
    'reg.stepOf': 'الخطوة {step} من 4',
    'reg.allRequired': 'جميع الحقول مطلوبة',
    'reg.stepsRail': 'خطوات التسجيل',
    'reg.stepsNote': 'تتم مراجعة الحساب من الإدارة قبل تفعيل إمكانية شحن وتخزين المنتجات.',
    'reg.reviewData': 'مراجعة البيانات المدخلة',
    'reg.step1Short': '1. المنشأة والمتجر',
    'reg.step2Short': '2. المسؤول والتواصل',
    'reg.step3Short': '3. الهوية والبنك',
    'reg.security': 'أمان الحساب',
    'reg.pwd': 'كلمة المرور',
    'reg.pwdConf': 'تأكيد كلمة المرور',
    'reg.consent1': 'أوافق على',
    'reg.consent2': 'الشروط والأحكام',
    'reg.consent3': 'و',
    'reg.consent4': 'سياسة الخصوصية',
    'reg.consentHelper': 'تفتح الصفحتان في نافذة جديدة دون فقدان بياناتك.',

    // Pending Page
    'pending.demoNotice': 'تمت محاكاة تقديم طلب التسجيل بنجاح في بيئة العرض التوضيحي. لم يتم إرسال بيانات إلى خادم تشغيلي حقيقي.',
    'pending.badge': 'بانتظار موافقة الإدارة',
    'pending.title': 'تم إنشاء حسابك وهو بانتظار موافقة الإدارة',
    'pending.desc': 'تم إرسال بيانات متجرك للمراجعة. يمكنك استخدام خدمات المنصة بعد اعتماد حسابك.',
    'pending.timelineTitle': 'مراحل تفعيل الحساب',
    'pending.stage1.title': 'إنشاء الحساب',
    'pending.stage1.status': 'مكتمل',
    'pending.stage1.desc': 'تم إدخال كافة بيانات المنشأة والمتجر والحساب البنكي بنجاح.',
    'pending.stage2.title': 'مراجعة الإدارة',
    'pending.stage2.status': 'بانتظار المراجعة',
    'pending.stage2.desc': 'يقوم فريق الدعم الرائدة بمراجعة بيانات متجرك ومطابقتها قبل التفعيل.',
    'pending.stage3.title': 'تفعيل الحساب',
    'pending.stage3.status': 'بعد الموافقة',
    'pending.stage3.desc': 'إتاحة الوصول الكامل لإنشاء طلبات المخزون وشحن الطلبات عبر بوابة التاجر.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.howItWorks': 'How It Works',
    'nav.about': 'About Us',
    'nav.contact': 'Contact Us',
    'nav.login': 'Merchant Login',
    'nav.signup': 'Register Store',
    'nav.backHome': 'Back to Home',

    // Language switcher
    'lang.switch': 'العربية',
    'lang.label': 'Change language',
    'lang.current': 'English',

    // General footer
    'footer.desc': 'Warehousing, order fulfilment, shipping, and returns management for e-commerce stores with single-platform visibility.',
    'footer.coreServices': 'Core Services',
    'footer.extraServices': 'Additional Services',
    'footer.viewAllServices': 'View all services',
    'footer.quickLinks': 'Quick Links',
    'footer.merchantPortal': 'Merchant Portal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.faq': 'FAQ',
    'footer.rights': 'All rights reserved',
    'footer.entity': 'Entity',
    'footer.cr': 'Commercial Registration',
    'footer.unified': 'Unified ID',
    'footer.vat': 'VAT Number',
    'footer.newWindow': '(opens in new tab)',
    'footer.registerNew': 'Register New Store',

    // Common actions
    'action.exploreServices': 'Explore Services',
    'action.inquire': 'Inquire About Service',
    'action.inquireDetails': 'Inquire About Service Details',
    'action.allFaqs': 'All FAQs',
    'action.learnMore': 'Learn More',
    'action.details': 'Details',
    'action.next': 'Next',
    'action.prev': 'Previous',
    'action.edit': 'Edit',
    'action.submitRegistration': 'Create Account & Submit for Review',
    'action.submitting': 'Submitting Account for Review…',
    'action.sendInquiry': 'Send Inquiry',
    'action.sendingInquiry': 'Sending…',
    'action.sendAnother': 'Send Another Inquiry',
    'action.backToTop': 'Back to top',
    'action.filterAll': 'All',
    'action.filterCore': 'Core Services',
    'action.filterExtra': 'Additional Services',
    'action.loginPortal': 'Login to Merchant Portal',

    // Hero & Home
    'hero.eyebrow': 'E-commerce Storage & Order Fulfilment',
    'hero.titleLine1': 'Send Your Inventory.',
    'hero.titleLine2': 'Leave the Rest to Us.',
    'hero.body': 'We store your products, prepare and package your orders, and manage shipping and customer returns—while you monitor everything from one place.',
    'hero.helper': 'Account creation is subject to management approval.',
    'hero.badgeAvailable': 'Inventory Available',
    'hero.badgeProcessing': 'Order in Preparation',
    'hero.artLabel': 'Organized warehouse storage and staged parcels',

    // Value Strip
    'value.storage.title': 'Organized Storage',
    'value.storage.desc': 'Accurate SKU slotting and item movement tracking',
    'value.fulfil.title': 'Order Preparation',
    'value.fulfil.desc': 'Item picking, packaging, and coordinated shipping options',
    'value.tracking.title': 'Clear Visibility',
    'value.tracking.desc': 'Real-time inventory, order, and financial monitoring in the portal',

    // Home Services Section
    'home.services.eyebrow': 'Our Services',
    'home.services.title': 'From Product Intake to Order Dispatch',
    'home.services.intro': 'Interconnected services that help manage inventory and fulfill orders from a single platform.',
    'home.services.viewAll': 'View all services',
    'home.services.extraTitle': 'Additional Services Tailored to Your Needs',
    'home.services.extraDesc': 'Ordered directly via the Merchant Portal after approval, including photography, custom packaging, and labelling.',
    'home.services.extraLink': 'Explore Additional Services',

    // How it works
    'howItWorks.eyebrow': 'How We Work',
    'howItWorks.title': 'Clear Steps for a Smooth Start',
    'howItWorks.intro': 'A seamless workflow from store registration to daily fulfilment operations.',

    // Merchant Portal Preview Section
    'portal.eyebrow': 'Merchant Portal',
    'portal.title': 'A Clearer Picture of Your Inventory & Orders',
    'portal.body': 'Monitor available and reserved counts, and view order preparation stages, wallet entries, and invoices from the Merchant Portal.',
    'portal.demoBadge': 'Platform Demo View',
    'portal.tab.inventory': 'Inventory',
    'portal.tab.orders': 'Orders',
    'portal.tab.invoices': 'Invoices',
    'portal.inv.available': 'Available',
    'portal.inv.reserved': 'Reserved',
    'portal.inv.damaged': 'Damaged',
    'portal.inv.item1': 'Specialty Coffee — Demo Item',
    'portal.inv.item2': 'Ceramic Mug — Demo Item',
    'portal.inv.item3': 'Brewing Kit — Demo Item',
    'portal.order1.title': 'Sample Order 1',
    'portal.order1.desc': '3 items — Platform Shipping',
    'portal.order1.status': 'In Preparation',
    'portal.order2.title': 'Sample Order 2',
    'portal.order2.desc': '1 item — Merchant Carrier Waybill',
    'portal.order2.status': 'Packaging',
    'portal.order3.title': 'Sample Order 3',
    'portal.order3.desc': '2 items — Handed to Carrier',
    'portal.order3.status': 'Ready for Pickup',
    'portal.inv1.title': 'Sample Monthly Invoice',
    'portal.inv1.desc': 'Monthly storage & handling fees',
    'portal.inv2.title': 'Sample Wallet Record',
    'portal.inv2.desc': 'Completed order commission',
    'portal.inv3.title': 'Sample Wallet Record',
    'portal.inv3.desc': 'Shipping fees charged',
    'portal.demoData': 'Demo Data',

    // Fees Section
    'fees.eyebrow': 'Pricing & Fees',
    'fees.title': 'Costs Proportional to Your Usage',
    'fees.intro': 'Fees are determined according to your store agreement and the services utilized.',
    'fees.fulfil.label': 'Order Fulfilment',
    'fees.fulfil.desc': 'Agreed commission on product value of completed orders.',
    'fees.shipping.label': 'Platform Shipping',
    'fees.shipping.desc': 'Delivery fees applied when choosing shipping through our contracted rates.',
    'fees.storage.label': 'Warehousing',
    'fees.storage.desc': 'Monthly fee on storage quantities exceeding agreed store allowance.',
    'fees.extra.label': 'Additional Services',
    'fees.extra.desc': 'Priced per service type and configured calculation unit.',

    // FAQ Section Preview
    'faqPreview.eyebrow': 'FAQ',
    'faqPreview.title': 'Quick Answers Before You Begin',

    // Closing CTA
    'cta.title': 'Leave Order Fulfilment to Us, and Focus on Growing Your Store.',
    'cta.body': 'Start by registering your store details, and make your next step effortless.',
    'cta.helper': 'Accounts are reviewed by management before activation.',

    // Services Pages
    'services.listing.title': 'Services Supporting Every Step of Your Store',
    'services.listing.intro': 'Choose the service you wish to explore, from warehousing and order fulfilment to custom product handling.',
    'services.core': 'Core Services',
    'services.extra': 'Additional Services',
    'services.whatIncluded': 'What Does the Service Include?',
    'services.whatIncludedIntro': 'Detailed and structured activities designed for operational accuracy.',
    'services.howBeneficial': 'How to Benefit From It?',
    'services.howBeneficialIntro': 'Step-by-step workflow with an overview of related Merchant Portal data.',
    'services.serviceFaq': 'Questions About This Service',
    'services.related': 'Related Services',
    'services.extraNotice': 'Additional services are requested from the Merchant Portal after account approval.',
    'services.readySignup': 'Start by Registering Your Store',
    'services.readySignupDesc': 'Register your store now and await management approval to start leveraging our logistics services.',

    // About Page
    'about.title': 'Supporting Your Store at Every Operational Step',
    'about.intro': 'Leading Support delivers warehousing, order fulfilment, shipping, and returns management for e-commerce retailers, paired with a unified portal to track operations from one place.',
    'about.ownership.title': 'You Own the Inventory; We Run Operations',
    'about.ownership.body': 'Products remain the sole property of your store while stored in the warehouse. We provide storage and fulfilment on your behalf, and you monitor inventory, orders, returns, and billing through the Merchant Portal.',
    'about.table.weHandle': 'We Handle',
    'about.table.youKeep': 'You Retain',
    'about.table.row1We': 'Receiving & Storing Inventory',
    'about.table.row1You': 'Full Ownership of Products',
    'about.table.row2We': 'Picking & Packaging Orders',
    'about.table.row2You': 'Your Store & Brand Identity',
    'about.table.row3We': 'Shipping Coordination',
    'about.table.row3You': 'Shipping Route Decision',
    'about.table.row4We': 'Receiving & Inspecting Returns',
    'about.table.row4You': 'Access to Records & Invoices',
    'about.principles.eyebrow': 'Operational Values',
    'about.principles.title': 'Three Principles Guiding Our Work',
    'about.principles.intro': 'The foundations on which we build storage and fulfilment for every partner merchant.',
    'about.p1.title': 'Transparent Visibility',
    'about.p1.desc': 'Merchants monitor stock levels, orders, and financial statements from a single portal.',
    'about.p2.title': 'Systematic Operations',
    'about.p2.desc': 'From intake to packing, every stage has a designated checkpoint and recorded status.',
    'about.p3.title': 'Interconnected Services',
    'about.p3.desc': 'Warehousing, fulfilment, shipping, and returns operate as one cohesive logistics chain.',
    'about.cta.title': 'Ready to Register Your Store?',
    'about.cta.desc': 'Create your merchant account and submit it for management review to start operations.',

    // Contact Page
    'contact.title': 'Let Us Understand Your Store’s Needs',
    'contact.intro': 'Send your inquiry regarding our services or onboarding, outlining what your store requires.',
    'contact.success': 'Inquiry Submission Simulated Successfully',
    'contact.successSub': 'This is a demo prototype form—no data was sent to a live production server.',
    'contact.error': 'Failed to Submit Inquiry. Please Try Again',
    'contact.errorSub': 'An error occurred during simulated submission (triggered by the active demo error scenario).',
    'contact.name': 'Full Name',
    'contact.namePlaceholder': 'Your name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.optional': '(optional)',
    'contact.topic': 'Inquiry Topic',
    'contact.topicServices': 'Services',
    'contact.topicSignup': 'Store Registration',
    'contact.topicGeneral': 'General Inquiry',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Explain what your store needs in terms of logistics or questions...',
    'contact.demoNotice': 'Design demo prototype—no data is permanently transmitted.',
    'contact.sidebar.title': 'Before You Contact Us',
    'contact.sidebar.desc': 'You might find answers in our FAQ page. If you are ready, you can register your store directly to start review.',
    'contact.sidebar.faq': 'Browse Frequently Asked Questions',
    'contact.sidebar.signup': 'Register New Store',
    'contact.sidebar.official': 'Official Entity Information:',

    // FAQ Page
    'faq.title': 'Frequently Asked Questions',
    'faq.intro': 'Practical answers regarding registration, inventory, shipping, returns, and pricing.',
    'faq.sections': 'Categories:',
    'faq.notFound': 'Didn’t find your answer?',
    'faq.notFoundSub': 'Our team is ready to answer any questions regarding storage and fulfilment services.',

    // 404
    '404.title': 'Page Not Found',
    '404.desc': 'The link may be broken or the page has been moved.',
    '404.explore': 'Explore Services',

    // Registration Page
    'reg.title': 'Register Your Store at Leading Support',
    'reg.intro': 'Complete your store information to create an account and submit it for management review. Platform services become accessible upon approval.',
    'reg.notice': 'Accounts are subject to management review. Inventory intake and order operations are unlocked upon approval.',
    'reg.stepOf': 'Step {step} of 4',
    'reg.allRequired': 'All fields are required',
    'reg.stepsRail': 'Registration Steps',
    'reg.stepsNote': 'Account approval precedes operational access to shipping and storage facilities.',
    'reg.reviewData': 'Review Entered Information',
    'reg.step1Short': '1. Entity & Store',
    'reg.step2Short': '2. Person & Contact',
    'reg.step3Short': '3. Identity & Bank',
    'reg.security': 'Account Security',
    'reg.pwd': 'Password',
    'reg.pwdConf': 'Confirm Password',
    'reg.consent1': 'I agree to the',
    'reg.consent2': 'Terms & Conditions',
    'reg.consent3': 'and',
    'reg.consent4': 'Privacy Policy',
    'reg.consentHelper': 'Both documents open in a new tab without losing your form progress.',

    // Pending Page
    'pending.demoNotice': 'Store registration request simulated successfully in the prototype environment. No live server records were created.',
    'pending.badge': 'Awaiting Management Approval',
    'pending.title': 'Your Account Is Created and Awaiting Management Approval',
    'pending.desc': 'Your store information has been submitted for review. You can access platform services once your account is verified.',
    'pending.timelineTitle': 'Account Activation Stages',
    'pending.stage1.title': 'Account Creation',
    'pending.stage1.status': 'Completed',
    'pending.stage1.desc': 'Entity, store, identity, and bank account information successfully captured.',
    'pending.stage2.title': 'Management Review',
    'pending.stage2.status': 'Under Review',
    'pending.stage2.desc': 'The Leading Support team is reviewing and verifying your store data prior to activation.',
    'pending.stage3.title': 'Account Activation',
    'pending.stage3.status': 'Upon Approval',
    'pending.stage3.desc': 'Full operational access to inventory intake and order fulfilment via the Merchant Portal.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  direction: 'rtl',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('app_lang') as Language;
      return saved === 'en' || saved === 'ar' ? saved : 'ar';
    } catch {
      return 'ar';
    }
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', direction);

    // Apply or remove RTL/LTR classes
    if (direction === 'rtl') {
      root.classList.add('rtl');
      root.classList.remove('ltr');
    } else {
      root.classList.add('ltr');
      root.classList.remove('rtl');
    }

    try {
      localStorage.setItem('app_lang', language);
    } catch {
      // Ignore in restricted environments
    }
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string): string => {
    return DICTIONARY[language]?.[key] || DICTIONARY.ar[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
