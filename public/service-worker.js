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

// Activating the service worker and removing old data from the cache if there is any
self.addEventListener("activate", function (event) {
    event.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
    );
    self.clients.claim();
  });

// Serevice worker intercepting the network request and acts accordingly based on success or failure of request. 

self.addEventListener("fetch", function (event) {
    if (event.request.url.includes("/api/")) {
      event.respondWith(
        caches.open(DATA_CACHE_NAME).then((cache) => {
            return fetch(event.request)
              .then((response) => {
                if (response.status === 200) {
                  cache.put(event.request.url, response.clone());
                }
                return response;
              })
              .catch((err) => {
                return cache.match(event.request);
              });
          })
          .catch((err) => console.log(err))
      );
  
      return;
    }

    event.respondWith(
        fetch(event.request).catch(function () {
          return caches.match(event.request).then(function (response) {
            if (response) {
              return response;
            } else if (event.request.headers.get("accept").includes("text/html")) {
              return caches.match("/");
            }
          });
        })
      );
    });
