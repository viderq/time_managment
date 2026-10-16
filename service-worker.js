// Сначала сеть, кэш — только без связи: обновления сайта видны сразу, а офлайн открывается последняя версия.
// Чужие домены (прокси табло, шрифты) и APK не трогаем — данные рейса не должны залипать в кэше.
const CACHE_NAME = "tma-v6";
const PRECACHE = ["./", "index.html", "styles.css", "script.js", "manifest.json", "logo_64.png", "logo_128.png", "logo_256.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== location.origin || url.pathname.includes("/android/")) return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true }))
  );
});
