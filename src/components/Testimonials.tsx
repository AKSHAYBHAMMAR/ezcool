'use client';

import React from 'react';

const testimonials = [
  {
    quote:
      '"AERIS transformed our private gallery space. The whisper-quiet acoustic balancing made the dual-zone VRF system virtually undetectable while keeping climate stability down to 0.2 degrees."',
    author: 'Marcus von Bern',
    role: 'RESIDENTIAL PENTHOUSE // ZÜRICH',
  },
  {
    quote:
      '"Their response time during our midsummer chiller failure was under an hour. The master engineer identified a micro-leak that two previous contractors missed, re-charged R32, and restored perfect cold airflow."',
    author: 'Elena Rostova',
    role: 'MANAGING DIRECTOR // LUMEN STUDIO',
  },
  {
    quote:
      '"The digital telemetry report provided after the coil overhaul is something I have never experienced with conventional contractors. Unbelievable professionalism, pure air, and surgical cleanliness."',
    author: 'David Thorne',
    role: 'PRIVATE ARCHITECT // SKYLINE APEX',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 relative bg-[#0a0e16] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-mono text-xs text-[#8ed5ff] tracking-widest uppercase mb-3 block font-medium">
              CLIENT CREDENTIALS
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-[44px] text-white font-light tracking-tight leading-tight">
              Validated by Excellence.
            </h2>
          </div>
          <div className="flex items-center gap-4 bg-[#1c2028]/60 px-5 py-3 rounded-full border border-white/10 backdrop-blur-md">
            <div className="flex items-center text-[#8ed5ff]">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <span className="font-mono text-xs text-white font-medium tracking-wide">
              4.9 / 5.0 RATING (2,400+ REVIEWS)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center gap-1 text-[#8ed5ff] mb-6">
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
                <p className="font-sans text-sm sm:text-[15px] text-[#bdc8d1] font-light italic mb-8 leading-relaxed">
                  {item.quote}
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-headline text-white text-base font-medium">
                    {item.author}
                  </div>
                  <div className="font-mono text-[10px] text-[#bdc8d1] tracking-wider mt-0.5">
                    {item.role}
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#8ed5ff] text-[22px]">
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
