'use strict'
var express = require('express');
var usuarioRouter = express();
const auth = require('../services/auth.service');
const usuarioController = require('../controllers/usuario.controller');

usuarioRouter.post('/', usuarioController.registroUsuario);
usuarioRouter.post('/login', usuarioController.login);
usuarioRouter.put('/', auth.validarToken, usuarioController.modificacionUsuario);
usuarioRouter.get('/:id', auth.validarToken, usuarioController.consultaDatosUsuario);

module.exports = usuarioRouter;