import type { MetadataRoute } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import Room from "@/models/Room";
import { DEALS } from "@/lib/deals";
import { isDatabaseConfigured } from "@/lib/env";

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.huts4u.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: "daily",   priority: 1.0  },
    { url: `${BASE}/rooms`,       lastModified: new Date(), changeFrequency: "daily",   priority: 0.9  },
    { url: `${BASE}/deals`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8  },
    { url: `${BASE}/packages`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE}/login`,       lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3  },
    { url: `${BASE}/register`,    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3  },
  ];

  const dealPages: MetadataRoute.Sitemap = DEALS.map((deal) => ({
    url: `${BASE}/deals/${deal.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  let roomPages: MetadataRoute.Sitemap = [];
  if (isDatabaseConfigured()) {
    try {
      await connectToDatabase();
      const rooms = await Room.find({}, { slug: 1, updatedAt: 1 }).lean();
      roomPages = rooms.map((room) => ({
        url: `${BASE}/rooms/${room.slug}`,
        lastModified: room.updatedAt ?? new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    } catch {
      // DB unavailable at build time — skip dynamic pages
    }
  }

  return [...staticPages, ...dealPages, ...roomPages];
}
