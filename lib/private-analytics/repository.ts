import type { CollectEvent, Device, Snapshot } from "./types";

// HTTP/auth/aggregation depend on this contract, not on a service provider.
// A production adapter must preserve atomic ingest, unique IDs and shared rate limits.
type Awaitable<T> = T | Promise<T>;
export interface AnalyticsRepository {
  ingest(
    event: CollectEvent,
    visitor: string,
    name: string,
    region: string,
    device: Device,
    now: number,
  ): Awaitable<void>;
  snapshot(from: number, to: number): Awaitable<Snapshot>;
  reserveAttempt(
    key: string,
    limit: number,
    window: number,
    now: number,
  ): Awaitable<{ allowed: boolean; resetAt: number }>;
  clearAttempts(key: string): Awaitable<void>;
  createAdminSession(digest: string, expires: number): Awaitable<void>;
  hasAdminSession(digest: string, now: number): Awaitable<boolean>;
  revokeAdminSession(digest: string): Awaitable<void>;
  markInvalidTiming(view: string, visitor: string): Awaitable<void>;
}
export class InvalidEvent extends Error {}
export class MissingPageView extends Error {}
