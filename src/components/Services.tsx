'use client';

import React from 'react';

const services = [
  {
    num: '01 // REPAIR',
    title: 'AC Repair',
    icon: 'build_circle',
    description:
      'Thermal camera leak diagnostics, emergency compressor recalibration, and sensor replacement with guaranteed zero operational downtime.',
    tag: 'DISPATCH < 90 MIN',
    highlight: 'Emergency Response',
  },
  {
    num: '02 // SERVICING',
    title: 'AC Servicing',
    icon: 'sanitizer',
    description:
      'Hydro-microbial deep coil washing, dual-stage turbine sanitization, air filter replacement, and static pressure balancing.',
    tag: 'BIO-CERTIFIED',
    highlight: 'Deep Purification',
  },
  {
    num: '03 // INSTALL',
    title: 'AC Installation',
    icon: 'architecture',
    description:
      'Bespoke VRF, mini-split, and architectural concealed ducted systems engineered to integrate invisibly into luxury interior layouts.',
    tag: 'FLUSH INTEGRATION',
    highlight: 'Architectural Grade',
  },
  {
    num: '04 // RECHARGE',
    title: 'Gas Refilling & Cleaning',
    icon: 'cyclone',
    description:
      'Precision digital scale refrigerant charging with pure R32/R410A compounds, high-vacuum evacuation, and spectroscopic seal assurance.',
    tag: 'PURE COMPOSITION',
    highlight: 'Zero Degradation',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 relative bg-gradient-to-b from-[#f4f9fd] via-[#eaf3fa] to-[#f4f9fd] border-t border-[#d0e6f7] scroll-mt-28"
    >
      <div id="systems" className="scroll-mt-28 absolute -top-24 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span className="font-mono text-xs text-[#0284c7] tracking-widest uppercase font-semibold">
                SERVICES CATALOGUE
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-[44px] text-[#0f2744] font-light tracking-tight leading-tight">
              Complete Cooling Solutions.
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[#486581] max-w-md font-normal leading-relaxed">
            Architectural climate engineering calibrated for whisper-quiet
            efficiency, sterile hygiene standards, and uncompromising
            longevity.
          </p>
        </div>

        {/* Bento Grid Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden bg-white/95 border border-[#d0e6f7] hover:border-[#38bdf8] shadow-[0_8px_20px_-4px_rgba(2,132,199,0.08)] hover:shadow-[0_16px_30px_-6px_rgba(2,132,199,0.18)]"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#38bdf8]/10 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:bg-[#38bdf8]/20" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-[#0284c7] tracking-wider font-semibold">
                    {service.num}
                  </span>
                  <span className="material-symbols-outlined text-[#0284c7] group-hover:text-[#0369a1] transition-colors text-2xl">
                    {service.icon}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-medium text-[#0369a1] bg-[#e0f2fe] border border-[#bae6fd] mb-2">
                    {service.highlight}
                  </span>
                  <h3 className="font-headline text-2xl text-[#0f2744] font-medium group-hover:text-[#0284c7] transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="font-sans text-xs sm:text-[13px] text-[#486581] mb-6 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              <div className="pt-5 border-t border-[#e2eef8] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#627d98] tracking-wider uppercase font-medium">
                  {service.tag}
                </span>
                <a
                  className="text-[#0284c7] group-hover:text-[#0369a1] transition-colors font-mono text-xs flex items-center gap-1 font-semibold"
                  href="#booking"
                >
                  <span>BOOK</span>
                  <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
