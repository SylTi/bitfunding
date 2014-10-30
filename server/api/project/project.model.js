'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
  name: String,
  description: String,
  dateCreat: { type: Date, default: Date.now },
  dateEndCampaign: Date,
  amoutToRaise: Number,
  amountRaised: Number,
  contributors: [{contribId: ObjectId, amount: Number}],
  OwnerBTCKey: { type: String, default: ""},
  Owner: String,
  active: Boolean
});

module.exports = mongoose.model('Project', ProjectSchema);