'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (videoRef.current && !reducedMotion) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {
        // Fallback handled automatically via poster / fallback div
      });
    }
    if (videoRef.current && reducedMotion) {
      videoRef.current.pause();
    }
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[100svh] overflow-hidden m-0 p-0 bg-[#0a0e16]"
    >
      {!videoError && !reducedMotion ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          poster="/screen.png"
          className="w-full h-full object-cover object-center block m-0 p-0"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        <div
          className="w-full h-full bg-cover bg-center bg-[#0a0e16] m-0 p-0"
          style={{ backgroundImage: `url('/screen.png')` }}
        />
      )}

      {/* Small, subtle, light-blue mask positioned precisely over the bottom-right watermark area */}
      <div
        className="pointer-events-none absolute bottom-3 right-3 sm:bottom-5 sm:right-5 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-xl backdrop-blur-xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(186, 230, 253, 0.85) 0%, rgba(142, 213, 255, 0.6) 65%, rgba(186, 230, 253, 0.3) 100%)',
          boxShadow: '0 0 14px 4px rgba(186, 230, 253, 0.35)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
