const url           = require("url");
const responseUtil  = require("./utils/responseUtil");

var router = {
    '/': function (path, request, response) {
        responseUtil.responseFromFile('./templates/index.html', request, response);
    }
}

exports.route = function (request, response) {
    var path = url.parse(request.url).pathname;
    console.log("About to route a request for " + path);

    if (path in router) {
        router[path](path, request, response);
    } else {
        responseUtil.responseFromFile('.' + path, request, response);
    }
};