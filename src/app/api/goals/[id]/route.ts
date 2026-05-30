import { type NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";

// PATCH /api/goals/[id]
export async function PATCH(
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

    const body = await request.json();
    const updateData: Record<string, unknown> = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.description !== undefined) updateData.description = body.description?.trim() || null;
    if (body.accomplished_at !== undefined) updateData.accomplished_at = body.accomplished_at || null;
    if (body.is_current !== undefined) updateData.is_current = body.is_current;
    if (body.display_order !== undefined) updateData.display_order = body.display_order;

    const { data: goal, error } = await supabase
      .from("goals")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating goal:", error);
      return NextResponse.json({ error: "Failed to update goal" }, { status: 500 });
    }
    return NextResponse.json(goal);
  } catch (error) {
    console.error("Error updating goal:", error);
    return NextResponse.json({ error: "Failed to update goal" }, { status: 500 });
  }
}

// DELETE /api/goals/[id]
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

    const { error } = await supabase.from("goals").delete().eq("id", id);
    if (error) {
      console.error("Error deleting goal:", error);
      return NextResponse.json({ error: "Failed to delete goal" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting goal:", error);
    return NextResponse.json({ error: "Failed to delete goal" }, { status: 500 });
  }
}
