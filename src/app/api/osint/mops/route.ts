import { NextRequest, NextResponse } from 'next/server';

const OSINT_BASE = process.env.OSINT_BASE_URL ?? 'http://localhost:8080';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  const code = req.nextUrl.searchParams.get('code') ?? '';
  const url = code
    ? `${OSINT_BASE}/api/mops/stock?code=${encodeURIComponent(code)}`
    : `${OSINT_BASE}/api/mops/search?q=${encodeURIComponent(q)}`;
  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}
