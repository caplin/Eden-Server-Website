exports.CONFIG = {

	/**
	* A list of the required css files. This will be used to create
	* individual includes in served mode and bundled files in build
	* mode
	*/
	cssFiles: [
		"/assets/css/main.css"
	],

	/**
	* A list of the required js files. This will be used to create
	* individual includes in served mode and bundled files in build
	* mode
	*/
	jsFiles: [
		"/assets/js/thirdparty/three.js",
		"/assets/js/tri/namespace.js",
		"/assets/js/tri/config.js",
		"/assets/js/tri/Triangle.js",
		"/assets/js/tri/Scene.js",
		"/assets/js/start.js"
	],

	/**
	* The root folder for static assets, such as
	* js, css, images etc.
	*/
	assetFolder: "../assets",

	/**
	* The folder that contains all html
	* documents
	*/
	pagesFolder: "../pages",

	/**
	* The folder that contains the markdown documents
	*/
	contentFolder: "../content",

	/**
	* A folder with static html
	* templates
	*/
	templateFolder: "../templates/",

	/**
	* The file extension
	* for content files
	*/
	contentFileExt: ".md",

	/**
	* The port the development server
	* will listen on
	*/
	port: 3000
};