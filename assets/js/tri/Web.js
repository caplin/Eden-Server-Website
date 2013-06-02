tri.Web = function( nTrianglesX, nTrianglesY, nTriangleBaseWidth, oScene )
{
	this._oGeometry = new THREE.Geometry();

	var vX, vY;

	for( var y = 0; y < nTrianglesY; y++ )
	{
		for( var x = 0; x < nTrianglesX; x++ )
		{
			vX = x * nTriangleBaseWidth - oScene.visibleWidth / 2;
			vY = y * nTriangleBaseWidth - oScene.visibleHeight / 2;

			if( y % 2 === 0 )
			{
				vX += nTriangleBaseWidth / 2;
			}

			this._oGeometry.vertices.push( new THREE.Vector3( nX, xY );
			var oGeometry = new THREE.CubeGeometry( 10, 10, 10 );
			var oMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
			var oMesh = new THREE.Mesh( oGeometry, oMaterial );


			oMesh.position.x = vX;
			oMesh.position.y = vY;
			oScene._oScene.add( oMesh );
		}
	}

	return;
	
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
};

