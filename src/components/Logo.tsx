import React from 'react';
import logoPng from '../assets/logo.png';
import logoSvg from '../assets/logo.svg';

export function Logo({
  className = '',
  height = 56,
}: {
  className?: string;
  height?: number;
}) {
  const width = Math.round(height * 1.699);

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={{ height }}
    >
      <img
        src={logoSvg || logoPng}
        alt="شعار الدعم الرائدة Leading Support"
        width={width}
        height={height}
        className="block h-full w-auto max-h-full object-contain"
        style={{ aspectRatio: '1600 / 942' }}
        loading="eager"
      />
    </div>
  );
}
