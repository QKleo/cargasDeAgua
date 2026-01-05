/*const CACHE_NAME = "AGUA-v1";
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
});*/

const CACHE_NAME = "aguas-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/stylesheet.css",
  "/login.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/memotest.html",
  "/simon.html",
  "/minimal pastel water.png"
  
];

// Instalar y cachear recursos
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // fuerza a que este SW se active inmediatamente
});

// Activar y limpiar caches viejos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // toma control de todas las pestañas abiertas
});

// Interceptar fetch
self.addEventListener("fetch", event => {
  const url = event.request.url;

  // No cachear llamadas al endpoint de Google Apps Script
  if (url.includes("script.google.com/macros")) {
    return event.respondWith(fetch(event.request));
  }

  // Cache-first con fallback a red
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

