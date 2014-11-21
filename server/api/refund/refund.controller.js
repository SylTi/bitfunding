'use strict';

var _ = require('lodash');
var Refund = require('./refund.model');

// Get list of refunds
exports.index = function(req, res) {
  Refund.find(function (err, refunds) {
    if(err) { return handleError(res, err); }
    return res.json(200, refunds);
  });
};

// Get a single refund
exports.show = function(req, res) {
  Refund.findById(req.params.id, function (err, refund) {
    if(err) { return handleError(res, err); }
    if(!refund) { return res.send(404); }
    return res.json(refund);
  });
};

// Creates a new refund in the DB.
exports.create = function(req, res) {
  Refund.create(req.body, function(err, refund) {
    if(err) { return handleError(res, err); }
    return res.json(201, refund);
  });
};

// Updates an existing refund in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Refund.findById(req.params.id, function (err, refund) {
    if (err) { return handleError(res, err); }
    if(!refund) { return res.send(404); }
    var updated = _.merge(refund, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, refund);
    });
  });
};

// // Deletes a refund from the DB.
// exports.destroy = function(req, res) {
//   Refund.findById(req.params.id, function (err, refund) {
//     if(err) { return handleError(res, err); }
//     if(!refund) { return res.send(404); }
//     refund.remove(function(err) {
//       if(err) { return handleError(res, err); }
//       return res.send(204);
//     });
//   });
// };

function handleError(res, err) {
  return res.send(500, err);
}
