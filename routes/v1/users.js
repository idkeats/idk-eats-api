import Router from 'express';
const router = Router();

import * as UserController from '../../controllers/user';

router.route('/')
    .get(UserController.getAllUsers)
    .post(UserController.createUser);

router.route('/:id')
    .get(UserController.getUser)
    .put(UserController.updateUser);

export default router;