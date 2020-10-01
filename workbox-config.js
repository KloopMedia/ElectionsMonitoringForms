module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,ico,html,png,js,txt,css}"
  ],
  "swDest": "build/sw.js",
  
   // Define runtime caching rules.
   runtimeCaching: [{
    // Match any request that ends with .png, .jpg, .jpeg or .svg.
    urlPattern: /\.(?:json)$/,

    // Apply a cache-first strategy.
    handler: 'CacheFirst',

    options: {
      // Use a custom cache name.
      cacheName: 'forms',

      // Only cache 10 images.
      expiration: {
        maxEntries: 50,
      },
    },
  }],
};