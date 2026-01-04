const CACHE_NAME = "AGUA-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/stylesheet.css",
  "/login.js",
  "/manifest.json",
  "/minimal pastel water.png",
  "/enviarDatos.js"
  
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});