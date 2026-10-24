import { analyticsConfig, hasAnyAnalytics, offer } from "@/config/site";
import { safeStorage } from "@/lib/utils";

/**
 * Consent-gated analytics (LGPD). Nothing is loaded and no event leaves the browser
 * until the visitor accepts in the consent banner.
 */
export type ConsentState = "granted" | "denied";
export type AnalyticsEvent =
  | "page_view"
  | "video_start"
  | "video_progress"
  | "view_offer"
  | "initiate_checkout"
  | "purchase";

const CONSENT_KEY = "cinelane-consent-v1";
const local = safeStorage("local");
let loaded = false;

export function getConsent(): ConsentState | null {
  const v = local.get(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function setConsent(state: ConsentState) {
  local.set(CONSENT_KEY, state);
  if (state === "granted") loadAnalytics();
}

function injectScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function loadAnalytics() {
  if (loaded || !hasAnyAnalytics || getConsent() !== "granted") return;
  loaded = true;
  const { ga4Id, gtmId, metaPixelId } = analyticsConfig;
  window.dataLayer = window.dataLayer || [];

  if (gtmId) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
  }

  if (ga4Id) {
    window.gtag = function gtag() {
      // gtag expects the arguments object itself
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    // page_view is sent explicitly below so it is counted exactly once
    window.gtag("config", ga4Id, { send_page_view: false });
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`);
  }

  if (metaPixelId) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void)(...args);
      else fbq.queue.push(args);
    } as ((...args: unknown[]) => void) & { callMethod?: unknown; queue: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;
    injectScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", metaPixelId);
  }

  track("page_view");
}

const pixelMap: Partial<Record<AnalyticsEvent, string>> = {
  page_view: "PageView",
  view_offer: "ViewContent",
  initiate_checkout: "InitiateCheckout",
  purchase: "Purchase",
};

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (import.meta.env.DEV) console.info("[analytics]", event, params);
  if (!loaded) return;

  if (analyticsConfig.gtmId) window.dataLayer?.push({ event, ...params });
  if (analyticsConfig.ga4Id && window.gtag) window.gtag("event", event, params);
  if (analyticsConfig.metaPixelId && window.fbq) {
    const standard = pixelMap[event];
    if (standard) window.fbq("track", standard, params);
    else window.fbq("trackCustom", event, params);
  }
}

export const offerParams = {
  currency: offer.currency,
  value: offer.price,
  items: [{ item_id: "cinelane-skill", item_name: offer.product, price: offer.price, quantity: 1 }],
};

/**
 * Call ONLY after the payment platform has confirmed the transaction (e.g. on a
 * thank-you page that validates a signed token, or server-side via webhook / CAPI).
 * Never wire this to a button click or to a plain page visit.
 */
export function trackPurchase(transactionId: string, value: number = offer.price) {
  const key = `cinelane-purchase-${transactionId}`;
  if (!transactionId || local.get(key)) return;
  local.set(key, "1");
  track("purchase", { ...offerParams, value, transaction_id: transactionId });
}
