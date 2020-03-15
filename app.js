'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const appConfig = require('./src/config/app.config').config();

const appRouter = require('./src/routes/app.router');

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/', appRouter);

app.listen(appConfig.PORT, function() {
    console.log("Node server iniciado en puerto " + appConfig.PORT);
});