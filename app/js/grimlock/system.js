/*global define */
/**
 * @fileoverview Grimlock system API. This exposes the larger objects that
 *     modules may require to function properly. We set up an object in this
 *     manner so we can swap out components as needed and we only need to update
 *     this file (assuming the interfaces are the normalized).
 */

define(function(require) {

  /** requirements */
  var Logger = require('grimlock/classes/logger');
  var LinAuth = require('grimlock/classes/linkedinauth');
  var Q = require('q');
  var ViewModel = require('grimlock/classes/viewmodel');
  var ViewRenderer = require('grimlock/classes/viewrenderer');
  var config = require('config');
  var sammy = require('sammy');
  var tpl = require('templates');
  var util = require('grimlock/modules/util');



  /** provision */
  /**
   * System constructor.
   * The system exposes shared objects across the application.
   *
   * @constructor
   */
  var System = function() {};


  /**
   * Throws an error indicating the method needs to be overridden.
   *
   * @type {function}
   */
  System.prototype.abstractMethod = util.abstractMethod;


  /**
   * Calls a method on the superclass of an object.
   *
   * @type {LinAuth}
   */
  System.prototype.auth = new LinAuth();


  /**
   * Calls a method on the superclass of an object.
   *
   * @type {function}
   */
  System.prototype.base = util.base;


  /**
   * Application configuration object.
   * @type {Object}
   */
  System.prototype.config = config;


  /**
   * Allows for a constructor to inherit prototype properties and methods from
   * a superclass.
   *
   * @type {function}
   */
  System.prototype.inherits = util.inherits;


  /**
   * Application Logger.
   *
   * @type {Logger}
   */
  System.prototype.logger = Logger;


  /**
   * Promise library.
   *
   * @type {Q}
   */
  System.prototype.promise = Q;


  /**
   * Method for rendering views.
   * @return {function} view renderer.
   */
  System.prototype.renderView = (function() {
    var vr = new ViewRenderer({
      container: document.querySelector(config.DOM.viewContainer)
    });
    return vr.render.bind(vr);
  }());


  /**
   * Application Router. Currently leverages Sammy.
   * @type {Sammy}
   */
  System.prototype.router = sammy();


  /**
   * Hash of templates that are available for rendering.
   * @type {Object}
   */
  System.prototype.tmpl = tpl;


  /**
   * ViewModel instance
   * @type {ViewModel}
   */
  System.prototype.viewmodel = new ViewModel();


  return new System();

});