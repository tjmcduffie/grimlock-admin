/*global define, window */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');

  /** provision */
  var Model = function() {
    this.hydrate_ = this.hydrate_.bind(this);
  };

  Model.prototype.primaryDataStore_ = null;

  Model.prototype.secondaryDataStore_ = null;

  Model.prototype.hydrate_ = function() {
    throw new Error('An Abstract method cannot be implemented directly');
  };

  Model.prototype.dehydrate_ = function() {
    throw new Error('An Abstract method cannot be implemented directly');
  };

  Model.prototype.loadData_ = function() {
    throw new Error('An Abstract method cannot be implemented directly');
  };

  return Model;

});