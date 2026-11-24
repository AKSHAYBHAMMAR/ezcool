'use client';

import React from 'react';

const testimonials = [
  {
    quote:
      '"EZCOOL provided exceptional AC servicing at our home. The technician arrived on time, thoroughly cleaned the indoor and outdoor units, checked the refrigerant levels, and restored the cooling performance. The entire experience was smooth, professional, and hassle-free."',
    author: 'Akshay Bhammer',
  },
  {
    quote:
      '"Their response time during our midsummer chiller failure was under an hour. The master engineer identified a micro-leak that two previous contractors missed, re-charged R32, and restored perfect cold airflow."',
    author: 'Priya Sharma',
  },
  {
    quote:
      '"The digital telemetry report provided after the coil overhaul is something I have never experienced with conventional contractors. Unbelievable professionalism, pure air, and surgical cleanliness."',
    author: 'Arjun Desai',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-24 relative bg-[#f4f9fd] border-t border-[#d0e6f7] scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
              <span className="font-mono text-[11px] sm:text-xs text-[#0284c7] tracking-widest uppercase font-semibold">
                CLIENT CREDENTIALS
              </span>
            </div>
            <h2 className="font-headline text-2xl xs:text-3xl sm:text-4xl md:text-[44px] text-[#0f2744] font-light tracking-tight leading-tight">
              Validated by Excellence.
            </h2>
          </div>
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 bg-white/95 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 rounded-full border border-[#d0e6f7] shadow-sm max-w-full">
            <div className="flex items-center text-[#0284c7] flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[14px] xs:text-[16px] sm:text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="font-mono text-[9px] xs:text-[11px] sm:text-xs text-[#0f2744] font-semibold tracking-tight sm:tracking-wide">
              4.9 / 5.0 RATING (2,400+ REVIEWS)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 bg-white/95 border border-[#d0e6f7] hover:border-[#38bdf8] shadow-[0_8px_20px_-4px_rgba(2,132,199,0.08)] hover:shadow-[0_16px_30px_-6px_rgba(2,132,199,0.18)]"
            >
              <div>
                <div className="flex items-center gap-1 text-[#0284c7] mb-5 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-sans text-xs sm:text-sm md:text-[15px] text-[#334e68] font-normal italic mb-6 sm:mb-8 leading-relaxed">
                  {item.quote}
                </p>
              </div>
              <div className="pt-4 sm:pt-5 border-t border-[#e2eef8] flex items-center justify-between">
                <span className="font-headline text-[#0f2744] text-sm sm:text-base font-semibold">
                  {item.author}
                </span>
                <span className="material-symbols-outlined text-[#0284c7] text-[20px] sm:text-[22px]">
                  verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
