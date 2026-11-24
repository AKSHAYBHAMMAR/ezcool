'use client';

import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '#hero', sectionId: 'hero' },
  { label: 'Services', href: '#services', sectionId: 'services' },
  { label: 'Why Choose Us', href: '#why-choose-us', sectionId: 'why-choose-us' },
  { label: 'About', href: '#about', sectionId: 'about' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 40);

      // Bottom of page check
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveSection('contact');
        return;
      }

      // Top of page check
      if (scrollY < 120) {
        setActiveSection('hero');
        return;
      }

      // Section order from top to bottom
      const sections = [
        { id: 'hero', key: 'hero' },
        { id: 'services', key: 'services' },
        { id: 'why-choose-us', key: 'why-choose-us' },
        { id: 'about', key: 'about' },
        { id: 'contact', key: 'contact' },
      ];

      let currentSection = 'hero';
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            currentSection = s.key;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle browser back/forward history navigation smoothly
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const targetElement =
          document.getElementById(hash) ||
          (hash === 'about' ? document.getElementById('testimonials') : null) ||
          (hash === 'contact' ? document.getElementById('booking') : null);

        if (targetElement) {
          const navOffset = window.innerWidth >= 640 ? 120 : 85;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition > 0 ? offsetPosition : 0,
            behavior: 'smooth',
          });
        }
      }
    };

    window.addEventListener('popstate', handleHashChange);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('popstate', handleHashChange);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Smooth scroll handler with offset compensation for the fixed glass navbar
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId: string
  ) => {
    e.preventDefault();
    const rawId = href.replace('#', '');
    const targetElement =
      document.getElementById(rawId) ||
      document.getElementById(sectionId) ||
      (sectionId === 'about' ? document.getElementById('testimonials') : null) ||
      (sectionId === 'contact' ? document.getElementById('booking') : null);

    if (targetElement) {
      const navOffset = window.innerWidth >= 640 ? 120 : 85;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition > 0 ? offsetPosition : 0,
        behavior: 'smooth',
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', href);
      }
      setActiveSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-[1000] flex justify-center pt-2.5 xs:pt-3 sm:pt-6 px-2.5 xs:px-3 sm:px-8 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto w-[96%] sm:w-[92%] md:w-[90%] lg:w-[84%] max-w-[1300px] liquid-glass transition-all duration-300 shadow-2xl ${
          mobileMenuOpen
            ? 'rounded-[26px] sm:rounded-[36px]'
            : 'rounded-full'
        }`}
      >
        <div className="flex justify-between items-center px-3.5 xs:px-5 sm:px-8 md:px-10 h-14 xs:h-16 sm:h-20 md:h-[84px] w-full">
          {/* Brand Logo: EZCOOL */}
          <a
            className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 group flex-shrink-0"
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero', 'hero')}
            aria-label="EZCOOL AC Servicing Home"
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#8ed5ff] shadow-[0_0_12px_#38bdf8]" />
            </span>
            <div className="flex flex-col">
              <span
                className={`font-headline text-base xs:text-lg sm:text-xl md:text-2xl tracking-tight font-bold transition-colors duration-200 leading-none ${
                  scrolled
                    ? 'text-[#0f2744] group-hover:text-[#0284c7]'
                    : 'text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.65)] group-hover:text-[#c4e7ff]'
                }`}
              >
                EZCOOL
              </span>
              <span
                className={`font-mono text-[7px] xs:text-[8px] sm:text-[9px] md:text-[10px] tracking-widest uppercase font-semibold leading-tight mt-0.5 transition-colors duration-200 ${
                  scrolled
                    ? 'text-[#0284c7]'
                    : 'text-[#bae6fd] [text-shadow:_0_1px_2px_rgba(0,0,0,0.7)]'
                }`}
              >
                AC SERVICING
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-0.5 md:space-x-1 lg:space-x-2 xl:space-x-3.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                  className={`px-2.5 md:px-3 lg:px-4 py-1.5 md:py-2 rounded-full text-xs lg:text-[13px] font-mono tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? scrolled
                        ? 'bg-[#0284c7]/15 text-[#0284c7] font-semibold border border-[#0284c7]/30 shadow-sm'
                        : 'bg-white/25 text-white font-semibold border border-white/40 shadow-sm'
                      : scrolled
                      ? 'text-[#1e3a5f] font-medium hover:text-[#0284c7] hover:bg-white/30'
                      : 'text-white/90 font-medium hover:text-white hover:bg-white/[0.14] [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button with 44px tap target */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8ed5ff]/50 rounded-full ${
                scrolled
                  ? 'text-[#0f2744] hover:text-[#0284c7]'
                  : 'text-white hover:text-[#38bdf8]'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`material-symbols-outlined text-2xl ${
                  scrolled ? '' : '[text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]'
                }`}
              >
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with 44px tap targets & safe viewport scroll */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 bg-white/90 backdrop-blur-2xl px-4 xs:px-6 sm:px-8 py-3 xs:py-3.5 sm:py-5 rounded-b-[26px] sm:rounded-b-[34px] shadow-2xl max-h-[calc(100svh-5.5rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-1 font-mono text-xs uppercase">
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                    className={`min-h-[44px] py-2.5 px-3.5 rounded-xl flex items-center justify-between transition-colors ${
                      isActive
                        ? 'text-[#0284c7] bg-[#e0f2fe] font-semibold'
                        : 'text-[#1e3a5f] hover:text-[#0284c7] hover:bg-[#f8fbfe] font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
