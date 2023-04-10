const router = require('express').Router();
const gitHubController = require('./controllers/github.controller');

router.get('/', (req, res) => {res.send('Project Code - Instructor Tool Server')});
router.post('/github-access', gitHubController.getGitHubAccessToken);

module.exports = router;