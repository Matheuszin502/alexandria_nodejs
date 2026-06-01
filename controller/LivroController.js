const Livro = require('../models/Livro.js');
const Autor = require('../models/Autor.js');

const { Op } = require('sequelize');

module.exports = class LivroController {
    static async showAll(req, res) {
        let search = '';
        if (req.query.search) {
            search = req.query.search
        }

        Livro.findAll({
            include: [{
                model: Autor,
                as: 'autores',
                attributes: ['nome']
            }],
            where: {
                titulo: { [Op.like]: `%${search}%` }
            }
        })
        .then((data) => {
            const livros = data.map((result) => result.get({ plain: true }));
            res.render('livros', { livros });
        })
        .catch((err) => console.log(err));
    }
}