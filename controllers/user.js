import mongoose from 'mongoose';
import * as _ from 'lodash';
import rando from 'randomatic';
import bcrypt from 'bcrypt';

const User = mongoose.model('User');

module.exports = {
    getAllUsers: (req, res) => {
        User.find({isActive: true})
            .select('-password -__v')
            .then((users) => res.status(200).json(users))
            .catch((error) => res.status(500).json(error));
    },

    createUser: (req, res) => {
        const newUser = new User(req.body);

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                newUser.password = hash;

                newUser.save()
                    .then((user) => res.status(200).json(_.omit(user.toJSON(), 'password', '__v')))
                    .catch((error) => res.status(400).json(error));
            });
        });
    },

    getUser: (req, res) => {
        User.findOne({_id: req.params.id, isActive: true})
            .select('-password -__v')
            .then((user) => res.status(200).json(user))
            .catch((error) => res.status(404).json(error));
    },

    updateUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .select('-password -__v')
            .then((user) => {
                _.merge(user, req.body);
                user.save()
                    .then((updatedUser) => res.status(200).json(updatedUser))
                    .catch((error) => res.status(500).json(error));
            })
            .catch((error) => res.status(404).json(error));
    },

    deleteUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .select('-password -__v')
            .then((user) => {
                user.isActive = false;
                user.save()
                    .then((deletedUser) => res.status(200).json(deletedUser))
                    .catch((error) => res.status(500).json(error));
            })
            .catch((error) => res.status(404).json(error));
    },

    updateAllUsersForDev: (req, res) => {
        if (process.env.NODE_ENV === 'development') {
            User.find({})
                .then((users) => {
                    users.forEach((user) => {
                        if (!user.password) {
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(rando('*', 15), salt, (err, hash) => {
                                    user.password = hash;
                                    user.save();
                                });
                            });
                        }
                    });
                    res.status(200).json({message: 'Successful Update'});
                });
        } else res.status(404).json({message: 'Invalid endpoint'});
    }
}