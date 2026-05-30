import { NextResponse } from 'next/server';
export async function GET() { return NextResponse.json([], { status: 200 }); }
export async function POST() { return NextResponse.json({ error: 'Disabled' }, { status: 503 }); }
