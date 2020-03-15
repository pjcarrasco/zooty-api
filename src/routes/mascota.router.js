'use strict'
var express = require('express');
var mascotaRouter = express();
const auth = require('../services/auth.service');
const mascotaController = require('../controllers/mascota.controller');

mascotaRouter.post('/', auth.validarToken, mascotaController.nuevaMascota);
mascotaRouter.put('/', auth.validarToken, mascotaController.modificarMascota);
mascotaRouter.delete('/:id', auth.validarToken, mascotaController.eliminarMascota);
mascotaRouter.get('/:id', auth.validarToken, mascotaController.mascotasPorUsuario);

module.exports = mascotaRouter;