const { model, Schema } = require('mongoose');

function typeValidator(val) {
  return this.type !== 'mid-junior';
}

const studentReportSchema = new Schema({
  studentId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  marks: {
    positiveAttitude: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    productivity: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    autonomy: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    communication: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    teamwork: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    selfImprovement: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    openMindedness: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    curiosity: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    cleanCode: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    efficientCode: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    reliableCode: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    javascript: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: true
    },
    backEnd: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: [typeValidator, '{PATH} is required']
    },
    database: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: [typeValidator, '{PATH} is required']
    },
    frontEnd: {
      type: Number,
      min: [0, 'Mark must be between 0 - 10'],
      max: [10, 'Mark must be between 0 - 10'],
      required: [typeValidator, '{PATH} is required']
    }
  },
  note: {
    type: String,
    required: true
  }
});


const StudentReport = model('StudentReport', studentReportSchema);

module.exports = StudentReport;