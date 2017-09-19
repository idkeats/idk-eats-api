import mongoose from 'mongoose';
import * as _ from 'lodash';
import * as helper from '../modules/mongoose-helpers';

const Preference = mongoose.model('Preference');

module.exports = {
    getAllPreferences: (req, res, next) => {
        helper.find(Preference, {select: '-__v'}, next)
            .then((preferences) => res.status(200).json(preferences));
    },

    createPreferences: (req, res, next) => {
        helper.save(new Preference(req.body), next)
            .then((preference) => res.status(200).json(preference));
    },

    getPreference: (req, res, next) => {
        helper.findOne(Preference, {query: {_id: req.params.id}, select: '-__v'}, next)
            .then((preference) => res.status(200).json(preference));
    },

    updatePreference: (req, res, next) => {
        helper.findOne(Preference, {query: {_id: req.params.id}, select: '-__v'}, next)
            .then((preference) => {
                _.merge(preference, req.body);
                helper.save(preference, next)
                    .then((updatedPreference) => res.status(200).json(updatedPreference));
            });
    },

    deletePreference: (req, res, next) => {
        helper.remove(Preference, {query: {_id: req.params.id}}, next)
            .then((resp) => res.status(200).json({message: 'Successful Delete'}));
    }
}