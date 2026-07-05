// LCC Scorer service worker — network-first for the app shell, cached fallback for offline opens.
const C="lcc-shell-v1";
self.addEventListener("install",e=>{self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim());});
self.addEventListener("fetch",e=>{
  if(e.request.mode==="navigate"){
    e.respondWith(
      fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put("shell",cp));return r;})
        .catch(()=>caches.match("shell"))
    );
  }
});
