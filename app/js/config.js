require.config({
  // make components more sensible
  // expose jquery
  paths: {
    'lib/jquery': 'lib/jquery/jquery',
    'lib/ko': 'lib/knockout/knockout-latest',
    // 'lib/handlebars': 'lib/handlebars/handlebars',
    'handlebars': 'lib/handlebars/handlebars', // keep this for the templates file
    'lib/router': 'lib/sammy/sammy',
    'api/linkedin': 'http://platform.linkedin.com/in.js?async=true'
  },

  shim: {
    'lib/router': {
      deps: ['lib/jquery'],
      exports: 'Sammy'
    },
    'lib/jquery': {
      exports: 'jQuery'
    },
    'handlebars': {
      exports: 'Handlebars'
    },
    'api/linkedin': {
      exports: 'IN'
    }
  }
});

// Use the debug version of knockout it development only
// When compiling with grunt require js will only look at the first
// require.config({}) found in this file
require.config({
  paths: {
    'lib/ko': 'lib/knockout/knockout-latest.debug'
  }
});

define('appconfig', ['lib/router'], function(router) {
  return {
    Analytics: {
      UAID: 'UA-XXXXX-X'
    },
    IN: {
      API_KEY: '0m2ewzmu2sn7',
      AUTHORIZE: true
    },
    route: {
      methods: {
        DELETE: router.del,
        GET: router.get,
        POST: router.post,
        PUT: router.pot,
        UPDATE: router.update
      },
      root: '#/'
    }
  };
});