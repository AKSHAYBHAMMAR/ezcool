'use client';

import React from 'react';

const features = [
  {
    icon: 'engineering',
    title: 'Master Engineers',
    desc: 'Master-certified thermodynamic specialists with 10+ years of high-end mechanical experience.',
  },
  {
    icon: 'receipt_long',
    title: 'Transparent Pricing',
    desc: 'Fixed upfront telemetry estimates generated digitally. Zero hidden surcharges or surprise billing.',
  },
  {
    icon: 'timer',
    title: 'Guaranteed Response',
    desc: 'Guaranteed rapid response window with real-time GPS technician tracking and telemetry updates.',
  },
  {
    icon: 'verified_user',
    title: 'Certified Warranty',
    desc: 'Every service visit includes an authoritative 12-month performance and parts guarantee.',
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="py-16 sm:py-24 relative bg-[#f4f9fd] border-t border-[#d0e6f7] overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div id="engineering" className="scroll-mt-24 sm:scroll-mt-28 absolute -top-20 sm:-top-24 pointer-events-none" />
      <div id="about" className="scroll-mt-24 sm:scroll-mt-28 absolute -top-20 sm:-top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#0284c7] tracking-widest uppercase font-semibold">
              ENGINEERED ADVANTAGE
            </span>
          </div>
          <h2 className="font-headline text-2xl xs:text-3xl sm:text-4xl md:text-[44px] text-[#0f2744] font-light tracking-tight leading-tight">
            Comfort Without Compromise.
          </h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#486581] mt-3 sm:mt-4 font-normal leading-relaxed">
            We replace guesswork and intrusive contractor visits with certified
            precision telemetry, surgically clean installation protocols, and
            bespoke mechanical mastery.
          </p>
        </div>

        {/* Feature Matrix: 1 col on mobile, 2 on sm/tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-xl bg-white/95 border border-[#d0e6f7] hover:border-[#38bdf8] shadow-[0_4px_16px_rgba(2,132,199,0.06)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.14)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2.5">
                <span className="material-symbols-outlined text-[#0284c7] text-[20px] flex-shrink-0">
                  {item.icon}
                </span>
                <h3 className="font-headline text-base sm:text-lg text-[#0f2744] font-medium">
                  {item.title}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-[13px] text-[#486581] font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
