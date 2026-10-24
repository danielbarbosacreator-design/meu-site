/**
 * Central configuration. Every value comes from environment variables (see .env.example)
 * so launch-time assets — checkout, videos, tracking IDs — never need code changes.
 * Empty values mean "not provided yet": components render an integration slot instead.
 */
const env = import.meta.env;
const clean = (v: string | undefined) => (v ?? "").trim();

export type VideoSource = {
  mp4: string;
  vimeoId: string;
  poster: string;
};

export const site = {
  name: "CINELANE",
  tagline: "Skill de edição fotográfica para Claude",
  url: clean(env.VITE_SITE_URL).replace(/\/+$/, ""),
  contactEmail: clean(env.VITE_CONTACT_EMAIL),
  year: new Date().getFullYear(),
} as const;

export const offer = {
  product: "CINELANE — Skill de edição fotográfica para Claude",
  price: 147,
  currency: "BRL",
  priceLabel: "R$ 147,00",
  priceInteger: "147",
  priceCents: ",00",
  checkoutUrl: clean(env.VITE_CHECKOUT_URL),
} as const;

export const videos: Record<"hero" | "demo", VideoSource> = {
  hero: {
    mp4: clean(env.VITE_HERO_VIDEO_MP4),
    vimeoId: clean(env.VITE_HERO_VIDEO_VIMEO_ID),
    poster: clean(env.VITE_HERO_VIDEO_POSTER),
  },
  demo: {
    mp4: clean(env.VITE_DEMO_VIDEO_MP4),
    vimeoId: clean(env.VITE_DEMO_VIDEO_VIMEO_ID),
    poster: clean(env.VITE_DEMO_VIDEO_POSTER),
  },
};

export const analyticsConfig = {
  ga4Id: clean(env.VITE_GA4_ID),
  gtmId: clean(env.VITE_GTM_ID),
  metaPixelId: clean(env.VITE_META_PIXEL_ID),
} as const;

export const hasAnyAnalytics = Boolean(
  analyticsConfig.ga4Id || analyticsConfig.gtmId || analyticsConfig.metaPixelId,
);
