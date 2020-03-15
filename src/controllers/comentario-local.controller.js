'use strict'
const mongoose = require('mongoose');
const comentarioModel = require('../models/comentarios-local.model');

function nuevoComentario(req, res, next){
    let comentario = new comentarioModel({
        localizacion: req.body.localizacion,
        usuario: req.usuario,
        comentario: req.body.itemComentario.comentario,
        puntuacion: req.body.itemComentario.puntuacion
    });
    comentario.save((error, saved) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error en la insercion de los datos',
                errors: error
            });
        }else{
            next();
        }
    });
}

function consultaCantidadPuntuacion(req, res, next){

    comentarioModel.aggregate(
        [
            { $match: { localizacion: mongoose.Types.ObjectId(req.body.localizacion)}},
            { $group: { _id: "$puntuacion", num : {$sum : 1}}}
        ],
    ).exec((error, list) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error en la insercion de los datos',
                errors: error
            });
        }else{
            if(req.body.consulta){
                req.listaCantidad = list;
                next();
            }else{
                res.status(200).send({
                    ok: true,
                    lista: list,
                    total: list.reduce((previo, actual) => {
                        return previo.num + actual.num;
                    })
                });
            }
        }
    });
}

function modificacionComentario(req, res){
    comentarioModel.updateOne({_id: req.body._id, usuario: req.usuario}, req.body.comentario, (error, modified) =>{
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error al modificar los datos',
                errors: error
            });
        }else{
            res.status(200).send({
                ok: true,
                message: 'Datos modificados correctamente'
            });
        }
    });
}

function consultaComentariosLocalizacion(req, res){
    let query = comentarioModel.find({localizacion: req.body.localizacion});
    query = query.populate('usuario', ['usuario']);
    query.sort({fecha: -1}).exec((error, comentarios) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error en la consulta',
            });
        }else{
            let result = {ok: true, comentarios: comentarios, total: comentarios? comentarios.length: 0};
            if(req.listaCantidad){
                result['lista'] = req.listaCantidad;
            }
            res.status(200).send(result);
        }
    });
}

function eliminarComentario(req, res){
    comentarioModel.deleteOne({_id: req.body._id, usuario: req.usuario}, (error, deleted) =>{
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error al eliminar el registro',
                errors: error
            });
        }else{
            res.status(200).send({
                ok: true,
                message: 'Registro borrado correctaente'
            });
        }
    });
}


module.exports = {
    nuevoComentario,
    modificacionComentario,
    consultaComentariosLocalizacion,
    eliminarComentario,
    consultaCantidadPuntuacion
}