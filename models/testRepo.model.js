const { model, Schema } = require('mongoose');

const testRepo = new Schema({
  repoSlug: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});


const TestRepo = model('TestRepo', testRepo);

module.exports = { TestRepo };