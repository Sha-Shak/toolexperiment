const { getCurrentUser, getOrgInstructors } = require("../utils/githubAPI");

async function authMiddleware (req, res, next) {
  try {
    const token = req.get('Authorization').split(' ')[1];
    const currentUser = await getCurrentUser(token);
    const instructors = await getOrgInstructors();

    const isInstructor = instructors.reduce((flag, instructor) => instructor.login === currentUser.login ? true : flag, false);

    if (isInstructor) {
      req.user = currentUser;
      next();
    } else {
      res.status(401).send('You are not an instructor.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = authMiddleware;