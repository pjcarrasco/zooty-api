'use strict'
const express = require('express');
const usuarioRouter = require('./usuario.router');
const mascotaRouter = require('./mascota.router');
const localizacionRouter = require('./localizacion.router');
const alertaRouter = require('./alerta.router');
const eventoRouter = require('./evento.router');
const comentrarioRouter = require('./comentario-local.router');

const appRouter = express();

appRouter.use('/usuario', usuarioRouter);
appRouter.use('/mascota', mascotaRouter);
appRouter.use('/localizacion', localizacionRouter);
appRouter.use('/comentario', comentrarioRouter);
appRouter.use('/alerta', alertaRouter);
appRouter.use('/evento', eventoRouter);


module.exports = appRouter;