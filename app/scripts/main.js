require.config({
  paths: {
    jquery: '../components/jquery/jquery',
    bootstrap: 'vendor/bootstrap',
    router: '../components/sammy/lib/sammy',
    framework: '../components/knockout/knockout-raw'
  },
  shim: {
    bootstrap: {
      deps: ['jquery'],
      exports: 'jquery'
    }
  }
});

require(['app', 'jquery', 'bootstrap'], function(app, $) {
  'use strict';
  // use app here
  console.log('initializing app');
  app.init();
});
