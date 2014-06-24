Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

//adds Markdown ability within site/comments
EpicEditorOptions={
	container:  'editor',
	basePath:   '/editor',
	clientSideStorage: false,
	theme: {
		base:'/themes/base/epiceditor.css',
		preview:'/themes/preview/github.css',
		editor:'/themes/editor/epic-light.css'
	},
	buttons: false,
};


//jQuery social sharing
SharrreOptions={
	share: {
	  //googlePlus: true,
	  // facebook: true,
	  twitter: true,
	},
	buttons: {
	  //googlePlus: {size: 'tall', annotation:'bubble'},
	  // facebook: {layout: 'box_count'},
	  twitter: {
	    count: 'vertical',
	    via: 'SproutGuild',
	    lang: 'en'
	  }
	},
	enableHover: true,
	enableCounter: false,
	enableTracking: false,
};

Statuses={
	pending: 1,
	approved: 2,
	rejected: 3
};
