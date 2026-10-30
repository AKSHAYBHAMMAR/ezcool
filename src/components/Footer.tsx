'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#f4f9fd] to-[#e6f1fa] border-t border-[#d0e6f7]">
      <div className="flex flex-col max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-16 pb-12 w-full gap-12">
        {/* Top Row Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#d0e6f7]">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <a className="flex items-center gap-2.5" href="#hero">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] shadow-[0_0_10px_#38bdf8]" />
              <div className="flex flex-col">
                <span className="font-headline text-xl tracking-wider text-[#0f2744] uppercase font-bold leading-none">
                  EZCOOL
                </span>
                <span className="font-mono text-[9px] tracking-widest text-[#0284c7] uppercase font-semibold mt-0.5">
                  AC SERVICING
                </span>
              </div>
            </a>
            <p className="font-sans text-xs sm:text-[13px] text-[#486581] max-w-sm font-normal leading-relaxed">
              EZCOOL AC Servicing. Premium AC Service. Exceptional Comfort.
              Precision thermodynamic engineering, whisper-quiet refrigeration systems,
              and advanced air purity diagnostics for elite spaces.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-mono text-xs text-[#0369a1] tracking-widest uppercase font-semibold">
              SYSTEM ARCHITECTURE
            </h5>
            <ul className="space-y-2 font-mono text-xs text-[#486581]">
              <li>
                <a
                  className="hover:text-[#0284c7] transition-colors duration-200"
                  href="#services"
                >
                  Architectural Systems
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-colors duration-200"
                  href="#services"
                >
                  Bespoke Retrofit
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-colors duration-200"
                  href="#why-choose-us"
                >
                  Purity Diagnostics
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-mono text-xs text-[#0369a1] tracking-widest uppercase font-semibold">
              STANDARDS &amp; TELEMETRY
            </h5>
            <ul className="space-y-2 font-mono text-xs text-[#486581]">
              <li>
                <a
                  className="hover:text-[#0284c7] transition-colors duration-200"
                  href="#why-choose-us"
                >
                  Acoustic Standards
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-colors duration-200"
                  href="#how-it-works"
                >
                  Thermodynamic Telemetry
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-colors duration-200"
                  href="#"
                >
                  Privacy Architecture
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#0284c7] transition-colors duration-200"
                  href="#"
                >
                  Terms of Commission
                </a>
              </li>
            </ul>
          </div>

          {/* Coordinates Col */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-mono text-xs text-[#0369a1] tracking-widest uppercase font-semibold">
              CONCIERGE DESK
            </h5>
            <p className="font-sans text-xs text-[#486581] leading-relaxed">
              24/7 Priority Emergency
              <br />
              <a
                className="text-[#0284c7] hover:text-[#0369a1] font-semibold transition-colors font-mono text-[11px] block mt-1"
                href="mailto:contact@ezcool.com"
              >
                contact@ezcool.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Row Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[#627d98] font-sans text-xs gap-4 font-medium">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} EZCOOL AC Servicing. Premium AC Service. Exceptional Comfort. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 font-mono text-[10px] text-[#486581]">
            <span className="text-emerald-600 font-semibold">● STATUS: OPERATIONAL</span>
            <span className="text-[#bae6fd]">•</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
