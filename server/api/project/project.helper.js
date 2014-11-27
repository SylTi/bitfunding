'use strict';
var User = require('../user/user.model.js');
var async = require('async');

exports.hReturnFunds = function (project, res, flag)
{
  console.log("HRETURNFUNDS");
  async.eachSeries(project.contributors, function (element, callback)
  {
    async.waterfall([
      function(cb)
      {
        User.findById(element.contribId, function (err, user)
          {
            if (err)
              cb(err);
            cb(null, user);
          });
      },
      function (user, cb)
      {
        user.balance += element.amount;
        user.save(function (err)
          {
            cb(err, user);
          });
      }], function(error, result)
      {
        if (error)
          callback(error);
        callback(null, result)
      });
  }, function (err)
  {
    if(flag)
    {
      if (err)
        return res.json(500, err);
      project.contributorsOld = project.contributors.concat(project.contributors);
      project.amountRaised = 0;
      project.contributors = [];
      project.active = false;
      project.save(function (err)
      {
        console.log("END");
        if (err)
          return res.json(500, err);
        res.json(200);
      });
    }
    else
    {
      if (err)
      {
        res(err);
      }
      console.log("END");
      project.contributorsOld = project.contributors.concat(project.contributors);
      project.amountRaised = 0;
      project.contributors = [];
      project.active = false;
      project.visible = false;
      project.save(function (err)
      {
        if (err)
          res(err);
        res();
      });
    }
  });

};
