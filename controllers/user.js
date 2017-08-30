import mongoose from 'mongoose';
import * as _ from 'lodash';

const User = mongoose.model('User');

module.exports = {
    getAllUsers: (req, res) => {
        User.find({})
            .then((users) => res.status(200).json(users))
            .catch((error) => res.status(500).json(error));
    },

    createUser: (req, res) => {
        const newUser = new User(req.body);
        newUser.save()
            .then((user) => res.status(200).json(user))
            .catch((error) => res.status(400).json(error));
    },

    getUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .then((user) => res.status(200).json(user))
            .catch((error) => res.status(404).json(error));
    },

    updateUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .then((user) => {
                _.merge(user, req.body);
                user.save()
                    .then((updatedUser) => res.status(200).json(updatedUser))
                    .catch((error) => res.status(500).json(error));
            })
            .catch((error) => res.status(404).json(error));
    }
}