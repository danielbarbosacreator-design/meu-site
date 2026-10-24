import { safeStorage } from "@/lib/utils";

/** Attribution params forwarded to checkout so campaign source survives the redirect. */
const KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "src",
  "sck",
] as const;

const STORAGE_KEY = "cinelane-attribution";
const store = safeStorage("session");

export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, 200);
  }
  if (Object.keys(found).length > 0) store.set(STORAGE_KEY, JSON.stringify(found));
}

export function getAttribution(): Record<string, string> {
  try {
    return JSON.parse(store.get(STORAGE_KEY) ?? "{}") as Record<string, string>;
  } catch {
    return {};
  }
}
