Template.posts_digest.helpers({
  hasPosts: function(){
    if(this.dayposts) // XXX
      return !!this.dayposts.count();  
  }
  
});

Template.posts_digest.created = function(){
  $(document).unbind('keyup'); //remove any potential existing bindings to avoid duplicates
  var currentDate=moment(Session.get('currentDate')).startOf('day');
  var today=moment(new Date()).startOf('daysy');
  $(document).bind('keyup', 'left', function(){
    Router.go($('.prev-link').attr('href'));
  });
  $(document).bind('keyup', 'right', function(){
    if(isAdmin(Meteor.user()) || today.diff(currentDate, 'days') > 0)
      Router.go($('.next-link').attr('href'));      
  });  
};

Template.posts_digest.events({
  'click .more-link': function(e) {
    e.preventDefault();
    console.log("FUCK");
    console.log(this);
    Session.set('postLimit', 20);
    Session.set('currentScroll',$('body').scrollTop());
  }
});