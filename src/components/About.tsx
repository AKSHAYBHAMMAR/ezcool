'use client';

import React from 'react';

const expertiseItems = [
  {
    icon: 'architecture',
    title: 'AC Installation',
    desc: 'Expert unit placement, ducting alignment, and precise electrical integration tailored to your space.',
  },
  {
    icon: 'build_circle',
    title: 'AC Repair',
    desc: 'Rapid diagnostic troubleshooting, compressor recalibration, and reliable component replacement.',
  },
  {
    icon: 'sanitizer',
    title: 'AC Servicing',
    desc: 'Comprehensive multi-point inspection, coil cleaning, filter purification, and airflow calibration.',
  },
  {
    icon: 'waves',
    title: 'AC Deep Cleaning',
    desc: 'Complete indoor and outdoor unit sanitization to eliminate dirt, allergens, and microbial buildup.',
  },
  {
    icon: 'cyclone',
    title: 'Gas Refilling',
    desc: 'Accurate refrigerant level testing, leak inspection, and pure gas charging for optimal cooling.',
  },
  {
    icon: 'tune',
    title: 'System Diagnostics',
    desc: 'Advanced thermal testing, airflow velocity evaluation, and electrical load profiling for peak efficiency.',
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-16 sm:py-24 relative bg-gradient-to-b from-[#f4f9fd] via-[#eaf4fc] to-[#f4f9fd] border-t border-[#d0e6f7] scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="font-mono text-[11px] sm:text-xs text-[#0284c7] tracking-widest uppercase font-semibold">
              ABOUT EZCOOL
            </span>
          </div>
          <h2 className="font-headline text-2xl xs:text-3xl sm:text-4xl md:text-[44px] text-[#0f2744] font-light tracking-tight leading-tight">
            Comfort You Can Trust.
            <br />
            <span className="text-[#0284c7] font-normal">Cooling You Can Feel.</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#486581] mt-3 sm:mt-4 font-normal leading-relaxed">
            At EZCOOL, we believe that reliable air conditioning is essential for
            everyday comfort. We are focused on providing professional air
            conditioning servicing, repair and installation solutions designed to
            keep your spaces comfortable and your cooling systems performing
            efficiently.
          </p>
        </div>

        {/* Narrative Grid: Who We Are & Mission / Why Choose Us & Commitment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {/* Card 1: Who We Are */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-[#d0e6f7] shadow-[0_4px_16px_rgba(2,132,199,0.06)] hover:border-[#38bdf8] transition-all duration-300">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] border border-[#bae6fd] flex items-center justify-center text-[#0284c7]">
                <span className="material-symbols-outlined text-[22px]">apartment</span>
              </div>
              <h3 className="font-headline text-lg sm:text-xl text-[#0f2744] font-medium">
                Who We Are
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-[13px] md:text-sm text-[#486581] leading-relaxed">
              EZCOOL is a dedicated air-conditioning servicing, repair, and
              installation company. We provide comprehensive cooling care for
              residences, apartments, and commercial environments, combining
              skilled craftsmanship with systematic attention to detail.
            </p>
          </div>

          {/* Card 2: Our Mission */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-[#d0e6f7] shadow-[0_4px_16px_rgba(2,132,199,0.06)] hover:border-[#38bdf8] transition-all duration-300">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] border border-[#bae6fd] flex items-center justify-center text-[#0284c7]">
                <span className="material-symbols-outlined text-[22px]">flag</span>
              </div>
              <h3 className="font-headline text-lg sm:text-xl text-[#0f2744] font-medium">
                Our Mission
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-[13px] md:text-sm text-[#486581] leading-relaxed">
              Our mission is to deliver dependable cooling solutions through
              quality workmanship, prompt technical service, and unwavering
              customer satisfaction. We ensure every unit we service runs quietly,
              reliably, and at peak thermodynamic efficiency.
            </p>
          </div>

          {/* Card 3: Why Choose EZCOOL */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-[#d0e6f7] shadow-[0_4px_16px_rgba(2,132,199,0.06)] hover:border-[#38bdf8] transition-all duration-300">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] border border-[#bae6fd] flex items-center justify-center text-[#0284c7]">
                <span className="material-symbols-outlined text-[22px]">thumb_up</span>
              </div>
              <h3 className="font-headline text-lg sm:text-xl text-[#0f2744] font-medium">
                Why Choose EZCOOL
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-[13px] md:text-sm text-[#486581] leading-relaxed">
              We stand apart through our dependable support, trained technical
              personnel, and customer-focused approach. Whether performing a routine
              filter clean or a complex system overhaul, we treat every property
              with surgical cleanliness and care.
            </p>
          </div>

          {/* Card 4: Our Commitment */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/95 border border-[#d0e6f7] shadow-[0_4px_16px_rgba(2,132,199,0.06)] hover:border-[#38bdf8] transition-all duration-300">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#e0f2fe] border border-[#bae6fd] flex items-center justify-center text-[#0284c7]">
                <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
              </div>
              <h3 className="font-headline text-lg sm:text-xl text-[#0f2744] font-medium">
                Our Commitment
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-[13px] md:text-sm text-[#486581] leading-relaxed">
              We are committed to clear and upfront transparency, reliable
              workmanship, and long-term customer comfort. We believe in building
              enduring relationships through honest guidance, fair service, and
              uncompromising cooling quality.
            </p>
          </div>
        </div>

        {/* Our Expertise Sub-Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <span className="font-mono text-[10px] sm:text-xs text-[#0284c7] tracking-widest uppercase font-semibold block mb-1">
                OUR EXPERTISE
              </span>
              <h3 className="font-headline text-xl sm:text-2xl text-[#0f2744] font-medium">
                Comprehensive Air Conditioning Services
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {expertiseItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-xl bg-white/90 border border-[#d0e6f7] hover:border-[#38bdf8] shadow-[0_2px_10px_rgba(2,132,199,0.04)] hover:shadow-[0_6px_20px_rgba(2,132,199,0.1)] transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="material-symbols-outlined text-[#0284c7] text-[20px] group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <h4 className="font-headline text-base text-[#0f2744] font-medium group-hover:text-[#0284c7] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="font-sans text-xs sm:text-[13px] text-[#486581] leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
