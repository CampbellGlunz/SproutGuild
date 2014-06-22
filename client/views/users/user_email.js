Template.user_email.helpers({
  user: function(){
    return Meteor.user();
  }
});

Template.user_email.rendered=function(){
  var slug = Meteor.user().slug;
  $('[name=username]').val(slug);
};

Template.user_email.events({
  'submit form': function(e){
    e.preventDefault();
    if(!Meteor.user()) throwError(i18n.t('You must be logged in.'));

    var $target=$(e.target);
    //to avoid cookie bug changed from Session.get('selectedUserId')? Meteor.users.findOne(Session.get('selectedUserId')) : 
    var user = Meteor.user();
    var update = {
      "profile.email": $target.find('[name=email]').val(),
      "username": $target.find('[name=username]').val(),
        "slug": $target.find('[name=username]').val(),
        "profile.name": $target.find('[name=username]').val()
    };

    // TODO: enable change email
    var email = $target.find('[name=email]').val();
    
    Meteor.users.update(user._id, {
      $set: update
    }, function(error){
      if(error){
        throwError(error.reason);
      } else {
        Meteor.call('addCurrentUserToMailChimpList',function(error){
        if(error){
          throwError(i18n.t('Email address already subscribed'));
        }
        else {
          throwError(i18n.t('Thanks for signing up!'));
          trackEvent("new sign-up", {'userId': user._id, 'auth':'twitter'});
          Router.go('/');
        }
      }); 
      }
    });
  }

});