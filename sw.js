
self.addEventListener('install', function(e) {
  console.log('install');

  // waitUntil tells the browser that the install event is not finished until we have
  // cached all of our files
  e.waitUntil(
    // Here we call our cache "myonsenuipwa", but you can name it anything unique
    caches.open('myonsenuipwa').then(cache => {
      // If the request for any of these resources fails, _none_ of the resources will be
      // added to the cache.
      return cache.addAll([
	    '.',
        'manifest.json',
        'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/onsenui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/css/onsen-css-components.min.css',
		'https://cdnjs.cloudflare.com/ajax/libs/onsen/2.11.2/js/onsenui.min.js',
		'https://unpkg.com/@zxing/library@0.18.3/umd/index.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js',
		'https://cdn.jsdelivr.net/npm/vue@2.6.12',
		'https://cdn.jsdelivr.net/npm/vue-onsenui@2.6.2',
		'home_enter.jpg',
		'home_taxi.jpg',
		'home_confirmed.jpg'
      ]);
    })
  );
});

// 2. Intercept requests and return the cached version instead
self.addEventListener('fetch', function(e) {
  e.respondWith(
    // check if this file exists in the cache
    caches.match(e.request)
      // Return the cached file, or else try to get it from the server
      .then(response => response || fetch(e.request))
  );
});