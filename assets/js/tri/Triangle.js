/**
* Represents a single triangle
*/
tri.Triangle = function( nWidth, nHeight, nPosX, nPosY, bPointsDown )
{
	this._oGeometry = new THREE.Geometry();

	/*
	* Bottom left
	*/
	this._oGeometry.vertices.push( new THREE.Vector3( nWidth / -2,  nHeight / -2, 0 ) );

	/*
	* Bottom right
	*/
	this._oGeometry.vertices.push( new THREE.Vector3( nWidth / 2,  nHeight / -2, 0 ) );

	/**
	* Top
	*/
	this._oGeometry.vertices.push( new THREE.Vector3( 0, nHeight / 2, 0 ) );

	/**
	* Create a single face, connecting
	* all vertices
	*/
	this._oGeometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

	/**
	* Add UV mapping
	*/
	this._oGeometry.faceVertexUvs[ 0 ].push([
		new THREE.Vector2 ( 0, 0 ),
		new THREE.Vector2 ( 0, 1 ),
		new THREE.Vector2 ( 1, 0 )
	]);

	/**
	* Add some random rotation
	*/
	this._nRotationOffsetX = -tri.config.rotationOffset + Math.random() * ( 2 * tri.config.rotationOffset );
	this._nRotationOffsetY = -tri.config.rotationOffset + Math.random() * ( 2 * tri.config.rotationOffset );

	/**
	* Compute some stuff
	*/
	this._oGeometry.computeBoundingSphere();
	this._oGeometry.computeFaceNormals();
	this._oGeometry.computeCentroids();
	this._oGeometry.computeVertexNormals();

	var sUrl = "/assets/img/green_grass_blue_sky.jpeg";

	var pUrls = [ sUrl, sUrl, sUrl, sUrl, sUrl, sUrl ];

	//var oTextureCube = THREE.ImageUtils.loadTextureCube( pUrls, new THREE.CubeRefractionMapping() );
	//this._oMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } )
	this._oMaterial = new THREE.MeshPhongMaterial({
		color: 0xffffff,
		opacity: 0.3,
		refractionRatio: 0.98,
		reflectivity:0.9
	});
	//this._oMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff } );

	this._oMesh = new THREE.Mesh( this._oGeometry, this._oMaterial );

	this._oMesh.position.x = nPosX;
	this._oMesh.position.y = nPosY;

	this._oMesh.rotation.x = this._nRotationOffsetX;
	this._oMesh.rotation.y = this._nRotationOffsetY;
	this._oMesh.rotation.z = bPointsDown ? Math.PI : 0;

	this._fAdjustRotation = this._adjustRotation.bind( this );

	window.addEventListener( "mousemove", this._fAdjustRotation, false );
};

tri.Triangle.prototype.getMesh = function()
{
	return this._oMesh;
};

tri.Triangle.prototype.destroy = function()
{
	window.removeEventListener( "mousemove", this._fAdjustRotation, false );
};

tri.Triangle.prototype._adjustRotation = function( oEvent )
{
	this._oMesh.rotation.x = this._nRotationOffsetX + tri.config.rotationSpan * ( oEvent.screenX / window.innerWidth );
	this._oMesh.rotation.y = this._nRotationOffsetX + tri.config.rotationSpan * ( oEvent.screenY / window.innerHeight );
};
