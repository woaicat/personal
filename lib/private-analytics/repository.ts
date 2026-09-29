import type { CollectEvent, Device, Snapshot } from "./types";

// HTTP/auth/aggregation depend on this contract, not on a service provider.
// A production adapter must preserve atomic ingest, unique IDs and shared rate limits.
export interface AnalyticsRepository {
  ingest(
    event: CollectEvent,
    visitor: string,
    name: string,
    region: string,
    device: Device,
    now: number,
  ): void;
  snapshot(from: number, to: number): Snapshot;
  reserveAttempt(
    key: string,
    limit: number,
    window: number,
    now: number,
  ): { allowed: boolean; resetAt: number };
  clearAttempts(key: string): void;
  createAdminSession(digest: string, expires: number): void;
  hasAdminSession(digest: string, now: number): boolean;
  revokeAdminSession(digest: string): void;
  markInvalidTiming(view: string, visitor: string): void;
}
export class InvalidEvent extends Error {}
export class MissingPageView extends Error {}
