import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { serviceBySlug, SERVICES } from '../content';

interface MetaConfig {
  title: string;
  description: string;
}

export function getRouteMeta(pathname: string): MetaConfig {
  // Normalize path without trailing slash (except root)
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  if (path === '/') {
    return {
      title: 'الدعم الرائدة — تخزين وتجهيز طلبات للمتاجر الإلكترونية',
      description: 'نخزن منتجاتك، ونجهز طلباتك، ونتولى شحنها وإدارة مرتجعاتها للمتاجر الإلكترونية مع متابعة من مكان واحد.',
    };
  }

  if (path === '/services') {
    return {
      title: 'خدماتنا — الدعم الرائدة',
      description: 'استعرض خدمات الدعم الرائدة: التخزين، تجهيز الطلبات، تنسيق الشحن، إدارة المرتجعات، وتصوير وتجهيز المنتجات.',
    };
  }

  if (path.startsWith('/services/')) {
    const slug = path.replace('/services/', '');
    const service = serviceBySlug(slug);
    if (service) {
      return {
        title: `${service.title} — الدعم الرائدة`,
        description: service.card || service.hero,
      };
    }
  }

  if (path === '/about') {
    return {
      title: 'من نحن — الدعم الرائدة',
      description: 'مؤسسة الدعم الرائدة التجارية: نساند متجرك في كل خطوة تشغيلية من التخزين إلى تنفيذ الطلبات والشحن.',
    };
  }

  if (path === '/contact') {
    return {
      title: 'تواصل معنا — الدعم الرائدة',
      description: 'تواصل مع فريق الدعم الرائدة واستفسر عن خدمات التخزين والتنفيذ وشحن الطلبات لمتجرك الإلكتروني.',
    };
  }

  if (path === '/faq') {
    return {
      title: 'الأسئلة الشائعة — الدعم الرائدة',
      description: 'إجابات عملية عن التسجيل، إدارة المخزون، مسارات الشحن، التعامل مع المرتجعات، والرسوم في منصة الدعم الرائدة.',
    };
  }

  if (path === '/privacy') {
    return {
      title: 'سياسة الخصوصية — الدعم الرائدة',
      description: 'سياسة الخصوصية لخدمات الدعم الرائدة وتوضيح حماية بيانات المنشآت والمتاجر المسجلة.',
    };
  }

  if (path === '/terms') {
    return {
      title: 'الشروط والأحكام — الدعم الرائدة',
      description: 'الشروط والأحكام المنظمة لخدمات التخزين وتجهيز الطلبات وتنسيق الشحن لدى مؤسسة الدعم الرائدة.',
    };
  }

  if (path === '/merchant-sign-up') {
    return {
      title: 'تسجيل متجر جديد — الدعم الرائدة',
      description: 'سجل متجرك الإلكتروني في منصة الدعم الرائدة وأرسل بياناتك لمراجعة واعتماد الإدارة.',
    };
  }

  if (path === '/merchant-sign-up/pending') {
    return {
      title: 'حسابك بانتظار الموافقة — الدعم الرائدة',
      description: 'طلب تسجيل متجرك قيد مراجعة الإدارة وسيبدأ تفعيل خدمات التخزين والتنفيذ فور الاعتماد.',
    };
  }

  // Fallback for 404 or unknown routes
  return {
    title: 'الصفحة غير موجودة — الدعم الرائدة',
    description: 'الصفحة التي طلبتها غير متوفرة أو تم تغيير رابطها. استعرض خدماتنا أو عد إلى الصفحة الرئيسية.',
  };
}

/**
 * Dynamic Meta Manager: listens to route changes and updates document.title,
 * standard meta description, OpenGraph (og:title, og:description, og:url),
 * and Twitter Card (twitter:title, twitter:description) tags for optimal SEO.
 */
export function MetaManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);

    // 1. Update Document Title
    document.title = meta.title;

    // Helper to update or create a meta tag
    const updateMetaTag = (attributeName: 'name' | 'property', attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Description
    updateMetaTag('name', 'description', meta.description);

    // 3. OpenGraph Tags
    updateMetaTag('property', 'og:title', meta.title);
    updateMetaTag('property', 'og:description', meta.description);
    updateMetaTag('property', 'og:url', window.location.origin + pathname);

    // 4. Twitter Card Tags
    updateMetaTag('name', 'twitter:title', meta.title);
    updateMetaTag('name', 'twitter:description', meta.description);
  }, [pathname]);

  return null;
}
