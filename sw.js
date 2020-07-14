importScripts("/precache-manifest.9227274f2cc5b29e72476df91fd3f5b2.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-disable */

(function () {
    if (!('indexedDB' in self)) {
        console.log('This browser doesn\'t support IndexedDB');
        return;
    }

    let request = indexedDB.open('MQUOTE_DB', 1);
    let db;

    request.onsuccess = function (event) {
        // console.log('[onsuccess]', request.result);
        db = event.target.result; // === request.result
    };
    request.onerror = function (event) {
        // console.log('[onerror]', request.error);
    };
    request.onupgradeneeded = function (event) {
        // console.log('[onupgradeneeded]', request.result);
        let db = event.target.result; // === request.result
        let store = db.createObjectStore('offlineReports', { keyPath: 'timeStamp' });
    };

    // Updating SW lifecycle to update the app after user triggered refresh
    workbox.skipWaiting();
    workbox.clientsClaim();
    
    workbox.routing.registerNavigationRoute('/index.html');

    workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

    /** Cache images */
    workbox.routing.registerRoute(
        // Cache image files.
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        // Use the cache if it's available.
        new workbox.strategies.CacheFirst({
            // Use a custom cache name.
            cacheName: 'image-cache',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    // maxEntries: 20,
                    // Cache for a maximum of a week.
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );

    // const handler = function ({url, event}){
    //     console.error(event);
    //     // return new Response(`Custom handler response.`);
    // };

    // workbox.routing.registerRoute(
    //     new RegExp('execute-api.ap-south-1.amazonaws.com'),
    //     handler,
    //     'POST'
    // );

    self.addEventListener('fetch', function (event) {
        // console.log(navigator.onLine);
        const request = event.request;
        if (request.method === 'POST' && (!navigator.onLine) && ('indexedDB' in self)) {
            event.respondWith(
                // caches.match(event.request, {ignoreSearch:true}).then(response => {
                //     return response || fetch(event.request);
                // })
                // ,
                request.clone().text().then(function (body) {
                    // console.error(JSON.parse(body));
                    let transaction = db.transaction('offlineReports', 'readwrite');
                    transaction.onsuccess = function (event) {
                        console.log('[Transaction] ALL DONE!');
                    };
                    let offlineReportsStore = transaction.objectStore('offlineReports');
                    let req = JSON.parse(body)
                    offlineReportsStore.add({ timeStamp: new Date().getTime(), agentId: req.metadata.agentId, module: req.metadata.module, method: req.metadata.method });
                    // throw Error('response status You are offline');
                    // console.error(event);
                })
            );
        }
    });

    self.addEventListener('sync', function (event) {
        // event.waitUntil(
        //     // do asynchronous tasks here
        //   );
        if (event.tag == 'syncApp') {
            // console.log('sync event');
            let transaction = db.transaction('offlineReports', 'readwrite');
            let offlineReportsStore = transaction.objectStore('offlineReports');
            transaction.onsuccess = function (event) {
                console.log('[Transaction] ALL DONE!');
            };
            let reportData = offlineReportsStore.getAll();
            reportData.onsuccess = function (event) {
                // console.log('report data success');
                let cursor = event.target.result;
                // console.log(event);
                // console.log(cursor)
                if (cursor && cursor.length) {
                    offlineReportsStore.clear();
                    // console.log(cursor);
                    updateDataInDb(cursor);
                }
            };
        }
    });

    function updateDataInDb(data) {
        const url = 'https://69dm2xkaw3.execute-api.ap-south-1.amazonaws.com/Prod/';
        const headers = {
            'Content-Type': 'application/json',
            'x-api-key': 'MeQ7yVuias1pCywQCA2ev7awV8QxUK3Y3KQzt9L1'
        };
        const request = {
            metadata: {
                agentId: "",
                module: "offline",
                method: "",
                token: ""
            },
            data: data
        };
        fetch(url, {
            method: 'POST',
            // mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: headers,
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(request) // body data type must match "Content-Type" header
        });
    }

})();
