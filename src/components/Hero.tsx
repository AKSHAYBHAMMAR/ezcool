'use client';

import React, { useRef, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

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

      {/* Navbar positioned strictly inside the Hero section */}
      <Navbar />
    </section>
  );
}
