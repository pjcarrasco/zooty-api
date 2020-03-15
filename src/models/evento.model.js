const mongoose = require('mongoose');

var eventoSchema = new mongoose.Schema({
    titulo: { 
        type: String,
        required: [true, 'EL campo titulo es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'EL campo descripción es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
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
    usuarioAlta: {
        type: mongoose.Schema.ObjectId,
        ref: 'usuario'
    },
    fechaAlta: {
        type: Date,
        default: new Date
    }
});

eventoSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('evento', eventoSchema);
