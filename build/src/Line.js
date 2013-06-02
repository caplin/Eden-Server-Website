exports.Line = function( sText )
{
	this._nLineWidth = 60;

	if( sText.length > this._nLineWidth )
	{
		throw "Can't write line for " + sText;
	}

	for( var i = sText.length; i < this._nLineWidth; i++ )
	{
		sText += ".";
	}

	process.stdout.write( sText );
};


/**
* sResult can be "OK", "WARN" or "ERROR"
*/
exports.Line.prototype.end = function( sResult )
{
	var mColors =
	{
		"OK": "green",
		"WARN": "yellow",
		"ERROR": "red"
	};

	process.stdout.write( " [ " + sResult[ mColors[ sResult ] ] + " ]\n" );
};