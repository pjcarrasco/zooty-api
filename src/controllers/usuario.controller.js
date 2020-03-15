'use strict'
const usuarioModel = require('../models/usuario.model');
const auth = require('../services/auth.service');
const bcrypt = require('bcrypt');

function registroUsuario(req, res){
    let usuario = new usuarioModel({
        usuario: req.body.usuario,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    usuario.save((error, saved) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error en el registro de usuario',
                errors: error
            });
        }else{
            res.status(200).send({
                ok: true,
                message: 'Usuario registrado correctamente',
                token: auth.crearToken(usuario)
            });
        }
    });
}

function login(req, res){
    usuarioModel.findOne({email: req.body.email}, (error, usuario) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Datos de usuario o contraseña incorrectos'
            });
        }else{
            if(!usuario || !bcrypt.compareSync(req.body.password, usuario.password)){
                res.status(500).send({
                    ok: false,
                    message: 'Datos de usuario o contraseña incorrectos'
                });
            }else{
                res.status(200).send({
                    ok: true,
                    token: auth.crearToken(usuario)
                })
            }
        }
    });

}

function modificacionUsuario(req, res){
    usuarioModel.updateOne({_id: req.body._id}, req.body.usuario, (error, modified) =>{
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error al modificar el usuario',
                errors: error
            });
        }else{
            res.status(200).send({
                ok: true,
                message: 'Usuario modificado correctamente'
            });
        }
    });
}

function consultaDatosUsuario(req, res){
    usuarioModel.findById(req.params.idUsuario, (error, usuario) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error al consultar el usuario',
            });
        }else if(!usuario){
            res.status(500).send({
                ok: false,
                message: 'Usuario no enciontrado',
            });
        }else{
            res.status(200).send({
                ok: true,
                usuario: usuario
            });
        }
    })
}


module.exports = {
    registroUsuario,
    login,
    modificacionUsuario,
    consultaDatosUsuario
}