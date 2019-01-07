We can create caches at several points along the response flow

1. Cache fullpage SSR response
Super easy speed improvements for time-to-first-paint. The SSR itself can be slow. This uses an LRUcache on the custom server.
https://github.com/zeit/next.js/tree/master/examples/ssr-caching

2. Cache getInitialProps 
This could be super helpful for speeding up in-app page changes, for example switching back and forth between Market and News.
https://scale.ai/blog/increasing-the-performance-of-dynamic-next-js-websites


3. Cache custom server responses
Our server will support many endpoints that are mostly just proxies for calls to 3rd party services. We could cache those calls on the server side with something like memory-cache
https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
