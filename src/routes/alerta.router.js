'use strict'
var express = require('express');
var alertaRouter = express();
const auth = require('../services/auth.service');
const alertaController = require('../controllers/alerta.controller');

alertaRouter.post('/', auth.validarToken, alertaController.nuevaAlerta);
alertaRouter.get('/', auth.validarToken, alertaController.consultarAlertas);
alertaRouter.put('/', auth.validarToken, alertaController.modificarAlerta);

module.exports = alertaRouter;