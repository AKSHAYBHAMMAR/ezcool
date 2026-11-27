import { Resend } from 'resend';

export interface BookingConfirmationEmailParams {
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  serviceType: string;
  systemType: string;
  preferredDate: string;
  arrivalWindow: string;
  serviceAddress: string;
  status: string;
}

export interface BookingStatusConfirmedEmailParams {
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  serviceType: string;
  systemType: string;
  preferredDate: string;
  arrivalWindow: string;
  serviceAddress: string;
  assignedTechnician?: string | null;
  notes?: string | null;
}

export interface BookingCancellationEmailParams {
  bookingRef: string;
  customerName: string;
  customerEmail: string;
  serviceType: string;
  systemType: string;
  preferredDate: string;
  arrivalWindow: string;
  cancellationReason?: string | null;
}

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: string;
  skipped?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates that an email is deliverable and not a mock/legacy placeholder.
 * Prevents phantom dispatch to placeholder domains like @ezcool.local.
 */
export function isDeliverableCustomerEmail(email?: string | null): boolean {
  if (!email) return false;
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !EMAIL_REGEX.test(trimmed)) return false;
  if (
    trimmed.endsWith('@ezcool.local') ||
    trimmed.includes('legacy') ||
    trimmed === 'unknown@ezcool.local' ||
    trimmed === 'legacy-booking@ezcool.local'
  ) {
    return false;
  }
  return true;
}

/**
 * Formats an ISO date (e.g. '2026-12-05') into a human-readable date string.
 */
function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ==============================================================================
   1. Initial Booking Created Confirmation Email
   ============================================================================== */

function generateCreatedEmailHtml(params: BookingConfirmationEmailParams): string {
  const formattedDate = formatDate(params.preferredDate);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EZCOOL Booking Confirmation - ${params.bookingRef}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f2744; -webkit-font-smoothing: antialiased; }
    .wrapper { width: 100%; background-color: #f1f5f9; padding: 32px 16px; }
    .container { max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 39, 68, 0.08); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .brand { font-size: 24px; font-weight: 700; letter-spacing: 2px; margin: 0 0 6px 0; text-transform: uppercase; }
    .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #e0f2fe; margin: 0; font-weight: 500; }
    .content { padding: 32px 28px; }
    .hero-text { text-align: center; margin-bottom: 24px; }
    .hero-title { font-size: 20px; font-weight: 600; color: #0f2744; margin: 0 0 8px 0; }
    .hero-desc { font-size: 14px; color: #475569; line-height: 1.5; margin: 0; }
    .ref-badge { background-color: #f0f9ff; border: 1.5px dashed #0284c7; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 28px; }
    .ref-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #0284c7; margin-bottom: 4px; }
    .ref-code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 22px; font-weight: 700; color: #0369a1; letter-spacing: 1.5px; }
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 28px; background-color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .details-row td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #edf2f7; }
    .details-row:last-child td { border-bottom: none; }
    .details-label { width: 38%; color: #64748b; font-weight: 500; }
    .details-value { width: 62%; color: #0f2744; font-weight: 600; text-align: right; }
    .status-pill { display: inline-block; padding: 3px 10px; background-color: #e0f2fe; color: #0369a1; border-radius: 100px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.6; }
    .footer a { color: #0284c7; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="brand">EZCOOL</h1>
        <p class="tagline">Architectural Climate Engineering</p>
      </div>
      <div class="content">
        <div class="hero-text">
          <h2 class="hero-title">Service Reservation Queued</h2>
          <p class="hero-desc">Hello <strong>${escapeHtml(params.customerName)}</strong>, we have received your booking request.</p>
        </div>
        <div class="ref-badge">
          <div class="ref-label">Official Booking Reference</div>
          <div class="ref-code">${escapeHtml(params.bookingRef)}</div>
        </div>
        <table class="details-table" role="presentation">
          <tr class="details-row"><td class="details-label">Service Type</td><td class="details-value">${escapeHtml(params.serviceType)}</td></tr>
          <tr class="details-row"><td class="details-label">AC System Type</td><td class="details-value">${escapeHtml(params.systemType)}</td></tr>
          <tr class="details-row"><td class="details-label">Scheduled Date</td><td class="details-value">${escapeHtml(formattedDate)}</td></tr>
          <tr class="details-row"><td class="details-label">Arrival Window</td><td class="details-value">${escapeHtml(params.arrivalWindow)}</td></tr>
          <tr class="details-row"><td class="details-label">Service Address</td><td class="details-value">${escapeHtml(params.serviceAddress)}</td></tr>
          <tr class="details-row"><td class="details-label">Status</td><td class="details-value"><span class="status-pill">${escapeHtml(params.status)}</span></td></tr>
        </table>
        <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0; text-align: center;">
          Concierge support: <a href="mailto:support@ezcool.com">support@ezcool.com</a> | Call: <a href="tel:+18005553926">+1 800 555 3926</a>
        </p>
      </div>
      <div class="footer">
        <p style="margin: 0 0 6px 0;">&copy; ${new Date().getFullYear()} EZCOOL. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function generateCreatedEmailText(params: BookingConfirmationEmailParams): string {
  const formattedDate = formatDate(params.preferredDate);
  return `EZCOOL — Service Reservation Queued
==================================================
Hello ${params.customerName},

Thank you for choosing EZCOOL. Your air conditioning service reservation has been received.

BOOKING REFERENCE: ${params.bookingRef}
- Service Type:    ${params.serviceType}
- AC System:       ${params.systemType}
- Scheduled Date:  ${formattedDate}
- Arrival Window:  ${params.arrivalWindow}
- Service Address: ${params.serviceAddress}
- Status:          ${params.status}

Concierge Desk: support@ezcool.com | +1 800 555 3926
EZCOOL — Architectural Climate Engineering
`;
}

/* ==============================================================================
   2. Status Confirmed Lifecycle Email (Admin Accepted & Scheduled)
   ============================================================================== */

function generateConfirmedEmailHtml(params: BookingStatusConfirmedEmailParams): string {
  const formattedDate = formatDate(params.preferredDate);
  const technician = params.assignedTechnician || 'Assigned Master Thermodynamic Specialist';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Appointment Confirmed - ${params.bookingRef}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f2744; -webkit-font-smoothing: antialiased; }
    .wrapper { width: 100%; background-color: #f1f5f9; padding: 32px 16px; }
    .container { max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 39, 68, 0.08); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .brand { font-size: 24px; font-weight: 700; letter-spacing: 2px; margin: 0 0 6px 0; text-transform: uppercase; }
    .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #e0f2fe; margin: 0; font-weight: 500; }
    .content { padding: 32px 28px; }
    .hero-text { text-align: center; margin-bottom: 24px; }
    .hero-title { font-size: 21px; font-weight: 600; color: #0f2744; margin: 0 0 8px 0; }
    .hero-desc { font-size: 14px; color: #475569; line-height: 1.5; margin: 0; }
    .ref-badge { background-color: #f0fdf4; border: 1.5px solid #22c55e; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 26px; }
    .ref-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #16a34a; margin-bottom: 4px; }
    .ref-code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 22px; font-weight: 700; color: #15803d; letter-spacing: 1.5px; }
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 26px; background-color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .details-row td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #edf2f7; }
    .details-row:last-child td { border-bottom: none; }
    .details-label { width: 38%; color: #64748b; font-weight: 500; }
    .details-value { width: 62%; color: #0f2744; font-weight: 600; text-align: right; }
    .status-pill { display: inline-block; padding: 3px 10px; background-color: #dcfce7; color: #15803d; border-radius: 100px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
    .technician-box { background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; padding: 14px 16px; margin-bottom: 24px; }
    .technician-title { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #0284c7; letter-spacing: 0.5px; margin: 0 0 4px 0; }
    .technician-name { font-size: 13px; font-weight: 600; color: #0f2744; margin: 0; }
    .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.6; }
    .footer a { color: #0284c7; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="brand">EZCOOL</h1>
        <p class="tagline">Architectural Climate Engineering</p>
      </div>
      <div class="content">
        <div class="hero-text">
          <h2 class="hero-title">Service Appointment Confirmed</h2>
          <p class="hero-desc">Hello <strong>${escapeHtml(params.customerName)}</strong>, your service appointment has been reviewed and officially confirmed by our concierge dispatch team.</p>
        </div>
        <div class="ref-badge">
          <div class="ref-label">&#10003; Confirmed Booking Reference</div>
          <div class="ref-code">${escapeHtml(params.bookingRef)}</div>
        </div>
        <div class="technician-box">
          <p class="technician-title">Assigned Climate Specialist</p>
          <p class="technician-name">${escapeHtml(technician)}</p>
        </div>
        <table class="details-table" role="presentation">
          <tr class="details-row"><td class="details-label">Service</td><td class="details-value">${escapeHtml(params.serviceType)}</td></tr>
          <tr class="details-row"><td class="details-label">AC System Type</td><td class="details-value">${escapeHtml(params.systemType)}</td></tr>
          <tr class="details-row"><td class="details-label">Scheduled Date</td><td class="details-value">${escapeHtml(formattedDate)}</td></tr>
          <tr class="details-row"><td class="details-label">Arrival Window</td><td class="details-value">${escapeHtml(params.arrivalWindow)}</td></tr>
          <tr class="details-row"><td class="details-label">Service Address</td><td class="details-value">${escapeHtml(params.serviceAddress)}</td></tr>
          <tr class="details-row"><td class="details-label">Status</td><td class="details-value"><span class="status-pill">CONFIRMED</span></td></tr>
          ${params.notes ? `<tr class="details-row"><td class="details-label">Notes</td><td class="details-value">${escapeHtml(params.notes)}</td></tr>` : ''}
        </table>
        <p style="font-size: 13px; color: #64748b; line-height: 1.6; text-align: center; margin: 0 0 12px 0;">
          Our technician will arrive equipped with precision diagnostics within your arrival window.
        </p>
        <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0; text-align: center;">
          Concierge Support: <a href="mailto:support@ezcool.com">support@ezcool.com</a> | Telephone: <a href="tel:+18005553926">+1 800 555 3926</a>
        </p>
      </div>
      <div class="footer">
        <p style="margin: 0 0 6px 0;">&copy; ${new Date().getFullYear()} EZCOOL. All rights reserved.</p>
        <p style="margin: 0;">Precision cooling. Exceptional comfort.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function generateConfirmedEmailText(params: BookingStatusConfirmedEmailParams): string {
  const formattedDate = formatDate(params.preferredDate);
  const technician = params.assignedTechnician || 'Assigned Master Thermodynamic Specialist';

  return `EZCOOL — Service Appointment Confirmed
==================================================
Hello ${params.customerName},

Your service appointment has been reviewed and officially confirmed by our concierge dispatch team.

BOOKING REFERENCE: ${params.bookingRef}
- Status:              CONFIRMED
- Assigned Specialist: ${technician}
- Service Type:        ${params.serviceType}
- AC Configuration:    ${params.systemType}
- Scheduled Date:      ${formattedDate}
- Arrival Window:      ${params.arrivalWindow}
- Service Address:     ${params.serviceAddress}
${params.notes ? `- Notes:               ${params.notes}\n` : ''}
Our technician will arrive equipped with certified diagnostic tools during your scheduled window.

Concierge Support: support@ezcool.com | +1 800 555 3926
EZCOOL — Architectural Climate Engineering
`;
}

/* ==============================================================================
   3. Status Cancelled Lifecycle Email
   ============================================================================== */

function generateCancelledEmailHtml(params: BookingCancellationEmailParams): string {
  const formattedDate = formatDate(params.preferredDate);
  const reason = params.cancellationReason || 'Cancelled at customer or administrative request.';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Service Booking Cancellation - ${params.bookingRef}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f2744; -webkit-font-smoothing: antialiased; }
    .wrapper { width: 100%; background-color: #f1f5f9; padding: 32px 16px; }
    .container { max-width: 580px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(15, 39, 68, 0.08); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #475569 0%, #334155 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .brand { font-size: 24px; font-weight: 700; letter-spacing: 2px; margin: 0 0 6px 0; text-transform: uppercase; }
    .tagline { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #cbd5e1; margin: 0; font-weight: 500; }
    .content { padding: 32px 28px; }
    .hero-text { text-align: center; margin-bottom: 24px; }
    .hero-title { font-size: 21px; font-weight: 600; color: #0f2744; margin: 0 0 8px 0; }
    .hero-desc { font-size: 14px; color: #475569; line-height: 1.5; margin: 0; }
    .ref-badge { background-color: #fef2f2; border: 1.5px solid #ef4444; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 26px; }
    .ref-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #dc2626; margin-bottom: 4px; }
    .ref-code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 22px; font-weight: 700; color: #b91c1c; letter-spacing: 1.5px; }
    .notice-box { background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 10px; padding: 14px 16px; margin-bottom: 24px; }
    .notice-title { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #c2410c; letter-spacing: 0.5px; margin: 0 0 4px 0; }
    .notice-text { font-size: 13px; color: #9a3412; margin: 0; line-height: 1.5; }
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 26px; background-color: #f8fafc; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .details-row td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #edf2f7; }
    .details-row:last-child td { border-bottom: none; }
    .details-label { width: 38%; color: #64748b; font-weight: 500; }
    .details-value { width: 62%; color: #0f2744; font-weight: 600; text-align: right; }
    .action-button { display: inline-block; background-color: #0284c7; color: #ffffff !important; padding: 12px 28px; border-radius: 100px; font-size: 13px; font-weight: 600; text-decoration: none; margin: 12px 0 20px 0; }
    .footer { background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; line-height: 1.6; }
    .footer a { color: #0284c7; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="brand">EZCOOL</h1>
        <p class="tagline">Architectural Climate Engineering</p>
      </div>
      <div class="content">
        <div class="hero-text">
          <h2 class="hero-title">Service Reservation Cancelled</h2>
          <p class="hero-desc">Hello <strong>${escapeHtml(params.customerName)}</strong>, this notice confirms that your air conditioning service appointment has been cancelled.</p>
        </div>
        <div class="ref-badge">
          <div class="ref-label">Cancelled Reference</div>
          <div class="ref-code">${escapeHtml(params.bookingRef)}</div>
        </div>
        <div class="notice-box">
          <p class="notice-title">Cancellation Reason</p>
          <p class="notice-text">${escapeHtml(reason)}</p>
        </div>
        <table class="details-table" role="presentation">
          <tr class="details-row"><td class="details-label">Service Type</td><td class="details-value">${escapeHtml(params.serviceType)}</td></tr>
          <tr class="details-row"><td class="details-label">AC System Type</td><td class="details-value">${escapeHtml(params.systemType)}</td></tr>
          <tr class="details-row"><td class="details-label">Cancelled Date</td><td class="details-value">${escapeHtml(formattedDate)}</td></tr>
          <tr class="details-row"><td class="details-label">Arrival Window</td><td class="details-value">${escapeHtml(params.arrivalWindow)}</td></tr>
          <tr class="details-row"><td class="details-label">Status</td><td class="details-value"><span style="color: #dc2626; font-weight: 700;">CANCELLED</span></td></tr>
        </table>
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 24px; font-size: 12px; color: #475569; line-height: 1.6;">
          <strong>Refund Guidance:</strong> If any preliminary service charge or deposit was processed, refunds are automatically credited to your original payment method within 3–5 business days. No cancellation penalties apply.
        </div>
        <div style="text-align: center;">
          <p style="font-size: 13px; color: #475569; margin: 0 0 10px 0;">Need to pick a new date or book another system?</p>
          <a class="action-button" href="https://ezcool.vercel.app/#booking">Reschedule Online Now</a>
        </div>
        <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0; text-align: center;">
          Concierge Support: <a href="mailto:support@ezcool.com">support@ezcool.com</a> | Telephone: <a href="tel:+18005553926">+1 800 555 3926</a>
        </p>
      </div>
      <div class="footer">
        <p style="margin: 0 0 6px 0;">&copy; ${new Date().getFullYear()} EZCOOL. All rights reserved.</p>
        <p style="margin: 0;">Engineered for comfort, designed for life.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function generateCancelledEmailText(params: BookingCancellationEmailParams): string {
  const formattedDate = formatDate(params.preferredDate);
  const reason = params.cancellationReason || 'Cancelled at customer or administrative request.';

  return `EZCOOL — Service Reservation Cancelled
==================================================
Hello ${params.customerName},

This notice confirms that your air conditioning service reservation has been cancelled.

BOOKING REFERENCE: ${params.bookingRef}
- Status:         CANCELLED
- Reason:         ${reason}
- Service Type:   ${params.serviceType}
- AC System:      ${params.systemType}
- Cancelled Date: ${formattedDate}
- Arrival Window: ${params.arrivalWindow}

REFUND GUIDANCE:
If any preliminary fee or deposit was processed, refunds are automatically credited to your original payment method within 3–5 business days. No cancellation penalty applies.

RESCHEDULING:
You may schedule a new visit at any time at https://ezcool.vercel.app/#booking

Concierge Support: support@ezcool.com | +1 800 555 3926
EZCOOL — Architectural Climate Engineering
`;
}

/* ==============================================================================
   4. Dispatch Functions (Resend API)
   ============================================================================== */

/**
 * Sends a booking confirmation email when a booking is first queued.
 */
export async function sendBookingConfirmationEmail(
  params: BookingConfirmationEmailParams
): Promise<EmailDispatchResult> {
  if (!isDeliverableCustomerEmail(params.customerEmail)) {
    console.warn(`[Resend] Skipping creation email: email "${params.customerEmail}" is invalid or a legacy placeholder.`);
    return { success: false, skipped: true, error: 'Legacy or placeholder email skipped' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_api_key_here')) {
    console.warn('[Resend] RESEND_API_KEY is not configured. Skipping email dispatch.');
    return { success: false, error: 'Resend API key is not configured on the server.' };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'EZCOOL <onboarding@resend.dev>';

  try {
    const resend = new Resend(apiKey.trim());
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [params.customerEmail],
      subject: `Booking Confirmed: ${params.bookingRef} — EZCOOL AC Services`,
      html: generateCreatedEmailHtml(params),
      text: generateCreatedEmailText(params),
    });

    if (error) {
      console.error('[Resend] Email delivery API error:', error.message);
      return { success: false, error: error.message || 'Resend provider returned a delivery error.' };
    }

    return { success: true, messageId: data?.id || 'delivered' };
  } catch (err: unknown) {
    const rawError = err instanceof Error ? err.message : String(err);
    const sanitizedError = rawError.replace(/re_[a-zA-Z0-9_-]+/g, '[REDACTED_KEY]');
    console.error('[Resend] Exception during email dispatch:', sanitizedError);
    return { success: false, error: sanitizedError || 'Unexpected failure during email dispatch.' };
  }
}

/**
 * Sends a status confirmation email when an admin confirms the booking and schedules a technician.
 */
export async function sendBookingStatusConfirmedEmail(
  params: BookingStatusConfirmedEmailParams
): Promise<EmailDispatchResult> {
  if (!isDeliverableCustomerEmail(params.customerEmail)) {
    console.warn(`[Resend] Skipping confirmed email: email "${params.customerEmail}" is invalid or a legacy placeholder.`);
    return { success: false, skipped: true, error: 'Legacy or placeholder email skipped' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_api_key_here')) {
    console.warn('[Resend] RESEND_API_KEY is not configured. Skipping email dispatch.');
    return { success: false, error: 'Resend API key is not configured on the server.' };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'EZCOOL <onboarding@resend.dev>';

  try {
    const resend = new Resend(apiKey.trim());
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [params.customerEmail],
      subject: `Service Appointment Confirmed: ${params.bookingRef} — EZCOOL AC Services`,
      html: generateConfirmedEmailHtml(params),
      text: generateConfirmedEmailText(params),
    });

    if (error) {
      console.error('[Resend] Email delivery API error:', error.message);
      return { success: false, error: error.message || 'Resend provider returned a delivery error.' };
    }

    return { success: true, messageId: data?.id || 'delivered' };
  } catch (err: unknown) {
    const rawError = err instanceof Error ? err.message : String(err);
    const sanitizedError = rawError.replace(/re_[a-zA-Z0-9_-]+/g, '[REDACTED_KEY]');
    console.error('[Resend] Exception during status confirmed email dispatch:', sanitizedError);
    return { success: false, error: sanitizedError || 'Unexpected failure during email dispatch.' };
  }
}

/**
 * Sends a cancellation notification email when a booking is cancelled.
 */
export async function sendBookingCancellationEmail(
  params: BookingCancellationEmailParams
): Promise<EmailDispatchResult> {
  if (!isDeliverableCustomerEmail(params.customerEmail)) {
    console.warn(`[Resend] Skipping cancellation email: email "${params.customerEmail}" is invalid or a legacy placeholder.`);
    return { success: false, skipped: true, error: 'Legacy or placeholder email skipped' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_api_key_here')) {
    console.warn('[Resend] RESEND_API_KEY is not configured. Skipping email dispatch.');
    return { success: false, error: 'Resend API key is not configured on the server.' };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'EZCOOL <onboarding@resend.dev>';

  try {
    const resend = new Resend(apiKey.trim());
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [params.customerEmail],
      subject: `Booking Cancellation Notice: ${params.bookingRef} — EZCOOL AC Services`,
      html: generateCancelledEmailHtml(params),
      text: generateCancelledEmailText(params),
    });

    if (error) {
      console.error('[Resend] Email delivery API error:', error.message);
      return { success: false, error: error.message || 'Resend provider returned a delivery error.' };
    }

    return { success: true, messageId: data?.id || 'delivered' };
  } catch (err: unknown) {
    const rawError = err instanceof Error ? err.message : String(err);
    const sanitizedError = rawError.replace(/re_[a-zA-Z0-9_-]+/g, '[REDACTED_KEY]');
    console.error('[Resend] Exception during cancellation email dispatch:', sanitizedError);
    return { success: false, error: sanitizedError || 'Unexpected failure during email dispatch.' };
  }
}
