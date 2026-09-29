import type { Metadata } from "next";
import "./admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "私人数据后台 · jiaxuan",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="private-admin">{children}</div>;
}
