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