/**
* The encapsulating scene
*
* @param {DOM_ELEMENT} eContainer
*/
tri.Scene = function( eContainer )
{
	this._eContainer = eContainer;
	this._nWidth = eContainer.offsetWidth;
	this._nHeight = eContainer.offsetHeight;

	this._oScene = new THREE.Scene();

	/**
	* Set the field of view ( in degrees )
	*/
	var nFieldOfView = 45;

	/**
	* Create a perspective camera
	*/
	this._oCamera = new THREE.PerspectiveCamera( nFieldOfView, this._nWidth / this._nHeight, 1, 15000 );
	this._oCamera.position.z = 500;
	this._oScene.add( this._oCamera );

	/**
	* Calculate a factor to determine the relationship between
	* the visible height of the scene and the pixel height of the container
	*
	*/
	this._nVisibletoActual = this._nHeight / ( 2 * Math.tan( nFieldOfView * Math.PI / 180 / 2 ) * 500 );
	this._nVisibleWidth = this._nWidth / this._nVisibletoActual;
	this._nVisibleHeight = this._nHeight / this._nVisibletoActual;
	/**
	* Create a point light that will move
	* relative to the mouse position
	*/
	this._oPointLight = new THREE.PointLight( tri.config.pointLightColor );
	this._oPointLight.position.set( 100, 100, 100 );
	this._oScene.add( this._oPointLight );

	/**
	* Add some diffuse lighting to make the entire scene
	* a bit brighter
	*/
	this._oAmbientLight = new THREE.AmbientLight( tri.config.ambientLightColor );
	this._oScene.add( this._oAmbientLight );

	this._oRenderer = new THREE.WebGLRenderer({ antialias: true });
	this._oRenderer.setSize( this._nWidth, this._nHeight );

	/**
	* Set the scene background to transparent so
	* that the video behind the scene is fully visible
	*/
	//this._oRenderer.setClearColor( 0xffffff, 0 );
	this._eContainer.appendChild( this._oRenderer.domElement );

	/**
	* Create all triangles in one go
	*/
	this._pTriangles = [];
	this._createTriangles();

	/**
	* Start the animation loop
	*/
	this._render();
};

tri.Scene.prototype._render = function()
{
	this._oRenderer.render( this._oScene, this._oCamera );
	requestAnimationFrame( this._render.bind( this ) );
};

tri.Scene.prototype._createTriangles = function()
{
	var nTriangleSide = this._nVisibleHeight / tri.config.rows;
	var nTrianglesAcross = Math.ceil( this._nVisibleWidth / nTriangleSide );
	var x, y, oTriangleUp, oTriangleDown, nPosX, nPosY;

	for( y = 0; y < tri.config.rows; y++ )
	{
		for( x = 0; x < nTrianglesAcross; x++ )
		{
			nPosX = ( this._nVisibleWidth / -2 ) + ( x * nTriangleSide ) + ( nTriangleSide / 2);
			nPosY = ( this._nVisibleHeight / -2 ) + ( y * nTriangleSide ) + ( nTriangleSide / 2);

			/**
			* Add upwards pointing triangle
			*/
			oTriangleUp = new tri.Triangle( nTriangleSide, nTriangleSide, nPosX, nPosY, false );
			this._oScene.add( oTriangleUp.getMesh() );

			/**
			* Add downwards pointing triangle
			*/
			oTriangleDown = new tri.Triangle( nTriangleSide, nTriangleSide, nPosX + ( nTriangleSide / 2), nPosY, true );
			this._oScene.add( oTriangleDown.getMesh() );
		}
	}


};