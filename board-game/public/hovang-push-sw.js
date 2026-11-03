/* HOVANG push-only service worker. No fetch handler or cache ownership. */
self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let data = {};
    try { data = event.data ? event.data.json() : {}; } catch { data = {}; }
    if (!data || typeof data !== 'object' || Array.isArray(data)) data = {};
    const title = typeof data.title === 'string' ? data.title.slice(0, 160) : 'HOVANG Cờ Tướng';
    const body = typeof data.body === 'string' ? data.body.slice(0, 500) : 'Bạn có thông báo mới từ HOVANG.';
    // Only app-relative destinations are accepted, not absolute or protocol-relative URLs.
    const path = typeof data.path === 'string' && /^\/(?!\/)[^\\]*$/.test(data.path) ? data.path : '/';
    const tag = typeof data.tag === 'string' ? data.tag.slice(0, 120) : 'hovang-notification';
    await self.registration.showNotification(title, { body, tag, icon: '/favicon.ico', data: { path } });
  })());
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const candidate = event.notification.data?.path;
    const path = typeof candidate === 'string' && /^\/(?!\/)[^\\]*$/.test(candidate) ? candidate : '/';
    const target = new URL(path, self.location.origin);
    if (target.origin !== self.location.origin) return;
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of windows) {
      if (new URL(client.url).origin === target.origin) {
        await client.focus();
        if ('navigate' in client) await client.navigate(target.href);
        return;
      }
    }
    await self.clients.openWindow(target.href);
  })());
});
