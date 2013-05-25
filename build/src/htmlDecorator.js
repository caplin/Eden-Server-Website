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