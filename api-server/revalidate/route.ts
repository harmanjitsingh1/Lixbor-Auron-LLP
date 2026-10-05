import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Empty or non-JSON body — treat as a full revalidation request
    }

    const docType: string | undefined = body?._type || body?.type || body?.document?._type;

    let tagsToRevalidate: string[];

    if (docType && TYPE_TO_TAGS[docType]) {
      tagsToRevalidate = TYPE_TO_TAGS[docType];
    } else {
      tagsToRevalidate = Object.values(TYPE_TO_TAGS).flat();
    }

    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, 'default');
    }
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
