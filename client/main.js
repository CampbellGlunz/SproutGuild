// Session variables
Session.set('initialLoad', true);
Session.set('today', new Date());
Session.set('view', 'top');
Session.set('postsLimit', getSetting('postsPerPage', 30));
Session.set('sessionId', Meteor.default_connection._lastSessionId);
Session.set( 'MailChimpOptions.apiKey', "c568e34f6f344af288f95018a53f413f-us8" );
Session.set( 'MailChimpOptions.listId', "9bfb7d9c46" );

STATUS_PENDING=1;
STATUS_APPROVED=2;
STATUS_REJECTED=3;

viewNav = typeof viewNav === 'undefined' ? [] : viewNav;
viewNav = viewNav.concat([
  {
    route: 'posts_top',
    label: 'Top'
  },
  {
    route: 'posts_new',
    label: 'New'
  } 
]);


