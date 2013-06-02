/**
* The encapsulating scene
*
* @param {DOM_ELEMENT} eContainer
*/
tri.Scene = function( eContainer )
{
	this._eContainer = eContainer;

	/**
	* Width and Height are public
	*/
	this.width = eContainer.offsetWidth;
	this.height = eContainer.offsetHeight;

	this._oScene = new THREE.Scene();

	/**
	* Set the FOV, the angle the camera
	* can see ( in degrees )
	*/
	var nFieldOfView = 45;

	/**
	* Create a perspective camera
	*/
	this._oCamera = new THREE.PerspectiveCamera( nFieldOfView, this.width / this.height, 1, 15000 );
	this._oCamera.position.z = 500;
	this._oScene.add( this._oCamera );

	/**
	* this.visibleToActual is the factor that represents the relationship between
	* the visible height of the scene and the pixel height of the container
	*/
	this.visibleToActual = this.height / ( 2 * Math.tan( nFieldOfView * Math.PI / 180 / 2 ) * 500 );
	this.visibleWidth = this.width / this.visibleToActual;
	this.visibleHeight = this.height / this.visibleToActual;
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
	this._oRenderer.setSize( this.width, this.height );

	/**
	* Set the scene background to transparent so
	* that the video behind the scene is fully visible
	*/
	//this._oRenderer.setClearColor( 0xffffff, 0 );
	this._eContainer.appendChild( this._oRenderer.domElement );

	/**
	* Alternative to individual triangles
	*/
	this._oWeb = null;
	// this._createWeb();

	/**
	* Create all triangles 
	*/
	this._nTriangleCreationIntervalId = 0;
	this._pTriangles = [];
	this._pTriangleData = [];
	this._createTriangleData();
	this._createTriangles();

	

	/**
	* Start the animation loop
	*/
	this._render();

	window.addEventListener( "mousemove", this._movePointLight.bind( this ), false );
};

tri.Scene.prototype.destroyTriangles = function()
{
	for( var i = 0; i < this._pTriangles.length; i++ )
	{
		this._pTriangles[ i ].destroy();
		this._oScene.remove( this._pTriangles[ i ].getMesh() );
	}
};

tri.Scene.prototype._render = function()
{
	this._oRenderer.render( this._oScene, this._oCamera );
	requestAnimationFrame( this._render.bind( this ) );
};

tri.Scene.prototype._movePointLight = function( oEvent )
{
	this._oPointLight.position.x = ( this.visibleWidth / -2 ) + ( ( this._eContainer.offsetLeft + oEvent.screenX ) / this.visibleToActual );
	this._oPointLight.position.y = ( this.visibleHeight / 2 ) - ( ( this._eContainer.offsetTop + oEvent.screenY ) / this.visibleToActual );
};


tri.Scene.prototype._createWeb = function()
{
	var nTriangleSide = this.visibleHeight / tri.config.rows;
	var nTrianglesAcross = Math.ceil( this.visibleWidth / nTriangleSide );
	this._oWeb = new tri.Web( nTrianglesAcross, tri.config.rows, nTriangleSide, this );
};

tri.Scene.prototype._createTriangleData = function()
{
	;var nTriangleSide = this.visibleHeight / tri.config.rows;
	var nTrianglesAcross = Math.ceil( this.visibleWidth / nTriangleSide )
	var x, y, oTriangleUp, oTriangleDown, nPosX, nPosY;

	for( y = 0; y < tri.config.rows; y++ )
	{
		for( x = 0; x < nTrianglesAcross; x++ )
		{
			nPosX = ( this.visibleWidth / -2 ) + ( x * nTriangleSide ) + ( nTriangleSide / 2);
			nPosY = ( this.visibleHeight / -2 ) + ( y * nTriangleSide ) + ( nTriangleSide / 2);

			/**
			* Add upwards pointing triangle
			*/
			this._pTriangleData.push([ nTriangleSide, nTriangleSide, nPosX, nPosY, false ]);

			/**
			* Add downwards pointing triangle
			*/
			this._pTriangleData.push([ nTriangleSide, nTriangleSide, nPosX + ( nTriangleSide / 2), nPosY, true ]);
		}
	}
};

tri.Scene.prototype._createTriangles = function()
{
	var i = 0, p = this._pTriangleData, oTriangle;

	fCreateNext = function()
	{
		oTriangle = new tri.Triangle( p[ i ][ 0 ], p[ i ][ 1 ], p[ i ][ 2 ], p[ i ][ 3 ], p[ i ][ 4 ] );

		this._oScene.add( oTriangle.getMesh() );
		this._pTriangles.push( oTriangle );

		if( this._pTriangleData.length === this._pTriangles.length )
		{
			this._pTriangleData = null;
			clearTimeout( this._nTriangleCreationIntervalId );
		}
		else
		{
			i++;
		}
	};

	this._nTriangleCreationIntervalId = setInterval( fCreateNext.bind( this ), tri.config.triangleCreationInterval );
};