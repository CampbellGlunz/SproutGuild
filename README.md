### SproutGuild ###

# Local Variables
Meteor uses local environment variables for a few things, such as configuring email. While some platforms (like Modulus) make it easy to configure them from their web dashboard, on a local dev environment the best way is to set up an alias for the `mrt` command. 
For example, to configure Meteor to use Mailgun for email, in your `.bash_profile` file just add:
`alias m='MAIL_URL=smtp://username:password@smtp.mailgun.org:587/ mrt'`

This can also be useful for starting Meteor on a specific port:
`alias m4='MAIL_URL=smtp://username:password@smtp.mailgun.org:587/ mrt --port 4000'`

Powered by [Telescope](https://github.com/TelescopeJS/Telescope), an open-source, real-time [Meteor](https://www.meteor.com/) app. 

Learn More:[Telescope Wiki](https://github.com/SachaG/Telescope/wiki)

Developed by (Daniel Glunz && Alex Campbell)