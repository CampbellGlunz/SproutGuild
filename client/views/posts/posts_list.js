Template.posts_list.helpers({
  posts : function () {
    if(this.postsList){ // XXX
      this.postsList.rewind();    
      var posts = this.postsList.map(function (post, index, cursor) {
        post.rank = index;
        return post;
      });
      return posts;
    }
  },
  hasMorePosts: function(){
    // as long as we ask for N posts and all N posts showed up, then keep showing the "load more" button
    return parseInt(Session.get('postsLimit')) == this.postsCount
  },
  loadMoreUrl: function () {
    var count = parseInt(Session.get('postsLimit')) + parseInt(getSetting('postsPerPage', 10));
    var categorySegment = Session.get('categorySlug') ? Session.get('categorySlug') + '/' : '';
    return '/' + Session.get('view') + '/' + categorySegment + count;
  }
});


Template.posts_list.events ({
  'click .more-link': function(e){
  var curWindowHeight = $( window ).height(); // height of current window
  var n = $('.post').height()*2;
  var scrollAmount = curWindowHeight-n;
 
  $('html,body').animate({
    scrollTop: $(window).scrollTop() + scrollAmount
      }, 1000);

}



});

