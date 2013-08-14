/*global define, window */
define(function(require) {

  /** requirements */

  /** provision */
  var ModelProperty = function(value, isRequired) {
    /**
     * Value of property
     * @type {string}
     */
    this.val = null;

    /**
     * Flag describing whether the field is required
     * @type {Boolean}
     */
    this.isRequired = false;

    /**
     * Array of validation criteria used to test the value.
     * @type {Boolean}
     */
    this.validations = [];
  };

  return ModelProperty;

});