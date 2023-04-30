const { model, Schema } = require('mongoose');

const testStatusSchema = new Schema({
  studentId: {
    type: String,
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

module.exports = { TestStatus };

