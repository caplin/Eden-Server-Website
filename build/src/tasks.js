var tools = require( "./tools.js" );
var path = require( "path" );
var marked = require( "marked" );

/**
* Serves favicon requests
*
* change to oResponse.sendfile( sFaviconPath ) as soon as available
*/
exports.sendFavicon = function( oRequest, oResponse, next )
{
	oResponse.send( 404, "Favicon not found" );
};

/**
* Adds a category index for the
* requested page
*/
exports.addIndex = function( oRequest, oResponse, next )
{

	var sDirPath = path.join( SERVER_ROOT, CONF.contentFolder, oRequest.params.page );

	var fToHtml = function( oError, pContents )
	{
		for( var i = 0; i < pContents.length; i++ )
		{
			console.log( marked( pContents[ i ] ) );
		}

		next();
	};

	tools.getDirContents( sDirPath, fToHtml );
};


exports.send = function( oRequest, oResponse )
{
	var fSend = function( oError, sHtml )
	{
		if( oError === null )
		{
			oResponse.send( sHtml );
		}
		else
		{
			oResponse.send( 404, oError.message );
		}
	};

	var sPage = oRequest.params ? oRequest.params.page : "index";

	oResponse.render( sPage, fSend );
};