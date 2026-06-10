import type { Metadata } from "next";
import AssetsClient from "@/components/pages/AssetsClient";

export const metadata: Metadata = {
  title: "Assets",
  description:
    "Property, gold, sukuk and Shariah-screened equities — explore the tokenized asset constellation and see what you would own, where profit comes from, and who certified it.",
};

export default function AssetsPage() {
  return <AssetsClient />;
}
