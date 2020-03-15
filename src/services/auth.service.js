'use strict'
const jwt = require('jsonwebtoken');
const SEED = require('../config/app.config').getSeed();

function crearToken(usuario){
    return jwt.sign({ usuario: usuario }, SEED, { expiresIn: "30 days" });
}

function validarToken(req, res, next) {
    let token = req.headers.authorization;
    jwt.verify(token, SEED, (error, decoded) => {
        if (error) {
            res.status(401).send({
                ok: false,
                message: 'Usuario no autorizado'
            })
        } else {
            req.usuario = decoded.usuario._id;
            next();
        }
    })
}

module.exports={
    crearToken,
    validarToken
}