var tools = require( "./tools.js" );

exports.h3 = function( sSearchResult, sTextContent, nIndex, sFullTest )
{
	var pHtml = [
				'<h3>',
					'<a name="', tools.niceUrlEncode( sTextContent ), '">',
						sTextContent,
					'</a>',
				'</h3>'
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