'use client';

import React, { useState, useEffect } from 'react';

const navItems = [
  { label: 'Home', href: '#hero', sectionId: 'hero' },
  { label: 'Systems', href: '#systems', sectionId: 'systems' },
  { label: 'Engineering', href: '#engineering', sectionId: 'engineering' },
  { label: 'Services', href: '#services', sectionId: 'services' },
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

      // Section order from top to bottom
      const sections = [
        { id: 'hero', key: 'hero' },
        { id: 'services', key: 'systems' },
        { id: 'why-choose-us', key: 'engineering' },
        { id: 'how-it-works', key: 'services' },
        { id: 'testimonials', key: 'about' },
        { id: 'booking', key: 'contact' },
      ];

      const scrollPosition = scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].key);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle browser back/forward history navigation smoothly
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          const navOffset = 100;
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
      (sectionId === 'systems' ? document.getElementById('services') : null) ||
      (sectionId === 'engineering' || sectionId === 'about'
        ? document.getElementById('why-choose-us')
        : null) ||
      (sectionId === 'contact' ? document.getElementById('booking') : null);

    if (targetElement) {
      const navOffset = 100;
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
    <header className="fixed top-0 inset-x-0 z-[1000] flex justify-center pt-4 sm:pt-6 px-4 sm:px-8 pointer-events-none transition-all duration-300">
      <div
        className={`pointer-events-auto w-[94%] sm:w-[88%] md:w-[84%] max-w-[1300px] rounded-full sm:rounded-[42px] transition-all duration-300 shadow-2xl ${
          scrolled
            ? 'bg-white/85 backdrop-blur-2xl border border-[#bae6fd]/90 shadow-[0_12px_36px_-4px_rgba(2,132,199,0.18),0_4px_16px_0_rgba(56,189,248,0.12)]'
            : 'liquid-glass'
        }`}
      >
        <div className="flex justify-between items-center px-6 sm:px-10 h-20 sm:h-[84px] w-full">
          {/* Brand Logo: EZCOOL */}
          <a
            className="flex items-center gap-3 group flex-shrink-0"
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero', 'hero')}
            aria-label="EZCOOL AC Servicing Home"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8ed5ff] shadow-[0_0_12px_#38bdf8]" />
            </span>
            <div className="flex flex-col">
              <span
                className={`font-headline text-xl sm:text-2xl tracking-tight font-bold transition-colors duration-200 leading-none ${
                  scrolled
                    ? 'text-[#0f2744] group-hover:text-[#0284c7]'
                    : 'text-white [text-shadow:_0_1px_3px_rgba(0,0,0,0.65)] group-hover:text-[#c4e7ff]'
                }`}
              >
                EZCOOL
              </span>
              <span
                className={`font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold leading-tight mt-0.5 transition-colors duration-200 ${
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
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2.5 xl:space-x-3.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                  className={`px-3.5 lg:px-4 py-2 rounded-full text-xs sm:text-[13px] font-mono tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? scrolled
                        ? 'bg-[#e0f2fe] text-[#0284c7] font-semibold border border-[#bae6fd]'
                        : 'bg-white/25 text-white font-semibold border border-white/40 shadow-sm'
                      : scrolled
                      ? 'text-[#334e68] font-medium hover:text-[#0284c7] hover:bg-[#f0f7fc]'
                      : 'text-white/90 font-medium hover:text-white hover:bg-white/[0.14] [text-shadow:_0_1px_3px_rgba(0,0,0,0.7)]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#8ed5ff]/50 rounded-full ${
                scrolled
                  ? 'text-[#0f2744] hover:text-[#0284c7]'
                  : 'text-white hover:text-[#38bdf8]'
              }`}
              aria-label="Toggle navigation menu"
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

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#bae6fd]/50 bg-white/95 backdrop-blur-2xl px-8 py-5 rounded-b-[36px] shadow-2xl">
            <nav className="flex flex-col space-y-2.5 font-mono text-xs uppercase">
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href, item.sectionId)}
                    className={`py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
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
