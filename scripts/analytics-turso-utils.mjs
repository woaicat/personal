// CLI helpers use the same restricted Turso libSQL endpoint policy as the runtime.
export function connection(urlValue, authToken) {
  const url = new URL(urlValue || "");
  if (
    !["libsql:", "https:"].includes(url.protocol) ||
    !/^[a-z0-9-]+\.turso\.io$/i.test(url.hostname) ||
    url.username ||
    url.password ||
    url.port ||
    url.search ||
    url.hash ||
    !["", "/"].includes(url.pathname) ||
    !authToken ||
    !/^[\w.-]{32,8192}$/.test(authToken)
  )
    throw new Error("请使用 Turso libSQL 数据库的连接地址和数据库专用 Token");
  return { url: url.toString(), authToken };
}
export function requireLocal() {
  if (process.env.VERCEL || process.env.NODE_ENV === "production")
    throw new Error("此设置脚本仅供本地终端连接云端测试库");
}
