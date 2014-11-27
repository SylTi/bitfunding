'use strict';

var _ = require('lodash');
var Refund = require('./refund.model');
var bitcoin = require('bitcoin-address');
var User = require('../user/user.model');

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
exports.create = function(req, res)
{
  if(!bitcoin.validate(req.body.addrBTC))
        res.json(500, {reason:'Invalid Bitcoin Address'});

  var minus = (req.user.balance * process.env.FEE_WITHDRAW) / 100;
  var obj = {
    userId: req.user._id,
    addrBTC: req.body.addrBTC,
    beforeBalance: req.user.balance,
    returnedAmount: req.user.balance - minus
  };

  Refund.create(obj, function(err, refund) {
    if(err) { return handleError(res, err); }
    req.user.balance = 0;
    req.user.save(function (err)
    {
      if (err)
        return handleError(res, err);
      return res.json(201, refund);
    });

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

exports.accepted = function(req, res)
{
  console.log('WHY THE FUCK I AM HERE ???');
  Refund.findById(req.params.id, function (err, refund)
  {
    if (err || !refund)
    {
      return res.send(404);
    }
    refund.accepted = true;
    refund.active = false;
    refund.save(function (err)
    {
      if(err)
      {
        return handleError(res, err);
      }
      res.json(200, refund);
    });
  });
};

exports.refused = function(req, res)
{
  console.log('fuck this shit !!!');
  Refund.findById(req.params.id, function (err, refund)
  {
    if (err || !refund)
    {
      return res.send(404);
    }
    refund.accepted = false;
    refund.active = false;
    refund.save(function (err)
    {
      if(err)
      {
        return handleError(res, err);
      }
      User.findById(refund.userId, function (err, user)
      {
        if (err || !user)
        {
          return res.json(404, err);
        }
        user.balance = refund.beforeBalance;
        user.save(function (err)
        {
          if (err)
          {
            return handleError(res, err);
          }
          console.log(refund);
          console.log(user);
          res.json(200, refund);
        });
      });
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
