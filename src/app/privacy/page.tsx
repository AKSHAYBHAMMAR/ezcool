import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | EZCOOL AC Servicing',
  description:
    'EZCOOL AC Servicing Privacy Policy. Learn how we safeguard your personal data, dispatch addresses, and service records.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f4f9fd] text-[#0f2744] flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="w-full bg-white/90 backdrop-blur-xl border-b border-[#d0e6f7] sticky top-0 z-50 py-3 sm:py-4 px-3.5 xs:px-4 sm:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 xs:gap-2.5 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] shadow-[0_0_10px_#38bdf8] flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-headline text-lg sm:text-xl tracking-wider text-[#0f2744] uppercase font-bold leading-none">
                EZCOOL
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-widest text-[#0284c7] uppercase font-semibold mt-0.5">
                AC SERVICING
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 xs:px-4 py-1.5 sm:py-2 rounded-full bg-[#e0f2fe] text-[#0284c7] hover:bg-[#bae6fd] font-mono text-[11px] sm:text-xs font-semibold transition-colors min-h-[38px]"
          >
            <span className="material-symbols-outlined text-[15px] sm:text-[16px]">arrow_back</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3.5 xs:px-4 sm:px-8 py-10 sm:py-16 w-full">
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e0f2fe] border border-[#bae6fd] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" />
            <span className="font-mono text-[10px] xs:text-xs text-[#0284c7] tracking-widest uppercase font-semibold">
              DATA INTEGRITY &amp; TRUST
            </span>
          </div>
          <h1 className="font-headline text-2xl xs:text-3xl sm:text-4xl text-[#0f2744] font-medium tracking-tight">
            Privacy Policy
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#486581] mt-2">
            Last updated: October 2026 • EZCOOL AC Servicing
          </p>
        </div>

        <div className="glass-card rounded-2xl p-4 xs:p-6 sm:p-10 border border-[#d0e6f7] bg-white/95 space-y-6 sm:space-y-8 font-sans text-xs xs:text-sm text-[#334e68] leading-relaxed shadow-sm">
          <section className="space-y-3">
            <h2 className="font-headline text-lg sm:text-xl text-[#0f2744] font-semibold">
              1. Information We Collect
            </h2>
            <p>
              When you schedule service, book an emergency technician dispatch, or contact EZCOOL AC Servicing, we collect only the necessary details required to deliver exceptional air conditioning support:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#486581]">
              <li>Contact details: Name, phone number (for SMS dispatch updates), and email address.</li>
              <li>Service address: Residential property or commercial facility location for engineer dispatch.</li>
              <li>HVAC system parameters: AC model, system type (split, VRF, central ducted), and symptoms.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg sm:text-xl text-[#0f2744] font-semibold">
              2. How We Protect &amp; Use Your Data
            </h2>
            <p>
              Your personal information is used exclusively to dispatch master engineers, send real-time GPS arrival notifications, and verify service warranties. All records are transmitted through encrypted channels and maintained with industry-standard security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg sm:text-xl text-[#0f2744] font-semibold">
              3. Zero Third-Party Selling
            </h2>
            <p>
              EZCOOL maintains a strict zero-sharing policy. We do not sell, rent, lease, or trade your contact details, service records, or address to any external advertisers or third-party marketing entities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-lg sm:text-xl text-[#0f2744] font-semibold">
              4. Contact Our Concierge
            </h2>
            <p>
              If you have any questions or requests regarding your data, please contact our concierge team at{' '}
              <a href="mailto:contact@ezcool.com" className="text-[#0284c7] font-semibold hover:underline">
                contact@ezcool.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

