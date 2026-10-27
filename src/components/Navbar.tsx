'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0f131c]/80 backdrop-blur-md border-b border-[#3e484f]/30">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-4 w-full">
        {/* Brand Logo */}
        <a className="flex items-center gap-2 group" href="#">
          <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_12px_#38bdf8] transition-transform duration-300 group-hover:scale-125" />
          <span className="font-headline text-xl tracking-widest text-[#dfe2ee] uppercase font-medium">
            AERIS
          </span>
        </a>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            className="text-[#8ed5ff] font-medium tracking-wide hover:text-[#38bdf8] transition-colors duration-200 font-mono text-xs uppercase"
            href="#hero"
          >
            Systems
          </a>
          <a
            className="text-[#bdc8d1] font-medium tracking-wide hover:text-[#8ed5ff] transition-colors duration-200 font-mono text-xs uppercase"
            href="#services"
          >
            Engineering
          </a>
          <a
            className="text-[#bdc8d1] font-medium tracking-wide hover:text-[#8ed5ff] transition-colors duration-200 font-mono text-xs uppercase"
            href="#why-choose-us"
          >
            Acoustics
          </a>
          <a
            className="text-[#bdc8d1] font-medium tracking-wide hover:text-[#8ed5ff] transition-colors duration-200 font-mono text-xs uppercase"
            href="#how-it-works"
          >
            Telemetry
          </a>
          <a
            className="text-[#bdc8d1] font-medium tracking-wide hover:text-[#8ed5ff] transition-colors duration-200 font-mono text-xs uppercase"
            href="#testimonials"
          >
            Concierge
          </a>
        </nav>

        {/* Trailing Action Clustered Group */}
        <div className="flex items-center gap-3">
          <a
            className="hidden sm:inline-flex items-center gap-1.5 text-[#bdc8d1] hover:text-[#8ed5ff] transition-colors duration-200 font-mono text-xs pr-2"
            href="#booking"
          >
            <span>Client Portal</span>
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </a>
          <a
            className="relative group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-[#0a0e16] font-headline text-[13px] tracking-tight hover:shadow-[0_0_30px_rgba(56,189,248,0.45)] hover:bg-[#c4e7ff] transition-all duration-300 active:scale-95 font-medium"
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
            className="md:hidden p-2 text-[#dfe2ee] hover:text-[#38bdf8] transition-colors"
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e16]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-mono text-xs uppercase">
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#8ed5ff] hover:text-[#38bdf8] py-1"
              href="#hero"
            >
              Systems
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#bdc8d1] hover:text-[#8ed5ff] py-1"
              href="#services"
            >
              Engineering
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#bdc8d1] hover:text-[#8ed5ff] py-1"
              href="#why-choose-us"
            >
              Acoustics
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#bdc8d1] hover:text-[#8ed5ff] py-1"
              href="#how-it-works"
            >
              Telemetry
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#bdc8d1] hover:text-[#8ed5ff] py-1"
              href="#testimonials"
            >
              Concierge
            </a>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#38bdf8] pt-2 flex items-center gap-2"
              href="#booking"
            >
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>Schedule Service</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
