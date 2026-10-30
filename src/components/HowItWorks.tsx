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
      className="py-24 relative bg-gradient-to-b from-[#f4f9fd] via-[#edf5fc] to-[#f4f9fd] border-t border-[#d0e6f7] scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="font-mono text-xs text-[#0284c7] tracking-widest uppercase font-semibold">
              SEAMLESS CONCIERGE WORKFLOW
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-[44px] text-[#0f2744] font-light tracking-tight leading-tight">
            How It Works.
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#486581] mt-3 font-normal leading-relaxed">
            Four effortless steps to restore surgical airflow and pristine
            thermal calibration across your residence.
          </p>
        </div>

        {/* Horizontal Process Timeline */}
        <div className="relative">
          {/* Continuous Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#bae6fd] to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-7 flex flex-col items-start relative group transition-all duration-300 hover:-translate-y-1 bg-white/95 border border-[#d0e6f7] hover:border-[#38bdf8] shadow-[0_8px_20px_-4px_rgba(2,132,199,0.08)] hover:shadow-[0_16px_30px_-6px_rgba(2,132,199,0.18)]"
              >
                <div className="w-12 h-12 rounded-full bg-[#e0f2fe] border border-[#bae6fd] flex items-center justify-center font-mono text-[#0284c7] text-sm font-bold mb-6 shadow-sm group-hover:bg-[#0284c7] group-hover:text-white group-hover:border-[#0284c7] transition-all">
                  {step.num}
                </div>
                <h4 className="font-headline text-xl text-[#0f2744] font-medium mb-2.5 group-hover:text-[#0284c7] transition-colors">
                  {step.title}
                </h4>
                <p className="font-sans text-xs sm:text-[13px] text-[#486581] font-normal leading-relaxed">
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
