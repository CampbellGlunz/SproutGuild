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

viewNav = typeof viewNav === 'undefined' ? [] : viewNav;
viewNav = viewNav.concat([
  {
    route: 'posts_top',
    label: 'Top'
  },
  {
    route: 'posts_new',
    label: 'New'
  },
  // {
  //   route: 'posts_best',
  //   label: 'Best'
  // },
  {
    route: 'posts_digest',
    label: 'Digest'
  }   
]);


