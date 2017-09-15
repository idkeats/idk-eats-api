import mongoose from 'mongoose';
import * as _ from 'lodash';
import rando from 'randomatic';
import bcrypt from 'bcrypt';
import * as helper from '../modules/mongoose-helpers';

const User = mongoose.model('User');

module.exports = {
    getAllUsers: (req, res, next) => {
        helper.find(User, {query: {isActive: true}, populate: null, select: '-password -__v'}, next)
            .then((data) => res.status(200).json(data));
    },

    createUser: (req, res, next) => {
        const newUser = new User(req.body);

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                newUser.password = hash;

                helper.save(newUser, next)
                    .then((user) => res.status(200).json(user));
            });
        });
    },

    getUser: (req, res, next) => {
        helper.find(User, {query: {_id: req.params.id, isActive: true}, select: '-password -__v', limit: 1}, next)
            .then((data) => res.status(200).json(data[0]));
    },

    updateUser: (req, res, next) => {
        helper.find(User, {query: {_id: req.params.id}, select: '-password -__v', limit: 1}, next)
            .then((user) => {
                _.merge(user[0], req.body);                
                helper.save(user[0], next)
                    .then((updatedUser) => res.status(200).json(updatedUser));
            });
    },

    deleteUser: (req, res, next) => {
        helper.find(User, {query: {_id: req.params.id}, select: '-password -__v', limit: 1}, next)
            .then((user) => {
                user[0].isActive = false;
                helper.save(user[0])
                    .then((updatedUser) => res.status(200).json(updatedUser));
            });
    },

    updateAllUsersForDev: (req, res, next) => {
        if (process.env.NODE_ENV === 'development') {
            helper.find(User, {query: {isActive: true}}, next)
                .then((users) => {
                    users.forEach((user) => {
                        if (!user.password) {
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(rando('*', 15), salt, (err, hash) => {
                                    user.password = hash;

                                    helper.save(user)
                                        .then((resp) => {});
                                })
                            });
                        }
                    });
                    res.status(200).json({message: 'Successful Update'});
                });
        } else res.status(404).json({message: 'Invalid endpoint'});
    }
}