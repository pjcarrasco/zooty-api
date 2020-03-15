const mongoose = require('mongoose');

const estados = {
    values: [
        'ABIERTA',
        'RESUELTA',
    ],
    message: '[VALUE] no es un estado valido'
}

var alertaSchema = new mongoose.Schema({
    titulo: { 
        type: String,
        required: [true, 'EL campo titulo es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'EL campo descripción es obligatorio']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    estado: {
        type: String,
        default: 'ABIERTA',
        enum: estados
    },
    usuarioAlta: {
        type: mongoose.Schema.ObjectId,
        ref: 'usuario'
    },
    fechaAlta: {
        type: Date,
        default: new Date
    }
});

alertaSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('alerta', alertaSchema);
