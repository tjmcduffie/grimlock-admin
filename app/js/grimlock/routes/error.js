/*global define */
/**
 * @fileoverview Route error handler.
 */

define(function(require) {

  /** requirements */
  var SiteModel = require('grimlock/models/site');
  var system = require('grimlock/system');



  /** Route implementation. */
  // paths referenced in the route.

  // original methods for error handling.
  var originalNotFound = system.router.notFound;
  var originalError = system.router.error;


  // General error handling. Triggered when there's an aplication error.
  system.router.error = function(msg, err) {

    // check if there's an error or if we need to create a new one (Sammy does
    // this in its error handling to be safe). Send the error to the logger for
    // tracking. In dev the logger is the console, in prod it'll seng a message
    // to a remote logger.
    var originalError = err ? err : new Error();
    system.logger.error('ERROR', msg, ' | ', err.message);

  };

  // 404 error handling. When a requested route is not found, you get this.
  system.router.notFound = function(verb, path) {

    system.logger.debug('NOT FOUND:', path);

    // set the site view model. ideally we'd do this as part of a router-before
    // because that already exists, but sammy won't execute that for not found
    // errors.
    if (!system.viewmodel.get('site')) {
      new SiteModel()
        .hydrate()
        .then(function(model) {
          system.viewmodel.set('site', model);
        });
    }
    // set the error viewmodel and render the error message. This also needs to
    // be applied because the after-route doesn't get run here.
    system.viewmodel.set('err', {
      code: 400,
      message: 'We can\'t find anything at ' + path + '. The internet gnomes' +
          'must have stolen it.'
    });
    system.renderView(system.tmpl.error404());
    system.viewmodel.observe();
  };

  return system.router.notFound;
});