tri.config = {

	/**
	* The number of triangle rows that
	* will be displayed on top of each other.
	*
	* triangleWidth, triangleHeight and colums
	* are calculated based on this number and
	* the canvas size
	*
	* @param {INT} rows
	*/
	rows: 5,

	/**
	* Determines the color of the pointlight
	* that will be moved relative to the mouse
	* position
	*
	* @param {HEX} pointLightColor
	*/
	pointLightColor: 0xeeeeff,

	/**
	* Determines the color of the diffuse
	* light that is applied to the entire
	* scene
	*
	* @param {HEX} ambientLightColor
	*/
	ambientLightColor: 0x111111,

	/**
	* Determines how far (on average)
	* every triangle is randomly rotated
	*
	* @param {FLOAT} rotationOffset in radians
	*/
	rotationOffset: 0.1,

	/**
	* Determines the total span of a triangles rotation
	* relative to the mouse position
	*
	* @param {FLOAT} rotationSpan in radians
	*/
	rotationSpan: 0.2,

	/**
	* The interval between the creation of each triangle
	*
	* @param {INT} triangleCreationInterval in milliseconds
	*/
	triangleCreationInterval: 10
};