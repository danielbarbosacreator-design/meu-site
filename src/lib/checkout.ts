import { offer } from "@/config/site";
import { getAttribution } from "@/lib/attribution";
import { offerParams, track } from "@/lib/analytics";

export const CHECKOUT_UNAVAILABLE_EVENT = "cinelane:checkout-unavailable";

export function isCheckoutConfigured() {
  try {
    const u = new URL(offer.checkoutUrl);
    return u.protocol === "https:" || (import.meta.env.DEV && u.protocol === "http:");
  } catch {
    return false;
  }
}

/** Checkout URL with campaign attribution forwarded (existing params on the link win). */
export function buildCheckoutUrl(): string | null {
  if (!isCheckoutConfigured()) return null;
  const url = new URL(offer.checkoutUrl);
  for (const [k, v] of Object.entries(getAttribution())) {
    if (!url.searchParams.has(k)) url.searchParams.set(k, v);
  }
  return url.toString();
}

/** Single entry point for every purchase CTA on the page. */
export function goToCheckout(placement: string) {
  const url = buildCheckoutUrl();
  if (!url) {
    if (import.meta.env.DEV) {
      console.warn("[checkout] VITE_CHECKOUT_URL não configurado — navegação bloqueada.", { placement });
    }
    window.dispatchEvent(new CustomEvent(CHECKOUT_UNAVAILABLE_EVENT));
    return;
  }
  track("initiate_checkout", { ...offerParams, placement });
  // Give tracking beacons a brief moment before leaving the page
  window.setTimeout(() => window.location.assign(url), 150);
}
