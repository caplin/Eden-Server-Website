var fs = require( "fs" );
var path = require( "path" );

exports.template = function( sPath )
{
	return fs.readFileSync( path.join( CONF.templateFolder, sPath ), "utf8" );
};