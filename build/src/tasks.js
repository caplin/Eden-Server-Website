exports.parsePageParams = function( oRequest, oResponse, next )
{
	if( !oRequest.params )
	{
		oResponse.locals.page = "";
		next();
	}
	
	oResponse.locals.page = oRequest.params.page.split( "." )[ 0 ];

	if( oResponse.locals.page === "/" )
	{
		oResponse.locals.page = "index";
	}

	oResponse.locals.contentId = oRequest.params.content;

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

	oResponse.render( oResponse.locals.page, fSend );
};