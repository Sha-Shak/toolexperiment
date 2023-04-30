const { model, Schema } = require('mongoose');
const { testTimingSchema } = require('./testTiming.model');

const testStatusSchema = new Schema({
  studentId: {
    type: String,
    required: true
  },
  test: {
    type: testTimingSchema,
    required: true
  },
  repo: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});


const TestStatus = model('TestStatus', testStatusSchema);

module.exports = { testStatusSchema, TestStatus };

