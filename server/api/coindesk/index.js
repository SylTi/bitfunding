'use strict';

var express = require('express');
var controller = require('./coindesk.controller');

var router = express.Router();

router.get('/currentprice', controller.currentprice);

module.exports = router;
