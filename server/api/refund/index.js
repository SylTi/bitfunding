'use strict';

var express = require('express');
var controller = require('./refund.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
//router.put('/:id', auth.hasRole('admin'), controller.update);
router.put('/:id/accepted', auth.hasRole('admin'), controller.accepted);
router.put('/:id/refused', auth.hasRole('admin'), controller.refused);

module.exports = router;
