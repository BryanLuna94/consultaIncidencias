const config = require('../../config');

// Cargar enrutamiento
const routeIndex = require('./index');

const routePersonalizacion = require('./personalizacion');

module.exports = (app) => {
    app.use('/', routeIndex);
    app.use(config.app.endpoint.personalizacion, routePersonalizacion);
};