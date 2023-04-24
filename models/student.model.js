const { model, Schema } = require('mongoose');

const studentSchema = new Schema({
  githubLogin: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cohort: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  }
});


const Student = model('Student', studentSchema);

module.exports = Student;