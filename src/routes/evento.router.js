'use strict'
var express = require('express');
var eventoRouter = express();
const auth = require('../services/auth.service');
const eventoController = require('../controllers/evento.controller');

eventoRouter.post('/', auth.validarToken, eventoController.nuevoEvento);
eventoRouter.post('/', auth.validarToken, eventoController.consultarEventos);
eventoRouter.put('/', auth.validarToken, eventoController.modificarEvento);
eventoRouter.delete('/:id', auth.validarToken, eventoController.eliminarEvento);

module.exports = eventoRouter;