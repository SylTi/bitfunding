'use strict';

var express = require('express');
var controller = require('./project.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


router.get('/', controller.index);
router.get('/my/projects', auth.isAuthenticated(), controller.myProjects);
router.get('/:name', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/:name/contrib', auth.isAuthenticated(), controller.contribute);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.put('/:name/returnFunds', auth.hasRole('admin'), controller.returnFunds);

module.exports = router;
