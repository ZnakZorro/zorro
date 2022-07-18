const swVersion = "v1";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(swVersion);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(swVersion);
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to use the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info('using preload response', preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request);
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};

const enableNavigationPreload = async () => {
  if (self.registration.navigationPreload) {
    // Enable navigation preloads!
    await self.registration.navigationPreload.enable();
  }
};

self.addEventListener('activate', (event) => {
  event.waitUntil(enableNavigationPreload());
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    addResourcesToCache([
      'https://znakzorro.github.io/zorro/',
      'https://znakzorro.github.io/zorro/index.html',
      'https://znakzorro.github.io/zorro/js/FileSaver.min.js',
      'https://znakzorro.github.io/zorro/app/EDEK/ckeditor.js',
      'https://znakzorro.github.io/zorro/app/EDEK/5/ckeditor-super.js',
      'https://znakzorro.github.io/zorro/img/menu/bus.jpg',
      'https://znakzorro.github.io/zorro/img/menu/czeresnie.jpg',
      'https://znakzorro.github.io/zorro/img/meteo/chmury.jpg',
      'https://api.met.no/images/weathericons/svg/partlycloudy_day.svg',
      'https://api.met.no/images/weathericons/svg/clearsky_day.svg',
      'https://api.met.no/images/weathericons/svg/partlycloudy_night.svg',
      'https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900',
      'https://fonts.googleapis.com/css2?family=PT+Sans+Narrow:wght@400;700&family=Roboto:ital,wght@0,100;0,300;0,400;1,300&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/locale/pl.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
      'https://code.highcharts.com/highcharts.js',
      'https://code.highcharts.com/highcharts-3d.js',
      'https://code.highcharts.com/modules/series-label.js',
      'https://code.highcharts.com/modules/exporting.js',
      'https://code.highcharts.com/modules/offline-exporting.js',
      'https://code.highcharts.com/modules/export-data.js'
      
    ])
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: 'https://znakzorro.github.io/zorro/img/meteo/pogoda.jpg',
    })
  );
});
