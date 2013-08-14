/*global define */
define(function(require) {

  /** requirements */
  // var app = require('grimlock/app');
  console.log('need to require a promise library');

  /** provision */
  var DataStore = function(root) {
    this.root_ = ''
    this.pathMap = {};
  };

  DataStore.prototype.load_ = function(key, opt_params) {
    console.log('1. create a new promise/deferred');
    console.log('2. send request');
    console.log('3. return promise');
  }

  DataStore.prototype.save_ = function(key) {
    console.log('1. create a new promise/deferred');
    console.log('2. send request');
    console.log('3. return promise');
  }

  return DataStore;

});