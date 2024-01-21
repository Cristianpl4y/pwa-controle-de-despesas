const cacheName = 'controle-despesas-v1';
const filesToCache = [
  './',
  './index.html',
  './pages/transacoes.html',
  './pages/gastosPorCategoria.html',
  './styles/style.css',
  './styles/toastify.css',
  './scripts/app.js',
  './scripts/toastify.js',
  './scripts/tests.js',
  './manifest.json',
  './assets/icon.png'
  // Adicione outros arquivos que você deseja que sejam armazenados em cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(error => {
      console.error('Error fetching:', event.request.url, error);
      throw error;
    })
  );
});
