/*global define */
define(['app', 'ViewModel', 'util'], function(app, ViewModel, util) {

  var HomeViewModel = function() {
    util.base(this);
  };
  util.inherits(HomeViewModel, ViewModel);

  HomeViewModel.prototype.method = 'get';

  HomeViewModel.prototype.path = '/';

  HomeViewModel.prototype.init = function(context) {
    console.log('initializing');
    util.base(this, 'init', context);
  };

  return HomeViewModel;
});