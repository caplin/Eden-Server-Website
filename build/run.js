var express = require( 'express' );
var app = express();
var CONF = require( './config.js' ).CONFIG;
var colors = require( 'colors' );
var tasks = require( "./src/tasks.js" );

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
* We'll use plain HTML for the views. All
* markdown will be parsed and passed on as html
*/
app.set( 'view engine', 'html' );

/**
* Using Handlebars templating
*/
app.engine( 'html', require('hbs').__express );

/**
* Top level views are html templates
* in the pages folder
*/
app.set( "views", CONF.pagesFolder );

/**
* Extract the page and content parameters
*/
app.use( tasks.parsePageParams );

/**
* Add handling for the pages folder
*/
app.get( "/:page/:content", tasks.send );

/**
* Start the app on port 3000
*/
app.listen( CONF.port );

/**
* and that's it...
*/
console.log( ( "Server running. Access the page at localhost:" + CONF.port ).green );

