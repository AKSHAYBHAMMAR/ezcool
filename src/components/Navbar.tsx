'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-5xl liquid-glass rounded-full sm:rounded-[32px] transition-all duration-300">
        <div className="flex justify-between items-center px-4 sm:px-7 py-2.5 sm:py-3 w-full">
          {/* Brand Logo: ClimaCore */}
          <a
            className="flex items-center gap-2.5 group flex-shrink-0"
            href="#hero"
            aria-label="ClimaCore Home"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8ed5ff] shadow-[0_0_10px_#38bdf8]" />
            </span>
            <span className="font-headline text-lg sm:text-xl tracking-tight text-white font-semibold [text-shadow:_0_1px_3px_rgba(0,0,0,0.65)] group-hover:text-[#c4e7ff] transition-colors duration-200">
              ClimaCore
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-1.5 lg:space-x-2">
            <a
              href="#hero"
              className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase font-medium text-white/95 hover:text-white hover:bg-white/[0.14] transition-all duration-200 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]"
            >
              Home
            </a>
            <a
              href="#services"
              className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase font-medium text-white/90 hover:text-white hover:bg-white/[0.14] transition-all duration-200 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]"
            >
              Services
            </a>
            <a
              href="#why-choose-us"
              className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase font-medium text-white/90 hover:text-white hover:bg-white/[0.14] transition-all duration-200 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]"
            >
              About
            </a>
            <a
              href="#booking"
              className="px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase font-medium text-white/90 hover:text-white hover:bg-white/[0.14] transition-all duration-200 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]"
            >
              Contact
            </a>
          </nav>

          {/* Right Action: Book a Service CTA */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <a
              href="#booking"
              className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-headline font-semibold text-white tracking-tight transition-all duration-300 active:scale-95 shadow-[0_4px_16px_rgba(56,189,248,0.25)] border border-[#8ed5ff]/45 bg-gradient-to-r from-[#38bdf8]/25 via-[#38bdf8]/20 to-[#0284c7]/35 backdrop-blur-md hover:from-[#38bdf8]/40 hover:to-[#0284c7]/50 hover:border-[#8ed5ff]/80 hover:shadow-[0_0_24px_rgba(56,189,248,0.45)]"
            >
              <span className="[text-shadow:_0_1px_2px_rgba(0,0,0,0.6)]">
                Book a Service
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#8ed5ff] group-hover:translate-x-0.5 transition-transform duration-200">
                calendar_month
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#38bdf8] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.18] px-6 py-4 rounded-b-[24px]">
            <nav className="flex flex-col space-y-2.5 font-mono text-xs uppercase">
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8ed5ff] font-semibold py-1.5 flex items-center justify-between"
                href="#hero"
              >
                <span>Home</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#8ed5ff] py-1.5 transition-colors"
                href="#services"
              >
                Services
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#8ed5ff] py-1.5 transition-colors"
                href="#why-choose-us"
              >
                About
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/90 hover:text-[#8ed5ff] py-1.5 transition-colors"
                href="#booking"
              >
                Contact
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#8ed5ff] hover:text-[#38bdf8] py-2 flex items-center justify-between transition-colors font-semibold border-t border-white/[0.12] mt-1 pt-2.5"
                href="#booking"
              >
                <span>Book a Service</span>
                <span className="material-symbols-outlined text-sm">calendar_month</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
