import { getOrgInstructors, getOrgMaintainers } from "./githubApi.service";
import { getUser } from "./githubOAuth.service";

export async function checkInstructorRole () {
  try {
    const user = await getUser();
    const instructors = await getOrgInstructors();
    const isInstructor = instructors.reduce((flag, instructor) => instructor.login === user.login ? true : flag, false);
    return isInstructor;
  } catch (error) {
    console.log(error);
  }
}


export async function checkMaintainerRole () {
  try {
    const user = await getUser();
    const maintainers = await getOrgMaintainers();
    const isMaintainer = maintainers.reduce((flag, maintainer) => maintainer.login === user.login ? true : flag, false);
    return isMaintainer;
  } catch (error) {
    console.log(error);
  }
}