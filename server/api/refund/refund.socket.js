/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Refund = require('./refund.model');

exports.register = function(socket) {
  Refund.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Refund.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('refund:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('refund:remove', doc);
}