const { Router } = require('express');
const AggregateController = require('./aggregate.controller');

const router = Router();

router.post('/user', AggregateController.createNewUser);

router.post('/film', AggregateController.createNewFilm);

router.post('/program', AggregateController.createNewProgram);

router.get('/aggregate', AggregateController.getAggregateProgram);

router.get('/populate', AggregateController.getPopulateProgram);

router.get('/test', (req, res, next) => res.send('ok'));

module.exports = router;
