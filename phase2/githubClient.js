class GithubClient {
  getRepoInfo(repoName, callback, view) {
    fetch('https://api.github.com/repos/' + repoName)
      .then(response => response.json())
      .then(data => {
        callback(data);
        view.display(data);
      });
  }
}

module.exports = GithubClient;