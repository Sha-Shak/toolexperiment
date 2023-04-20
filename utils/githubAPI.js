const axios = require('axios');
require('dotenv').config();
const personalToken = process.env.GITHUB_PERSONAL_TOKEN;

async function getUser (login) {
  try {
    const url = 'https://api.github.com/users/' + login;
    const config = {
      headers:{
        Authorization: `token ${personalToken}`,
        Accept: 'application/vnd.github.hellcat-preview+json'
      }
    };
  
    const res = await axios.get(url, config);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = { getUser };