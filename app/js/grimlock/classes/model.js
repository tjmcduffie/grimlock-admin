/*global define */
define(function(require) {

  /** requirements */
  var util = require('grimlock/modules/util');
  var system = require('grimlock/system');

  /** provision */
  /**
   * Model super class constructor.
   */
  var Model = function() {

  };


  /**
   * Deferred object implementing the promises/A+ spec.
   * http://promises-aplus.github.io/promises-spec/
   * @type {Object}
   * @private
   */
  Model.prototype.deferred_ = system.promise.defer();


  /**
   * Abstract method that needs to be overridden in child classes
   * @type {function}
   */
  Model.prototype.setData_ = util.abstractMethod;


  /**
   * Abstract method that needs to be overridden in child classes
   * @type {function}
   */
  Model.prototype.hydrate = util.abstractMethod;

  return Model;

});