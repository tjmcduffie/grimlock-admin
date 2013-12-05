/*global define, require */
/**
 * @fileoverview Application configuration file. Configures the application and
 *     requirejs.
 */


/**
 * Application configuration module. Returns the configuration object.
 * @return {[type]} [description]
 */
define('config', [], function() {

  return {
    Analytics: {
      UAID: 'UA-XXXXX-X'
    },
    IN: {
      API_KEY: '0m2ewzmu2sn7',
      AUTHORIZE: true
    },
    route: {
      root: '#/'
    },
    debugLevel: {
      prod: ['error', 'warn'],
      dev: ['error', 'warn', 'info', 'debug']
    },
    DOM: {
      viewContainer: 'main'
    },
    isProd: function() {
      // TODO: add logic for detecting Prod
      return false;
    }
  };

});


/**
 * Requirejs default configuration.
 */
require.config({
  // make components more sensible
  // expose jquery
  paths: {
    'handlebars': 'lib/handlebars/handlebars', // keep this for the templates file
    'jquery': 'lib/jquery/jquery',
    'knockout': 'lib/knockout/knockout-latest',
    'linkedinapi': 'http://platform.linkedin.com/in.js?async=true',
    'sammy': 'lib/sammy/sammy',
    'q': 'lib/q/q',
  },

  shim: {
    'handlebars': {
      exports: 'Handlebars'
    },
    'jquery': {
      exports: 'jQuery'
    },
    'linkedinapi': {
      exports: 'IN'
    },
    'sammy': {
      deps: ['jquery'],
      exports: 'Sammy'
    },
    'q': {
      exports: 'Q'
    }
  }
});


/**
 * Requirejs debug configuration.
 * Registers debug versions of files during development only. During build Grunt
 * will only look at the first require.config method.
 */
require.config({
  paths: {
    'ko': 'lib/knockout/knockout-latest.debug'
  }
});