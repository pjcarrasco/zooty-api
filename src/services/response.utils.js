'use strict'

function locationResponseData(locations){
    return locations.map(location => {
        return {
            _id: location._id,
            nombre: location.nombre,
            descripcion: location.descripcion,
            tipo: location.tipo,
            image: location.image,
            positivo: location.comentarios.filter(x=> x.puntuacion == 1).length,
            negativo: location.comentarios.filter(x=> x.puntuacion == 0).length,
            location: location.location,
            distance: location.distance
        }
    });
}

module.exports = {
    locationResponseData
}