let mongoose = require('mongoose');
let Story = require('./models/Story.js');
let config = require('./config');
// Using default Promise of node to solve mongoose's promise error
mongoose.Promise = global.Promise;

db.connection.on('error', function (err) {
  console.log('Cannot connect to database ${err}');
});

db.connection.on('open', function () {
  console.log('Database connected');
});

module.exports = { Story: Story };