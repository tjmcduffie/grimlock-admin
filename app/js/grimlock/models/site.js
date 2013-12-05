/*global define */
/**
 * @fileoverview SiteModel file. This defines the properties on the SiteModel
 *     used throughout the site.
 */
define(function(require) {

  /** requirements */
  var Model = require('grimlock/classes/model');
  var system = require('grimlock/system');



  /** provision */
  /**
   * User Model constructor. Constructor is simple so we can return the instance
   * and let the hydrate method return the deferred.
   * @extends {Model}
   * @constructor
   */
  var SiteModel = function() {
    system.base(this);
  };
  system.inherits(SiteModel, Model);


  /**
   * Sets the instance properties and populates them with values from the
   * supplied data object. If data is null or does not have a _total key, the
   * request fails.
   * @param {Object=} opt_data Object with data values.
   */
  SiteModel.prototype.setData_ = function(opt_data) {
    var values;
    if (opt_data && opt_data._total > 0) {
      values = (opt_data && opt_data.values) ? opt_data.values[0] : opt_data;

      this.title = values.title || '';
      this.copyright = values.copyright || '';
    } else {
      this.deferred_.reject('SiteModel hydration failed. Data._total key is ' +
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
  SiteModel.prototype.hydrate = function(opt_data) {
    opt_data = opt_data || {
      _total: 1,
      title: 'Grimlock Admin',
      copyright : '&copy; ' + new Date().getFullYear()
    };
    this.setData_(opt_data);

    return this.deferred_.promise;
  };

  return SiteModel;

});