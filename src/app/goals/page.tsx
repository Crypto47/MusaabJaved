import { Meta } from "@once-ui-system/core";
import { baseURL, goals } from "@/resources";
import { GoalsContent } from "@/components/goals/GoalsContent";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";
import { unstable_noStore as noStore } from "next/cache";
import type { Goal } from "@/app/api/goals/route";

export async function generateMetadata() {
  return Meta.generate({
    title: goals.title as string,
    description: goals.description ?? "Personal goals and milestones",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(goals.title as string)}`,
    path: goals.path,
  });
}

async function fetchGoals(): Promise<Goal[]> {
  noStore();
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("goals")
    .select(`
      id, title, description, accomplished_at, is_current,
      display_order, created_at, updated_at,
      updates:comments(
        id, content, created_at, goal_id,
        author:author_id(id, name, email, image, is_admin)
      )
    `)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false, referencedTable: "comments" });

  if (error) {
    console.error("Error fetching goals:", error);
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data as any as Goal[]) ?? [];
}

async function GoalsData() {
  const initialGoals = await fetchGoals();
  return <GoalsContent initialGoals={initialGoals} />;
}

export default function GoalsPage() {
  return <GoalsData />;
}
