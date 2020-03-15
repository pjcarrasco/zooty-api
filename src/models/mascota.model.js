const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.ObjectId,
        ref: 'usuario',
        required: true
    },
    nombre: {
        type: String,
        required: [true, 'Es necesario introducir el nombre']
    },
    especie: {
        type: String,
        required: [true, 'Es necesario incluir la especie de tu mascota']
    },
    raza: {
        type: String,
    },
    fecha_nacimiento: {
        type: String,
    },
    comentarios: {
        type: String,
    },
});

module.exports = mongoose.model('mascota', mascotaSchema);
