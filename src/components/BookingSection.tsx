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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          address,
          service_type: selectedService,
          system_type: systemType,
          preferred_date: date,
          arrival_window: timeSlot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to schedule reservation. Please try again.');
      }

      const confirmedRef = data.booking?.booking_ref || `EZCOOL-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingRef(confirmedRef);
      setBookingSuccess(true);
    } catch (err: unknown) {
      console.error('Booking submission error:', err);
      const message = err instanceof Error ? err.message : 'An unexpected error occurred while booking. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setBookingSuccess(false);
    setDate('');
    setName('');
    setPhone('');
    setAddress('');
    setSubmitError(null);
    setIsSubmitting(false);
  };

  return (
    <section
      id="booking"
      className="py-16 sm:py-28 relative bg-gradient-to-b from-[#f4f9fd] via-[#eaf4fc] to-[#f4f9fd] border-t border-[#d0e6f7] overflow-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div id="contact" className="scroll-mt-24 sm:scroll-mt-28 absolute -top-20 sm:-top-24 pointer-events-none" />
      {/* Spotlight Cyan Radial Aura */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="w-[90vw] max-w-[700px] h-[350px] sm:h-[400px] bg-[#38bdf8]/15 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-3.5 xs:px-4 sm:px-8 lg:px-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] mb-4 sm:mb-6">
          <span className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
          <span className="font-mono text-[10px] xs:text-[11px] sm:text-xs text-[#0284c7] tracking-widest uppercase font-semibold">
            CONCIERGE DISPATCH ACTIVE
          </span>
        </div>

        <h2 className="font-headline text-2xl xs:text-3xl sm:text-5xl md:text-[64px] text-[#0f2744] font-light tracking-tight mb-4 sm:mb-6 leading-tight">
          Your Comfort Starts Here.
        </h2>

        <p className="font-sans text-xs xs:text-sm sm:text-base md:text-lg text-[#486581] max-w-2xl mx-auto mb-8 sm:mb-12 font-normal leading-relaxed px-1">
          Book your AC service today and experience the difference of surgical
          climate calibration, whisper-quiet performance, and certified pure
          air.
        </p>

        {/* Quick CTA Options */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-16">
          <a
            className="inline-flex items-center justify-center gap-2.5 px-5 xs:px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#0284c7] text-white font-headline text-xs xs:text-sm tracking-tight font-semibold hover:bg-[#0369a1] hover:shadow-[0_6px_22px_rgba(2,132,199,0.35)] transition-all duration-300 active:scale-95 min-h-[48px]"
            href="#booking-form"
          >
            <span>Schedule Online Now</span>
            <span className="material-symbols-outlined text-[18px]">
              calendar_today
            </span>
          </a>
          <a
            className="inline-flex items-center justify-center gap-2.5 px-5 xs:px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/95 hover:bg-white text-[#0f2744] border border-[#d0e6f7] font-headline text-xs xs:text-sm tracking-tight transition-all duration-300 shadow-sm hover:border-[#0284c7] hover:shadow-md active:scale-95 min-h-[48px]"
            href="tel:+18005553926"
          >
            <span className="material-symbols-outlined text-[#0284c7] text-[18px]">
              call
            </span>
            <span className="font-semibold">Call Us</span>
          </a>
        </div>

        {/* Interactive Booking Console */}
        <div
          id="booking-form"
          className="glass-card rounded-2xl sm:rounded-3xl p-3.5 xs:p-5 sm:p-8 md:p-10 border border-[#d0e6f7] bg-white/95 max-w-3xl mx-auto text-left relative shadow-[0_20px_50px_-10px_rgba(2,132,199,0.14)]"
        >
          {bookingSuccess ? (
            <div className="py-6 sm:py-8 text-center space-y-5 sm:space-y-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#e0f2fe] border-2 border-[#0284c7] flex items-center justify-center mx-auto text-[#0284c7]">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">
                  check_circle
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] sm:text-xs text-[#0284c7] tracking-widest uppercase font-semibold">
                  DISPATCH CONFIRMATION
                </span>
                <h3 className="font-headline text-xl xs:text-2xl sm:text-3xl text-[#0f2744] font-medium mt-1">
                  Concierge Service Scheduled
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#486581] max-w-md mx-auto mt-2 font-normal">
                  A master thermodynamic technician has been tentatively queued.
                  You will receive SMS tracking telemetry 30 minutes prior to arrival.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#f4f9fd] border border-[#d0e6f7] max-w-md mx-auto font-mono text-[10px] xs:text-[11px] sm:text-xs space-y-2 text-left">
                <div className="flex justify-between gap-2">
                  <span className="text-[#627d98]">DISPATCH REF:</span>
                  <span className="text-[#0284c7] font-semibold">{bookingRef}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#627d98]">SERVICE:</span>
                  <span className="text-[#0f2744] font-medium text-right">{selectedService}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#627d98]">SYSTEM:</span>
                  <span className="text-[#0f2744] font-medium text-right">{systemType}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#627d98]">WINDOW:</span>
                  <span className="text-[#0f2744] font-medium text-right">{timeSlot}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#627d98]">STATUS:</span>
                  <span className="text-emerald-600 font-semibold text-right">QUEUED // DISPATCH READY</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="min-h-[44px] px-6 py-2.5 rounded-full bg-white hover:bg-[#e0f2fe] text-[#0284c7] border border-[#d0e6f7] font-mono text-xs font-semibold transition-colors shadow-sm"
              >
                Schedule Another Visit
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-[#e2eef8] gap-2">
                <div>
                  <h3 className="font-headline text-lg sm:text-2xl text-[#0f2744] font-medium">
                    Priority Service Reservation
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#486581] font-normal">
                    Direct access to master thermodynamic engineers.
                  </p>
                </div>
                <span className="font-mono text-[9px] xs:text-[10px] text-[#0284c7] bg-[#e0f2fe] px-2.5 xs:px-3 py-1 rounded-full border border-[#bae6fd] font-semibold self-start sm:self-auto">
                  EST. RESPONSE &lt; 90 MIN
                </span>
              </div>

              {/* Error Notice */}
              {submitError && (
                <div className="p-3.5 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[20px] text-red-600 flex-shrink-0">
                    error
                  </span>
                  <span className="font-sans leading-normal">{submitError}</span>
                </div>
              )}

              {/* Step 1: Service Type Selection */}
              <div>
                <label className="block font-mono text-[10px] xs:text-[11px] sm:text-xs text-[#0369a1] uppercase tracking-wider mb-2 font-semibold">
                  1. Select Architectural Service
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
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
                      className={`min-h-[44px] p-2 xs:p-2.5 sm:p-3 rounded-xl border text-[11px] sm:text-xs font-mono text-center font-medium transition-all flex items-center justify-center leading-tight break-words ${
                        selectedService === srv
                          ? 'bg-[#0284c7] border-[#0284c7] text-white shadow-[0_2px_10px_rgba(2,132,199,0.3)]'
                          : 'bg-[#f4f9fd] border-[#d0e6f7] text-[#334e68] hover:border-[#0284c7]/50 hover:bg-white'
                      }`}
                    >
                      <span>{srv}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: System Type */}
              <div>
                <label className="block font-mono text-[10px] xs:text-[11px] sm:text-xs text-[#0369a1] uppercase tracking-wider mb-2 font-semibold">
                  2. System Configuration
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-2.5">
                  {[
                    { name: 'Ducted Central / VRF', span: 'col-span-1 sm:col-span-2' },
                    { name: 'High-Wall Split', span: 'col-span-1 sm:col-span-2' },
                    { name: 'Multi-Zone Split', span: 'col-span-1 sm:col-span-2' },
                    { name: 'Concealed Cassette', span: 'col-span-1 sm:col-span-3' },
                    { name: 'Other / Not Sure', span: 'col-span-2 sm:col-span-3' },
                  ].map((sys) => (
                    <button
                      key={sys.name}
                      type="button"
                      onClick={() => setSystemType(sys.name)}
                      className={`min-h-[44px] p-2 xs:p-2.5 rounded-xl border text-[10px] xs:text-[11px] sm:text-xs font-mono text-center font-medium transition-all flex items-center justify-center leading-snug break-words ${sys.span} ${
                        systemType === sys.name
                          ? 'bg-[#0284c7] border-[#0284c7] text-white shadow-[0_2px_10px_rgba(2,132,199,0.3)]'
                          : 'bg-[#f4f9fd] border-[#d0e6f7] text-[#334e68] hover:border-[#0284c7]/50 hover:bg-white'
                      }`}
                    >
                      <span className="px-0.5">{sys.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Date & Time Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block font-mono text-[10px] xs:text-[11px] sm:text-xs text-[#0369a1] uppercase tracking-wider mb-1.5 sm:mb-2 font-semibold">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full min-w-0 max-w-full min-h-[44px] px-3 xs:px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#f8fbfe] border border-[#d0e6f7] text-[#0f2744] font-sans text-xs xs:text-sm focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] xs:text-[11px] sm:text-xs text-[#0369a1] uppercase tracking-wider mb-1.5 sm:mb-2 font-semibold">
                    Arrival Window
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full min-w-0 max-w-full min-h-[44px] px-3 xs:px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#f8fbfe] border border-[#d0e6f7] text-[#0f2744] font-sans text-xs xs:text-sm focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] focus:bg-white transition-colors"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block font-mono text-[10px] xs:text-[11px] sm:text-xs text-[#0369a1] uppercase tracking-wider mb-1.5 sm:mb-2 font-semibold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-w-0 max-w-full min-h-[44px] px-3 xs:px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#f8fbfe] border border-[#d0e6f7] text-[#0f2744] placeholder-[#87929a] font-sans text-xs xs:text-sm focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] xs:text-[11px] sm:text-xs text-[#0369a1] uppercase tracking-wider mb-1.5 sm:mb-2 font-semibold">
                    Phone Number (SMS Telemetry)
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                    placeholder="Enter your mobile number"
                    value={phone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, '');
                      if (digitsOnly.length <= 10) {
                        setPhone(digitsOnly);
                      }
                    }}
                    className="w-full min-w-0 max-w-full min-h-[44px] px-3 xs:px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#f8fbfe] border border-[#d0e6f7] text-[#0f2744] placeholder-[#87929a] font-sans text-xs xs:text-sm focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] xs:text-[11px] sm:text-xs text-[#0369a1] uppercase tracking-wider mb-1.5 sm:mb-2 font-semibold">
                  Service Property Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Apartment / Villa / Penthouse, Street, City"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full min-w-0 max-w-full min-h-[44px] px-3 xs:px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#f8fbfe] border border-[#d0e6f7] text-[#0f2744] placeholder-[#87929a] font-sans text-xs xs:text-sm focus:outline-none focus:border-[#0284c7] focus:ring-1 focus:ring-[#0284c7] focus:bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full min-h-[50px] py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white font-headline text-xs xs:text-sm tracking-tight font-semibold hover:from-[#0369a1] hover:to-[#0284c7] hover:shadow-[0_6px_22px_rgba(2,132,199,0.35)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <span>
                  {isSubmitting ? 'Securing Dispatch Telemetry...' : 'Confirm Service Reservation'}
                </span>
                <span className={`material-symbols-outlined text-[18px] ${isSubmitting ? 'animate-spin' : ''}`}>
                  {isSubmitting ? 'progress_activity' : 'arrow_forward'}
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Guarantee Micro-Bar */}
        <div className="mt-8 xs:mt-10 sm:mt-12 flex flex-wrap justify-center items-center gap-2.5 xs:gap-3 sm:gap-8 font-mono text-[9px] xs:text-[10px] sm:text-xs text-[#627d98] font-medium px-2">
          <span>NO HIDDEN TARIFFS</span>
          <span className="text-[#bae6fd]">•</span>
          <span>SAME-DAY DISPATCH AVAILABLE</span>
          <span className="text-[#bae6fd]">•</span>
          <span>100% SATISFACTION GUARANTEED</span>
        </div>
      </div>
    </section>
  );
}
