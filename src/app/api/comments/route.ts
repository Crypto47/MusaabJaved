import { NextResponse } from "next/server";

export type Comment = {
  id: string;
  content: string;
  created_at: string;
  author: { id: string; name: string | null; email: string | null; image: string | null; is_admin: boolean } | null;
};

export async function GET() {
  return NextResponse.json([], { status: 200 });
}

export async function POST() {
  return NextResponse.json({ error: "Disabled" }, { status: 503 });
}
