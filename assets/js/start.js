window.onload = function()
{
	oTriangelScene = new tri.Scene( document.getElementById( "claim" ) );

	/**
	* Construct a oGui using dat.oGui
	* http://workshop.chromeexperiments.com/examples/oGui/#1--Basic-Usage
	*/

	var oGui = new dat.GUI();
	oGui.add( tri.config, 'pointLightColor');
	oGui.add( tri.config, 'ambientLightColor');
	oGui.add( tri.config, 'rotationOffset', -1, 2);
	oGui.add( tri.config, 'rotationSpan', 0, 2);
};