/*global define */
/**
 * @fileoverview UiData Class. Provides interface for observing and binding
 *     data in the UI.
 */

define(function(require) {

  /** requirements */
  var ko = require('knockout');
  window.ko = ko;



  /**
   * View model class
   */
  var ViewModel = function() {};


  /**
   * Update the ViewModel.
   */
  ViewModel.prototype.observe = function() {
    ko.applyBindings(this);
  };


  /**
   * Retrieve a property from the ViewModel.
   * @param {string} name Name of the property to retrieve.
   * @return {*} Value of the property.
   */
  ViewModel.prototype.get = function(name) {
    // console.debug('ViewModel.prototype.get > this:', this);
    // console.debug('ViewModel.prototype.get > name:', name);
    // console.debug('ViewModel.prototype.get > this[name]:', this[name]);
    // console.debug('ViewModel.prototype.get > inner ternary:', (typeof this[name] === 'function') ? this[name]() : this[name]);
    // console.debug('ViewModel.prototype.get > outer ternary:', this[name] ? this[name] : undefined);
    // console.debug('ViewModel.prototype.get > complete ternary:', this[name] ? ((typeof this[name] === 'function') ? this[name]() : this[name]) : undefined);
    return this[name] ? ((typeof this[name] === 'function') ? this[name]() : this[name]) : undefined;
  };


  /**
   * Retrieve all properties off the ViewModel.
   * @return {Object} Clean object of ViewModel properties.
   */
  ViewModel.prototype.getAll = function() {
    var data = {};

    for (var prop in viewmodel) {
      if (viewmodel.hasOwnProperty(prop)) {
        if (prop.charAt(prop.length - 1) === '_') {
          data[prop] = viewmodel[prop];
        } else if (typeof prop === 'object') {
          data[prop] = this.extract(prop);
        } else {
          data[prop] = viewmodel[prop]();
        }
      }
    }

    return data;
  };


  /**
   * Delete a property from the ViewModel
   * @param {string} name Name of the property to delete.
   * @return {boolean} True if hte deletion was successful, false otherwise.
   */
  ViewModel.prototype.remove = function(name) {
    return delete this[name];
  };


  /**
   * Add a property to the ViewModel
   * @param {string} name Name of the property to add.
   * @param {*} value Value of the property.
   */
  ViewModel.prototype.set = function(name, value) {
    this[name] = this.watch_(value);
  };


  /**
   * Observer a property on the ViewModel
   * @param {string} prop Name of the property to watch.
   * @param {Object} thisObj Object used as the this value when executing an
   *                         observed method.
   * @return {function} resulting value of watched property.
   */
  ViewModel.prototype.watch_ = function(prop, thisObj) {
    if (typeof prop === 'string' || typeof prop === 'number') {
      // string or number
      return ko.observable(prop);
    } else if (Array.isArray(prop)) {
      // array
      return ko.observableArray(prop);
    } else if (typeof prop === 'function') {
      // function
      return ko.computed(prop, thisObj);
    } else {
      // must de an object so we iterate over it and watch each of the props.
      var obj = {};
      for (var objProp in prop) {
        // if its a public instance property...
        if (prop.hasOwnProperty(objProp) &&
            objProp.charAt(objProp.length - 1) !== '_') {
          obj[objProp] = this.watch_(prop[objProp]);
        }
      }
      return obj;
    }
  };

  return ViewModel;

});