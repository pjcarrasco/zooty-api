'use strict'
const alertaModel = require('../models/alerta.model');

function nuevaAlerta(req, res){
    let alerta = new alertaModel({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        location: req.body.location,
        usuarioAlta: req.usuario
    });
    alerta.save((error, saved) => {
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

function modificarAlerta(req, res){
    alertaModel.updateOne({_id: req.body._id, usuarioAlta: req.usuario}, req.body.alerta, (error, modified) =>{
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

function consultarAlertas(req, res){
    alertaModel.find({
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



module.exports = {
    nuevaAlerta,
    modificarAlerta,
    consultarAlertas
}