module.exports = (sequelize, DataTypes) => {

    const Envio = sequelize.define('Envio', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.TEXT,

        },
        mensagem: {
            type: DataTypes.TEXT
        },

        situacao: {
            type: DataTypes.STRING
        },
    }, {});

    return Envio;
}