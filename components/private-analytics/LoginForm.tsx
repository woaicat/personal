"use client";
import { useRef, useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function LoginForm() {
  const [visible, setVisible] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = input.current?.value || "";
    if (!password) {
      setError("请输入密码");
      input.current?.focus();
      return;
    }
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        if (input.current) input.current.value = "";
        window.location.replace("/admin/analytics");
        return;
      }
      const body = await response.json();
      setError(body.error || "暂时无法登录，请稍后重试");
    } catch {
      setError("暂时无法登录，请稍后重试");
    }
    setBusy(false);
    input.current?.focus();
  }
  return (
    <section className="admin-login-card">
      <h1>私人数据后台</h1>
      <p className="admin-muted">请输入管理员密码</p>
      <form onSubmit={submit} noValidate>
        <label htmlFor="admin-password">密码</label>
        <div className="admin-password">
          <input
            ref={input}
            id="admin-password"
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            placeholder="请输入密码"
            maxLength={512}
            aria-invalid={!!error}
            aria-describedby={error ? "login-error" : undefined}
            disabled={busy}
          />
          <button
            type="button"
            aria-label={visible ? "隐藏密码" : "显示密码"}
            onClick={() => setVisible(!visible)}
          >
            {visible ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>
        {error ? (
          <p id="login-error" role="alert" className="admin-error">
            {error}
          </p>
        ) : null}
        <button className="admin-primary admin-login-submit" disabled={busy}>
          {busy ? "登录中…" : "登录"}
        </button>
      </form>
      <p className="admin-login-note">
        <LockKeyhole size={15} />
        仅限管理员访问
      </p>
    </section>
  );
}
