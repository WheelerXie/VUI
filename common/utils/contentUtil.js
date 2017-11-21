const path = require("path");

var defaultContentType = 'text/plain';
var defaultCharset = 'UTF-8';
var MIME = {
    '.css':     'text/css',
    '.js':      'text/javascript',
    '.jpg':     'image/jpeg',
    '.png':     'image/png',
    '.htm':     'text/html',
    '.html':    'text/html'
};
var readers = {
    'image':    function (data) {
        return data.toString('binary');
    },
    'text':     function (data) {
        return data.toString();
    }
}

exports.getContentType = function (pathname, charset) {
    var type;
    var ext = path.extname(pathname);
    if (ext in MIME) {
        type = MIME[ext];
    }
    var type = type || defaultContentType;
    if (type.startsWith('text/')) {
        charset = charset || defaultCharset;
        return type + '; charset=' + charset;
    } else {
        return type;
    }
};