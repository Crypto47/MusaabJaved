import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import LabContent from "./lab-content";

export async function generateMetadata() {
  return Meta.generate({
    title: "Lab",
    description: "You found the lab.",
    baseURL,
    path: "/lab",
  });
}

export default function LabPage() {
  return <LabContent />;
}
