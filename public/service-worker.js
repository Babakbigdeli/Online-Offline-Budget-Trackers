// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
// https://developers.google.com/web/ilt/pwa/introduction-to-service-worker
// https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
// Lifecycle of a Service Worker
// The lifecycle of a service worker is completely separated from your web page one. It consists of the following phases:
// Registration 
// Installation
// Activation

const FILES_TO_CACHE = [
    "/", 
    "/index.html", 
    "/index.js",  
    "/styles.css", 
    "/icons/icon-192x192.png", 
    "/icons/icon-512x512.png"
  ];
  
  const CACHE_NAME = "static-cache-v2";
  const DATA_CACHE_NAME = "data-cache-v1";

// the service worker is already registered in index.html by the time its directed here.

// Installing service worker

self.addEventListener("install", function (event) {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
    );
    self.skipWaiting();
  });

