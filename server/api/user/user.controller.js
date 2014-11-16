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
  console.log()
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.balance = 0;

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
      return res.send(500);
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
 * Get a single user
 */
exports.getUserInfos = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, '-salt -hashedPassword', function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user);
  });
};


/**
 * Get a single user from its unique profile name
 */
exports.profile = function (req, res, next) {
  var userId = req.params.name;

  User.findOne({name: userId}, function(err, user) {
    if (err) return next(err);
    if (!user) return res.json(500);
    res.json(user);
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
 * Change a users settings
 */
exports.changeSettings = function(req, res, next) {
  //console.log(req.body);
  //var userId = req.user._id;
  //console.log(req.user._id);
  var userId = req.params.id;
  var firstname = req.body.firstname;
  var lastname = String(req.body.lastname);
  var location = String(req.body.location);
  var phone = String(req.body.phone);
  var gravatarEmail = String(req.body.gravatarEmail);
  var bitcointalkLogin = String(req.body.bitcointalkLogin);
  var githubLogin = String(req.body.githubLogin);
  var stackexchangeLogin = String(req.body.stackexchangeLogin);

  User.findById(userId, function (err, user) {
    user.firstname = firstname;
    user.lastname = lastname;
    user.location = location;
    user.phone = phone;
    user.gravatarEmail = gravatarEmail;
    user.bitcointalkLogin = bitcointalkLogin;
    user.githubLogin = githubLogin;
    user.stackexchangeLogin = stackexchangeLogin;
    user.privateContrib = req.body.privateContrib;
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
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
  var obj = {
    transactionHash: req.query.transaction_hash,
    inputTransactionHash: req.query.input_transaction_hash,
    inputAddress: req.query.input_address,
    value: parseInt(req.query.value),
  };
  var id = req.params.id;
  var secret = req.query.secret;
  var confirmations = parseInt(req.query.confirmations);
  if (secret === process.env.SECRET_KEY || !req.params.test)
  {
    if (confirmations >= 6)
    {
      User.findById(id, function(err, user)
      {
        if (err || !user)
          return res.json(500, err);
        user.transactions.push(obj);
        user.unconfirmedBalance = user.unconfirmedBalance - obj.value;
        user.balance = parseInt(user.balance + obj.value);
        user.save(function (err)
        {
          if (err)
            return res.json(500, err);
          res.send("*ok*");
        });
      });
    }
    else
    {
      User.findById(id, function(err, user)
      {
        if (err || !user)
          return res.json(500, err);
        user.unconfirmedBalance = parseInt(user.unconfirmedBalance + obj.value);
        user.save(function (err)
        {
          if (err)
            return res.json(500, err);
          res.send(200);
        });
      });
    }
  }
  else
    res.send(500);
};

exports.privateContrib = function (req, res)
{
  var id = req.params.id;

  User.findById(id, function (err, user)
  {
    if (err || !user)
      res.send(500, err);
    var obj =
    {
      name: user.name,
      isPrivate: user.privateContrib
    };
    res.send(200, obj);
  });
};
