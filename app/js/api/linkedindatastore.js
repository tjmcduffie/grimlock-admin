/*global define, window */
define(function(require) {

  /** requirements */
  var util = require('grimlock/util');
  var DataStore = require('grimlock/datastore');

  /** provision */
  var LinkedInDataStore = function() {
    util.base(this);
    this.root_ = window.IN;
  };
  util.inherits(LinkedInDataStore, DataStore);

  LinkedInDataStore.UserFields = ['id', 'first-name', 'last-name',
      'formatted-name', 'picture-url', 'public-profile-url'];

  LinkedInDataStore.prototype.getUser = function(callback) {
    this.root_.API.Profile('me')
      .fields(LinkedInDataStore.UserFields)
      .result(function(data) {
        callback(data.values[0]);
      });
  };

  LinkedInDataStore.prototype.updateUser = function(id, data) {
    return this.root_.setUser(data);
  };

  LinkedInDataStore.prototype.getProfile = function(id) {
    return this.root_.getProfile();
  };

  LinkedInDataStore.prototype.setProfile = function(id, data) {
    return this.root_.setProfile(data);
  };

  return LinkedInDataStore;

});