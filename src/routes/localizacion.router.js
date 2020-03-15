'use strict'
var express = require('express');
var localizacionRouter = express();
const auth = require('../services/auth.service');
const localizacionController = require('../controllers/localizacion.controller');

localizacionRouter.post('/', auth.validarToken, localizacionController.nuevaLocalizacion);
localizacionRouter.get('/list/:lat/:lng/:distancia', 
    auth.validarToken, 
    localizacionController.consultaLocalizaciones
);
localizacionRouter.put('/', auth.validarToken, localizacionController.modificarLocalizacion);
localizacionRouter.get('/:id', auth.validarToken, localizacionController.consultaDatosLocalizacion);

module.exports = localizacionRouter;