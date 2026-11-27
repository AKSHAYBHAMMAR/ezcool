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

export interface EmailDispatchResult {
  success: boolean;
  messageId?: string;
  error?: string;
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

/**
 * Generates the clean, branded HTML email template for EZCOOL booking confirmations.
 */
function generateEmailHtml(params: BookingConfirmationEmailParams): string {
  const formattedDate = formatDate(params.preferredDate);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EZCOOL Booking Confirmation - ${params.bookingRef}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f1f5f9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f2744;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f1f5f9;
      padding: 32px 16px;
    }
    .container {
      max-width: 580px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(15, 39, 68, 0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
      padding: 32px 24px;
      text-align: center;
      color: #ffffff;
    }
    .brand {
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 2px;
      margin: 0 0 6px 0;
      text-transform: uppercase;
    }
    .tagline {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #e0f2fe;
      margin: 0;
      font-weight: 500;
    }
    .content {
      padding: 32px 28px;
    }
    .hero-text {
      text-align: center;
      margin-bottom: 24px;
    }
    .hero-title {
      font-size: 20px;
      font-weight: 600;
      color: #0f2744;
      margin: 0 0 8px 0;
    }
    .hero-desc {
      font-size: 14px;
      color: #475569;
      line-height: 1.5;
      margin: 0;
    }
    .ref-badge {
      background-color: #f0f9ff;
      border: 1.5px dashed #0284c7;
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      margin-bottom: 28px;
    }
    .ref-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #0284c7;
      margin-bottom: 4px;
    }
    .ref-code {
      font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
      font-size: 22px;
      font-weight: 700;
      color: #0369a1;
      letter-spacing: 1.5px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 28px;
      background-color: #f8fafc;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }
    .details-row td {
      padding: 12px 16px;
      font-size: 13px;
      border-bottom: 1px solid #edf2f7;
    }
    .details-row:last-child td {
      border-bottom: none;
    }
    .details-label {
      width: 38%;
      color: #64748b;
      font-weight: 500;
    }
    .details-value {
      width: 62%;
      color: #0f2744;
      font-weight: 600;
      text-align: right;
    }
    .status-pill {
      display: inline-block;
      padding: 3px 10px;
      background-color: #e0f2fe;
      color: #0369a1;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-card {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 10px;
      padding: 14px 16px;
      margin-bottom: 24px;
    }
    .info-title {
      font-size: 12px;
      font-weight: 600;
      color: #166534;
      margin: 0 0 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .info-text {
      font-size: 12px;
      color: #15803d;
      line-height: 1.5;
      margin: 0;
    }
    .footer {
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.6;
    }
    .footer a {
      color: #0284c7;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1 class="brand">EZCOOL</h1>
        <p class="tagline">Architectural Climate Engineering</p>
      </div>

      <!-- Main Content -->
      <div class="content">
        <div class="hero-text">
          <h2 class="hero-title">Service Reservation Confirmed</h2>
          <p class="hero-desc">Hello <strong>${escapeHtml(params.customerName)}</strong>, we have received your booking and scheduled our master climate engineer.</p>
        </div>

        <!-- Booking Reference Box -->
        <div class="ref-badge">
          <div class="ref-label">Official Booking Reference</div>
          <div class="ref-code">${escapeHtml(params.bookingRef)}</div>
        </div>

        <!-- Reservation Details Table -->
        <table class="details-table" role="presentation">
          <tr class="details-row">
            <td class="details-label">Service Type</td>
            <td class="details-value">${escapeHtml(params.serviceType)}</td>
          </tr>
          <tr class="details-row">
            <td class="details-label">AC System Type</td>
            <td class="details-value">${escapeHtml(params.systemType)}</td>
          </tr>
          <tr class="details-row">
            <td class="details-label">Scheduled Date</td>
            <td class="details-value">${escapeHtml(formattedDate)}</td>
          </tr>
          <tr class="details-row">
            <td class="details-label">Arrival Window</td>
            <td class="details-value">${escapeHtml(params.arrivalWindow)}</td>
          </tr>
          <tr class="details-row">
            <td class="details-label">Service Address</td>
            <td class="details-value">${escapeHtml(params.serviceAddress)}</td>
          </tr>
          <tr class="details-row">
            <td class="details-label">Current Status</td>
            <td class="details-value">
              <span class="status-pill">${escapeHtml(params.status)}</span>
            </td>
          </tr>
        </table>

        <!-- Service Assurance Notice -->
        <div class="info-card">
          <div class="info-title">&#10003; What to Expect Next</div>
          <p class="info-text">
            Our technician will arrive equipped with diagnostic calibration tools and certified replacement components during your selected arrival window.
          </p>
        </div>

        <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0; text-align: center;">
          Need to reschedule or update instructions? Contact our concierge desk at <a href="tel:+919876543210" style="color: #0284c7; text-decoration: none; font-weight: 500;">support@ezcool.com</a> referencing code <strong>${escapeHtml(params.bookingRef)}</strong>.
        </p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 6px 0;">&copy; ${new Date().getFullYear()} EZCOOL Services. Precision cooling. Exceptional comfort.</p>
        <p style="margin: 0;">This is an automated confirmation of your service appointment.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generates the clean plain-text alternative.
 */
function generateEmailText(params: BookingConfirmationEmailParams): string {
  const formattedDate = formatDate(params.preferredDate);

  return `EZCOOL — Service Reservation Confirmed
==================================================

Hello ${params.customerName},

Thank you for choosing EZCOOL. Your air conditioning service reservation has been received and scheduled.

BOOKING REFERENCE: ${params.bookingRef}
(Please save this reference for your records and any inquiries)

RESERVATION DETAILS:
--------------------------------------------------
- Customer Name:    ${params.customerName}
- Service Type:     ${params.serviceType}
- AC Configuration: ${params.systemType}
- Scheduled Date:   ${formattedDate}
- Arrival Window:   ${params.arrivalWindow}
- Service Address:  ${params.serviceAddress}
- Status:           ${params.status}

WHAT TO EXPECT:
Our certified climate technician will arrive within your designated arrival window equipped for surgical diagnostic calibration and comprehensive servicing.

NEED ASSISTANCE?
If you need to make changes or have questions, please reach our concierge desk at support@ezcool.com and reference ${params.bookingRef}.

==================================================
EZCOOL — Architectural Climate Engineering
Precision cooling. Exceptional comfort.
`;
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

/**
 * Sends a booking confirmation email using Resend.
 *
 * Safe execution:
 * - Reads RESEND_API_KEY from process.env (server only).
 * - Never throws unhandled errors.
 * - Does not leak secrets in error messages.
 */
export async function sendBookingConfirmationEmail(
  params: BookingConfirmationEmailParams
): Promise<EmailDispatchResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_api_key_here')) {
    console.warn(
      '[Resend] RESEND_API_KEY is not configured or placeholder detected. Skipping email dispatch.'
    );
    return {
      success: false,
      error: 'Resend API key is not configured on the server.',
    };
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'EZCOOL <onboarding@resend.dev>';

  try {
    const resend = new Resend(apiKey.trim());

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [params.customerEmail],
      subject: `Booking Confirmed: ${params.bookingRef} — EZCOOL AC Services`,
      html: generateEmailHtml(params),
      text: generateEmailText(params),
    });

    if (error) {
      console.error('[Resend] Email delivery API error:', error.message);
      return {
        success: false,
        error: error.message || 'Resend provider returned a delivery error.',
      };
    }

    if (data?.id) {
      console.log(`[Resend] Email sent successfully. Message ID: ${data.id}`);
      return {
        success: true,
        messageId: data.id,
      };
    }

    return {
      success: true,
      messageId: 'delivered',
    };
  } catch (err: unknown) {
    const rawError = err instanceof Error ? err.message : String(err);
    // Sanitize any potential accidental token or sensitive information from error string
    const sanitizedError = rawError.replace(/re_[a-zA-Z0-9_-]+/g, '[REDACTED_KEY]');
    console.error('[Resend] Exception during email dispatch:', sanitizedError);
    return {
      success: false,
      error: sanitizedError || 'Unexpected failure during email dispatch.',
    };
  }
}
