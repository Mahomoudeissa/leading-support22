import React from 'react';
import { LucideIcon, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export function Container({
  children,
  className = '',
  clean = false,
}: {
  children: React.ReactNode;
  className?: string;
  clean?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${clean ? '' : 'px-4 sm:px-6 lg:px-8'} max-w-[1200px] ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'center' | 'start';
  dark?: boolean;
}) {
  const isCenter = align === 'center';
  return (
    <div
      className={`mb-10 sm:mb-14 ${isCenter ? 'text-center mx-auto max-w-2xl' : 'text-start max-w-3xl'}`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs sm:text-sm font-bold tracking-wide mb-2 sm:mb-3 px-3 py-1 rounded-full ${
            dark
              ? 'bg-accent/20 text-[#34d399] border border-accent/40'
              : 'bg-accent-soft text-accent border border-accent/20'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed ${
            dark ? 'text-[#a1a1aa]' : 'text-muted'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function StatusNotice({
  type = 'info',
  title,
  children,
  className = '',
}: {
  type?: 'info' | 'pending' | 'danger' | 'ok';
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const config = {
    info: {
      bg: 'bg-canvas',
      border: 'border-line',
      text: 'text-ink',
      icon: Info,
      iconColor: 'text-muted',
    },
    pending: {
      bg: 'bg-pending-soft',
      border: 'border-pending/20',
      text: 'text-pending',
      icon: Info,
      iconColor: 'text-pending',
    },
    danger: {
      bg: 'bg-danger-soft',
      border: 'border-danger/30',
      text: 'text-danger',
      icon: AlertCircle,
      iconColor: 'text-danger',
    },
    ok: {
      bg: 'bg-ok-soft',
      border: 'border-ok/30',
      text: 'text-ok',
      icon: CheckCircle2,
      iconColor: 'text-ok',
    },
  }[type];

  const IconComponent = config.icon;

  return (
    <div
      role={type === 'danger' ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-panel border p-4 text-sm leading-relaxed ${config.bg} ${config.border} ${config.text} ${className}`}
    >
      <IconComponent className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} aria-hidden="true" />
      <div className="flex-1">
        {title && <strong className="block font-bold mb-1">{title}</strong>}
        <div>{children}</div>
      </div>
    </div>
  );
}
