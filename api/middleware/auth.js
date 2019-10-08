const config = require('../config/default');
const jwt = require('jsonwebtoken');

/**
 * Authenticates a given token and add the authenticated user to the incoming request.
 * @param req The request
 * @param res The response
 * @param next Next middleware function.
 */
const auth = function authenticateToken(req, res, next) {
    const token = req.header('x-auth-token');

    if (token === undefined) {
        res.status(401)
            .json({msg: 'No valid token was found. Access denied.'});
    }

    try {
        req.user = jwt.verify(token, config['jwtSecret']);
        next();
    } catch (e) {
        res.status(400)
            .json({msg: 'Provided token is not valid. Access denied.'})
    }
};

module.exports = auth;