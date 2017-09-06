import Router from 'express';
import * as jwt from '../../modules/jwt';
const router = Router();

import * as UserController from '../../controllers/user';

router.route('/')
    .get(UserController.getAllUsers)
    .post(UserController.createUser);

router.route('/:id')
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);

export default router;