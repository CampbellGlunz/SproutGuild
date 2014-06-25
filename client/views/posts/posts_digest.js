Template.posts_digest.helpers({
  hasPosts: function(){
    if(this.dayposts) // XXX
      return !!this.dayposts.count();  
  },
});

Template.posts_digest.events ({
  'click .more-link': function(e){
   $('html,body').animate({
    scrollTop: $(window).scrollTop() 
      }, 500);
}

});

