'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => {
      window.removeEventListener('resize', checkMobile);
      mq.removeEventListener('change', handler);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!reducedMotion) {
      video.playbackRate = 1.0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented playback, poster layer seamlessly continues
        });
      }
    } else {
      video.pause();
    }
  }, [reducedMotion]);

  const handlePlaying = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-screen h-[100svh] min-h-[100svh] overflow-hidden m-0 p-0 bg-[#8fadbe]"
    >
      {/* 1. Instant First-Frame Poster Layer: Visible immediately on initial paint */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <source media="(max-width: 767px)" srcSet="/hero-poster-mobile.jpg" />
        <source media="(min-width: 768px)" srcSet="/hero-poster.jpg" />
        <img
          src="/hero-poster.jpg"
          alt="EZCOOL Premium Climate Control"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />
      </picture>

      {/* 2. Video Element: Smoothly fades in once playing, eliminating black/blank flash */}
      {!videoError && !reducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={handlePlaying}
          onError={() => setVideoError(true)}
          className={`hero-video z-[1] transition-opacity duration-700 ease-out ${
            isVideoPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          poster={isMobile ? '/hero-poster-mobile.jpg' : '/hero-poster.jpg'}
        >
          {/* Mobile-optimized 720x1560 portrait video */}
          <source
            src="/videos/hero-mobile.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          <source
            src="/hero-mobile.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
          {/* Desktop original 1280x720 landscape video */}
          <source
            src="/videos/hero section video.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
          <source
            src="/hero section video.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
          {/* Standard fallbacks */}
          <source src="/hero section video.mp4" type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      )}

      {/* 3. Static fallback for reduced motion or error */}
      {(videoError || reducedMotion) && (
        <div
          className="hero-fallback-bg z-[1]"
          style={{
            backgroundImage: `url('${isMobile ? '/hero-poster-mobile.jpg' : '/hero-poster.jpg'}')`,
          }}
        />
      )}

      {/* Brand Messaging Overlay — Center-Right Open Area */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center sm:justify-end px-4 xs:px-6 sm:px-12 md:px-16 lg:px-24">
        <div
          className={`pointer-events-auto max-w-[290px] xs:max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] text-left relative md:top-[50px] transition-all duration-1000 ease-out transform ${
            mounted && !reducedMotion
              ? 'opacity-100 translate-y-0'
              : mounted && reducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          } mt-2 sm:mt-0 mb-14 xs:mb-16 sm:mb-0`}
        >
          {/* Eyebrow text */}
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0284c7] shadow-[0_0_8px_#38bdf8] flex-shrink-0" />
            <span className="font-mono text-[9px] xs:text-[10px] sm:text-xs text-[#0369a1] tracking-[0.18em] xs:tracking-[0.22em] uppercase font-bold [text-shadow:_0_1px_3px_rgba(255,255,255,0.9)] truncate">
              EZCOOL · PREMIUM AC SERVICES
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-headline text-[26px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#0f2744] font-medium tracking-tight leading-[1.08] [text-shadow:_0_1px_4px_rgba(255,255,255,0.85)]">
            Breathe Better.
            <br />
            <span className="text-[#0284c7] font-semibold">Live Cooler.</span>
          </h1>

          {/* Supporting Tagline */}
          <p className="font-headline text-xs xs:text-sm sm:text-base md:text-lg text-[#1e3a5f] font-normal tracking-tight mt-2.5 xs:mt-3 sm:mt-4 [text-shadow:_0_1px_3px_rgba(255,255,255,0.9)]">
            Precision cooling. Exceptional comfort.
          </p>

          {/* Company Motto */}
          <p className="font-sans text-[11px] xs:text-xs sm:text-[13px] text-[#334e68] font-medium tracking-wide mt-1 xs:mt-1.5 sm:mt-2 italic [text-shadow:_0_1px_3px_rgba(255,255,255,0.95)]">
            &ldquo;Engineered for comfort, designed for life.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
