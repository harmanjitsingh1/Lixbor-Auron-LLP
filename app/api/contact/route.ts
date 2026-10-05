import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Lixbor Auron trade desk contact endpoint. RFQ submissions are processed client-side via Web3Forms.',
  });
}
