
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.baseline.en.35eeb58e1ea86813e1c6.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/708.baseline.en.e8f5e0720b42bff4a215.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/100.baseline.en.2afd32034d6cc5157fa4.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/40.baseline.en.7ba6e4f965ef1ea332de.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.en.c037a4cd7f353245a5f9.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/240.baseline.en.9b24600641cb32831349.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/904.baseline.en.ebc7138f7d9cd0bf9915.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/472.baseline.en.78481792f5bbdd87330c.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/44.baseline.en.aeece22cba81624a0248.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.baseline.en.5227c16af3487235aada.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/708.baseline.en.4fe536aa4fa72b936529.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.en.bd7e1a04a0d2456be516.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/904.baseline.en.2b60ccea73a26508dcab.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/457.baseline.en.b4da76935d3d3f2fa3de.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res[0], next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  