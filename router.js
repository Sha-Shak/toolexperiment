const router = require('express').Router();
const { circleCIWebHook } = require('./controllers/circleCI.controller');
const gitHubController = require('./controllers/github.controller');
const studentController = require('./controllers/student.controller');
const reportController = require('./controllers/studentReport.controller');
const authMiddleware = require('./middleware/auth.middleware');

router.get('/', (req, res) => {res.send('Project Code - Instructor Tool Server')});
router.post('/github-access', gitHubController.getGitHubAccessToken);

router.get('/student', authMiddleware, studentController.getStudentInfo);
router.post('/report', authMiddleware, reportController.addStudentReport);
router.put('/update/report/:id', authMiddleware, reportController.updateReport);
router.get('/report/cohort', authMiddleware, reportController.getCohortReports);
router.get('/report/student', authMiddleware, reportController.getStudentReport);

// Circle CI
router.post('/webhook/circleci', circleCIWebHook);

// Student Sync

router.get('/sync', studentController.syncWithGithub);

module.exports = router;