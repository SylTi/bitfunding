'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RefundSchema = new Schema({
  userId: {type: Schema.ObjectId, ref: 'User', required: true},
  addrBTC: {type: String, required: true},
  active: {type: Boolean, default: true},
  accepted: {type: Boolean, default: false},
  beforeBalance: {type: Number, required: true},
  returnedAmount: {type: Number, required: true, default: 0}
});

module.exports = mongoose.model('Refund', RefundSchema);
