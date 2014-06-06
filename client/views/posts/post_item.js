Template.post_item.created = function () {
  instance = this;
};

Template.post_item.helpers({
  post: function(){
    // note: when the data context is set by the router, it will be "this.post". When set by a parent template it'll be "this"
    return this.post || this;
  },
  //  child_comment: function(){
  //   var post = this;
  //   var comments = Comments.find({post: "6Ws9Nky8oYhqZkeWn"}, {sort: {score: -1, submitted: -1}});
  //   return comments;
  // },
  postLink: function(){
    return !!this.url ? getOutgoingUrl(this.url) : "/posts/"+this._id;
  },
  postTarget: function() {
    return !!this.url ? '_blank' : '';
  },
  oneBasedRank: function(){
    if(typeof this.rank != 'undefined')
      return this.rank + 1;
  },
  domain: function(){
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  current_domain: function(){
    return "http://"+document.domain;
  },
  can_edit: function(){
    return canEdit(Meteor.user(), this);
  },
  authorName: function(){
    return getAuthorName(this);
  },
  profileUrl: function(){
    // note: we don't want the post to be re-rendered every time user properties change
    var user = Meteor.users.findOne(this.userId, {reactive: false});
    if(user)
      return getProfileUrl(user);
  },
  short_score: function(){
    return Math.floor(this.score*1000)/1000;
  },
  body_formatted: function(){
    var converter = new Markdown.Converter();
    var html_body=converter.makeHtml(this.body);
    return html_body.autoLink();
  },
  bodyExpand: function(){
    return this.body.substring(141,this.body.length);
  },
  bodyPreview: function(){
    var shortBody = this.body.substring(0,140);
    return shortBody;
  },
  smallBody: function(){
    if (this.body.length > 140){ return true;}
    else {return false;}
  },
  ago: function(){
    // if post is approved show submission time, else show creation time. 
    time = this.status == STATUS_APPROVED ? this.submitted : this.createdAt;
    return moment(time).fromNow();
  },
  timestamp: function(){
    time = this.status == STATUS_APPROVED ? this.submitted : this.createdAt;
    return moment(time).format("MMMM Do, h:mm:ss a");
  },
  voted: function(){
    var user = Meteor.user();
    if(!user) return false; 
    return _.include(this.upvoters, user._id);
  },
  userAvatar: function(){
    var author = Meteor.users.findOne(this.userId, {reactive: false});
    if(!!author)
      return getAvatarUrl(author);
  },
  inactiveClass: function(){
    return (isAdmin(Meteor.user()) && this.inactive) ? i18n.t('inactive') : "";
  },
  categoryLink: function(){
    return getCategoryUrl(this.slug);
  },
  commentsDisplayText: function(){
    return this.comments == 1 ? i18n.t('COMMENT:') : i18n.t('COMMENTS:');
  },
  pointsUnitDisplayText: function(){
    return this.votes == 1 ? i18n.t('point') : i18n.t('points');
  },
  locationIsNotEmpty: function(){
    return this.location;
  },
  isApproved: function(){
    return this.status == STATUS_APPROVED;
  }
});

var recalculatePosition = function ($object, pArray) {
  // delta is the difference between the last two positions in the array
  var delta = pArray[pArray.length-2] - pArray[pArray.length-1];

  // if new position is different from previous position
  if(delta != 0){
    // send object back to previous position
    $object.removeClass('animate').css("top", delta + "px");
    // then wait a little and animate it to new one
    setTimeout(function() { 
      $object.addClass('animate').css("top", "0px")
    }, 1);  
  }
}

Template.post_item.rendered = function(){
  // var instance = this,
  //     $instance = $(instance.firstNode.nextSibling),
  //     top = $instance.position().top;

  // // if this is the first render, initialize array, else push current position
  // if(typeof instance.pArray === 'undefined'){
  //   instance.pArray = [top]
  // }else{
  //   instance.pArray.push(top);
  // }

  // // if this is *not* the first render, recalculate positions
  // if(instance.pArray.length>1)
  //   recalculatePosition($instance, instance.pArray);

};

Template.post_item.events({
  'click .not-voted': function(e, instance){
    var post = this;
    e.preventDefault();
    if(!Meteor.user()){
      Router.go('/signin');
      throwError(i18n.t("Please log in first"));
    }
    Meteor.call('upvotePost', post, function(error, result){
      trackEvent("post upvoted", {'_id': post._id});
    });
  },
  'click .tweet-post-button': function(e){
    var $this = $(e.target).parents('.post-heading').find('.share-replace');
    e.preventDefault();
    var url = $this.attr("data-url");
    var cleanUrl = (url.substring(0, 7) == "http://" || url.substring(0, 8) == "https://") ? url : "http://"+url;
    url = cleanUrl;
    var urlPiece = encodeURIComponent(cleanUrl);
    var title= $this.attr("data-text");
    var titlePiece = encodeURI(title);

    var urlTwit = 'https://twitter.com/intent/tweet?text=' + titlePiece + '&via=SproutGuild&url=' + urlPiece;

    function tweetPop(){
        var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
            windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
            width = 550,
            height = 420,
            winHeight = screen.height,
            winWidth = screen.width;
            left = Math.round((winWidth / 2) - (width / 2));
            top = 0;
        if (winHeight > height) {
            top = Math.round((winHeight / 2) - (height / 2));
            }
        window.open(urlTwit, 'intent', windowOptions + ',width=' + width +',height=' + height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
    };
    if (title && url)
      tweetPop();
  },
  'click .share-link': function(e){
    var $this = $(e.target).parents('.post-share').find('.share-link');
    var $share = $this.parents('.post-share').find('.share-options');
    e.preventDefault();
    $('.share-link').not($this).removeClass("active");
    $(".share-options").not($share).addClass("hidden");
    $this.toggleClass("active");
    $share.toggleClass("hidden");
    $share.find('.share-replace').sharrre(SharrreOptions);
  },
  'click .voted': function(e){
      var post = this;
      e.preventDefault();
      Meteor.call('cancelUpvotePost', post, function(error,result){
        trackEvent("post un-upvoted", {'_id': post._id});
      });
    },
  'click .body-preview-expand': function(e){
    var $this = $(e.target).parents('.post-meta').find('.body-preview-expand');
    var $collapse = $this.parents('.post-meta').find('.body-preview-collapse');
    var $bodyFull = $this.parents('.post-meta').find('.body-full');
    var $bodyPreview = $this.parents('.post-meta').find('.body-preview');
    var $comment = $(e.target).parents('.post-meta').find('.comment-list');
    e.preventDefault();
    $bodyFull.removeClass("hidden");
    $comment.removeClass("hidden");
    $bodyPreview.addClass("hidden");
    //$(this).toggleClass('.body-preview-collapse');
    $collapse.removeClass("hidden");
    $this.addClass("hidden");

  },
  'click .body-preview-collapse': function(e){
    var $this = $(e.target).parents('.post-meta').find('.body-preview-collapse');
    var $expand = $this.parents('.post-meta').find('.body-preview-expand');
    var $bodyFull = $this.parents('.post-meta').find('.body-full');
    var $bodyPreview = $this.parents('.post-meta').find('.body-preview');
    var $comment = $(e.target).parents('.post-meta').find('.comment-list');
    e.preventDefault();
    $bodyPreview.removeClass("hidden");
    $bodyFull.addClass("hidden");
    $comment.addClass('hidden');
    //$(this).toggleClass(".body-preview-expand");
    $expand.removeClass('hidden');
    $this.addClass('hidden');
},
  'click .approve-link': function(e, instance){
    Meteor.call('approvePost', this);
    e.preventDefault();
  },  
  'click .unapprove-link': function(e, instance){
    Meteor.call('unapprovePost', this);
    e.preventDefault();
  }
});