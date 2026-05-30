import { NextResponse } from "next/server";

export type Goal = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  author_id: string;
};

export async function GET() {
  return NextResponse.json([], { status: 200 });
}

export async function POST() {
  return NextResponse.json({ error: "Disabled" }, { status: 503 });
}

export async function PATCH() {
  return NextResponse.json({ error: "Disabled" }, { status: 503 });
}
