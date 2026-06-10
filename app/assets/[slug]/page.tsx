import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ASSET_SLUGS, type AssetSlug } from "@/lib/data";
import { en } from "@/lib/content/en";
import AssetDetailClient from "@/components/pages/AssetDetailClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return ASSET_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!ASSET_SLUGS.includes(slug as AssetSlug)) return {};
  const s = slug as AssetSlug;
  return {
    title: en.common.assets[s].name,
    description: en.assetDetail.items[s].tagline,
  };
}

export default async function AssetDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!ASSET_SLUGS.includes(slug as AssetSlug)) notFound();
  return <AssetDetailClient slug={slug as AssetSlug} />;
}
