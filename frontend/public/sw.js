// Service Worker to block google-translate-force.js
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.includes('google-translate-force.js')) {
    // Return an empty response with 204 No Content
    event.respondWith(new Response(null, { status: 204, statusText: 'No Content' }));
    return;
  }
  event.respondWith(fetch(event.request));
});
