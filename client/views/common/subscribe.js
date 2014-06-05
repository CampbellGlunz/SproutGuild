Template.subscribe.helpers({
	isNotUser: function(){
    if(!Meteor.user()){
      return true;
    }
  }
});
Template.subscribe.events({
	'click .message': function(e){
    e.preventDefault();
    Router.go('/signup');
    
  },
  'keyup .email-input': function(e){
    e.preventDefault();
    var code = e.which;
    if(code==13){
    Router.go('/signup');
    }
  },
  'click .email-submit': function(e){
    e.preventDefault();
    Router.go('/signup');
    
  }
});