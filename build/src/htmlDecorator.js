var tools = require( "./tools.js" );


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