const http = require("http");

const port = 8815;

function start(route) {
    function onRequest(request, response) {
        route(request, response);
    }
    http.createServer(onRequest).listen(port);
    console.log("Server has started on %d.", port);
}

exports.start = start;