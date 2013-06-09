module object
===========================================================

The module object serves as accessor for all things module related. 
It's automatically available within the scope of every module and can be created from the outside using <code>eden.scope( module )</code>.

module.get( type, key )
-----------------------------------------------------------

<args>
type	|	string	|	The type of the asset, e.g. "html" or "json". Needs to be the same as the foldername the asset is stored in
key		|	string	|	The name of the file from the asset folder, e.g. "header" or "header.html". Can be specified with or without extension
</args>

Can be used within a module to access text based assets like html, json, xml etc. that belong to the module.

**Getting the contents of header.html from the modules html folder**

	module.get( "html", "header" );

**Also works as**

	module.get( "html", "header.html" );

**This returns the html as a *string*.

	// jQuery
	headerElement = $( module.get( "html", "header" ) );

	// native
	parentElement = document.createElement( "div" );
	parentElement.innerHTML = module.get( "html", "header" );

This method does not only work for html, but can be used for anykind text based file

**Getting a JSON file using <code>module.get</code>**

	config = JSON.parse( module.get( "json", "config" ) );

In order to use module.get your pipeline has to end with the "wrapAsAsset" task. This is
the default for html, but needs to be specified for other assets in your eden.json file.

**An eden.json file that makes both the html and the json folders content available with module.get**

	"pipeline":
	{
		"json":[ "wrapAsAsset" ],
		"html":[ "wrapAsAsset" ]
	}

module.path
-----------------------------------------------------------

Contains the path (name) of the module, e.g. "lib/chart"

module.exports
-----------------------------------------------------------

Equivalent to exports, this is to adhere to commonjs standards