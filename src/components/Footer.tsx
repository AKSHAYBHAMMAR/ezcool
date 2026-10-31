'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const targetId = hash.replace('#', '');
      const element =
        document.getElementById(targetId) ||
        (targetId === 'systems' ? document.getElementById('services') : null) ||
        (targetId === 'engineering' || targetId === 'about'
          ? document.getElementById('why-choose-us')
          : null) ||
        (targetId === 'contact' ? document.getElementById('booking') : null);

      if (element) {
        const navOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition > 0 ? offsetPosition : 0,
          behavior: 'smooth',
        });
        if (window.history.pushState) {
          window.history.pushState(null, '', `#${targetId}`);
        }
      }
    }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#f4f9fd] via-[#edf5fc] to-[#e4f0fa] border-t border-[#d0e6f7]">
      <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pt-12 sm:pt-16 pb-10 sm:pb-12 w-full gap-8 sm:gap-12">
        {/* Three Column Layout on Desktop, Stacks Vertically on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-8 sm:pb-12 border-b border-[#d0e6f7]">
          {/* Column 1 – Brand */}
          <div className="md:col-span-1 lg:col-span-5 space-y-3.5 sm:space-y-4">
            <a
              className="flex items-center gap-2.5 group w-fit"
              href="/#hero"
              onClick={(e) => handleScrollTo(e, '#hero')}
              aria-label="EZCOOL Home"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] shadow-[0_0_10px_#38bdf8] transition-transform duration-300 group-hover:scale-125" />
              <div className="flex flex-col">
                <span className="font-headline text-xl sm:text-2xl tracking-wider text-[#0f2744] uppercase font-bold leading-none group-hover:text-[#0284c7] transition-colors">
                  EZCOOL
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#0284c7] uppercase font-semibold mt-0.5">
                  AIR CONDITIONING SERVICES
                </span>
              </div>
            </a>
            <p className="font-headline text-sm sm:text-base text-[#0f2744] font-medium pt-1">
              Precision cooling. Exceptional comfort.
            </p>
            <p className="font-sans text-xs sm:text-[13px] text-[#486581] max-w-sm font-normal leading-relaxed">
              Expert AC solutions engineered for your comfort, efficiency and indoor air quality.
            </p>
          </div>

          {/* Column 2 – Our Services */}
          <div className="md:col-span-1 lg:col-span-4 space-y-3.5 sm:space-y-4">
            <h5 className="font-mono text-[11px] sm:text-xs text-[#0369a1] tracking-widest uppercase font-semibold">
              OUR SERVICES
            </h5>
            <ul className="space-y-2 sm:space-y-2.5 font-sans text-xs sm:text-sm text-[#486581]">
              <li>
                <a
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>AC Installation</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>AC Repair</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>AC Maintenance</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/#services"
                  onClick={(e) => handleScrollTo(e, '#services')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>AC Deep Cleaning</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/#why-choose-us"
                  onClick={(e) => handleScrollTo(e, '#why-choose-us')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>System Diagnostics</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 – Company */}
          <div className="md:col-span-1 lg:col-span-3 space-y-3.5 sm:space-y-4">
            <h5 className="font-mono text-[11px] sm:text-xs text-[#0369a1] tracking-widest uppercase font-semibold">
              COMPANY
            </h5>
            <ul className="space-y-2 sm:space-y-2.5 font-sans text-xs sm:text-sm text-[#486581]">
              <li>
                <a
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/#about"
                  onClick={(e) => handleScrollTo(e, '#about')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>About EZCOOL</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/#engineering"
                  onClick={(e) => handleScrollTo(e, '#engineering')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>Our Expertise</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/#why-choose-us"
                  onClick={(e) => handleScrollTo(e, '#why-choose-us')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>Why Choose Us</span>
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/#contact"
                  onClick={(e) => handleScrollTo(e, '#contact')}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <Link
                  className="hover:text-[#0284c7] transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group py-1 min-h-[36px]"
                  href="/privacy"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bae6fd] group-hover:bg-[#0284c7] transition-colors" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row Copyright & Tagline */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[#627d98] font-sans text-xs gap-3 sm:gap-4 font-medium">
          <p className="text-center sm:text-left">
            © 2026 EZCOOL. All rights reserved.
          </p>
          <div className="font-mono text-[10px] sm:text-[11px] text-[#0284c7] font-semibold tracking-widest uppercase">
            ENGINEERED FOR COMFORT.
          </div>
        </div>
      </div>
    </footer>
  );
}
