Template.mobile_user.events({
  'click .mobile-user a':function(event){
    $('body').toggleClass('mobile-user-open');
  }
});

Template.mobile_user.helpers({
	profileUrl: function(){
    var user = Meteor.user();
    if(user)
      return getProfileUrl(user);
  }
});