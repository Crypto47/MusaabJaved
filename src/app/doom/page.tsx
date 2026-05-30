import { Meta } from "@once-ui-system/core";
import { baseURL, doom } from "@/resources";
import DoomContent from "./doom-content";

export async function generateMetadata() {
  return Meta.generate({
    title: doom.title,
    description: doom.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(doom.title)}`,
    path: doom.path,
  });
}

export default function DoomPage() {
  return <DoomContent />;
}
