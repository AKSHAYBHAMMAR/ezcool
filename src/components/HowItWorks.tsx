'use client';

import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Book Your Service',
    desc: 'Instant digital concierge booking. Select your architectural system type, symptoms, or maintenance schedule.',
  },
  {
    num: '02',
    title: 'Choose Time Slot',
    desc: 'Select a dedicated 2-hour arrival window tailored to your routine. Live dispatch notifications via SMS.',
  },
  {
    num: '03',
    title: 'Engineer Arrives',
    desc: 'Our master technician arrives equipped with acoustic decibel meters, spectroscopic leak sensors, and surgical tools.',
  },
  {
    num: '04',
    title: 'Enjoy Cool Comfort',
    desc: 'Receive an authoritative digital purity report, verified warranty documentation, and whisper-quiet chilled air.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 relative bg-[#0a0e16] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="font-mono text-xs text-[#8ed5ff] tracking-widest uppercase mb-2 inline-block font-medium">
            SEAMLESS CONCIERGE WORKFLOW
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-[44px] text-white font-light tracking-tight leading-tight">
            How It Works.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#bdc8d1] mt-3 font-light leading-relaxed">
            Four effortless steps to restore surgical airflow and pristine
            thermal calibration across your residence.
          </p>
        </div>

        {/* Horizontal Process Timeline */}
        <div className="relative">
          {/* Continuous Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#8ed5ff]/30 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-7 flex flex-col items-start relative group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-[#262a33] border border-[#8ed5ff]/40 flex items-center justify-center font-mono text-[#8ed5ff] text-sm font-medium mb-6 shadow-[0_0_15px_rgba(56,189,248,0.2)] group-hover:border-[#38bdf8] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all">
                  {step.num}
                </div>
                <h4 className="font-headline text-xl text-white font-medium mb-2.5 group-hover:text-[#8ed5ff] transition-colors">
                  {step.title}
                </h4>
                <p className="font-sans text-xs sm:text-[13px] text-[#bdc8d1] font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
