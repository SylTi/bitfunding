'use strict';

var _ = require('lodash');
var http = require('http');

// Get currentprices:
// http://www.coindesk.com/api/
exports.currentprice = function(req, res) {
  http.get("http://api.coindesk.com/v1/bpi/currentprice.json", function(result) {
    if (result.statusCode == 200) {
      result.on("data", function(body) {
        res.json(200, JSON.parse(body));
      });
    }
    else
      res.json(500, {});
  }).on('error', function(e) {
    res.json(500, {});
  });
};
