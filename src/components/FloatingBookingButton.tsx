'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function FloatingBookingButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonElement = (
    <div
      id="floating-booking-container"
      aria-label="Permanent Service Booking Action"
    >
      <a
        href="#booking"
        className="group relative flex items-center justify-center gap-1.5 sm:gap-2.5 select-none transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#f4f9fd] w-[170px] xs:w-[190px] sm:w-[210px] md:w-[240px] h-[46px] xs:h-[48px] sm:h-[54px] md:h-[60px] rounded-xl sm:rounded-2xl"
        style={{
          backgroundColor: '#BDEBFF',
          color: '#102A43',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow:
            '0 10px 25px -4px rgba(16, 42, 67, 0.28), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)',
          textDecoration: 'none',
          fontFamily: 'var(--font-space-grotesk), sans-serif',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
        }}
        aria-label="Book a Service"
      >
        <span
          className="material-symbols-outlined transition-transform duration-200 group-hover:rotate-6 text-[18px] sm:text-[20px] md:text-[21px]"
          style={{
            color: '#102A43',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          calendar_month
        </span>
        <span
          className="text-xs xs:text-sm md:text-base font-semibold"
          style={{ color: '#102A43' }}
        >
          Book a Service
        </span>
      </a>
    </div>
  );

  // During SSR or before client mount, return null to avoid hydration mismatch.
  // Once mounted in client browser, portaling directly into document.body guarantees
  // that no ancestor container (hero, sections, transforms, filters) can affect its fixed positioning.
  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(buttonElement, document.body);
}
