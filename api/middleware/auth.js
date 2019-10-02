const config = require('config');
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
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
}

module.exports = authenticateToken;