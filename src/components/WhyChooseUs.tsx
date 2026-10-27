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
      className="py-24 relative bg-[#0a0e16] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Text & Features */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="font-mono text-xs text-[#8ed5ff] tracking-widest uppercase mb-2 block font-medium">
                ENGINEERED ADVANTAGE
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-[44px] text-white font-light tracking-tight leading-tight">
                Comfort Without Compromise.
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#bdc8d1] mt-4 font-light leading-relaxed">
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
                  className="p-5 rounded-xl bg-[#1c2028]/40 border border-white/5 hover:border-white/15 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-[#8ed5ff] text-[20px]">
                      {item.icon}
                    </span>
                    <h4 className="font-headline text-lg text-white font-medium">
                      {item.title}
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-[#bdc8d1] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Highlight Metric Badge */}
            <div className="inline-flex flex-wrap sm:flex-nowrap items-center gap-6 p-5 rounded-2xl glass-card border border-white/10">
              <div>
                <div className="text-3xl font-headline font-light text-[#8ed5ff]">
                  99.4%
                </div>
                <div className="font-mono text-[10px] text-[#bdc8d1] tracking-wider mt-0.5">
                  FIRST-VISIT RESOLUTION RATE
                </div>
              </div>
              <div className="hidden sm:block h-10 w-[1px] bg-white/10" />
              <div>
                <div className="text-3xl font-headline font-light text-white">
                  12,000+
                </div>
                <div className="font-mono text-[10px] text-[#bdc8d1] tracking-wider mt-0.5">
                  CHILLED UNITS CALIBRATED
                </div>
              </div>
            </div>
          </div>

          {/* Right: Diagnostic Visual Pod with Acoustic Telemetry */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-2xl p-8 border border-white/15 relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#8ed5ff] text-[20px]">
                    analytics
                  </span>
                  <span className="font-headline text-white text-base font-medium">
                    Acoustic Diagnostic Telemetry
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-[#38bdf8]/20 text-[#8ed5ff] border border-[#38bdf8]/30 uppercase font-medium">
                  LIVE
                </span>
              </div>

              {/* Rotary Thermal Ring Visual Simulation */}
              <div className="py-8 flex flex-col items-center justify-center relative">
                <div className="relative w-48 h-48 rounded-full border-4 border-dashed border-white/10 flex items-center justify-center">
                  <div
                    className="absolute inset-2 rounded-full border border-[#8ed5ff]/40 animate-spin"
                    style={{ animationDuration: '18s' }}
                  />
                  <div className="text-center px-4">
                    <span className="font-mono text-[10px] text-[#8ed5ff] tracking-widest block uppercase mb-1">
                      DECIBEL RATING
                    </span>
                    <div className="text-4xl font-headline font-light text-white tracking-tight">
                      &lt; 18.2
                    </div>
                    <span className="font-mono text-[10px] text-[#bdc8d1] tracking-wider block mt-1">
                      dB(A) WHISPER CLASS
                    </span>
                  </div>
                </div>
              </div>

              {/* Diagnostic Sliders Status */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <div className="flex justify-between font-mono text-[11px] text-[#bdc8d1] mb-1.5">
                    <span>COMPRESSOR HARMONIC STABILITY</span>
                    <span className="text-[#8ed5ff] font-medium">99.2%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#31353e] rounded-full overflow-hidden">
                    <div className="w-[99.2%] h-full bg-[#38bdf8]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[11px] text-[#bdc8d1] mb-1.5">
                    <span>EVAPORATOR PURITY INDEX</span>
                    <span className="text-[#8ed5ff] font-medium">99.8%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#31353e] rounded-full overflow-hidden">
                    <div className="w-[99.8%] h-full bg-gradient-to-r from-[#8ed5ff] to-[#5bdeef]" />
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
