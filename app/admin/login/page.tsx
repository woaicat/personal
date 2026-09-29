import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/private-analytics/auth";
import LoginForm from "@/components/private-analytics/LoginForm";

export default async function LoginPage() {
  let loggedIn = false;
  try {
    loggedIn = await isAdmin();
  } catch {
    /* Fail closed when storage/configuration is unavailable. */
  }
  if (loggedIn) redirect("/admin/analytics");
  return (
    <>
      <header className="admin-login-header">
        <Link href="/" className="admin-wordmark">
          jiaxuan
        </Link>
        <Link href="/">
          返回主站 <ExternalLink size={16} />
        </Link>
      </header>
      <main className="admin-login-main">
        <LoginForm />
      </main>
    </>
  );
}
