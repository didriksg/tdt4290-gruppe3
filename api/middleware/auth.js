import {jwtSecret} from '../config/default';
import jwt from 'jsonwebtoken';

/**
 * Authenticates a given token and add the authenticated user to the incoming request.
 * @param req The request
 * @param res The response
 * @param next Next middleware function.
 */
const auth = function authenticateToken(req, res, next) {
    const token = req.header('x-auth-token');

    if (token === undefined) {
        return res.status(401)
            .json({msg: 'Du har ikke tilgang til å se denne siden...'});
    }

    try {
        req.user = jwt.verify(token, jwtSecret);
        next();
    } catch (e) {
        res.status(401)
            .json({msg: 'Du har blitt logget ut på grunn av inaktivitet.'})
    }
};

export default auth;