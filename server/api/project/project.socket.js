/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Project = require('./project.model');

exports.register = function(socket) {
  Project.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Project.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('project:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('project:remove', doc);
}