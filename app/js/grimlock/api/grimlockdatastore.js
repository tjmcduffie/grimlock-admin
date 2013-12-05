/*global define */
define(function(require) {

  /** requirements */
  var util = require('grimlock/util');
  var DataStore = require('grimlock/datastore');

  /** provision */
  var GrimlockDataStore = function() {
    util.base(this);
    this.root_ = 'http://api.timmcduffie.com';
  };
  util.inherits(GrimlockDataStore, DataStore);

  GrimlockDataStore.prototype.getUser = function(id) {
    return this.load_(this.root_ + '/user/' + id);
  };

  GrimlockDataStore.prototype.updateUser = function(id, data) {
    id = id || 'new';
    return this.save_(this.root_ + '/user/' + id, data);
  };

  GrimlockDataStore.prototype.getProfile = function(id) {
    return this.load_(this.root_ + '/profile/' + id);
  };

  GrimlockDataStore.prototype.setProfile = function(id, data) {
    return this.load_(this.root_ + '/profile/' + id);
  };

  return GrimlockDataStore;

});