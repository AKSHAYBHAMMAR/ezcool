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
      className="py-24 relative bg-[#f4f9fd] border-t border-[#d0e6f7] overflow-hidden scroll-mt-28"
    >
      <div id="engineering" className="scroll-mt-28 absolute -top-24 pointer-events-none" />
      <div id="about" className="scroll-mt-28 absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="font-mono text-xs text-[#0284c7] tracking-widest uppercase font-semibold">
              ENGINEERED ADVANTAGE
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-[44px] text-[#0f2744] font-light tracking-tight leading-tight">
            Comfort Without Compromise.
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#486581] mt-4 font-normal leading-relaxed">
            We replace guesswork and intrusive contractor visits with certified
            precision telemetry, surgically clean installation protocols, and
            bespoke mechanical mastery.
          </p>
        </div>

        {/* Feature Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white/95 border border-[#d0e6f7] hover:border-[#38bdf8] shadow-[0_4px_16px_rgba(2,132,199,0.06)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.14)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-[#0284c7] text-[20px]">
                  {item.icon}
                </span>
                <h4 className="font-headline text-lg text-[#0f2744] font-medium">
                  {item.title}
                </h4>
              </div>
              <p className="font-sans text-xs text-[#486581] font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
