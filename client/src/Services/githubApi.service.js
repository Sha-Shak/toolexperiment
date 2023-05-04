import axios from "axios";
const personalToken = process.env.REACT_APP_GITHUB_PERSONAL_TOKEN;
const org = process.env.REACT_APP_GITHUB_ORG_NAME;
const apiUrl = 'https://api.github.com';

axios.interceptors.request.use(
  (req) => {
    if (personalToken && req.url !== "https://api.github.com/user") {
      req.headers.Authorization = `token ${personalToken}`;
      req.headers.Accept = 'application/vnd.github.hellcat-preview+json';
    }

    return req;
  },
  (e) => {
    return Promise.reject(e);
  }
);

export async function getOrgInstructors () {
  try {
    const url = `${apiUrl}/orgs/${org}/teams/staff-instructors/members`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function getOrgMaintainers () {
  try {
    const url = `${apiUrl}/orgs/${org}/teams/staff-maintainers/members`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function getOrgTeams () {
  try {
    const url = `${apiUrl}/orgs/${org}/teams`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getChildTeams (parent_id) {
  try {
    const url = `${apiUrl}/teams/${parent_id}/teams`;
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function getOrgRepos () {
  try {
    const url1 = `${apiUrl}/orgs/${org}/repos?per_page=100&page=1`;
    const url2 = `${apiUrl}/orgs/${org}/repos?per_page=100&page=2`;
    const res1 = await axios.get(url1);
    const res2 = await axios.get(url2);
    return [...res1.data, ...res2.data];
  } catch (error) {
    console.log(error);
  }
}


export async function getTeamMembers (teamSlug) {
  try {
    const url = `${apiUrl}/orgs/${org}/teams/${teamSlug}/members`;
    const res = await axios.get(url);
    const members = res.data;

    const result = []
    for (let i = 0; i < members.length; i++) {
      const infoRes = await axios.get(members[i].url);
      result.push(infoRes.data);
    }

    return result;
  } catch (error) {
    console.log(error);
  }
}


export async function giveAccessToRepo (repoName, teamSlug) {
  try {
    const url = `${apiUrl}/orgs/${org}/teams/${teamSlug}/repos/${org}/${repoName}`;
    const res = await axios.put(url, {permission: 'pull'});
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function removeAccessToRepo (repoName, teamSlug) {
  try {
    const url = `${apiUrl}/orgs/${org}/teams/${teamSlug}/repos/${org}/${repoName}`;
    const res = await axios.delete(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


export async function getStudentCohorts () {
  try {
    const teams = await getOrgTeams();
    const parentTeam = teams.reduce((parent, team) => team.name === 'Students' ? team : parent , null);
    const childTeams = await getChildTeams(parentTeam.id);
    return childTeams;
  } catch (error) {
    console.log(error);
  }
}