import type { Metadata } from "next";
import LearnClient from "@/components/pages/LearnClient";

export const metadata: Metadata = {
  title: "Passive Investing, Explained",
  description:
    "Why passive, halal investing beats hustle: time in the market, diversification and automated discipline — with zero riba. Try the compounding calculator.",
};

export default function LearnPage() {
  return <LearnClient />;
}
