'use strict';
const mongoose = require('mongoose'),
    fs = require('fs'),
    _ = require('lodash');

const models = () => _.without(fs.readdirSync('./models'), _.last(__filename.split('/')));

module.exports = {
    init: () => {
        // let opts = {
        //   replset:{
        //     readPreference:'PRIMARY',
        //     "w": "majority"
        //   }
        // };

        if (process.env.NODE_ENV == 'development') {
            mongoose.set('debug', true);
        }

        mongoose.connect(process.env.MONGO_URI);

        let db = mongoose.connection,
            m = models();

        db.on('error', console.error.bind(console, 'Error connecting to mongodb: '));
        db.once('open', console.log.bind(console, 'Database connected.'));

        m.forEach(model => {
            require(`./${model}`);
        });

        mongoose.Promise = require('bluebird').Promise;
    }
};