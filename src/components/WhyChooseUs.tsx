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
      className="py-24 relative bg-[#f4f9fd] border-t border-[#d0e6f7] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text & Features */}
          <div className="lg:col-span-7 space-y-8">
            <div>
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
                We replace guesswork and intrusive contractor visits with
                certified precision telemetry, surgically clean installation
                protocols, and bespoke mechanical mastery.
              </p>
            </div>

            {/* Feature Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/95 border border-[#d0e6f7] hover:border-[#38bdf8] shadow-[0_4px_16px_rgba(2,132,199,0.06)] hover:shadow-[0_8px_24px_rgba(2,132,199,0.14)] transition-all duration-300"
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

            {/* Highlight Metric Badge */}
            <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-6 p-5 rounded-2xl glass-card border border-[#d0e6f7] bg-white/95 shadow-[0_8px_20px_rgba(2,132,199,0.08)]">
              <div>
                <div className="text-3xl font-headline font-semibold text-[#0284c7]">
                  99.4%
                </div>
                <div className="font-mono text-[10px] text-[#627d98] tracking-wider mt-0.5 font-medium">
                  FIRST-VISIT RESOLUTION RATE
                </div>
              </div>
              <div className="hidden sm:block h-10 w-[1px] bg-[#d0e6f7]" />
              <div>
                <div className="text-3xl font-headline font-semibold text-[#0f2744]">
                  12,000+
                </div>
                <div className="font-mono text-[10px] text-[#627d98] tracking-wider mt-0.5 font-medium">
                  CHILLED UNITS CALIBRATED
                </div>
              </div>
            </div>
          </div>

          {/* Right: Diagnostic Visual Pod with Acoustic Telemetry */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-2xl p-8 border border-[#d0e6f7] bg-white/95 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(2,132,199,0.18)]">
              <div className="flex items-center justify-between pb-6 border-b border-[#e2eef8]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0284c7] text-[20px]">
                    analytics
                  </span>
                  <span className="font-headline text-[#0f2744] text-base font-semibold">
                    Acoustic Diagnostic Telemetry
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#e0f2fe] text-[#0284c7] border border-[#bae6fd] uppercase font-semibold">
                  LIVE
                </span>
              </div>

              {/* Rotary Thermal Ring Visual Simulation */}
              <div className="py-8 flex flex-col items-center justify-center relative">
                <div className="relative w-48 h-48 rounded-full border-4 border-dashed border-[#d0e6f7] flex items-center justify-center bg-[#f8fbfe]">
                  <div
                    className="absolute inset-2 rounded-full border-2 border-[#38bdf8] border-t-transparent animate-spin"
                    style={{ animationDuration: '18s' }}
                  />
                  <div className="text-center px-4">
                    <span className="font-mono text-[10px] text-[#0284c7] tracking-widest block uppercase mb-1 font-semibold">
                      DECIBEL RATING
                    </span>
                    <div className="text-4xl font-headline font-light text-[#0f2744] tracking-tight">
                      &lt; 18.2
                    </div>
                    <span className="font-mono text-[10px] text-[#627d98] tracking-wider block mt-1 font-medium">
                      dB(A) WHISPER CLASS
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnostic Sliders Status */}
              <div className="space-y-4 pt-4 border-t border-[#e2eef8]">
                <div>
                  <div className="flex justify-between font-mono text-[11px] text-[#486581] mb-1.5 font-medium">
                    <span>COMPRESSOR HARMONIC STABILITY</span>
                    <span className="text-[#0284c7] font-semibold">99.2%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#e0f2fe] rounded-full overflow-hidden">
                    <div className="w-[99.2%] h-full bg-[#0284c7]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[11px] text-[#486581] mb-1.5 font-medium">
                    <span>EVAPORATOR PURITY INDEX</span>
                    <span className="text-[#0284c7] font-semibold">99.8%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#e0f2fe] rounded-full overflow-hidden">
                    <div className="w-[99.8%] h-full bg-gradient-to-r from-[#0284c7] to-[#38bdf8]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
