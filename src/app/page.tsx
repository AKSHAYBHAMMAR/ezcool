import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import FloatingBookingButton from '@/components/FloatingBookingButton';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f9fd] text-[#0f2744] relative">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <BookingSection />
      <Footer />
      <FloatingBookingButton />
    </main>
  );
}
