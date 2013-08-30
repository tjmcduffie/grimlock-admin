/*global define */
/**
 * @fileoverview Analytics module.
 *
 * @author timothy.mcduffie@gmail.com (Tim McDuffie)
 */
define(function(require) {

  var config = require('appconfig');

  return {
    attach: function() {
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
    }
  };
});