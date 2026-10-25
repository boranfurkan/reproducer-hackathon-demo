// Pagefold analytics: page and funnel events, sent to our own collector.
(function () {
  var queue = [];
  function send(name, props) {
    var body = JSON.stringify({ name: name, props: props || {}, at: Date.now() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/collect", body);
    } else {
      queue.push(body);
    }
  }
  window.Analytics = {
    track: function (name, props) {
      send(name, props);
    },
    identify: function (email) {
      send("identify", { email: email });
    },
  };
})();
