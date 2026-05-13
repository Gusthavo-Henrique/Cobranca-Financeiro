const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('../.env');


const sequelize = new Sequelize(
    db.database,
    db.user,
    db.pass,
    {
        host: db.host,
        dialect: db.dialect,
        logging: false
    }
);

var models = {}
models.Envio = require('../models/Envio')(sequelize, DataTypes)



//  sequelize.sync({force:true})


module.exports = { models }