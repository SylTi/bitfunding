'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var http = require('http'); //for blockchain

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';

  // BTC powered by blockchain.info
  var secret = process.env.SECRET_KEY;
  var callback_url = encodeURIComponent('http://'+process.env.MY_SITE+'/users/'+newUser._id+'/receiveDeposit?secret='+secret);
  var url =  'http://blockchain.info/api/receive?method=create&address='+process.env.BTC_ADDR+'&callback='+callback_url+'&api_code='+process.env.BLOCKCHAIN_API+'&test=1';

  http.get(url, function(result)
  {
    if(result.statusCode === 200)
    {
      //console.log(result);
      result.on("data", function(chunk)
      {
        var obj = JSON.parse(chunk);
        console.log(obj);
        newUser.bitcoinAddr = obj.input_address;
        newUser.save(function(err, user)
        {
          if (err) return validationError(res, err);
          var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
          res.json({ token: token });
        });
      });

    }
    else if (result.statusCode === 500)
    {

    }
    //console.log("Got response: " + res.statusCode);
  }).on('error', function(e) { return validationError(res, e);});


};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.receiveDeposit = function(req, res, next)
{

  res.send("*ok*");
};
