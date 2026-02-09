module.exports = {
  globDirectory: 'dist/',
  globPatterns: [
    '**/*.{js,css,html,png,jpg,svg,woff2,json}',
  ],
  // where the service worker will be generated
  swDest: 'dist/sw.js',             
  runtimeCaching: [
    // Cache API responses / dynamic content (optional but very useful)
    {
      urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 24 * 60 * 60, // 1 day
        },
      },
    },
    // Cache images more aggressively
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp|avif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
  // Optional: clean up old caches automatically
  cleanupOutdatedCaches: true,
  // Makes it a PWA-friendly service worker
  skipWaiting: true,
  clientsClaim: true,
};