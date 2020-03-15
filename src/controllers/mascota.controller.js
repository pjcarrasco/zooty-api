'use strict'
const mascotaModel = require('../models/mascota.model');

function nuevaMascota(req, res){
    let mascota = new mascotaModel({
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        especie: req.body.especie,
        raza: req.body.raza,
        fecha_nacimiento: req.body.fecha_nacimiento,
        comentarios: req.body.comentarios
    });
    mascota.save((error, saved) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error en el registro de tu mascota',
                errors: error
            });
        }else{
            res.status(200).send({
                ok: true,
                message: 'Datos de la mascota insertados correctamente'
            });
        }
    });
}

function modificarMascota(req, res){
    mascotaModel.updateOne({_id: req.body._id}, req.body.mascota, (error, modified) =>{
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

function eliminarMascota(req, res){
    mascotaModel.deleteOne({_id: req.params.id}, (error, deleted) =>{
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error al eliminar los datos',
                errors: error
            });
        }else{
            res.status(200).send({
                ok: true,
                message: 'Datos eliminados correctamente'
            });
        }
    });
}

function mascotasPorUsuario(req, res){
    mascotaModel.find({usuario: req.params.id}, (error, mascotas) => {
        if(error){
            res.status(500).send({
                ok: false,
                message: 'Se ha producido un error al consultar las mascotas',
            });
        }else{
            res.status(200).send({
                ok: true,
                mascotas: mascotas
            });
        }
    });
}


module.exports = {
    nuevaMascota,
    modificarMascota,
    eliminarMascota,
    mascotasPorUsuario
}