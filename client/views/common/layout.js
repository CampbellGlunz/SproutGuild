Template.layout.helpers({
  pageName : function(){
    // getCurrentTemplate();
  },
  backgroundColor: function(){
  	return getSetting('backgroundColor');
  },
  secondaryColor: function(){
  	return getSetting('secondaryColor');
  },
  buttonColor: function(){
  	return getSetting('buttonColor');
  },
  headerColor: function(){
  	return getSetting('headerColor');
  },
  extraCode: function(){
    return getSetting('extraCode');
  }     
});

Template.layout.created = function(){
  Session.set('currentScroll', null);
}

Template.layout.rendered = function(){
    if(currentScroll=Session.get('currentScroll')){
      $('body').scrollTop(currentScroll);
      Session.set('currentScroll', null);
    }

    // set title
    var title = "Sprout Guild";
    var tagline = "Grow Your Network Naturally";
    document.title = "Sprout Guild"; 
    //(tagline ? title+': '+tagline : title) || "";
}

Template.layout.events({

  'click .outer-wrapper':function(e){
      var container = $("#login-dropdown-list");
      var container2 = $("#login-name-link");

      if (!container.is(e.target) && !container2.is(e.target) // if the target of the click isn't the container...
          && container.has(e.target).length === 0 && container2.has(e.target).length === 0)// ... nor a descendant of the container
      {
        Accounts._loginButtonsSession.closeDropdown();
      }
  }
});
