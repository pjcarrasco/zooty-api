const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values: [
        'ADMIN ROLE',
        'USER_ROLE'
    ],
    message: '[VALUE] no es un role valido'
}

const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        unique: true,
        required: [true, 'Es necesario incluir el nombre de usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Es necesario incluir el email del usuario']
    },
    password: {
        type: String,
        required: [true, 'Es necesario introducir un password']
    },
    nombre: {
        type: String
    },
    apellidos: {
        type: String
    },
    ciudad: {
        type: String
    },
    fecha_nacimiento: {
        type: String
    },
    sexo: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: roles
    }
});
usuarioSchema.plugin(uniqueValidator, {message: 'El valor de [PATH] debe ser unico'});
module.exports = mongoose.model('usuario', usuarioSchema);
