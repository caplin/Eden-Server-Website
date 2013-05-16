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
	var sPage = oRequest.params.page;

	next();
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