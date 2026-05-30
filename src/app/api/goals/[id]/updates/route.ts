import { type NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

// POST /api/goals/[id]/updates — posts a comment with goal_id set (admin only)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { error: adminError, status, supabase, user } = await requireAdmin(authHeader.substring(7));
    if (adminError || !supabase || !user) {
      return NextResponse.json({ error: adminError }, { status });
    }

    const { content } = await request.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const { data: comment, error } = await supabase
      .from("comments")
      .insert({ content: content.trim(), author_id: user.id, goal_id: id })
      .select(`id, content, created_at, goal_id, author:author_id(id, name, email, image, is_admin)`)
      .single();

    if (error) {
      console.error("Error creating goal comment:", error);
      return NextResponse.json({ error: "Failed to create update" }, { status: 500 });
    }
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Error creating goal comment:", error);
    return NextResponse.json({ error: "Failed to create update" }, { status: 500 });
  }
}

// DELETE /api/goals/[id]/updates?commentId=xxx
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { error: adminError, status, supabase } = await requireAdmin(authHeader.substring(7));
    if (adminError || !supabase) {
      return NextResponse.json({ error: adminError }, { status });
    }

    const commentId = new URL(request.url).searchParams.get("commentId");
    if (!commentId) {
      return NextResponse.json({ error: "commentId is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId)
      .eq("goal_id", id);

    if (error) {
      console.error("Error deleting goal comment:", error);
      return NextResponse.json({ error: "Failed to delete update" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting goal comment:", error);
    return NextResponse.json({ error: "Failed to delete update" }, { status: 500 });
  }
}
