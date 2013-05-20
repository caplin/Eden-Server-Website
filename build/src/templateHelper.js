var fs = require( "fs" );
var path = require( "path" );
var hbs = require( 'hbs' );

exports.template = function( sPath, vData )
{
	var sTemplate = fs.readFileSync( path.join( CONF.templateFolder, sPath ), "utf8" );

	if( vData )
	{
		sTemplate = hbs.handlebars.compile( sTemplate )( vData );
	}

	return new hbs.handlebars.SafeString( sTemplate );
};

exports.toURL = function( sPath )
{
	return encodeURIComponent( sPath );
};