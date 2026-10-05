import { NextResponse } from 'next/server';

const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY || '2d4de260-acb9-40a0-b378-79644dc7f8d2';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot anti-spam check: if botcheck is filled, fail silently or reject
    if (body.botcheck) {
      console.warn('[API /api/contact] Spam submission detected via honeypot field.');
      return NextResponse.json(
        { success: false, message: 'Spam detected. Submission rejected.' },
        { status: 400 }
      );
    }

    // Validate required fields: Full Name*, Email*, Country*, Message*
    if (!body.fullName?.trim() || !body.email?.trim() || !body.country?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: Full Name, Email, Country, and Message are required.' },
        { status: 400 }
      );
    }

    const referenceId = `LA-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const productInterest = body.product?.trim() || 'General Commodity Sourcing';

    // Prepare Web3Forms payload
    const web3formsPayload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New RFQ Quote Request: ${productInterest} - ${body.fullName} [${referenceId}]`,
      from_name: 'Lixbor Auron Trade Desk',
      name: body.fullName.trim(),
      email: body.email.trim(),
      'Reference ID': referenceId,
      'Product Interested In': productInterest,
      'Country': body.country.trim(),
      'Estimated Quantity': body.estimatedQuantity?.trim() || 'Not specified',
      'Message': body.message.trim(),
    };

    // Forward to Web3Forms API endpoint with standard browser headers to prevent Cloudflare drops
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        },
        body: JSON.stringify(web3formsPayload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error('[API /api/contact] Web3Forms API returned failure:', data);
        return NextResponse.json(
          {
            success: false,
            message: data.message || 'Unable to submit quote inquiry. Please try again later.',
          },
          { status: response.status >= 400 && response.status < 500 ? response.status : 400 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: 'Your quote request has been received. Our trade desk will get in touch shortly.',
          data: {
            referenceId,
            submittedAt: new Date().toISOString(),
          },
        },
        { status: 200 }
      );
    } catch (fetchError) {
      console.error('[API /api/contact] Web3Forms network/fetch error:', fetchError);
      return NextResponse.json(
        {
          success: false,
          message:
            'Unable to communicate with the email notification service. Please try submitting again or reach out directly to info@lixborauron.com.',
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('[API /api/contact] General error processing quote request:', error);
    return NextResponse.json(
      { success: false, message: 'Invalid request payload. Please verify your form data.' },
      { status: 400 }
    );
  }
}
