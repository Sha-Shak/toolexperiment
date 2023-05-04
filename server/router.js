const { FormResponse } = require("./models/typeform.model");
const router = require("express").Router();
const { circleCIWebHook } = require("./controllers/circleCI.controller");
const gitHubController = require("./controllers/github.controller");
const studentController = require("./controllers/student.controller");
const reportController = require("./controllers/studentReport.controller");
const {
  getTestStatusesForARepo,
} = require("./controllers/testStatus.controller");
const authMiddleware = require("./middleware/auth.middleware");

router.get("/", (req, res) => {
  res.send("Project Code - Instructor Tool Server");
});
router.post("/github-access", gitHubController.getGitHubAccessToken);

router.get("/student", authMiddleware, studentController.getStudentInfo);
router.get(
  "/cohort/students",
  authMiddleware,
  studentController.getStudentsInCohort
);
router.post("/report", authMiddleware, reportController.addStudentReport);
router.put("/update/report/:id", authMiddleware, reportController.updateReport);
router.get("/report/cohort", authMiddleware, reportController.getCohortReports);
router.get(
  "/report/student",
  authMiddleware,
  reportController.getStudentReport
);

// Circle CI
router.post("/webhook/circleci", circleCIWebHook);
router.get("/test/status", authMiddleware, getTestStatusesForARepo);

//typeform
router.post("/typeform-webhook", (req, res) => {
  const formResponse = req.body.form_response;
  console.log(formResponse);

  const newFormResponse = new FormResponse({
    form_id: formResponse.form_id,
    submitted_at: formResponse.submitted_at,
    answers: formResponse.answers.map((answer) => ({
      field: answer.field.id,
      answer: answer.text,
    })),
  });

  newFormResponse.save((err, savedResponse) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log(savedResponse);
      res.sendStatus(200);
    }
  });
});

// Student Sync
router.get("/sync", studentController.syncWithGithub);

module.exports = router;
