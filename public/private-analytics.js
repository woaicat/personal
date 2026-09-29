/* Shared first-party tracker for App Router and standalone public HTML pages.
 * No secrets, raw IP, full URL, referrer or user-entered content are collected.
 */
(() => {
  if (window.__jiaxuanAnalyticsInstalled) return;
  window.__jiaxuanAnalyticsInstalled = true;
  if (navigator.doNotTrack === "1" || !window.crypto?.getRandomValues) return;
  const uuid = () => {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 15) | 64;
    b[8] = (b[8] & 63) | 128;
    const h = [...b].map((n) => n.toString(16).padStart(2, "0")).join("");
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
  };
  let visitor,
    current = null,
    activeSince = null,
    lastActivity = performance.now();
  let route = "",
    generation = 0,
    navigationTimer,
    retryTimer,
    sending = false,
    retryDelay = 1000;
  const tab = uuid(),
    queue = [];
  const now = () => performance.now();
  const effective = () =>
    document.visibilityState === "visible" && document.hasFocus();
  function identity() {
    if (visitor) return visitor;
    try {
      const stored = localStorage.getItem("jiaxuan.analytics.visitor.v1");
      visitor = /^[a-f0-9-]{36}$/i.test(stored || "") ? stored : uuid();
      localStorage.setItem("jiaxuan.analytics.visitor.v1", visitor);
    } catch {
      visitor = uuid();
    }
    return visitor;
  }
  function event(type, intervals = []) {
    return {
      schema_version: 1,
      type,
      event_id: uuid(),
      visitor_id: identity(),
      page_view_id: current.id,
      tab_id: tab,
      path: current.path,
      client_time: Date.now(),
      elapsed_ms:
        type === "page_view"
          ? 0
          : Math.min(
              86400000,
              Math.max(0, Math.floor(now() - current.started)),
            ),
      sequence: type === "page_view" ? 0 : ++current.sequence,
      intervals,
    };
  }
  function enqueue(value) {
    if (queue.length >= 100) queue.shift();
    queue.push({ value, attempts: 0 });
    void send();
  }
  async function send() {
    if (sending || retryTimer || !queue.length) return;
    sending = true;
    try {
      while (queue.length) {
        const item = queue[0];
        const response = await fetch("/api/analytics/collect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item.value),
          keepalive: true,
          signal: AbortSignal.timeout(8000),
        });
        if (
          response.ok ||
          [400, 403].includes(response.status) ||
          ++item.attempts >= 8
        ) {
          queue.shift();
          retryDelay = 1000;
          continue;
        }
        if (response.status === 429)
          retryDelay = Math.max(
            retryDelay,
            Math.min(
              60000,
              Number(response.headers.get("retry-after") || 1) * 1000,
            ),
          );
        break;
      }
    } catch {
      if (queue[0] && ++queue[0].attempts >= 8) queue.shift();
    } finally {
      sending = false;
      if (queue.length) {
        retryTimer = setTimeout(() => {
          retryTimer = null;
          void send();
        }, retryDelay);
        retryDelay = Math.min(retryDelay * 2, 60000);
      }
    }
  }
  function capture() {
    if (!current || activeSince === null) return [];
    const end = Math.min(
      now(),
      lastActivity + 300000,
      current.started + 86400000,
    );
    const start = Math.max(0, Math.floor(activeSince - current.started));
    const stop = Math.max(0, Math.floor(end - current.started));
    activeSince = effective() && end >= now() - 1 ? end : null;
    return stop > start ? [[start, stop]] : [];
  }
  function endVisit() {
    if (!current) return;
    enqueue(event("page_end", capture()));
    current = null;
    activeSince = null;
  }
  function startVisit(path) {
    current = { id: uuid(), path, started: now(), sequence: 0 };
    lastActivity = now();
    activeSince = effective() ? now() : null;
    enqueue(event("page_view"));
  }
  function activity() {
    if (!current) return;
    if (
      now() - lastActivity >= 1800000 ||
      now() - current.started >= 86400000
    ) {
      const path = current.path;
      endVisit();
      startVisit(path);
    } else {
      // Only flush when resuming after the activity cutoff; ordinary interaction
      // refreshes activity without sending an event for every click/scroll.
      if (now() - lastActivity >= 300000) {
        const intervals = capture();
        if (intervals.length) enqueue(event("activity_batch", intervals));
      }
      lastActivity = now();
      if (effective() && activeSince === null) activeSince = now();
    }
  }
  // Throttle activity signals; pointer movement alone is intentionally ignored.
  let lastSignal = -Infinity;
  function signal() {
    if (now() - lastSignal >= 1000) {
      lastSignal = now();
      activity();
    }
  }
  function pause() {
    if (current) {
      const intervals = capture();
      activeSince = null;
      if (intervals.length) enqueue(event("activity_batch", intervals));
    }
  }
  async function navigate() {
    const path =
      location.pathname.length > 1
        ? location.pathname.replace(/\/+$/, "")
        : "/";
    if (path === route && current) return;
    route = path;
    const version = ++generation;
    endVisit();
    if (/^\/(admin|api|_next)(\/|$)/.test(path)) return;
    try {
      const response = await fetch(
        `/api/analytics/config?path=${encodeURIComponent(path)}`,
        { cache: "no-store", signal: AbortSignal.timeout(5000) },
      );
      const config = await response.json();
      if (version === generation && config.enabled) startVisit(path);
    } catch {
      /* Tracking failure must never affect the page. */
    }
  }
  function scheduleNavigation() {
    clearTimeout(navigationTimer);
    navigationTimer = setTimeout(() => void navigate(), 450);
  }
  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    history[method] = function (...args) {
      const result = original.apply(this, args);
      scheduleNavigation();
      return result;
    };
  }
  window.addEventListener("popstate", scheduleNavigation);
  window.addEventListener("focus", activity);
  window.addEventListener("blur", pause);
  for (const name of ["pointerdown", "keydown", "touchstart", "scroll"])
    window.addEventListener(name, signal, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") pause();
    else activity();
  });
  window.addEventListener("pagehide", () => {
    endVisit();
    for (const item of queue)
      navigator.sendBeacon?.(
        "/api/analytics/collect",
        new Blob([JSON.stringify(item.value)], { type: "application/json" }),
      );
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      route = "";
      scheduleNavigation();
    }
  });
  setInterval(() => {
    if (!current) return;
    const intervals = capture();
    if (intervals.length) enqueue(event("activity_batch", intervals));
    else void send();
  }, 15000);
  scheduleNavigation();
})();
