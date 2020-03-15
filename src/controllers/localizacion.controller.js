'use strict'
const localizacionModel = require('../models/localizacion.model');
const responseUtils = require('../services/response.utils');

function nuevaLocalizacion(req, res){
    let localizacion = new localizacionModel({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        image: req.body.image || '',
        tipo: req.body.tipo,
        location: req.body.location,
        puntuacion: req.body.puntuacion || null,
        usuarioAlta: req.usuario,
        fechaAlta: new Date()
    });
    localizacion.save((error, saved) => {
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

function consultaLocalizaciones(req, res){

    localizacionModel.aggregate([
        {
          $geoNear: {
             near: { type: "Point", coordinates: [ parseFloat(req.params.lat), parseFloat(req.params.lng) ] },
             distanceField: "distance",
             maxDistance: parseFloat(req.params.distancia),
          }
        },
        {
            $lookup:{
                 from: "localizacioncomentarios",
                 localField: "_id",
                 foreignField: "localizacion",
                 as: "comentarios"
             }
         }
     ]).exec((error, list) => {
        if (error) {
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error en la consulta',
                errors: error
            });
        } else {
            res.status(200).send({
                ok: true,
                localizaciones: responseUtils.locationResponseData(list)
            });
        }
    })




    /*localizacionModel.find({
        location: {
            $near: {
                $maxDistance: req.params.distancia,
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
                localizaciones: list
            });
        }
    });*/
}

function consultaDatosLocalizacion(req, res){
    localizacionModel.findById(req.params.id, (error, localizacion) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error en la consulta',
            });
        }else{
            res.status(200).send({
                ok: true,
                mascotas: localizacion
            });
        }
    });
}

function modificarLocalizacion(req, res){
    mascotaModel.updateOne({_id: req.body._id, usuarioAlta: req.usuario}, req.body.localizacion, (error, modified) =>{
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
    nuevaLocalizacion,
    consultaLocalizaciones,
    consultaDatosLocalizacion,
    modificarLocalizacion
}