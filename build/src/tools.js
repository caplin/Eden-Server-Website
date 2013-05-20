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