var server = require("./common/server");
var router = require("./common/router");
 
server.start(router.route);