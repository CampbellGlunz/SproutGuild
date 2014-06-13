// ** Handlebars helpers **

UI.registerHelper('eachWithRank', function(items, options) {
  // not used, forces multiple renders
  // note: cannot use this because it would delete and recreate all nodes
  items.rewind();
  var out = '';
  items.forEach(function(item, i){
    var key = 'Branch-' + i;
    out = out + Spark.labelBranch(key,function(){
      return options.fn(_.extend(item, {rank: i}));
    });
  });
  return out;
});

UI.registerHelper('getSetting', function(setting, defaultArgument){
  return getSetting(setting, defaultArgument);
});
UI.registerHelper('canView', function() {
  return canView(Meteor.user());
});
UI.registerHelper('canPost', function() {
  return canPost(Meteor.user());
});
UI.registerHelper('canComment', function() {
  return canComment(Meteor.user());
});
UI.registerHelper('canUpvote', function(collection) {
  return canUpvote(Meteor.user(), collection);
});
UI.registerHelper('canDownvote', function(collection) {
  return canDownvote(Meteor.user(), collection);
});
UI.registerHelper('isAdmin', function(showError) {
  if(isAdmin(Meteor.user())){
    return true;
  }else{
    if((typeof showError === "string") && (showError === "true"))
      throwError(i18n.t('Sorry, you do not have access to this page'));
    return false;
  }
});
UI.registerHelper('canEdit', function(collectionName, item, action) {
  var action = (typeof action !== 'string') ? null : action;
  var collection = (typeof collectionName !== 'string') ? Posts : eval(collectionName);
  console.log(item);
  // var itemId = (collectionName==="Posts") ? Session.get('selectedPostId') : Session.get('selectedCommentId');
  // var item=collection.findOne(itemId);
  return item && canEdit(Meteor.user(), item, action);
});

// debug helper
// usage: {{debug}} or {{debug someValue}}
// from: @commondream (http://thinkvitamin.com/code/handlebars-js-part-3-tips-and-tricks/)
UI.registerHelper("debug", function(optionalValue) {
console.log("Current Context");
console.log("====================");
console.log(this);
if (optionalValue) {
console.log("Value");
console.log("====================");
console.log(optionalValue);
}
});
// return the first item of a list only
// usage: {{#first items}}{{name}}{{/first}}
UI.registerHelper('first', function(context, block) {
return block(context[0]);
});
// a iterate over a specific portion of a list.
// usage: {{#slice items offset="1" limit="5"}}{{name}}{{/slice}} : items 1 thru 6
// usage: {{#slice items limit="10"}}{{name}}{{/slice}} : items 0 thru 9
// usage: {{#slice items offset="3"}}{{name}}{{/slice}} : items 3 thru context.length
// defaults are offset=0, limit=5
// todo: combine parameters into single string like python or ruby slice ("start:length" or "start,length")
UI.registerHelper('slice', function(context, block) {
var ret = "",
offset = parseInt(block.hash.offset) || 0,
limit = parseInt(block.hash.limit) || 5,
i = (offset < context.length) ? offset : 0,
j = ((limit + offset) < context.length) ? (limit + offset) : context.length;
 
for(i,j; i<j; i++) {
ret += block(context[i]);
}
 
return ret;
});
// return a comma-serperated list from an iterable object
// usage: {{#toSentence tags}}{{name}}{{/toSentence}}
UI.registerHelper('toSentence', function(context, block) {
var ret = "";
for(var i=0, j=context.length; i<j; i++) {
ret = ret + block(context[i]);
if (i<j-1) {
ret = ret + ", ";
};
}
return ret;
});
// format an ISO date using Moment.js
// http://momentjs.com/
// moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
// usage: {{dateFormat creation_date format="MMMM YYYY"}}
UI.registerHelper('dateFormat', function(context, block) {
if (window.moment) {
var f = block.hash.format || "MMM Do, YYYY";
return moment(Date(context)).format(f);
}else{
return context; // moment plugin not available. return data as is.
};
});

UI.registerHelper('log', function(context){
  console.log(context);
});