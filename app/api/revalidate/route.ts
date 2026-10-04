import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

/**
 * ON-DEMAND ISR REVALIDATION WEBHOOK
 * ====================================
 * Sanity calls this endpoint whenever you publish/update/delete content in Studio.
 * It clears the relevant Next.js cache so visitors see fresh content immediately —
 * without needing a full redeploy.
 *
 * HOW IT WORKS:
 *   1. You publish a Product in Sanity Studio.
 *   2. Sanity sends a POST to  /api/revalidate  with the document in the body.
 *   3. This handler reads the document type from the webhook body.
 *   4. It calls revalidateTag() for all cache tags tied to that document type.
 *   5. Next time a visitor hits /products, Next.js fetches fresh data from Sanity.
 *
 * REQUIRED ENV VAR:  SANITY_REVALIDATE_SECRET  (set in .env.local and Vercel)
 * SETUP: See the STEP 3 checklist for how to create the webhook in sanity.io/manage.
 */

const TYPE_TO_TAGS: Record<string, string[]> = {
  homePage:     ['homePage'],
  whoWeArePage: ['whoWeArePage'],
  product:      ['product', 'products'],
  faqItem:      ['faqItem', 'faq'],
  contactPage:  ['contactPage'],
  siteSettings: ['siteSettings'],
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET || process.env.SANITY_WEBHOOK_SECRET;

    // Accept the secret via: custom header, Bearer token, or ?secret= query param
    const authHeader = req.headers.get('authorization');
    const secretHeader = req.headers.get('sanity-webhook-secret');
    const querySecret = req.nextUrl.searchParams.get('secret');

    const providedSecret =
      secretHeader ||
      (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null) ||
      querySecret;

    if (secret && providedSecret !== secret) {
      return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 });
    }

    // Parse Sanity webhook body — it sends the full document object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Empty or non-JSON body — treat as a full revalidation request
    }

    // Sanity webhooks send the document type in body._type or body.document._type
    const docType: string | undefined = body?._type || body?.type || body?.document?._type;

    let tagsToRevalidate: string[];

    if (docType && TYPE_TO_TAGS[docType]) {
      tagsToRevalidate = TYPE_TO_TAGS[docType];
    } else {
      // Unknown or missing type → revalidate everything to be safe
      tagsToRevalidate = Object.values(TYPE_TO_TAGS).flat();
    }

    for (const tag of tagsToRevalidate) {
      revalidateTag(tag);
    }
    // Also revalidate the root layout so Header/Footer pick up siteSettings changes
    revalidatePath('/', 'layout');

    console.log(`[/api/revalidate] Cleared tags: ${tagsToRevalidate.join(', ')} (docType: ${docType ?? 'all'})`);

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      docType: docType ?? 'all',
      now: Date.now(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[/api/revalidate] Error:', message);
    return NextResponse.json(
      { message: 'Error revalidating cache.', error: message },
      { status: 500 }
    );
  }
}

/**
 * GET — lets you verify the endpoint is live in a browser:
 *   http://localhost:3000/api/revalidate?secret=YOUR_SECRET
 */
export async function GET(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET || process.env.SANITY_WEBHOOK_SECRET;
  const querySecret = req.nextUrl.searchParams.get('secret');

  if (secret && querySecret !== secret) {
    return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 });
  }

  return NextResponse.json({
    message: 'Revalidation endpoint is live. Send a POST request with the Sanity webhook payload.',
    validDocTypes: Object.keys(TYPE_TO_TAGS),
  });
}
