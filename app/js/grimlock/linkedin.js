/*global define, IN */
/**
 * @fileoverview LinkedIn Adapter. Provides the interface between the
 *               application and the LinkedIn API.
 *
 * @author timothy.mcduffie@gmail.com (Tim McDuffie)
 */

define([], function () {
  'use strict';

  var LinkedInAdapter = function() {

  };

  LinkedInAdapter.data = {};

  LinkedInAdapter.deferreds = {};

  LinkedInAdapter.fields = {
    'user' : [
      'id',
      'firstName',
      'lastName',
      'formatted-name'
    ],

    'profile' : [
      'headline',
      'location', //location:(name)
      'industry',
      'current-share',
      'summary',
      'specialties',
      'picture-url',
      'public-profile-url'
    ],

    'contact' : [
      'email-address',
      'phone-numbers',
      'im-accounts',
      'main-address',
      'twitter-accounts'
    ],

    'positions' : [
      'positions'
    ],

    'meta' : [
      'last-modified-timestamp',
      'num-recommenders'
    ],

    'collections' : [
      'skills',
      'educations',
      'associations',
      'honors',
      'interests',
      'publications',
      'patents',
      'languages',
      'certifications',
      'member-url-resources',
      'group-memberships'
    ]
  };

  LinkedInAdapter.isAuthorized = function() {
    return IN.User.isAuthorized();
  };

  LinkedInAdapter.auth = function() {
    var deferred = new LinkedInAdapter.Deferred();
    IN.Event.on(IN, "auth", deferred.doThen);
    return deferred;
  };

  // LinkedInAdapter.onLoad = function() {
  //   IN.Event.on(IN, 'auth', LinkedInAdapter.loadUser);
  // };

  LinkedInAdapter.getUser = function() {
    return this.loadFields('user');
  };

  LinkedInAdapter.loadFields = function() {
    var key;
    var fields = [];
    var deferred = new LinkedInAdapter.Deferred();

    for (var i; i < arguments.length; i++) {
      key = arguments[i];
      fields.concat(LinkedInAdapter.fields[key]);
    }
    IN.API.Profile('me')
      .fields(fields)
      .result(deferred.doThen)
      .error(LinkedInAdapter.handleError);
    return deferred;
  };

  LinkedInAdapter.setUserData = function(data) {
    console.warn('@TODO: consider extending the data object with the new data');
    LinkedInAdapter.data = data;
  };

  LinkedInAdapter.handleError = function(e) {
    throw new Error(e);
  };

  LinkedInAdapter.Deferred = function() {
    var deferred = this;
    deferred.then_ = null;
    deferred.thenObj_ = null;

    deferred.id = (function() {
      var min = 10000000;
      var max = 99999999;
      var val;
      var generate = function() {
        val = Math.round(Math.random() * (max - min) + min);
      };

      do {
        generate();
      } while (!val || deferred.usedIds_.indexOf(val) !== -1);

      deferred.usedIds_.push(val);
      return val;
    }());

    this.then = function(method, thisObj) {
      deferred.thenObj = thisObj || {};
      deferred.then_ = method;
    };

    this.doThen = function() {
      deferred.then_.apply(deferred.thisObj_, arguments);
    };
  };

  LinkedInAdapter.Deferred.prototype.usedIds_ = [];

  return LinkedInAdapter;
});