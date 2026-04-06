import { NextRequest, NextResponse } from 'next/server';

const OSINT_BASE = process.env.OSINT_BASE_URL ?? 'http://localhost:8080';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  const directors = req.nextUrl.searchParams.get('directors') ?? '';
  const res = await fetch(
    `${OSINT_BASE}/api/sanctions/check?q=${encodeURIComponent(q)}&directors=${encodeURIComponent(directors)}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}
