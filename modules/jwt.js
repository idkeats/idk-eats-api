import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const secret = process.env.SECRET;
const User = mongoose.model('User');

/**
 * signs  a new token
 * 
 * @param {any} payload
 * @param {any} options
 * @returns
 */
function sign(payload, options) {
    return jwt.sign(payload, secret, options);
}

/**
 *  verify existing token
 * 
 * @param {any} token
 * @returns
 */
function verify(token) {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        return null;
    }
}

/**
 * Protect find user by requiring authentication
 * 
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
async function protect(req, res, next) {
    if (req) {
        if (!req.headers.authorization) return res.status(401).json({ error: 'Missing authorization header' });
        
        const user = verify(req.headers.authorization);
        if (!user) return res.status(401).json({ error: 'Invalid authorization header' });
        
        req.current_user = await User.findOne({ _id: user._id })
            .select('-password -__v');
        
        next();
    }
}

module.exports = {
    sign: sign,
    verify: verify,
    protect: protect
};