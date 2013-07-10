/*global define */
/**
 * @fileoverview Analytics module.
 *
 * @author timothy.mcduffie@gmail.com (Tim McDuffie)
 */
define([], function() {
  'use strict';

  window._gaq=[
    ['_setAccount','UA-XXXXX-X'],
    ['_trackPageview']
  ];
  (function(d,t) {
    var g = d.createElement(t);
    var s = d.getElementsByTagName(t)[0];

    g.src = ('https:' == location.protocol ? '//ssl' : '//www') +
      '.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s);
  }(document,'script'));
});