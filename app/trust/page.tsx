import type { Metadata } from "next";
import TrustClient from "@/components/pages/TrustClient";

export const metadata: Metadata = {
  title: "Trust & Compliance Center",
  description:
    "Five independent layers of protection: Shariah Supervisory Board, PVARA regulation, independent audits, segregated custody and radical transparency — fatwas and reports published in full.",
};

export default function TrustPage() {
  return <TrustClient />;
}
