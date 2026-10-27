'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {
        // Fallback handled automatically via poster / overlay
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center pt-28 pb-16 overflow-hidden bg-[#0a0e16]"
    >
      {/* Dedicated Full-Screen Background Video Container Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Cinematic Ambient Radial Gradient */}
        <div className="absolute inset-0 ambient-air-radial z-10" />

        {/* Video Background Layer */}
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            poster="/screen.png"
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 opacity-60 mix-blend-screen"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        ) : (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-40 mix-blend-screen scale-105"
            style={{ backgroundImage: `url('/screen.png')` }}
          />
        )}

        {/* Architectural Micro-Airflow Particles Simulation Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none z-10"
          style={{
            backgroundImage:
              'radial-gradient(rgba(142, 213, 255, 0.22) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Deep Atmospheric Vignette & Contrast Control Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e16] via-[#0a0e16]/65 to-[#0a0e16]/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e16] via-[#0a0e16]/80 to-transparent z-10" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100svh-12rem)]">
          {/* Left: Precision Information Core */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-7">
            {/* Eyebrow Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1c2028]/85 border border-white/10 w-fit backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8ed5ff]" />
              </span>
              <span className="font-mono text-[11px] text-[#8ed5ff] tracking-widest uppercase font-medium">
                PRECISION THERMODYNAMICS &amp; CLIMATE CARE
              </span>
            </div>

            {/* Hero Display Headline */}
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[64px] text-[#dfe2ee] font-light tracking-tight leading-[1.08]">
              Breathe Better.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#8ed5ff] to-[#38bdf8] font-medium">
                Live Cooler.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="font-sans text-base sm:text-lg text-[#bdc8d1] max-w-xl font-light leading-relaxed">
              Expert AC servicing, bespoke installation, and surgical repairs.
              Whisper-quiet climate architecture calibrated for continuous purity
              and effortless thermal comfort.
            </p>

            {/* CTA Clustered Controls */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#0a0e16] font-headline text-sm tracking-tight font-medium hover:bg-[#c4e7ff] hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] transition-all duration-300 active:scale-95"
                href="#booking"
              >
                <span>Book a Service</span>
                <span className="material-symbols-outlined text-[18px]">
                  calendar_month
                </span>
              </a>
              <a
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#1c2028]/60 hover:bg-[#1c2028] text-[#dfe2ee] border border-white/10 font-headline text-sm tracking-tight transition-all duration-300 backdrop-blur-md hover:border-white/20 active:scale-95"
                href="#services"
              >
                <span>Explore Solutions</span>
                <span className="material-symbols-outlined text-[18px] text-[#8ed5ff]">
                  arrow_downward
                </span>
              </a>
            </div>

            {/* Real-Time Telemetry Micro-Bar */}
            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 sm:gap-8 text-[#bdc8d1] font-mono text-[11px] tracking-wide">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8ed5ff] text-[18px]">
                  verified
                </span>
                <span>ISO 14644 PURITY LABS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8ed5ff] text-[18px]">
                  volume_mute
                </span>
                <span>18.4 dB(A) LOW-RESONANCE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8ed5ff] text-[18px]">
                  speed
                </span>
                <span>90-MIN EMERGENCY RESPONSE</span>
              </div>
            </div>
          </div>

          {/* Right: Floating Glass Telemetry Node (Preserves focal point while showcasing live stats) */}
          <div className="lg:col-span-4 flex flex-col justify-end items-end space-y-4 pt-6 lg:pt-0">
            <div className="glass-card p-6 rounded-2xl w-full max-w-sm border border-white/10 bg-[#1c2028]/50 shadow-2xl backdrop-blur-xl">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="font-mono text-[11px] text-[#8ed5ff] tracking-widest uppercase font-medium">
                  NODE // CENTRAL 01
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#aec6ff]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5bdeef] animate-pulse" />{' '}
                  OPTIMAL
                </span>
              </div>
              <div className="py-4 flex items-baseline justify-between">
                <div>
                  <div className="text-3xl font-headline font-light text-white tracking-tight">
                    20.5
                    <span className="text-[#8ed5ff] text-xl font-light">°C</span>
                  </div>
                  <div className="font-mono text-[10px] text-[#bdc8d1] tracking-wider mt-0.5">
                    TARGET THERMAL CORE
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-headline font-light text-[#5bdeef]">
                    99.8<span className="text-xs font-normal">%</span>
                  </div>
                  <div className="font-mono text-[10px] text-[#bdc8d1] tracking-wider mt-0.5">
                    AIR PURITY INDEX
                  </div>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-white/5">
                <div className="flex justify-between font-mono text-[10px] text-[#bdc8d1]">
                  <span>R32 CHARGE INTEGRITY</span>
                  <span className="text-white font-medium">100% NOMINAL</span>
                </div>
                <div className="w-full h-1.5 bg-[#31353e] rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-[#8ed5ff] to-[#38bdf8]" />
                </div>
              </div>
            </div>

            {/* Quick Dispatch Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-white/10 text-xs font-mono text-[#8ed5ff]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>4 TECHNICIANS ACTIVE NEARBY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
