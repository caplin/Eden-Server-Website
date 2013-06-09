Configuration
===========================================================

Configuration parameters can be passed in three ways to EdenServer. 
* The default values are defined in config.js in Eden’s server folder
* These can be extended by specifying command line parameter
* These can be extended by a "config.json" file in the app root directory

Command line options
-----------------------------------------------------------
All settings can be passed as command line arguments when starting EdenServer.

**Starting EdenServer on a custom port**

	node start --port 10044

**Serving a specific directory**

	node start --appRoot /apps/myApp

**Start EdenServer on a different host with logging turned off**

	node start --host myurl.com --logEvents false

**Config settings that expect Arrays are passed like this**

	node start --logTypes REQUEST --logTypes WARNING --logTypes ERROR

Config Parameter
-----------------------------------------------------------
<edenconfig>C:\github\eden-server\server\config.js</edenconfig>
