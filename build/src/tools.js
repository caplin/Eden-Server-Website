var async = require( "async" );
var fs = require( "fs" );
var path = require( "path" );

/**
* Non-recoursively reads a directory
* and returns the file contents as an array
*/
exports.getDirContents = function( sPath, fCallback )
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
			async.map( pFileNames, fReadFile, fCallback );
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