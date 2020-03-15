const mongoose = require('mongoose');

var comentariosLocalSchema = new mongoose.Schema({
    localizacion: {
        type: mongoose.Schema.ObjectId,
        ref: 'localizacion',
        required: true
    },
    usuario: {
        type: mongoose.Schema.ObjectId,
        ref: 'usuario',
        required: true
    },
    comentario: {
        type: String,
        required: [true, 'EL campo nombre es obligatorio']
    },
    puntuacion: {
        type: Number
    },
    fecha: {
        type: Date,
        default: new Date
    }
});

module.exports = mongoose.model('localizacionComentario', comentariosLocalSchema);
