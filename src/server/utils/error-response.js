module.exports = function () {
    var service = {
        notFoundMiddleware: notFoundMiddleware,
        send404: send404,
        send403: send403,
        send401: send401,
        send400: send400
    };
    return service;

    function notFoundMiddleware(req, res, next) {
        send404(req, res, 'API endpoint not found');
    }

    function send404(req, res, description) {
        sendErrorCode(req, res, description, 404, 'Not Found');
    }

    function send401(req, res, description) {
        sendErrorCode(req, res, description, 401, 'Unauthorized');
    }

    function send403(req, res, description) {
        sendErrorCode(req, res, description, 403, 'Forbidden');
    }

    function send400 (req, res, description) {
        sendErrorCode(req, res, description, 400, 'Bad Request');
    }

    function sendErrorCode (req, res, description, errorCode, message) {
        var data = {
            status: errorCode,
            message: message,
            description: description,
            url: req.url
        };
        res.status(errorCode)
            .send(data)
            .end();
    }
};
