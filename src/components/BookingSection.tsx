'use client';

import React, { useState } from 'react';

export default function BookingSection() {
  const [selectedService, setSelectedService] = useState('AC Servicing');
  const [systemType, setSystemType] = useState('Ducted Central / VRF');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 - 11:00 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `AERIS-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(generatedRef);
    setBookingSuccess(true);
  };

  const handleReset = () => {
    setBookingSuccess(false);
    setDate('');
    setName('');
    setPhone('');
    setAddress('');
  };

  return (
    <section
      id="booking"
      className="py-28 relative bg-[#0a0e16] border-t border-white/5 overflow-hidden"
    >
      {/* Spotlight Cyan Radial Aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[700px] h-[400px] bg-[#38bdf8]/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c2028] border border-white/10 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          <span className="font-mono text-xs text-[#8ed5ff] tracking-widest uppercase font-medium">
            CONCIERGE DISPATCH ACTIVE
          </span>
        </div>

        <h2 className="font-headline text-3xl sm:text-5xl md:text-[64px] text-white font-light tracking-tight mb-6 leading-tight">
          Your Comfort Starts Here.
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#bdc8d1] max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Book your AC service today and experience the difference of surgical
          climate calibration, whisper-quiet performance, and certified pure
          air.
        </p>

        {/* Quick CTA Options */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#0a0e16] font-headline text-sm tracking-tight font-medium hover:bg-[#c4e7ff] hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] transition-all duration-300 active:scale-95"
            href="#booking-form"
          >
            <span>Schedule Online Now</span>
            <span className="material-symbols-outlined text-[18px]">
              calendar_today
            </span>
          </a>
          <a
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1c2028]/60 hover:bg-[#1c2028] text-[#dfe2ee] border border-white/10 font-headline text-sm tracking-tight transition-all duration-300 backdrop-blur-md hover:border-white/20 active:scale-95"
            href="tel:+18005550199"
          >
            <span className="material-symbols-outlined text-[#8ed5ff] text-[18px]">
              call
            </span>
            <span>+1 (800) 555-AERIS</span>
          </a>
        </div>

        {/* Interactive Booking Console */}
        <div
          id="booking-form"
          className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 max-w-3xl mx-auto text-left relative shadow-2xl"
        >
          {bookingSuccess ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#38bdf8]/20 border border-[#38bdf8] flex items-center justify-center mx-auto text-[#8ed5ff]">
                <span className="material-symbols-outlined text-3xl">
                  check_circle
                </span>
              </div>
              <div>
                <span className="font-mono text-xs text-[#38bdf8] tracking-widest uppercase">
                  DISPATCH CONFIRMATION
                </span>
                <h3 className="font-headline text-3xl text-white font-medium mt-1">
                  Concierge Service Scheduled
                </h3>
                <p className="font-sans text-sm text-[#bdc8d1] max-w-md mx-auto mt-2 font-light">
                  A master thermodynamic technician has been tentatively queued.
                  You will receive SMS tracking telemetry 30 minutes prior to arrival.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c2028]/60 border border-white/10 max-w-md mx-auto font-mono text-xs space-y-2 text-left">
                <div className="flex justify-between">
                  <span className="text-[#87929a]">DISPATCH REF:</span>
                  <span className="text-[#8ed5ff] font-medium">{bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#87929a]">SERVICE:</span>
                  <span className="text-white">{selectedService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#87929a]">SYSTEM:</span>
                  <span className="text-white">{systemType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#87929a]">WINDOW:</span>
                  <span className="text-white">{timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#87929a]">STATUS:</span>
                  <span className="text-emerald-400 font-medium">QUEUED // DISPATCH READY</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-[#1c2028] hover:bg-[#262a33] text-[#8ed5ff] border border-white/10 font-mono text-xs transition-colors"
              >
                Schedule Another Visit
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <h3 className="font-headline text-xl sm:text-2xl text-white font-medium">
                    Priority Service Reservation
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#bdc8d1] font-light">
                    Direct access to master thermodynamic engineers.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-[#8ed5ff] bg-[#38bdf8]/10 px-3 py-1 rounded-full border border-[#38bdf8]/30">
                  EST. RESPONSE &lt; 90 MIN
                </span>
              </div>

              {/* Step 1: Service Type Selection */}
              <div>
                <label className="block font-mono text-xs text-[#8ed5ff] uppercase tracking-wider mb-2.5">
                  1. Select Architectural Service
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    'AC Servicing',
                    'AC Repair',
                    'AC Installation',
                    'Gas Refill & Clean',
                  ].map((srv) => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setSelectedService(srv)}
                      className={`p-3 rounded-xl border text-xs font-mono text-center transition-all ${
                        selectedService === srv
                          ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-white shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                          : 'bg-[#1c2028]/40 border-white/10 text-[#bdc8d1] hover:border-white/20'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: System Type */}
              <div>
                <label className="block font-mono text-xs text-[#8ed5ff] uppercase tracking-wider mb-2.5">
                  2. System Configuration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Ducted Central / VRF',
                    'High-Wall Split',
                    'Multi-Zone Split',
                    'Concealed Cassette',
                    'Chiller System',
                    'Other / Not Sure',
                  ].map((sys) => (
                    <button
                      key={sys}
                      type="button"
                      onClick={() => setSystemType(sys)}
                      className={`p-2.5 rounded-xl border text-xs font-mono text-center transition-all ${
                        systemType === sys
                          ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-white'
                          : 'bg-[#1c2028]/40 border-white/10 text-[#bdc8d1] hover:border-white/20'
                      }`}
                    >
                      {sys}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Date & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#8ed5ff] uppercase tracking-wider mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1c2028]/70 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#8ed5ff] uppercase tracking-wider mb-2">
                    Arrival Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1c2028]/70 border border-white/10 text-white font-sans text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]"
                  >
                    <option value="09:00 - 11:00 AM">09:00 - 11:00 AM (Morning)</option>
                    <option value="11:00 - 01:00 PM">11:00 AM - 01:00 PM (Midday)</option>
                    <option value="02:00 - 04:00 PM">02:00 - 04:00 PM (Afternoon)</option>
                    <option value="04:00 - 06:00 PM">04:00 - 06:00 PM (Evening)</option>
                    <option value="EMERGENCY">Emergency ASAP Dispatch (&lt; 90 min)</option>
                  </select>
                </div>
              </div>

              {/* Step 4: Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#8ed5ff] uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Marcus von Bern"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1c2028]/70 border border-white/10 text-white placeholder-[#87929a] font-sans text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#8ed5ff] uppercase tracking-wider mb-2">
                    Phone Number (SMS Telemetry)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#1c2028]/70 border border-white/10 text-white placeholder-[#87929a] font-sans text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-[#8ed5ff] uppercase tracking-wider mb-2">
                  Service Property Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Apartment / Villa / Penthouse, Street, City"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1c2028]/70 border border-white/10 text-white placeholder-[#87929a] font-sans text-sm focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-white text-[#0a0e16] font-headline text-sm tracking-tight font-medium hover:bg-[#c4e7ff] hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Confirm Service Reservation</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Guarantee Micro-Bar */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-8 font-mono text-xs text-[#bdc8d1]">
          <span>NO HIDDEN TARIFFS</span>
          <span className="text-white/20">•</span>
          <span>SAME-DAY DISPATCH AVAILABLE</span>
          <span className="text-white/20">•</span>
          <span>100% SATISFACTION GUARANTEED</span>
        </div>
      </div>
    </section>
  );
}
