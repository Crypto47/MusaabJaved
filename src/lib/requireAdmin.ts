import { createClient } from "@supabase/supabase-js";

import { supabaseUrl, supabaseAnonKey } from "@/lib/supabase";

export async function requireAdmin(token: string) {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Unauthorized", status: 401 as const, supabase: null, user: null };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return { error: "Forbidden", status: 403 as const, supabase: null, user: null };
  }

  return { error: null, status: 200 as const, supabase, user };
}
