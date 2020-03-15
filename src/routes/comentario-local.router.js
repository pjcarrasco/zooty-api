'use strict'
var express = require('express');
var comentariolocalRouter = express();
const auth = require('../services/auth.service');
const comentarioLocalController = require('../controllers/comentario-local.controller');

comentariolocalRouter.post('/',
    auth.validarToken,
    comentarioLocalController.nuevoComentario,
    comentarioLocalController.consultaCantidadPuntuacion,
    comentarioLocalController.consultaComentariosLocalizacion
);
comentariolocalRouter.post('/cantidad', auth.validarToken, comentarioLocalController.consultaCantidadPuntuacion);
comentariolocalRouter.post('/list', auth.validarToken, comentarioLocalController.consultaComentariosLocalizacion);
comentariolocalRouter.put('/', auth.validarToken, comentarioLocalController.modificacionComentario);
comentariolocalRouter.delete('/:id', auth.validarToken, comentarioLocalController.eliminarComentario);

module.exports = comentariolocalRouter;