const Student = require("../models/student.model");
const { TestStatus } = require("../models/testStatus.model");

async function circleCIWebHook (req, res) {
  try {
    const { origin_repository_url } = req.body.pipeline.vcs;
    const [ githubLogin, repoSlug ] = origin_repository_url.split('/').slice(-2);
    const { status } = req.body.job;

    const student = await Student.findOne({ githubLogin });

    if (student) {
      const existingStatus = await TestStatus.findOne({studentId: student._id, repoSlug});

      if (existingStatus) {
        await TestStatus.findByIdAndUpdate(existingStatus._id, {$set: { status }});
      } else {
        await TestStatus.create({studentId: student._id, repoSlug, status});
      }
      res.status(201).send('OK');
    } else {
      res.send('Student does not exist.');
    }

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { circleCIWebHook };