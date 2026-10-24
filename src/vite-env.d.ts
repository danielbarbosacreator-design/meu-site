/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_CHECKOUT_URL?: string;
  readonly VITE_HERO_VIDEO_MP4?: string;
  readonly VITE_HERO_VIDEO_VIMEO_ID?: string;
  readonly VITE_HERO_VIDEO_POSTER?: string;
  readonly VITE_DEMO_VIDEO_MP4?: string;
  readonly VITE_DEMO_VIDEO_VIMEO_ID?: string;
  readonly VITE_DEMO_VIDEO_POSTER?: string;
  readonly VITE_GA4_ID?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
  _fbq?: unknown;
}
