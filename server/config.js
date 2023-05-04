require('dotenv').config();

const config = {
  GITHUB_PERSONAL_TOKEN: process.env.GITHUB_PERSONAL_TOKEN,
  GITHUB_ORG_NAME: process.env.GITHUB_ORG_NAME,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  MONGOOSE_URI: process.env.MONGOOSE_URI,
  PORT: process.env.PORT,
  githubApiBaseUrl: 'https://api.github.com'
}

module.exports = config;