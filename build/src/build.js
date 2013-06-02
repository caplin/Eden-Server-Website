var path = require( "path" );
var fs = require( "fs" );
var http = require( "http" );
var async = require( "async" );
var Line = require( "./Line" ).Line;

exports.createStaticFiles = function( sOutputFolderPath )
{
	var oLine;

	var sOutputDir = path.join( SERVER_ROOT, sOutputFolderPath );

	oLine = new Line( "Preparing write to " + sOutputDir );
	oLine.end( "OK" );

	var pTargets = fGetTargets();

	oLine = new Line( pTargets.length + " pages to create" );
	oLine.end( "OK" );

	async.eachSeries( pTargets, fBuildTarget.bind( this, sOutputFolderPath ), fDone );
};

var fDone = function( oError )
{
	if( oError === null )
	{
		console.log( "Build succesful".green );
	}
	else
	{
		console.log( "Error: " + oError.message.red );
	}

	process.exit();
};

var fBuildTarget = function( sOutputFolderPath, mTarget, fNext )
{
	var oLine = new Line( "Building " + mTarget.url );
	var pPath = [ path.join( SERVER_ROOT, sOutputFolderPath ) ];

	/**
	* Create pages folder
	*/
	if( mTarget.page !== "index" )
	{
		fCreateFolderIfNotExists( path.join( sOutputFolderPath, mTarget.page ) );
		pPath.push( mTarget.page );
	}

	/**
	* Create content folder
	*/
	if( mTarget.content !== "index" )
	{
		fCreateFolderIfNotExists( path.join( sOutputFolderPath, mTarget.page, mTarget.content ) );
		pPath.push( mTarget.content );
	}

	/**
	* All files will be created as index.html files to have nicer urls.
	* The resulting paths will be (e.g.)
	*
	* /docs/jsclient/index.html
	*/
	pPath.push( "index.html" );

	/**
	* Pipe the http response stream into a file
	*/
	var fWriteFile = function( oResponseStream )
	{
		var mOptions =
		{
			flags: 'w',
			encoding: 'utf8',
			mode: 0666
		};

		var oFileStream = fs.createWriteStream( path.join.apply( path, pPath ), mOptions );

		oResponseStream.pipe( oFileStream );

		oLine.end( "OK" );
		fNext();
	};

	var fOnError = function( oError )
	{
		console.log( "Http error " + oError.message );
		process.exit();
	};

	var sRequestUrl = "http://localhost:" + CONF.port + mTarget.url;

	http.get( sRequestUrl, fWriteFile, fOnError );
};

var fCreateFolderIfNotExists = function( sPath )
{
	if( !fs.existsSync( sPath ) )
	{
		fs.mkdirSync( sPath );
	}
};

var fReadDir = function( sPath, sExtension )
{
	var pContents = fs.readdirSync( sPath );

	for( var i = 0; i < pContents.length; i++ )
	{
		pContents[ i ] = pContents[ i ].replace( sExtension, "" );
	}

	return pContents;
};

/**
* Returns an array of "targets" that will be converted to
* static files. The return value should look something like
* this:
*
* [
*	{ url: "/docs/overview", page: "docs", "content": "overview" },
*	{ url: "/docs/something", page: "docs", "content": "something" },
*	{ ... }
* ]
*/
var fGetTargets = function()
{
	var pTargets = [], mTarget, pContents, p, c, sUrl, sContentFolderPath;

	var pPages = fReadDir( path.join( SERVER_ROOT, CONF.pagesFolder ), CONF.pagesFileExt );

	for( p = 0; p < pPages.length; p++ )
	{
		sContentFolderPath = path.join( SERVER_ROOT, CONF.contentFolder, pPages[ p ] );

		pContents = fReadDir( sContentFolderPath, CONF.contentFileExt );

		for( c = 0; c < pContents.length; c++ )
		{
			mTarget =
			{
				url: "",
				page: pPages[ p ],
				content: pContents[ c ]
			};

			if( pPages[ p ] !== "index" )
			{
				mTarget.url += "/" + pPages[ p ];
			}

			if( pContents[ c ] !== "index" )
			{
				mTarget.url += "/" + pContents[ c ];
			}

			pTargets.push( mTarget );
		}
	}

	return pTargets;
};