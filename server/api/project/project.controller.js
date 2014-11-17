'use strict';

/*jshint eqnull:true*/

var _ = require('lodash');
var Project = require('./project.model');
var User = require('../user/user.model');
var bitcoin = require('bitcoin-address');
var helper = require('./project.helper');
//var UserC = require('../user/user.controller');


// Get list of projects
exports.index = function(req, res) {

  // Featured projects
  if (req.query.hasOwnProperty('type') && req.query.type === 'featured')
    Project.find().sort({amountRaised : -1}).limit(3).exec(function (err, projects) {
      if(err) { return handleError(res, err); }
      return res.json(200, projects);
    });
  else
    Project.find(function (err, projects) {
      if(err) { return handleError(res, err); }
      return res.json(200, projects);
    });
};

// Get logged user projects
exports.myProjects = function(req, res) {
  Project.find({Owner: req.user.name}).exec(function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.json(200, projects);
  });
};

// Get given user name projects
exports.userProjects = function(req, res) {
  Project.find({Owner: req.params.name}).exec(function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.json(200, projects);
  });
};


// Get a single project
exports.show = function(req, res) {
  Project.findOne({slug: req.params.name}).lean().exec(function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    // Attach user datas
    User.findOne({name: project.Owner}, function(err_user, user) {
      if (err || err_user) return res.redirect('/projects');
      if (!project || !user) return res.json(401);
      project.OwnerDatas = {
        name : (user.name || ""),
        email : (user.email || ""),
        role : (user.role || "")
      };
      res.json(200, project);
    });
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  var datas = req.body;
  datas.amountRaised = 0;
  datas.contributors = [];
  console.log(datas.dateEndCampaign);
  console.log(Date(datas.dateEndCampaign));
  //datas.dateEndCampaign = new Date(datas.dateEndCampaign);
  datas.dateCreat = new Date();
  datas.amountToRaise *= 100000000;
  if (datas.name === 'search')
    return res.json(500, {reason: 'Forbidden name'});
  Project.findOne({name: datas.name}, function (err_existing, existing) {
    if (err_existing) { return res.json(500) }
    if (existing != null)
      return res.json(500, {reason:'Existing project with this name.'});
    else
      if(!bitcoin.validate(datas.OwnerBTCKey))
        res.json(500, {reason:'Invalid Bitcoin Address'});
      else
        Project.create(datas, function(err, project) {
          if (err) { res.json(500, {reason:'Missing parameters.'}); }
          if (!project)
            return handleError(res, err);
          return res.json(201, project);
      });
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  console.log(req.body);
 // if(req.body._id) { delete req.body._id; }
  Project.findById(req.body.project._id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    //var updated = _.merge(project, req.body);
    if ((req.body.user.role !== 'admin') && (req.body.user.name !== project.Owner))
      return res.send(550);
    project.description = req.body.project.description;
    project.dateEndCampaign = req.body.project.dateEndCampaign;
    project.amountToRaise = req.body.project.amountToRaise;
    if(!bitcoin.validate(req.body.project.OwnerBTCKey))
      res.json(500, 'Invalid Bitcoin Address');
    else
      project.OwnerBTCKey = req.body.project.OwnerBTCKey;

    project.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { console.log("find error : "+ err);return handleError(res, err); }
    if(!project) { console.log("project error  ");return res.send(404); }
    project.remove(function(err) {
      if(err) { console.log('==================='); console.log(err); return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}


exports.contribute = function(req, res)
{
  var toContrib = Number(req.body.amount);
  var nameProj = req.params.name;//.replace("%20", " ");

  User.findById(req.body.userId, function (err, user)
  {
    if (err || !user)
      return handleError(res, err);
    if (toContrib <= 0.0)
      return handleError(res, 'Bad amount');
    if (toContrib <= user.balance)
    {
      user.balance -= toContrib;
      user.save(function (err)
        {
          if (err)
            return handleError(res, err);
          Project.findOne({slug: nameProj}, function (err, project)
          {
            if (err)
              return handleError(res, err);
            if (!project)
              return handleError(res, err);
            project.amountRaised += toContrib;
            project.contributors.push({contribId: user._id, amount: toContrib});
            project.save(function (err)
              {
                if (err)
                  return handleError(res, err);
                return res.json(200, project);
              });
          });
        });
    }
    else
    {
      return handleError(res, 'Amout > Balance');
    }
  });
};

exports.returnFunds = function(req, res)
{
  //TODO : check if project date is passed or do nothing ?

  var name = req.params.name;
  Project.findOne({slug: name}, function (err, project)
  {
    if (err || !project)
      return handleError(res, err);
    helper.hReturnFunds(project, res, true);
  });
};

exports.search = function(req, res)
{
  var value = req.params.name;
  var re = new RegExp(value, 'i');

  Project.find()
  .or([{
    'name': { $regex: re }},
    { 'description': { $regex: re }
  }])
  .sort('name')
  .exec(function(err, projects) {
    if (err || !projects)
      return handleError(res, err);
    res.json(200, projects);
  });
};
