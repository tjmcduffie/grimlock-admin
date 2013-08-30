require.config({
  // make components more sensible
  // expose jquery
  paths: {
    'jquery': 'lib/jquery/jquery',
    'ko': 'lib/knockout/knockout-latest',
    'sammy': 'lib/sammy/sammy',
    'linkedinapi': 'http://platform.linkedin.com/in.js?async=true'
  },

  shim: {
    'sammy': {
      deps: ['jquery'],
      exports: 'Sammy'
    },
    'jquery': {
      exports: 'jQuery'
    },
    'linkedinapi': {
      exports: 'IN'
    }
  }
});

define('appconfig', [], function() {
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
    }
  };
});

// Use the debug version of knockout it development only
// When compiling with grunt require js will only look at the first
// require.config({}) found in this file
require.config({
  paths: {
    'ko': 'lib/knockout/knockout-latest.debug'
  }
});