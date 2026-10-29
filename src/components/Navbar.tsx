'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-7xl ios-glass rounded-[24px] transition-all duration-300">
        <div className="flex justify-between items-center px-5 sm:px-7 py-3 sm:py-3.5 w-full">
          {/* Brand Logo */}
          <a
            className="flex items-center gap-2.5 group flex-shrink-0"
            href="#hero"
            aria-label="AERIS Home"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_12px_#38bdf8] transition-transform duration-300 group-hover:scale-125" />
            <span className="font-headline text-lg sm:text-xl tracking-widest text-white uppercase font-semibold [text-shadow:_0_1px_3px_rgba(0,0,0,0.6)]">
              AERIS
            </span>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8">
            <a
              className="text-[#8ed5ff] font-semibold tracking-wider font-mono text-xs uppercase px-3 py-1 rounded-full bg-white/[0.1] border border-white/[0.15] [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)] hover:text-[#38bdf8] transition-colors duration-200"
              href="#hero"
            >
              Systems
            </a>
            <a
              className="text-white/90 hover:text-[#8ed5ff] font-medium tracking-wider font-mono text-xs uppercase [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)] transition-colors duration-200"
              href="#services"
            >
              Engineering
            </a>
            <a
              className="text-white/90 hover:text-[#8ed5ff] font-medium tracking-wider font-mono text-xs uppercase [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)] transition-colors duration-200"
              href="#why-choose-us"
            >
              Acoustics
            </a>
            <a
              className="text-white/90 hover:text-[#8ed5ff] font-medium tracking-wider font-mono text-xs uppercase [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)] transition-colors duration-200"
              href="#how-it-works"
            >
              Telemetry
            </a>
            <a
              className="text-white/90 hover:text-[#8ed5ff] font-medium tracking-wider font-mono text-xs uppercase [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)] transition-colors duration-200"
              href="#testimonials"
            >
              Concierge
            </a>
          </nav>

          {/* Trailing Action Clustered Group */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <a
              className="hidden md:inline-flex items-center gap-1.5 text-white/90 hover:text-[#8ed5ff] font-mono text-xs tracking-wide [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)] transition-colors duration-200 pr-1"
              href="#booking"
            >
              <span>Client Portal</span>
              <span className="material-symbols-outlined text-[16px]">tune</span>
            </a>
            <a
              className="relative group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#0a0e16] font-headline text-xs sm:text-[13px] tracking-tight font-semibold hover:bg-[#c4e7ff] hover:shadow-[0_0_24px_rgba(56,189,248,0.45)] transition-all duration-300 active:scale-95 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
              href="#booking"
            >
              <span>Request Consultation</span>
              <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform duration-200">
                arrow_forward
              </span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-white hover:text-[#38bdf8] transition-colors focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-2xl [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/[0.18] px-6 py-5">
            <nav className="flex flex-col space-y-3 font-mono text-xs uppercase">
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8ed5ff] font-semibold py-1.5 flex items-center justify-between"
                href="#hero"
              >
                <span>Systems</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#8ed5ff] py-1.5 transition-colors"
                href="#services"
              >
                Engineering
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#8ed5ff] py-1.5 transition-colors"
                href="#why-choose-us"
              >
                Acoustics
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#8ed5ff] py-1.5 transition-colors"
                href="#how-it-works"
              >
                Telemetry
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#8ed5ff] py-1.5 transition-colors"
                href="#testimonials"
              >
                Concierge
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#8ed5ff] py-1.5 flex items-center justify-between border-t border-white/[0.12] pt-3 transition-colors"
                href="#booking"
              >
                <span>Client Portal</span>
                <span className="material-symbols-outlined text-sm">tune</span>
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8ed5ff] hover:text-[#38bdf8] py-1.5 flex items-center justify-between transition-colors font-semibold"
                href="#booking"
              >
                <span>Request Consultation</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
