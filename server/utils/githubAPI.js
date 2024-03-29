const axios = require('axios');
const conf = require('../config');

const sharedOptions = {
  headers:{
    Authorization: `token ${conf.GITHUB_PERSONAL_TOKEN}`,
    Accept: 'application/vnd.github.hellcat-preview+json'
  }
}

async function getUser (login) {
  try {
    const url = conf.githubApiBaseUrl + '/users/' + login;
  
    const res = await axios.get(url, sharedOptions);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}


async function getCurrentUser (token) {
  try {
    const url = conf.githubApiBaseUrl + '/user';
    const headers =  {...sharedOptions.headers, Authorization: `Bearer ${token}`}
    const res = await axios.get(url, {headers});
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function getOrgInstructors () {
  try {
    const url = `${conf.githubApiBaseUrl}/orgs/${conf.GITHUB_ORG_NAME}/teams/staff-instructors/members`;

    const res = await axios.get(url, sharedOptions);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}


async function getTeamMembers (teamSlug) {
  try {
    const url = `${conf.githubApiBaseUrl}/orgs/${conf.GITHUB_ORG_NAME}/teams/${teamSlug}/members`;
    const res = await axios.get(url, sharedOptions);
    const members = res.data;

    const result = []
    for (let i = 0; i < members.length; i++) {
      const infoRes = await axios.get(members[i].url);
      result.push(infoRes.data);
    }

    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}


module.exports = { getUser, getCurrentUser, getOrgInstructors, getTeamMembers };