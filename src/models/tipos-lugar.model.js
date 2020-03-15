const mongoose = require('mongoose');

const tiposLugarSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Es necesario introducir el nombre']
    },
    descripcion: {
        type: String,
    },
});

module.exports = mongoose.model('tiposLugar', tiposLugarSchema);
