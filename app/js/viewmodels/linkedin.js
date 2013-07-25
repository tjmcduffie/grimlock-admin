/*global define, window */
define(function(require) {

  /** requirements */
  var app = require('grimlock/app');
  var util = require('grimlock/util');
  var ViewModel = require('viewmodels/viewmodel');

  /** provision */
  function LinkedInViewModel() {
    this.model.user = {
      url: app.watch("#"),
      firstname: app.watch(''),
      lastname: app.watch(''),
      picture: app.watch(''),
      fullname: app.watch(function() {
        return this.firstname + ' ' + this.lastname;
      }, this),
      profileUrl: app.watch('')
    };

    this.model.profile = app.watch({});
    util.base(this);
    this.waitForLinkedInAPI_ = this.waitForLinkedInAPI_.bind(this);
    // this.init();
  };
  util.inherits(LinkedInViewModel, ViewModel);

  LinkedInViewModel.prototype.libTimeout_ = null;

  LinkedInViewModel.prototype.waitForLinkedInAPI_ = function() {
    if (!window.TMCD_IS_LINKEDIN_LOADED) {
      this.libTimeout_ = setTimeout(this.waitForLinkedInAPI_, 5);
      return;
    }

    clearTimeout(this.libTimeout_);
    this.getUser_();
  };

  LinkedInViewModel.prototype.getUser_ = function() {
    console.log(IN);
    IN.auth()
      .then(function() {
        console.log('getting user');
        IN.getUser();
      })
      .then(function() {
        console.log('set user data');
        if (data.values && data.values[0]) {
          console.log('USER:', data.values[0]);
        }
      })
      .error(function() {
        console.log('throw error');
        console.error('API ERROR: assume Auth failed and show the signin URL')
      })
  };

  LinkedInViewModel.prototype.init = function(context) {
    console.log('initializing');
    util.base(this, 'init', context);
    this.waitForLinkedInAPI_();
  };

  return LinkedInViewModel;
});
