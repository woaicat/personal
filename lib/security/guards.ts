type RateLimitEntry = {
  count: number;
  resetAt: number;
  lastSeen: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const SUSPICIOUS_UA_PATTERNS = [
  /sqlmap/i,
  /nikto/i,
  /acunetix/i,
  /nessus/i,
  /masscan/i,
  /zgrab/i,
  /gobuster/i,
  /ffuf/i,
  /dirbuster/i,
  /hydra/i,
  /metasploit/i,
  /nmap/i
];

export function isSuspiciousUserAgent(userAgent: string): boolean {
  const value = userAgent.trim();

  if (!value) {
    return false;
  }

  return SUSPICIOUS_UA_PATTERNS.some((pattern) => pattern.test(value));
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");
  const cfConnectingIp = headers.get("cf-connecting-ip");
  const trueClientIp = headers.get("true-client-ip");

  const candidate = forwardedFor ?? realIp ?? cfConnectingIp ?? trueClientIp;

  if (!candidate) {
    return "unknown";
  }

  return candidate.split(",")[0]?.trim() || "unknown";
}

export function consumeRateLimit(identity: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = rateLimitStore.get(identity);

  if (!entry || entry.resetAt <= now) {
    const nextEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + windowMs,
      lastSeen: now
    };

    rateLimitStore.set(identity, nextEntry);
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: nextEntry.resetAt
    };
  }

  entry.count += 1;
  entry.lastSeen = now;

  const allowed = entry.count <= limit;

  return {
    allowed,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt
  };
}

export function pruneRateLimitStore(maxAgeMs: number) {
  const now = Date.now();

  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.lastSeen > maxAgeMs) {
      rateLimitStore.delete(key);
    }
  }
}
