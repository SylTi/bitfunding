'use strict';

var express = require('express');
var controller = require('./project.controller');

var router = express.Router();


router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.post('/:name/contrib', controller.contribute);
//router.get('/:name/contrib/:amount', controller.contribute);


module.exports = router;