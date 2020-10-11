const { Router } = require('express');
const filmController = require('./films.controller');

const router = Router();

router.get('/', filmController.getFilms);

module.exports = router;
