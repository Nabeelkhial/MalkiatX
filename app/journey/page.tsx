import type { Metadata } from "next";
import JourneyClient from "@/components/pages/JourneyClient";

export const metadata: Metadata = {
  title: "Your Journey",
  description:
    "From CNIC to your first halal asset in minutes. Pick a persona and walk MalkiatX's onboarding — identity check, risk profile, goal setting and Auto-Pilot allocation.",
};

export default function JourneyPage() {
  return <JourneyClient />;
}
