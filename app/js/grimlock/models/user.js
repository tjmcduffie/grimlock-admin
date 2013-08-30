/*global define, window */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var util = require('grimlock/util');
  var Model = require('grimlock/model');
  var GrimlockDataStore = require('api/grimlockdatastore');
  var LinkedInDataStore = require('api/linkedindatastore');

  /** provision */
  var UserModel = function() {
    this.firstname = app.watch('');
    this.lastname = app.watch('');
    this.formattedname = app.watch('');
    this.profileimage = app.watch('');
    this.profileurl = app.watch('');

    util.base(this);
    this.loadData_();
  };
  util.inherits(UserModel, Model);

  UserModel.prototype.primaryDataStore_ = new GrimlockDataStore();

  UserModel.prototype.secondaryDataStore_ = new LinkedInDataStore();

  UserModel.prototype.loadData_ = function() {
    console.log('Need Primary DataStore for User Data');
    console.log('Need Promise Model for data Store responses');
    this.secondaryDataStore_.getUser(this.hydrate_);
    // this.primaryDataStore_.getUser()
    //   .catch(function(err) {
    //     console.warn('Primary Data source failure:', err);
    //     return this.secondaryDataStore_.getUserModel();
    //   })
    //   .then(function(data) {

    //   });
  };

  UserModel.prototype.hydrate_ = function(data) {
    if (!data) {
      console.warn('Data is undefined', data);
      return;
    }

    this.firstname(data.firstName);
    this.lastname(data.lastName);
    this.formattedname(data.formattedName);
    this.profileimage(data.pictureUrl);
    this.profileurl(data.publicProfileUrl);
  };

  return UserModel;

});