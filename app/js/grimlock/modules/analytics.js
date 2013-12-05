/*global define, document, window */
/**
 * @fileoverview Analytics module. Provides appropriate functionality for
 *     injecting analytics.
 */

define(function(require) {

  var config = require('config');

  var ga = function() {
    if (!window || !document) {
      throw new Exception('Analytics scripts cannot be applied. ' +
          'Global elements not found');
      return;
    }

    window._gaq=[
      ['_setAccount',config.Analytics.UAID],
      ['_trackPageview']
    ];

    (function(d,t) {
      var g = d.createElement(t);
      var s = d.getElementsByTagName(t)[0];

      g.src = ('https:' == location.protocol ? '//ssl' : '//www') +
        '.google-analytics.com/ga.js';
      s.parentNode.insertBefore(g,s);
    }(document,'script'));
  };

  return {
    analytics: ga
  };

});