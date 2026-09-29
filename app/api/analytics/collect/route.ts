import { getClientIp } from "@/lib/security/guards";
import { trackingEnabled } from "@/lib/private-analytics/config";
import { identityDigest, isAdmin } from "@/lib/private-analytics/auth";
import { analyticsRepository } from "@/lib/private-analytics/store";
import { publicPageName } from "@/lib/private-analytics/pages";
import {
  validateEvent,
  deviceFromAgent,
  isBot,
} from "@/lib/private-analytics/validation";
import {
  InvalidEvent,
  MissingPageView,
} from "@/lib/private-analytics/repository";
import {
  json,
  PRIVATE_HEADERS,
  readJson,
  sameOrigin,
} from "@/lib/private-analytics/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Forbidden" }, 403);
  if (!trackingEnabled()) return json({ error: "Unavailable" }, 503);
  const agent = request.headers.get("user-agent") || "";
  try {
    if (request.headers.get("dnt") === "1" || isBot(agent) || (await isAdmin()))
      return new Response(null, { status: 204, headers: PRIVATE_HEADERS });
    const repository = await analyticsRepository();
    const limit = await repository.reserveAttempt(
      identityDigest(getClientIp(request.headers), "collect"),
      240,
      60000,
      Date.now(),
    );
    if (!limit.allowed)
      return json({ error: "Too many requests" }, 429, {
        "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
      });
    let event;
    let raw: unknown;
    try {
      raw = await readJson(request);
      event = validateEvent(raw);
    } catch {
      const invalid = raw as
        | { type?: unknown; page_view_id?: unknown; visitor_id?: unknown }
        | undefined;
      if (
        invalid &&
        ["activity_batch", "page_end"].includes(String(invalid.type)) &&
        typeof invalid.page_view_id === "string" &&
        invalid.page_view_id.length <= 36 &&
        typeof invalid.visitor_id === "string" &&
        invalid.visitor_id.length <= 36
      )
        await repository.markInvalidTiming(
          invalid.page_view_id,
          identityDigest(invalid.visitor_id, "visitor"),
        );
      return json({ error: "Invalid event" }, 400);
    }
    const name = publicPageName(event.path);
    if (!name) return json({ error: "Invalid page" }, 400);
    // Local adapter never trusts spoofable geo headers; production adapter will use the trusted hosting edge.
    await repository.ingest(
      event,
      identityDigest(event.visitor_id, "visitor"),
      name,
      "未知",
      deviceFromAgent(agent),
      Date.now(),
    );
    return new Response(null, { status: 204, headers: PRIVATE_HEADERS });
  } catch (error) {
    if (error instanceof MissingPageView)
      return json({ error: "Retry page view first" }, 409);
    if (error instanceof InvalidEvent)
      return json({ error: "Invalid event" }, 400);
    return json({ error: "Unavailable" }, 503);
  }
}
