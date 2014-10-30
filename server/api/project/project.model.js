'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  description: String,
  dateCreat: { type: Date, default: Date.now },
  dateEndCampaign: Date,
  amoutToRaise: Number,
  amountRaised: Number,
  Owner: String,
  active: Boolean
});

module.exports = mongoose.model('Project', ProjectSchema);