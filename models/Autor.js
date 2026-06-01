const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Autor = db.define('autores', {
    autor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
},
{
    timestamps: false
});

module.exports = Autor;