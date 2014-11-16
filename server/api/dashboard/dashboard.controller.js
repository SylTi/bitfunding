'use strict';
/*jshint undef:false*/

var _ = require('lodash');
var Project = require('../project/project.model');
var User = require('../user/user.model');


// Get list of dashboards
// Uses a Map to retrieve the contributions of an user.
// Along with project datas.
// No reduce needed.

exports.index = function(req, res) {
  var o = {};
  o.jsMode = true;
  o.scope = {user_id : req.user._id};
  o.query = { 'contributors': {$elemMatch: {contribId: req.user._id}} };
  o.map = function () {
    var contribs = [];
    for(var i = 0; i < this.contributors.length; i++) {
      if (this.contributors[i].contribId.toString() === user_id.toString())
        contribs.push(this.contributors[i].amount);
    }
    var projects = {
      name : this.name,
      amountRaised : this.amountRaised,
      amountToRaise : this.amountToRaise,
      contributors : this.contributors,
      contributions : contribs,
      slug: this.slug
    };
    emit(this._id, projects);
  }
  Project.mapReduce(o, function (err, results) {
    res.json(200, results);
  });
};
