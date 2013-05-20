var fs = require( "fs" );
var path = require( "path" );
var hbs = require( 'hbs' );

exports.template = function( sPath )
{
	var sTemplate = fs.readFileSync( path.join( CONF.templateFolder, sPath ), "utf8" );
	return new hbs.handlebars.SafeString( sTemplate );
};