const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Autor = require('./Autor.js');

const Livro = db.define('livros', {
    livro_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    data_publicacao: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: null
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: null
    }
},
{
    timestamps: false
});

Livro.belongsTo(Autor, {
    as: 'autores',
    foreignKey: 'autor_id'
});
Autor.hasMany(Livro, {
    foreignKey: 'autor_id'
});

module.exports = Livro;