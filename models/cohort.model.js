const { model, Schema } = require('mongoose');

const cohortSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  }
});


const Cohort = model('Cohort', cohortSchema);

module.exports = { cohortSchema, Cohort };