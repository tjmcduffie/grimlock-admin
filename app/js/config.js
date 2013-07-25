require.config({
  // make components more sensible
  // expose jquery
  paths: {
    'jquery': 'lib/jquery/jquery',
    'ko': 'lib/knockout/knockout-latest',
    'handlebars': 'lib/handlebars/handlebars',
    'router': 'lib/sammy/sammy'
  },

  shim: {
    'router': {
      deps: ['jquery'],
      exports: 'Sammy'
    },
    'handlebars': {
      exports: 'Handlebars'
    }
  }
});

// Use the debug version of knockout it development only
// When compiling with grunt require js will only look at the first
// require.config({}) found in this file
require.config({
  paths: {
    'knockout': 'lib/knockout-latest.debug'
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}