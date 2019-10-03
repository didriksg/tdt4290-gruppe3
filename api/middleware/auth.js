const config = require('config');
const jwt = require('jsonwebtoken');

/**
 * Authenticates a given token and add the authenticated user to the incoming request.
 * @param req The request
 * @param res The response
 * @param next Next middleware function.
 */
const auth = function authenticateToken(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token)
        res.status(401)
            .json({msg: 'No token. Authorization denied.'});

    try {
        req.user = jwt.verify(token, config.get('jwtSecret'));
        next();
    } catch (e) {
        res.status(400)
            .json({msg: 'Token is not valid.'})
    }
};

module.exports = auth;