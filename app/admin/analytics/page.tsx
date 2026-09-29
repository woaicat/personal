import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/private-analytics/auth";
import AnalyticsDashboard from "@/components/private-analytics/AnalyticsDashboard";

export default async function AnalyticsPage() {
  let loggedIn = false;
  try {
    loggedIn = await isAdmin();
  } catch {
    /* No statistics are rendered without server authentication. */
  }
  if (!loggedIn) redirect("/admin/login");
  return <AnalyticsDashboard />;
}
