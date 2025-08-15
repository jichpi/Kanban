const CACHE='labels-pwa-v3';
const ASSETS=[
  './','./index.html','./manifest.webmanifest','./service-worker.js',
  './icons/icon-192.png','./icons/icon-512.png',
  'https://unpkg.com/tesseract.js@5.1.0/dist/tesseract.min.js',
  'https://unpkg.com/@zxing/browser@0.1.5/umd/index.min.js'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE&&caches.delete(k)))));});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
    const u=new URL(e.request.url);
    if(e.request.method==='GET' && u.origin===location.origin){
      const copy=resp.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy));
    }
    return resp;
  }).catch(()=>{
    if(e.request.mode==='navigate') return caches.match('./index.html');
  })));
});
