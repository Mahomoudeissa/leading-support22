import React from 'react';
import { Link } from 'react-router';
import {
  Boxes,
  PackageCheck,
  Truck,
  Undo2,
  Camera,
  Tag,
  Repeat2,
  ArrowLeft,
  ArrowRight,
  LucideIcon,
} from 'lucide-react';
import { Service, ServiceKind } from '../content';
import { SERVICES_EN } from '../content-en';
import { Art } from './Art';
import { useLanguage } from '../context/LanguageContext';

export const SERVICE_ICONS: Record<ServiceKind, LucideIcon> = {
  storage: Boxes,
  fulfil: PackageCheck,
  shipping: Truck,
  returns: Undo2,
  photo: Camera,
  label: Tag,
  repack: Repeat2,
};

export function ServiceCard({ service }: { service: Service }) {
  const { language, t } = useLanguage();
  const IconComponent = SERVICE_ICONS[service.kind] || Boxes;
  const enData = SERVICES_EN[service.slug];
  const title = language === 'en' && enData ? enData.title : service.title;
  const cardDesc = language === 'en' && enData ? enData.card : service.card;
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <article className="group flex flex-col justify-between rounded-panel border border-line bg-surface p-5 sm:p-6 transition-all duration-200 hover:border-ink/20 hover:shadow-soft">
      <div>
        <div className="relative mb-5 overflow-hidden rounded-lg aspect-[16/9] bg-canvas border border-line/60">
          <Art kind={service.kind} label={title} />
        </div>
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-control bg-accent-soft text-accent">
            <IconComponent className="h-4 w-4" aria-hidden="true" />
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-ink group-hover:text-accent transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-muted mb-6">
          {cardDesc}
        </p>
      </div>

      <Link
        to={`/services/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink hover:text-accent group-hover:translate-x-[-3px] transition-all"
        aria-label={`${t('action.learnMore')}: ${title}`}
      >
        <span>{t('action.learnMore')}</span>
        <ArrowIcon className="h-4 w-4 text-accent" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function ServiceMiniCard({ service }: { service: Service }) {
  const { language, t } = useLanguage();
  const IconComponent = SERVICE_ICONS[service.kind] || Boxes;
  const enData = SERVICES_EN[service.slug];
  const title = language === 'en' && enData ? enData.title : service.title;
  const cardDesc = language === 'en' && enData ? enData.card : service.card;
  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex flex-col justify-between rounded-panel border border-line bg-surface p-5 transition-all hover:border-ink/20 hover:shadow-soft"
    >
      <div className="flex items-start gap-3.5 mb-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-canvas text-ink group-hover:bg-accent-soft group-hover:text-accent transition-colors">
          <IconComponent className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <h4 className="font-bold text-ink text-base group-hover:text-accent transition-colors mb-1">
            {title}
          </h4>
          <p className="text-xs text-muted leading-relaxed line-clamp-2">
            {cardDesc}
          </p>
        </div>
      </div>
      <span className="inline-flex items-center gap-1 text-xs font-bold text-accent self-end mt-2">
        <span>{t('action.details')}</span>
        <ArrowIcon className="h-3 w-3" aria-hidden="true" />
      </span>
    </Link>
  );
}
