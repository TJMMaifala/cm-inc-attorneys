/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * On Vercel each serverless instance keeps its own memory, so this is a best-effort
 * first line of defence against form spam, not a global guarantee. For stronger
 * protection add Vercel's WAF rate limiting or a shared store (see README, "Spam
 * protection").
 */
type Bucket = number[];

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
) {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    buckets.set(key, recent);
    const retryAfterSeconds = Math.ceil((windowMs - (now - recent[0])) / 1000);
    return { allowed: false as const, retryAfterSeconds };
  }

  recent.push(now);
  buckets.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
    }
  }
  return { allowed: true as const, retryAfterSeconds: 0 };
}
