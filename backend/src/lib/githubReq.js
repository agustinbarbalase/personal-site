const { Octokit } = require("@octokit/core");
require("dotenv").config();
const octokit = new Octokit({ auth: process.env.GH_ACCESS_TOKEN });

module.exports = {
  listRepoForAUser: (username) => {
    return octokit.request('GET /users/{username}/repos', {
      username
    });
  }
}