const Student = require("../models/student.model");
const { getUser } = require("../utils/githubAPI");

async function getStudentInfo (req, res) {
  try {
    const { login, cohort } = req.query;
    const student = await Student.findOne({ gitHubLogin: login });
    if (student) res.send(student);
    else {
      const user = await getUser(login);
      const studentInfo = {
        gitHubLogin: login,
        cohort,
        name: user.name ? user.name : login,
        imgUrl: user.avatar_url
      }

      const newStudent = await Student.create(studentInfo);

      res.status(201).send(newStudent);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


async function updateStudentCohort (req, res) {
  try {
    const { id } = req.params;
    const { cohort } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(id, {$set: {cohort}}, {new: true});
    res.status(205).send(updatedStudent);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


module.exports = { getStudentInfo, updateStudentCohort };