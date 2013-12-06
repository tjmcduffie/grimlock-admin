# Grimlock Admin User Stories and Flows

## User stories

  1.  User should be able to connect their LinkedIn account with the Admin
√   1.a Be able to connect with LinkedIn
    1.b Connect with Grimlock Registration system. Use linkedIn
  2.  User should be able to create an Admin account from their LinkedIn acct
  3.  User should be able to sync their profile info from LinkedIn to the Admin
  4.  (dep) User should be able to create a profile from scratch
  5.  User should be able to edit data after sync from LI
  6.  User should be able to add projects from scratch
  7.  If LI projects are accessible via the API and unique data entities ->
          User should be able to sync profiles from LI
  8.  User should be able to enter URLs that allow the API to be accessed across
          domains
  9.  Admin should be extensible to allow for future content types.
  10. Admin should be extensible to allow for future 3rd Party site integration ->
          Tumblr, GitHub, SlideShare, Twitter, etc.

  ## User Flows

  ### First Visit

  1. User visits entry URL.

  {if User not signed into LinkedIn}
  2. User is prompted to sign into LinkedIn.
  {/if}
  {if User has not authorized the app on LinkedIn}
  3. User is prompted to connect their LinkedIn Account.
  {/if}
  4. User account is created on GA.