import { Meta } from "@once-ui-system/core";
import { baseURL, guestbook } from "@/resources";
import { GuestbookContent } from "@/components/guestbook/GuestbookContent";
import { createClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "@/lib/supabase";
import { unstable_noStore as noStore } from "next/cache";

export async function generateMetadata() {
  return Meta.generate({
    title: guestbook.title as string,
    description: guestbook.description || "",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(guestbook.title as string)}`,
    path: guestbook.path,
  });
}

async function fetchComments() {
  noStore();
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data: comments, error } = await supabase
    .from('comments')
    .select(`
      id,
      content,
      created_at,
      author:author_id (
        id, name, email, image, is_admin
      )
    `)
    .is('goal_id', null)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return comments;
}

async function GuestbookData() {
  const comments = await fetchComments();
  // @ts-ignore
  return <GuestbookContent initialComments={comments} />;
}

export default function Guestbook() {
  return <GuestbookData />;
}