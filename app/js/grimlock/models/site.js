/*global define, window */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var util = require('grimlock/util');
  var Model = require('grimlock/model');

  /** provision */
  var SiteModel = function() {
    this.title = app.watch('Grimlock Admin');
    this.copyright = app.watch('&copy; ' + new Date().getFullYear());

    util.base(this);
  };
  util.inherits(SiteModel, Model);

  Model.prototype.hydrate_ = function() {};

  Model.prototype.dehydrate_ = function() {};

  Model.prototype.loadData_ = function() {};

  return SiteModel;

});