var express = require( 'express' );
var app = express();
var colors = require( 'colors' );
var tasks = require( "./src/tasks.js" );
var hbs = require( 'hbs' );
var templateHelper = require( './src/templateHelper.js' );

/**
* The root directory. All paths in the config
* are relative to this
*/
SERVER_ROOT = __dirname;

/**
* Global CONF object
*/
CONF = require( './config.js' ).CONFIG;

/**
* Add directory listing and browsing
* to the asset directory
*/
app.use( express.directory( CONF.assetFolder ) );

/**
* Serve everything within the assets folder as
* a static file
*/
app.use( express.static( CONF.assetFolder ) );

/**
* Register all handlebar template helper
*/
for( var sTemplateName in templateHelper )
{
	hbs.registerHelper( sTemplateName, templateHelper[ sTemplateName ] );
}

/**
* We'll use plain HTML for the views. All
* markdown will be parsed and passed on as html
*/
app.set( 'view engine', 'html' );

/**
* Using Handlebars templating
*/
app.engine( 'html', hbs.__express );

/**
* Top level views are html templates
* in the pages folder
*/
app.set( "views", CONF.pagesFolder );

/**
* Extract the page and content parameters
*/
app.get( "/:page", tasks.addIndex, tasks.send );

/**
* Send out favicons - yehaa
*/
app.get( "/favicon.ico", tasks.sendFavicon );

/**
* Add handling for the pages folder
*/
app.get( "*", tasks.send );

/**
* Start the app on port 3000
*/
app.listen( CONF.port );

/**
* and that's it...
*/
console.log( ( "Server running. Access the page at localhost:" + CONF.port ).green );

