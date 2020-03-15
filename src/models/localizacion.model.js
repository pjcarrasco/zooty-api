const mongoose = require('mongoose');

var localizacionSchema = new mongoose.Schema({
    nombre: { 
        type: String,
        required: [true, 'EL campo nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'EL campo descripción es obligatorio']
    },
    image: {
        type: String
    },
    tipo: {
        type: mongoose.Schema.ObjectId,
        ref: 'tiposLugar',
        required: true
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
    puntuacion: {
        type: Number
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

localizacionSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('localizacion', localizacionSchema);
