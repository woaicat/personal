import { normalizePath } from "./aggregate";
import { InvalidEvent } from "./repository";
import type { CollectEvent, Device } from "./types";

const uuid =
  /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
export function validateEvent(value: unknown): CollectEvent {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new InvalidEvent("Invalid event");
  const e = value as CollectEvent;
  if (
    e.schema_version !== 1 ||
    !["page_view", "activity_batch", "page_end"].includes(e.type)
  )
    throw new InvalidEvent("Invalid type");
  if (
    ![e.event_id, e.visitor_id, e.page_view_id, e.tab_id].every(
      (id) => typeof id === "string" && uuid.test(id),
    )
  )
    throw new InvalidEvent("Invalid ID");
  if (
    typeof e.path !== "string" ||
    normalizePath(e.path) !== e.path ||
    !Number.isFinite(e.client_time) ||
    !Number.isSafeInteger(e.elapsed_ms) ||
    e.elapsed_ms < 0 ||
    e.elapsed_ms > 86400000 ||
    !Number.isSafeInteger(e.sequence) ||
    e.sequence < 0 ||
    e.sequence > 100000
  )
    throw new InvalidEvent("Invalid metadata");
  if (!Array.isArray(e.intervals) || e.intervals.length > 50)
    throw new InvalidEvent("Invalid intervals");
  let previous = -1;
  for (const interval of e.intervals) {
    if (
      !Array.isArray(interval) ||
      interval.length !== 2 ||
      !interval.every(Number.isSafeInteger) ||
      interval[0] < 0 ||
      interval[1] <= interval[0] ||
      interval[0] < previous ||
      interval[1] > e.elapsed_ms
    )
      throw new InvalidEvent("Invalid interval");
    previous = interval[1];
  }
  if (
    e.type === "page_view" &&
    (e.elapsed_ms !== 0 || e.sequence !== 0 || e.intervals.length !== 0)
  )
    throw new InvalidEvent("Invalid page view");
  if (e.type !== "page_view" && e.sequence === 0)
    throw new InvalidEvent("Invalid sequence");
  return e;
}
export function deviceFromAgent(agent: string): Device {
  if (!agent) return "未知";
  if (/ipad|tablet|android(?!.*mobile)/i.test(agent)) return "平板";
  if (/mobile|iphone|ipod/i.test(agent)) return "手机";
  if (/windows|macintosh|linux|x11|cros/i.test(agent)) return "桌面端";
  return "未知";
}
export function isBot(agent: string) {
  return /bot\b|crawler|spider|headless|lighthouse|facebookexternalhit|preview|curl|wget|python|monitor/i.test(
    agent,
  );
}
