import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Sanity dataset seeding is executed via `node scripts/seed-sanity.mjs` before static build.',
  });
}
