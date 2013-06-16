var tools = require( "./tools.js" );
var fs = require( "fs" );


exports.h2 = function( sSearchResult, sTextContent, nIndex, sFullTest )
{
	var pHtml = [
				'<h2>',
					'<a name="', tools.niceUrlEncode( sTextContent ), '">',
						sTextContent,
					'</a>',
				'</h2>'
				];

	return pHtml.join( "" );
};

exports.pre = function( sSearchResult, sTextContent, nIndex, sFullTest )
{
	var pHtml = [
				'<pre class="prettyprint">',
					sTextContent,
				'</pre>'
				];

	return pHtml.join( "" );
};

exports.args = function( sSearchResult, sTextContent, nIndex, sFullTest )
{
	var pArgs = sTextContent.split( /\n/g ), i, pArgumentLine,
	sOutput = '<table class="args"><tbody>';

	for( i = 0; i < pArgs.length; i++ )
	{
		pArgumentLine = pArgs[ i ].split( "|" );

		if( pArgumentLine.length === 3 )
		{
			sOutput += '<tr>';
			sOutput += '<td class="argument">' + pArgumentLine[ 0 ].trim() + '</td>';
			sOutput += '<td class="type">' + pArgumentLine[ 1 ].trim() + '</td>';
			sOutput += '<td class="description">' + pArgumentLine[ 2 ].trim() + '</td>';
			sOutput += '</tr>';
		}
	}

	sOutput += '</tbody></table>';

	return sOutput;
};

/**
* Loads  the config file and converts it to documentation
*/
exports.edenconfig = function( sSearchResult, sTextContent, nIndex, sFullTest )
{

	/**
	* Load the config file. The URL needs to be specified like this
	*
	* <edenconfig>C:\github\eden-server\server\config.js</edenconfig>
	*/
	var sConfigFileContents = fs.readFileSync( sTextContent, "utf8" );

	var pTokens = fTokenizeConfigFile( sConfigFileContents );

	return fTokensToHtml( pTokens );
};

var fTokensToHtml = function( pTokens )
{
	var sHtml = "";

	for( var i = 0; i < pTokens.length; i++ )
	{
		if( pTokens[ i ].isCategoryHeading )
		{
			sHtml += '<h2>' + pTokens[ i ].title + '</h2>';
		}
		else
		{
			sHtml += '<h3>' + pTokens[ i ].title + '</h3>';
			sHtml += '<p>' + pTokens[ i ].description + '</p>';
			sHtml += '<pre><code>' + pTokens[ i ].code + '</code></pre>';
		}
	}

	return sHtml;
};

var fTokenizeConfigFile = function( sInput )
{
	var pLines, sLine, i, mEntry = null, bLineWithKey = false, pTokens = [], sTitle;

	pLines = sInput.split( /\n/g );
	/**
	* Remove the first and the last line
	*/
	pLines = pLines.slice( 1, pLines.length - 1 );


	for( i = 0; i < pLines.length; i++ )
	{
		sLine = pLines[ i ].trim();

		/**
		* New block
		*/
		if( sLine === "/**" )
		{
			if( mEntry !== null )
			{
				pTokens.push( mEntry );
			}

			mEntry =
			{
				isCategoryHeading: false,
				title: "",
				description: "",
				code: ""
			};
		}

		/**
		* Category headings are specified like this
		*
		*  /******************************************************************************
		*	* GENERAL
		*	******************************************************************************\/
		*/
		else if( sLine.substr( 0, 4 ) === "/***" )
		{
			pTokens.push({
				title: pLines[ i + 1 ].replace( /\*/g, "" ).trim(),
				isCategoryHeading: true
			});

			i += 2;
		}

		/**
		* Skip empty lines
		*/
		else if( sLine.length === 0 )
		{
			continue;
		}

		/**
		* Where within a comment
		*/
		else if( sLine[ 0 ] === "*" && sLine !== "*/" )
		{
			mEntry.description += sLine.substr( 1 ).trim() + " ";
		}

		/**
		* End of a comment, what comes after should be a parameter
		*/
		else if( sLine === "*/" )
		{
			bLineWithKey = true;
			continue;
		}

		/**
		* Add parameters as code. We use the untrimmed line
		* here to preserve the whitespace
		*/
		else
		{
			mEntry.code += pLines[ i ].replace( "	", "" ) + "\n";
		}

		if( bLineWithKey === true && sLine.indexOf( ":" ) !== -1 )
		{
			mEntry.title += sLine.substr( 0, sLine.indexOf( ":" ) ).replace( /["']/g, '' );
			bLineWithKey = false;
		}
	}

	pTokens.push( mEntry );

	return pTokens;
};