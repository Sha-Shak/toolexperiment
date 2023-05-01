const Student = require("../models/student.model");
const { TestRepo } = require("../models/testRepo.model");
const { TestStatus } = require("../models/testStatus.model");
const { getStatus } = require("../utils/testHelper");

async function circleCIWebHook (req, res) {
  try {
    const { origin_repository_url } = req.body.pipeline.vcs;
    const { happened_at } = req.body;
    const [ githubLogin, repoSlug ] = origin_repository_url.split('/').slice(-2);
    const { status } = req.body.job;

    const student = await Student.findOne({ githubLogin });

    if (student) {
      
      const repo = await TestRepo.findOne({ repoSlug });
      const testStatus = getStatus(repo.startTime, repo.duration, happened_at, status);
      const existingStatus = await TestStatus.findOne({studentId: student._id, repoSlug});

      if (existingStatus) {
        if (existingStatus.status === "failed" && (testStatus !== "failed"))
          await TestStatus.findByIdAndUpdate(existingStatus._id, {$set: { status: testStatus }});
      } else {
        await TestStatus.create({studentId: student._id, repoSlug, status: testStatus});
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