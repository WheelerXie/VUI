const fs = require("fs");
const contentUtil = require("./contentUtil");

function responseFromFile(path, request, response) {
    fs.readFile(path, 'binary', function (errorMsg, data) {
        if (errorMsg) {
            responseError(request, response, 500, errorMsg.toString())
        } else {
            responseContent(request, response,
                200,
                { "Content-Type": contentUtil.getContentType(path) },
                function (response) { response.write(data, 'binary'); });
        }
    });
}
function responseContent(request, response, status, headers, writeContent) {
    response.writeHead(status, headers);
    if (writeContent) {
        writeContent(response);
    }
    response.end();
}
function responseError(request, response, status, errorMsg) {
    responseContent(request, response,
        status,
        { "Content-Type": "text/plain" },
        function (response) { response.write(errorMsg); });
}
function response404(request, response, path) {
    responseContent(request, response,
        404,
        { "Content-Type": "text/plain" },
        function (response) { response.write(path + ' cannot found'); });
}

exports.responseFromFile = responseFromFile;