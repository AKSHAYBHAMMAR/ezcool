'use client';

import React, { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full md:w-[72%] max-w-[980px] liquid-glass rounded-full transition-all duration-300 shadow-2xl">
        <div className="flex justify-between items-center px-6 sm:px-8 h-16 sm:h-[68px] w-full">
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

          {/* Desktop Navigation Links — Centered & Spaced (No Book button in navbar) */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <a
              href="#hero"
              className="px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase font-medium text-white/95 hover:text-white hover:bg-white/[0.14] transition-all duration-200 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]"
            >
              Home
            </a>
            <a
              href="#services"
              className="px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase font-medium text-white/90 hover:text-white hover:bg-white/[0.14] transition-all duration-200 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]"
            >
              Services
            </a>
            <a
              href="#why-choose-us"
              className="px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase font-medium text-white/90 hover:text-white hover:bg-white/[0.14] transition-all duration-200 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]"
            >
              About
            </a>
            <a
              href="#booking"
              className="px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase font-medium text-white/90 hover:text-white hover:bg-white/[0.14] transition-all duration-200 [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#38bdf8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8ed5ff]/50 rounded-full"
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
          <div className="md:hidden border-t border-white/[0.18] px-6 py-4 rounded-b-[28px]">
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
