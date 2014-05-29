// Session variables
Session.set('initialLoad', true);
Session.set('today', new Date());
Session.set('view', 'top');
Session.set('postsLimit', getSetting('postsPerPage', 10));
Session.set('sessionId', Meteor.default_connection._lastSessionId);
Session.set( 'MailChimpOptions.apiKey', "4658c65e711ae0743a1974dc5f833b4e-us8" );
Session.set( 'MailChimpOptions.listId', "32e0afdc6a" );

STATUS_PENDING=1;
STATUS_APPROVED=2;
STATUS_REJECTED=3;


/** REMOVED NOTIFICATIONS
// Notifications - only load if user is logged in
// Not mandatory, because server won't publish anything even if we try to load.
// Remember about Deps.autorun - user can log in and log out several times
Deps.autorun(function() {
  // userId() can be changed before user(), because loading profile takes time
  if(Meteor.userId()) {
    Meteor.subscribe('notifications');
    if(isAdmin(Meteor.user())){
      // Subscribe to all users for now to make user selection autocomplete work
      Meteor.subscribe('allUsersAdmin');
    }
  }
});
**/