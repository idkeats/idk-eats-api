import Router from 'express';
import passport from 'passport';
import * as jwt from '../../modules/jwt';
import * as _ from 'lodash';
const router = Router();

router.route('/login')
    .post(passport.authenticate('local', {session: false}), (req, res, next) => {
        return res.status(200).json({
            token: jwt.sign(_.omit(req.user.toJSON(), 'password', '__v'), process.env.secret, {expiresIn: '24h'})
        });
    });

router.route('/logout')
    .post(passport.authenticate('local', {session: false}), (req, res, next) => {
        req.logout();
        return res.status(200).json({
            message: 'Come back soon'
        });
    });

export default router;