const node_env = process.env.NODE_ENV || 'development';
const enviroment = require('./enviroment');
const mongoose = require('mongoose');

function config(){
    let envitoment = enviroment[node_env];
    dbConnect(envitoment);
    return envitoment;
}

function dbConnect(envitoment){
    mongoose.Promise = global.Promise;
    mongoose.connect(envitoment.BD_CONNECT,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err, res) => {
            if (err) throw err;
            else console.log('Conectado a BD');
        }
    );
}

function getSeed(){
    return enviroment.SEED;
}

module.exports = {
    config,
    getSeed
}