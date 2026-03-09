// Koverts Service Worker — Cache-first for static assets, network-first for pages
const CACHE_NAME = "koverts-v1";
const STATIC_ASSETS = [
  "/",
  "/length",
  "/weight",
  "/temperature",
  "/currency",
  "/manifest.json",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Currency API — network only (live rates)
  if (url.hostname === "api.frankfurter.app") return;
  // HTML pages — network-first, fallback to cache
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request) || caches.match("/"))
    );
    return;
  }
  // Static assets — cache-first
  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached || fetch(e.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(e.request, clone));
        }
        return res;
      })
    )
  );
});
