const Student = require("../models/student.model");
const { getUser, getTeamMembers } = require("../utils/githubAPI");

async function syncWithGithub (req, res) {
  try {
    const { cohort } = req.query;
    const members = await getTeamMembers(cohort);
    console.log(members)
    
    for (let i = 0; i < members.length; i++) {
      const user = members[i];

      const studentInfo = {
        githubLogin: user.login,
        cohort,
        name: user.name ? user.name : user.login,
        imgUrl: user.avatar_url
      }
      
      await Student.create(studentInfo);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function getStudentInfo (req, res) {
  try {
    const { login, cohort } = req.query;
    const student = await Student.findOne({ githubLogin: login });
    if (student) res.send(student);
    else {
      const user = await getUser(login);
      const studentInfo = {
        githubLogin: login,
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


module.exports = { getStudentInfo, updateStudentCohort, syncWithGithub };