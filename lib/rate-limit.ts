type LimitState = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, LimitState>();

export function checkRateLimit(key: string) {
  const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000);
  const maxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 8);
  const now = Date.now();

  const current = memoryStore.get(key);
  if (!current || now > current.resetAt) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0, remaining: maxRequests - 1 };
  }

  if (current.count >= maxRequests) {
    return { allowed: false, retryAfterMs: Math.max(0, current.resetAt - now), remaining: 0 };
  }

  current.count += 1;
  memoryStore.set(key, current);
  return { allowed: true, retryAfterMs: 0, remaining: Math.max(0, maxRequests - current.count) };
}
