'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0e16] border-t border-[#3e484f]/20">
      <div className="flex flex-col max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 pt-16 pb-12 w-full gap-12">
        {/* Top Row Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <a className="flex items-center gap-2" href="#">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
              <span className="font-headline text-xl tracking-widest text-[#dfe2ee] uppercase font-medium">
                AERIS
              </span>
            </a>
            <p className="font-sans text-xs sm:text-[13px] text-[#bdc8d1] max-w-sm font-light leading-relaxed">
              AERIS Climate Engineering SA. Precision thermodynamic architecture,
              whisper-quiet refrigeration systems, and advanced air purity
              diagnostics for elite spaces.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-mono text-xs text-[#8ed5ff] tracking-widest uppercase font-medium">
              SYSTEM ARCHITECTURE
            </h5>
            <ul className="space-y-2 font-mono text-xs text-[#bdc8d1]">
              <li>
                <a
                  className="hover:text-[#8ed5ff] transition-colors duration-200"
                  href="#services"
                >
                  Architectural Systems
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#8ed5ff] transition-colors duration-200"
                  href="#services"
                >
                  Bespoke Retrofit
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#8ed5ff] transition-colors duration-200"
                  href="#why-choose-us"
                >
                  Purity Diagnostics
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="font-mono text-xs text-[#8ed5ff] tracking-widest uppercase font-medium">
              STANDARDS &amp; TELEMETRY
            </h5>
            <ul className="space-y-2 font-mono text-xs text-[#bdc8d1]">
              <li>
                <a
                  className="hover:text-[#8ed5ff] transition-colors duration-200"
                  href="#why-choose-us"
                >
                  Acoustic Standards
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#8ed5ff] transition-colors duration-200"
                  href="#how-it-works"
                >
                  Thermodynamic Telemetry
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#8ed5ff] transition-colors duration-200"
                  href="#"
                >
                  Privacy Architecture
                </a>
              </li>
              <li>
                <a
                  className="hover:text-[#8ed5ff] transition-colors duration-200"
                  href="#"
                >
                  Terms of Commission
                </a>
              </li>
            </ul>
          </div>

          {/* Coordinates Col */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="font-mono text-xs text-[#8ed5ff] tracking-widest uppercase font-medium">
              CONCIERGE DESK
            </h5>
            <p className="font-sans text-xs text-[#bdc8d1] leading-relaxed">
              24/7 Priority Emergency
              <br />
              Zurich • London • New York
              <br />
              <a
                className="text-white hover:text-[#38bdf8] transition-colors font-mono text-[11px] block mt-1"
                href="mailto:concierge@aeris.ch"
              >
                concierge@aeris.ch
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Row Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[#87929a] font-sans text-xs gap-4">
          <p className="text-center sm:text-left">
            © 2025 AERIS Climate Engineering SA. Precision Thermodynamic
            Architecture. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 font-mono text-[10px] text-[#bdc8d1]">
            <span className="text-emerald-400">● STATUS: OPERATIONAL</span>
            <span>•</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
