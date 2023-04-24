const router = require('express').Router();
const gitHubController = require('./controllers/github.controller');
const studentController = require('./controllers/student.controller');
const reportController = require('./controllers/studentReport.controller');
const authMiddleware = require('./middleware/auth.middleware');

router.get('/', (req, res) => {res.send('Project Code - Instructor Tool Server')});
router.post('/github-access', gitHubController.getGitHubAccessToken);

router.get('/student', authMiddleware, studentController.getStudentInfo);
router.post('/report', authMiddleware, reportController.addStudentReport);

module.exports = router;