const { Schema } = require('mongoose');

const testTimingSchema = new Schema({
  repoSlug: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
});

module.exports = { testTimingSchema };