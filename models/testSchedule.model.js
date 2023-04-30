const { model, Schema } = require('mongoose');
const { cohortSchema } = require('./cohort.model');
const { testTimingSchema } = require('./testTiming.model');

const testScheduleSchema = new Schema({
  cohort: {
    type: cohortSchema,
    required: true
  },
  timings: {
    type: [testTimingSchema],
    required: true
  }
});


const TestSchedule = model('TestSchedule', testScheduleSchema);

module.exports = { TestSchedule };