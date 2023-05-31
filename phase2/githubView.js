class GithubView {
  constructor(model, client) {
    this.model = model;
    this.client = client;

    const submitButtonEl = document.querySelector('#submit-button');
    const repoInputEl = document.querySelector('#repo-name-input');

    submitButtonEl.addEventListener('click', () => {
      const repoName = repoInputEl.value;

      this.client.getRepoInfo(repoName, repoData => {
        console.log(repoData);
        this.display(repoData); //directly call display here
      });
    });
  }

  display(data) {
    document.querySelector('#repo-name').textContent = data.full_name;
    document.querySelector('#repo-description').textContent = data.description;
    document.querySelector('#repo-avatar').src = data.organization.avatar_url;
  }
}

module.exports = GithubView;