/*global define */
/**
 * @fileoverview UserModel file. This defines the properties on the UserModel
 *     used throughout the site.
 */
define(function(require) {

  /** requirements */
  var LIN = require('linkedinapi');
  var Model = require('grimlock/classes/model');
  var system = require('grimlock/system');



  /** provision */
  /**
   * User Model constructor. Constructor is simple so we can return the instance
   * and let the hydrate method return the deferred.
   * @extends {Model}
   * @constructor
   */
  var UserModel = function() {
    system.base(this);
  };
  system.inherits(UserModel, Model);


  /**
   * Sets the instance properties and populates them with values from the
   * supplied data object. If data is null or does not have a _total key, the
   * request fails.
   * @param {Object=} opt_data Object with data values.
   */
  UserModel.prototype.setData_ = function(opt_data) {
    var values;
    if (opt_data && opt_data._total > 0) {
      values = (opt_data && opt_data.values) ? opt_data.values[0] : opt_data;

      this.firstname = values.firstName || '';
      this.headline = values.headline || '';
      this.id = values.id || '';
      this.lastname = values.lastName || '';
      this.pictureurl = values.pictureUrl || '';
    } else {
      this.deferred_.reject('UserModel hydration failed. Data._total key is ' +
          'either empty or 0.');
    }

    this.deferred_.resolve(this);
  };


  /**
   * Hydrate the model. Either use the supplied data or load the data from the
   * API.
   * @param {Object=} opt_data Optional object with data values used to hydrate
   *                            the model.
   * @return {UserModel.prototype.deferred_} Deferred object set during
   *                                         instantiation.
   */
  UserModel.prototype.hydrate = function(opt_data) {
    if (opt_data) {
      this.setData_(opt_data);
    }
    // make the request to the API and set the data on return.
    if (!this.deferred_.promise.isFulfilled()) {
      LIN.API.Profile('me').result(this.setData_, this);
    }
    return this.deferred_.promise;
  };

  return UserModel;

});