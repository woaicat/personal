import { trackingEnabled } from "@/lib/private-analytics/config";
import { isAdmin } from "@/lib/private-analytics/auth";
import { publicPageName } from "@/lib/private-analytics/pages";
import { json } from "@/lib/private-analytics/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get("path") || "";
  try {
    const enabled =
      trackingEnabled() &&
      request.headers.get("dnt") !== "1" &&
      !(await isAdmin()) &&
      !!publicPageName(path);
    return json({ enabled });
  } catch {
    return json({ enabled: false });
  }
}
