const express = require('express');
const router = express.Router();
const LivroController = require('../controller/LivroController.js');

router.get('/', LivroController.showAll);

module.exports = router;