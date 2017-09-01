import Router from 'express';
import * as jwt from '../../modules/jwt';
const router = Router();

router.route('/')
    .post((req, res, next) => {
        res.status(200).json({
            token: jwt.sign(req.body, process.env.secret, {expiresIn: '24h'})
        });
    });

router.route('/verify')
    .post((req, res, next) => {
        res.status(200).json({
            token: jwt.verify(req.body.token)
        });
    });

export default router;