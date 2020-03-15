'use strict'
const eventoModel = require('../models/evento.model');

function nuevoEvento(req, res){
    let evento = new eventoModel({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        location: req.body.location,
        usuarioAlta: req.usuario
    });
    evento.save((error, saved) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error en la insercion de los datos',
                errors: error
            });
        }else{
            res.status(200).send({
                ok: true,
                message: 'Datos insertados correctamente'
            });
        }
    });
}

function modificarEvento(req, res){
    eventoModel.updateOne({_id: req.body._id, usuarioAlta: req.usuario}, req.body.alerta, (error, modified) =>{
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

function consultarEventos(req, res){
    eventoModel.find({
        location: {
            $near: {
                $maxDistance: req.params.dist,
                $geometry: {
                    type: "Point",
                    coordinates: [req.params.lat, req.params.lng]
                }
            }
        }
    }, (error, list) => {
        if (error) {
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error en la consulta',
                errors: error
            });
        } else {
            res.status(200).send({
                ok: true,
                alertas: list
            });
        }
    });
}

function eliminarEvento(req, res){
    eventoModel.deleteOne({_id: req.body._id, usuarioAlta: req.usuario}, (error, deleted) =>{
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



module.exports = {
    nuevoEvento,
    modificarEvento,
    consultarEventos,
    eliminarEvento
}