import React from 'react';
import { Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { Container } from './ui';

export function PageHeader({
  title,
  intro,
  breadcrumbs,
}: {
  title: string;
  intro?: string;
  breadcrumbs?: { label: string; to?: string }[];
}) {
  return (
    <div className="bg-surface border-b border-line py-10 sm:py-14">
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="مسار التنقل" className="mb-4 sm:mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-muted">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={idx} className="flex items-center gap-1.5">
                    {idx > 0 && <ChevronLeft className="w-4 h-4 text-line flex-shrink-0" aria-hidden="true" />}
                    {crumb.to && !isLast ? (
                      <Link
                        to={crumb.to}
                        className="hover:text-ink transition-colors focus-visible:rounded"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={isLast ? 'text-ink font-semibold' : ''} aria-current={isLast ? 'page' : undefined}>
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-tight">
          {title}
        </h1>
        {intro && (
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            {intro}
          </p>
        )}
      </Container>
    </div>
  );
}
