const axios = require('axios');
require('dotenv').config();
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

async function getGitHubAccessToken (req, res) {
  try {
    const {code} = req.body;
    const url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;
    const result = await axios.post(url);
    const resultData = result.data;
    const token = resultData.split('&')[0].split('=')[1];
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = { getGitHubAccessToken }