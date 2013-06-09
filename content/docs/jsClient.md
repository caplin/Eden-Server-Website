JS Client
===========================================================

eden.require( module, callback )
-----------------------------------------------------------
<args>
module	|	String or array of Strings	|	The module(s) that will be loaded from the server
callback|	Function					|	Will be called once the module(s) are loaded. Receives the Modules as arguments in the same order that they have been required
</args>

<code>eden.require</code> is used to load one or more modules (and their dependencies)
from the server. It's functionally equivalent to require.js require call.

It can be called with a single module name as a String or an array of module names. The callback function will be invoked as soon as all modules AND their dependencies are loaded and the module is ready to be used.

**Loading a single module and its dependencies**

	eden.require( "chart", function( Chart ){
		var myChart = new Chart();
	});

**Loading multiple modules at once**

	eden.require( [ "thirdparty/jQuery", "chart" ], function( $, Chart ){
		var myChart = new Chart();
		$( ".chart_container" ).append( myChart.getElement() );
	});

clearCache()
-----------------------------------------------------------
Clears the cache of loaded modules. This can be useful if you expect your module to change while your page is open.


clearModule( module )
-----------------------------------------------------------
<args>
module | String | the name of the module that should be removed from the cache
</args>

Deletes a single module from the cache. This might render modules that depend on the cleared module unusable

isLoaded( module )
-----------------------------------------------------------
<args>
module | String | the name of the module
</args>

Returns true if the module has already been loaded. Is useful to determine if a module has already been loaded as a dependency of another module


scope( module )
-----------------------------------------------------------
<args>
module | String | the name of the module
</args>

Returns the <code>module</code> Object for a specific module.