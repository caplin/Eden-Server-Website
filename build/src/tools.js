var async = require( "async" );
var fs = require( "fs" );
var path = require( "path" );

/**
* Non-recoursively reads a directory
* and returns the file contents as an array
*
* @param {STRING} sPath the path to the folder, can be relative or absolute
* @param {FUNCTION} fCallback Will be called with ( oError, pContent, pFileNames )
*/
exports.getDirContents = function( sPath, fCallback, bSkipIndex )
{
	var fReadFile = function( sFileName, fFileCallback )
	{
		fs.readFile( path.join( sPath, sFileName ), "utf8", fFileCallback );
	};

	var fOnDirReadFinished = function( oError, pFileNames )
	{
		if( oError )
		{
			fCallback( oError );
		}
		else
		{
			if( bSkipIndex === true )
			{
				pFileNames.splice( pFileNames.indexOf( "index.md" ), 1 );
			}

			var fAddFileNames = function( oError, pContent )
			{
				fCallback( oError, pContent, pFileNames );
			};

			async.map( pFileNames, fReadFile, fAddFileNames );
		}
	};

	fs.readdir( sPath, fOnDirReadFinished );
};

/**
* Loads a content document based on the
* locals of the response object. Returns 404 if no content
* document could be found
*
* Only calls the callback on success
*
* @param {express.Response} oResponse
* @param {FUNCTION} fCallback Will be called with sContent, won't be called if in error
*/
exports.loadContent = function( oResponse, fCallback )
{
	var pPathSegments = [
		SERVER_ROOT,
		CONF.contentFolder,
		oResponse.locals.page,
		oResponse.locals.content + ".md"
	];

	var sPath = path.join.apply( path, pPathSegments );

	var fOnLoad = function( oError, sContent )
	{
		if( oError === null )
		{
			fCallback( sContent );
		}
		else
		{
			oResponse.send( 404, oError.message );
		}
	};

	fs.readFile( sPath, "utf8", fOnLoad );
};

var pUrlReplacements = [
	[ /\s/g, "_", /_/g, " " ]
];

/**
* URL encodes strings in a more human readable
* way than encodeURI or encodeURIcomponent does
*
* @param {STRING} sInput
* @return {STRING} sUrlComponent
*/
exports.niceUrlEncode = function( sInput )
{
	for( var i = 0; i < pUrlReplacements.length; i++ )
	{
		sInput = sInput.replace( pUrlReplacements[ i ][ 0 ], pUrlReplacements[ i ][ 1 ] );
	}

	return sInput;
};

/**
* Decodes strings that have been encoded by
* niceUrlEncode
*
* @param {STRING} sUrlComponent
* @return {STRING} sDecodedString
*/
exports.niceUrlDecode = function( sInput )
{
	for( var i = pUrlReplacements.length - 1; i >= 0; i-- )
	{
		sInput = sInput.replace( pUrlReplacements[ i ][ 2 ], pUrlReplacements[ i ][ 3 ] );
	}

	return sInput;
};