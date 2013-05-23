var tools = require( "./tools.js" );
var path = require( "path" );
var marked = require( "marked" );
var hbs = require( "hbs" );

/**
* Turns a markdown document into a key/value
* map where key = h2 and value = following paragraph
*/
exports.mdToData = function( oRequest, oResponse, fNext )
{
	var fOnContent = function( sContent )
	{
		var pSegments = marked( sContent ).split( /<\/*h[1|2]>/ );

		for( var i = 1; i < pSegments.length; i+=2 )
		{
			oResponse.locals[ pSegments[ i ].trim().replace( " ", "_" ) ] =
			{
				title: new hbs.handlebars.SafeString( pSegments[ i ].trim() ),
				content: new hbs.handlebars.SafeString( pSegments[ i + 1 ].trim() )
			};
		}

		fNext();
	};

	tools.loadContent( oResponse, fOnContent );
};

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
* Generic method to expose params to the view
*/
exports.addViewParams = function( oRequest, oResponse, fNext )
{
	/**
	* Request "/"
	*/
	if( !oRequest.params.page )
	{
		oResponse.locals.page = "index";
		oResponse.locals.content = "index";
	}

	/**
	* Request "/docs"
	*/
	else if( oRequest.params.page && !oRequest.params.page )
	{
		oResponse.locals.page = oRequest.params.page;
		oResponse.locals.content = "index";
	}

	/**
	* Request "/docs/ClientJs"
	*/
	else
	{
		oResponse.locals.page = oRequest.params.page;
		oResponse.locals.content = oRequest.params.content;
	}

	fNext();
};

/**
* This function:
*
* - retrieves the file contents for all markdown files
*   within the relevant content folder
*
* - converts them to html and finds all h1 and h2 tags
*
* - Creates a map in the format { sH1: [ pH2s ] }
* 
*/
exports.addIndex = function( oRequest, oResponse, next )
{
	var pMatches, i, m, pResult = [], mEntry, sDirPath;

	/*
	* The path to the content folder. This is the earliest point we know
	* that the client has requested an unavailable url
	*/
	sDirPath = path.join( SERVER_ROOT, CONF.contentFolder, oRequest.params.page );

	var fParse = function( oError, pContents )
	{
		if( oError )
		{
			oResponse.send( 404, "No content folder for " + sDirPath );
			return;
		}

		for( i = 0; i < pContents.length; i++ )
		{
			pMatches = marked( pContents[ i ] ).match( /<h[1|2]>.*<\/h[1|2]>/g );

			if( !pMatches )
			{
				continue;
			}

			for( m = 0; m < pMatches.length; m++ )
			{
				pHeading = pMatches[ m ].match( /<(.*)>(.*)<\/.*>/i );

				if( pHeading[ 1 ] === "h1" )
				{
					if( mEntry )
					{
						pResult.push( mEntry );
					}

					mEntry = { title: pHeading[ 2 ], content: [] };
				}
				else
				{
					mEntry.content.push( pHeading[ 2 ] );
				}
			}
		}

		oResponse.locals.index = pResult;


		next();
	};

	tools.getDirContents( sDirPath, fParse, true );
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