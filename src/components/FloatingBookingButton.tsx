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
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '30px',
        zIndex: 99999,
        pointerEvents: 'auto',
      }}
    >
      <a
        href="#booking"
        className="group relative flex items-center justify-center gap-2.5 select-none transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0e16]"
        style={{
          width: '240px',
          height: '60px',
          borderRadius: '18px',
          backgroundColor: '#BDEBFF',
          color: '#102A43',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow:
            '0 10px 25px -4px rgba(16, 42, 67, 0.28), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)',
          textDecoration: 'none',
          fontFamily: 'var(--font-space-grotesk), sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          cursor: 'pointer',
        }}
        aria-label="Book a Service"
      >
        <span
          className="material-symbols-outlined transition-transform duration-200 group-hover:rotate-6"
          style={{
            fontSize: '21px',
            color: '#102A43',
            lineHeight: 1,
            display: 'inline-block',
          }}
        >
          calendar_month
        </span>
        <span style={{ color: '#102A43', fontWeight: 600 }}>Book a Service</span>
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
