import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

const TYPE_TO_TAGS: Record<string, string[]> = {
  homePage: ['homePage'],
  whoWeArePage: ['whoWeArePage'],
  product: ['product', 'products'],
  faqItem: ['faqItem', 'faq'],
  contactPage: ['contactPage'],
  siteSettings: ['siteSettings'],
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET || process.env.SANITY_WEBHOOK_SECRET;

    // Validate secret via header or query string
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

    let body: any = {};
    try {
      body = await req.json();
    } catch {
      // Empty or non-JSON body
    }

    // Determine document type from Sanity webhook payload
    const docType: string | undefined = body?._type || body?.type || body?.document?._type;

    let tagsToRevalidate: string[] = [];

    if (docType && TYPE_TO_TAGS[docType]) {
      tagsToRevalidate = TYPE_TO_TAGS[docType];
    } else {
      // If type not specified or unknown, revalidate all tags
      tagsToRevalidate = ['homePage', 'whoWeArePage', 'product', 'products', 'faqItem', 'faq', 'contactPage', 'siteSettings'];
    }

    for (const tag of tagsToRevalidate) {
      // Next.js 16 requires a profile or CacheLifeConfig as the second argument
      revalidateTag(tag, 'default');
    }
    revalidatePath('/', 'layout');

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      docType: docType || 'all',
      now: Date.now(),
    });
  } catch (err: any) {
    console.error('Error revalidating tags:', err);
    return NextResponse.json(
      { message: 'Error revalidating tags', error: err?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
