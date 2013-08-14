/*global define, IN */
/**
 * @fileoverview LinkedIn Adapter. Provides the interface between the
 *               application and the LinkedIn API.
 *
 * @author timothy.mcduffie@gmail.com (Tim McDuffie)
 */
define(function(require) {

  /** requirements */
  var LI_API = require('api/linkedin');

  /** provision */
  var LinkedIn = function() {
  };

  LinkedIn.fields = {
    USER : ['id', 'firstName', 'lastName', 'formatted-name'],

    PROFILE : ['headline', 'location', 'industry', 'current-share', 'summary',
              'specialties', 'picture-url', 'public-profile-url'],

    CONTACT : ['email-address', 'phone-numbers', 'im-accounts', 'main-address',
              'twitter-accounts'],

    POSITIONS : ['positions'],

    META : ['last-modified-timestamp', 'num-recommenders'],

    COLLECTIONS : ['skills', 'educations', 'associations', 'honors',
                  'interests', 'publications', 'patents', 'languages',
                  'certifications', 'member-url-resources', 'group-memberships']
  };

  return LinkedIn;
});