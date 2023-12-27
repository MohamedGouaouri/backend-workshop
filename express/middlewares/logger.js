
function logger(req, res, next) {
    // logging format
    // timestamp:http method:request path
    const currentTs = new Date().toISOString();
    const requestMethod = req.method;
    const requestPath = req.path;
    var end = res.end;

    res.end  = function(chunk, encoding) {
        console.log(`${currentTs}:${requestMethod}:${requestPath}:${res.statusCode}`);
        res.end = end;
        res.end(chunk, encoding);
    };
    next();
}
export default logger;