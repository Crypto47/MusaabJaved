import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Comment } from "@/app/api/comments/route";
import { requireAdmin } from "@/lib/requireAdmin";

import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export type Goal = {
  id: string;
  title: string;
  description: string | null;
  accomplished_at: string | null;
  is_current: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  updates?: Comment[];
};

const GOALS_SELECT = `
  id, title, description, accomplished_at, is_current,
  display_order, created_at, updated_at,
  updates:comments(
    id, content, created_at, goal_id,
    author:author_id(id, name, email, image, is_admin)
  )
`;

// GET /api/goals — public
export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data: goals, error } = await supabase
      .from("goals")
      .select(GOALS_SELECT)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false, referencedTable: "comments" });

    if (error) {
      console.error("Error fetching goals:", error);
      return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 });
    }
    return NextResponse.json(goals || []);
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 });
  }
}

// POST /api/goals — admin only
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { error: adminError, status, supabase } = await requireAdmin(authHeader.substring(7));
    if (adminError || !supabase) {
      return NextResponse.json({ error: adminError }, { status });
    }

    const { title, description, accomplished_at, is_current, display_order } = await request.json();
    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const { data: goal, error } = await supabase
      .from("goals")
      .insert({
        title: title.trim(),
        description: description?.trim() || null,
        accomplished_at: accomplished_at || null,
        is_current: is_current ?? false,
        display_order: display_order ?? 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating goal:", error);
      return NextResponse.json({ error: "Failed to create goal" }, { status: 500 });
    }
    return NextResponse.json({ ...goal, updates: [] }, { status: 201 });
  } catch (error) {
    console.error("Error creating goal:", error);
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 });
  }
}
