Creating a dynamic module menu
===========================================================

This example shows how to retrieve all modules from a folder and create a dynamic “Insert widget” menu based on them. This is not only helpful when you architect a huge, portal like application, but also comes in handy for other use cases;

I’ve always liked to write lots of little JavaScript experiments and kept them somewhere on my hard drive. When I wanted to show one of my experiments I spend ages digging around for it and when I finally found it I had no idea how to start it up. So I decided to write a little “Experiments Browser” with names and descriptions of all experiments and the ability to dynamically load them on click. Here’s how:

Here's where my experiments are stored
	var basePath = "/experiments/";

I used EdenServer’s FolderContent extension (comes pre-packaged) to retrieve a list of all folders within my experiments folder.
	eden.FolderContent.get( basePath, onFolderContentReceived );

<code>onFolderContentReceived</code> is a callback that will be invoked with a single argument: the list of foldernames within my experiment folder.

	var onFolderContentReceived = function( folderContents )
	{
		var modulePaths = [];

		// Prepend the basePath
		for( var i = 0; i < folderContents.length; i++ )
		{
			modulePaths.push( basePath + folderContents[ i ] );
		}
	};

EdenServer comes pre-bundled with a <code>ConfigRequest</code> extension. This extensions allows to retrieve the eden.json config for any module. This is extremely powerful since configs are not limited to the usual <code>"dependencies"</code> or <code>"pipeline"</code> settings, but can be extended with any custom data.
Of course the same inheritance mechanism applies, so top level folders can for example specify <code>{ "group": "financial" }</code> and all configurations within that folder will have this parameter as part of their configurations.

Here's an example for what one of my experiment's configurations look like:

	{
		"name": "Ascii Art Generator",
		"description": "Creates ASCII versions of video streams or images",
		"dependencies": {
			"$": "thirdparty/jquery",
			"tools": "libraries/tools"
		}
	}

<code>ConfigRequest</code> first parameter is either a path or an array of paths. The latter allows for the loading of multiple configs at once. So in order to load the config for every file within my experiments folder at once, I just added:

	eden.ConfigRequest.get( modulePaths, startExperimentBrowser );

<code>startExperimentBrowser</code>

{
    "/experiments/asciiArtGenerator": {
        "pipeline": {
            "js": [
                "addFileNameComment"
            ],
            "css": [
                "wrapAsCSS"
            ],
            "html": [
                "wrapAsAsset"
            ]
        },
        "path": "/experiments/asciiArtGenerator",
        "name": "Ascii Art Generator",
        "description": "Creates ASCII versions of video streams or images",
        "dependencies": {
            "$": "thirdparty/jquery",
            "tools": "libraries/tools"
        }
    },
    "/experiments/bubblingShapes": {
        "pipeline": {
            "js": [
                "addFileNameComment"
            ],
            "css": [
                "wrapAsCSS"
            ],
            "html": [
                "wrapAsAsset"
            ]
        },
        "path": "/experiments/bubblingShapes",
        "name": "Bubbling Shapes",
        "description": "An experiment with various rendering techniques"
    },
    "/experiments/chartDemo": {
        "pipeline": {
            "js": [
                "addFileNameComment"
            ],
            "css": [
                "wrapAsCSS"
            ],
            "html": [
                "wrapAsAsset"
            ]
        },
        "path": "/experiments/chartDemo",
        "dependencies": {
            "cc": "libraries/champischart"
        },
        "name": "Champis Chart Demo",
        "description": "Wolfram's charting library in action"
    },
    "/experiments/godrays": {
        "pipeline": {
            "js": [
                "addFileNameComment"
            ],
            "css": [
                "wrapAsCSS"
            ],
            "html": [
                "wrapAsAsset"
            ]
        },
        "path": "/experiments/godrays",
        "showInExperimentBrowser": false
    },
    "/experiments/greenMachine": {
        "pipeline": {
            "js": [
                "addFileNameComment"
            ],
            "css": [
                "wrapAsCSS"
            ],
            "html": [
                "wrapAsAsset"
            ]
        },
        "path": "/experiments/greenMachine",
        "name": "Green Machine",
        "description": "The next generation power trader app"
    }
}