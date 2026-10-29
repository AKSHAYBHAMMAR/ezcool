'use client';

import React from 'react';

export default function FloatingBookingButton() {
  return (
    <aside
      aria-label="Service Booking Action"
      className="fixed bottom-6 right-6 z-50 pointer-events-auto max-w-[calc(100vw-32px)]"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
      }}
    >
      <a
        href="#booking"
        className="group relative flex items-center justify-center gap-2.5 w-[240px] h-[60px] rounded-[18px] font-headline text-[15px] sm:text-base font-semibold text-[#102A43] tracking-tight transition-all duration-200 select-none hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0e16]"
        style={{
          width: '240px',
          height: '60px',
          borderRadius: '18px',
          backgroundColor: '#BDEBFF',
          color: '#102A43',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow:
            '0 10px 25px -4px rgba(16, 42, 67, 0.28), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 1.5px rgba(255, 255, 255, 0.95)',
        }}
        aria-label="Book a Service"
      >
        <span className="material-symbols-outlined text-[21px] text-[#102A43] transition-transform duration-200 group-hover:rotate-6">
          calendar_month
        </span>
        <span className="font-semibold">Book a Service</span>
      </a>
    </aside>
  );
}
