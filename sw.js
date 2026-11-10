const C="rev-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||!r.url.startsWith("http")||r.url.includes("api.github.com"))return;
e.respondWith(caches.open(C).then(async c=>{const m=await c.match(r),n=fetch(r).then(x=>{if(x.ok||x.type==="opaque")c.put(r,x.clone());return x}).catch(()=>m);return m||n}))});
