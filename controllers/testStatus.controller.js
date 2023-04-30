const Student = require("../models/student.model");
const { TestStatus } = require("../models/testStatus.model");

async function getTestStatusesForARepo (req, res) {
  try {
    const { cohort, repo } = req.query;

    if (cohort && repo) {
      const students = await Student.find({cohort});
      const studentIds = students.map(student => student._id);
      const statuses = await TestStatus.find({ studentId: {$in: studentIds}, repoSlug: repo});
      res.status(200).send(statuses);
    } else {
      res.status(400).send('Invalid parameters.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


module.exports = { getTestStatusesForARepo };