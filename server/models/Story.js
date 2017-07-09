var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  id: String,
  title: String,
  time: String,
  content: [String]
});

var Story = mongoose.model('Story', storySchema);

module.exports = Story; 