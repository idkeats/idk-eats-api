import { express, Router } from 'express';
import fs from 'fs';

const v1Routes = fs.readdirSync(__dirname + '/v1');

export default function routes(app) {
  v1Routes.forEach((resource) => {
    if (resource.substr(resource.lastIndexOf('.') + 1) !== 'js') return;
    const resourceName = resource.split('.')[0];

    // Routes
    app.use(`/api/v1/${resourceName}`, require(`./v1/${resource}`).default);
  });
};