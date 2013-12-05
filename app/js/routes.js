/*global define */
/**
 * @fileoverview Collection of routes to enable in the application. This should
 *     be moved to a Grunt task for auto generation similar to the templates
 *     file.
 */

define([
    'grimlock/routes/route-before',
    'grimlock/routes/route-after',
    'grimlock/routes/root',
    'grimlock/routes/home',
    'grimlock/routes/sync',
    'grimlock/routes/profile',
    'grimlock/routes/sign-in',
    'grimlock/routes/welcome',
    'grimlock/routes/error'
  ], function() {

  var routes = arguments;

  return routes;
});
