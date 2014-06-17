  Template.nav.helpers({
  site_title: 'Sprout Guild',
  logo_url: '../img/SproutGuild_rgb_150dpi.jpg',
  logo_height: 55.5,
  logo_width: 187.5,
  intercom: function(){
    return !!getSetting('intercomId');
  },
  canPost: function(){
    return canPost(Meteor.user());
  },
  isNotUser: function(){
    if(!Meteor.user()){
      return true;
    }
  },
  isUser: function(){
    if(Meteor.user()){
      return true;
    }
  },
  userAvatar: function(){
    var author = Meteor.user();
    if(!!author)
      return getAvatarUrl(author);
  },
  requirePostsApproval: function(){
    return getSetting('requirePostsApproval');
  },
  hasCategories: function(){
    return typeof Categories !== 'undefined' && Categories.find().count();
  },
  categories: function(){
    return Categories.find({}, {sort: {name: 1}});
  },
  categoryLink: function () {
    return getCategoryUrl(this.slug);
  },
  viewNav: function () {
    return viewNav;
  },
  adminNav: function () {
    return adminNav;
  }
});

Template.nav.rendered=function(){
  if(!Meteor.user()){
    $('.login-link-text').text("Sign In");
  }else{
    $('#login-buttons-logout').before('<a href="/users/'+Meteor.user().slug+'" class="account-link button">View Profile</a>');
    $('#login-buttons-logout').before('<a href="/account" class="account-link button">Edit Account</a>');
  }

};

Template.nav.events({
  'click #logout': function(e){
    e.preventDefault();
    Meteor.logout();
  },
  'click #mobile-menu': function(e){
    e.preventDefault();
    $('body').toggleClass('mobile-nav-open');
  },
  'click .login-header': function(e){
    e.preventDefault();
    Router.go('/account');
  },
  'click .user-avatar': function(e){
    e.preventDefault();
    Accounts._loginButtonsSession.set('dropdownVisible', true);
  },
  'click #login-name-link': function(e){
    e.preventDefault();
    $('#login-buttons-open-change-password').addClass('hidden');
    $('#login-buttons-logout').before('<a href="/users/'+Meteor.user().slug+'" class="account-link button">View Profile</a>');
    $('#login-buttons-logout').before('<a href="/account" class="account-link button">Edit Account</a>');
  }
});