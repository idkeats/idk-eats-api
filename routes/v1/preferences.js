import Router from 'express';
const router = Router();

import * as PreferenceController from '../../controllers/preference';

router.route('/')
    .get(PreferenceController.getAllPreferences)
    .post(PreferenceController.createPreferences);

router.route('/:id')
    .get(PreferenceController.getPreference)
    .put(PreferenceController.updatePreference)
    .delete(PreferenceController.deletePreference);

router.route('/user/:userId')
    .get(PreferenceController.getUserPreferences);

export default router;