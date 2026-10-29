'use client';

import React from 'react';

export default function FloatingBookingButton() {
  return (
    <aside
      aria-label="Quick Service Booking"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-7 md:bottom-7 md:right-8 z-50 pointer-events-auto"
    >
      <a
        href="#booking"
        className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 h-[50px] rounded-full font-headline text-sm sm:text-[15px] font-semibold text-[#071322] tracking-tight transition-all duration-300 active:scale-95 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-[#38bdf8] focus:ring-offset-2 focus:ring-offset-[#0a0e16]"
        style={{
          background:
            'linear-gradient(135deg, rgba(214, 241, 255, 0.96) 0%, rgba(142, 213, 255, 0.94) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.85)',
          boxShadow:
            '0 10px 28px -2px rgba(56, 189, 248, 0.45), 0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 1.5px rgba(255, 255, 255, 0.9)',
        }}
        aria-label="Book an AC Service"
      >
        <span className="material-symbols-outlined text-[19px] text-[#0284c7] transition-transform duration-300 group-hover:rotate-12">
          calendar_month
        </span>
        <span className="font-semibold">Book a Service</span>
      </a>
    </aside>
  );
}
