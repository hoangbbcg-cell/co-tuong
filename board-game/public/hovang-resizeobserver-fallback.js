/* HOVANG IOS COMPAT V2.
 * Use the native ResizeObserver whenever it exists.
 * This fallback approximates size observation for older browsers.
 */
(function () {
  'use strict';

  if (typeof window.ResizeObserver === 'function') return;

  var observers = [];
  var intervalId = null;
  var scheduled = false;

  function measure() {
    scheduled = false;

    observers.slice().forEach(function (observer) {
      var entries = [];

      observer.items.forEach(function (item) {
        if (!item.target || !item.target.getBoundingClientRect) return;

        var rect = item.target.getBoundingClientRect();

        if (rect.width !== item.width ||
            rect.height !== item.height) {
          item.width = rect.width;
          item.height = rect.height;

          entries.push({
            target: item.target,
            contentRect: rect
          });
        }
      });

      if (entries.length) {
        observer.callback(entries, observer.instance);
      }
    });
  }

  function schedule() {
    if (scheduled) return;

    scheduled = true;

    if (typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(measure);
    } else {
      window.setTimeout(measure, 16);
    }
  }

  function updatePolling() {
    var active = observers.some(function (observer) {
      return observer.items.length > 0;
    });

    if (active && intervalId === null) {
      intervalId = window.setInterval(schedule, 500);
      window.addEventListener('resize', schedule);
      window.addEventListener('orientationchange', schedule);
      schedule();
    } else if (!active && intervalId !== null) {
      window.clearInterval(intervalId);
      intervalId = null;
      window.removeEventListener('resize', schedule);
      window.removeEventListener('orientationchange', schedule);
    }
  }

  function FallbackResizeObserver(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('ResizeObserver requires callback');
    }

    var state = {
      callback: callback,
      instance: this,
      items: []
    };

    observers.push(state);

    this.observe = function (target) {
      if (!target || typeof target.getBoundingClientRect !== 'function') {
        throw new TypeError('Invalid observation target');
      }

      var exists = state.items.some(function (item) {
        return item.target === target;
      });

      if (exists) return;

      state.items.push({
        target: target,
        width: -1,
        height: -1
      });

      updatePolling();
    };

    this.unobserve = function (target) {
      state.items = state.items.filter(function (item) {
        return item.target !== target;
      });

      updatePolling();
    };

    this.disconnect = function () {
      state.items = [];
      observers = observers.filter(function (item) {
        return item !== state;
      });

      updatePolling();
    };
  }

  window.ResizeObserver = FallbackResizeObserver;
})();