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
	pointLightColor: 0xff2200,

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
	* every triangle is randomly rotatet
	*
	* @param {FLOAT} rotationOffset in radians
	*/
	rotationOffset: 0.1
};