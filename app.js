const usernameInput = document.getElementById('usernameInput');
const searchBtn = document.getElementById('searchBtn');
const repoList = document.getElementById('repoList');

searchBtn.addEventListener('click', ()=>{
    const username = usernameInput.value.trim();
    if(!username){
        repoList.innerHTML = '<p class="error">Please enter a GitHub username.</p>';
        return;
    }
    fetchRepose(username);
});

function fetchRepose(username){
    repoList.innerHTML = 'Loading...';
    fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => {
            if (!response.ok){
                throw new Error('User not found or API error');
            }
            return response.json();
        })
        .then((repos) => {
            if (repos.length ===0){
                repoList.innerHTML = '<p>No repositories found.</p>';
                return;
            }
            displayRepos(repos);
        })
        .catch((error) => {
            repoList.innerHTML = `<p class="error">${error.message}</p>`;
        });
}
function displayRepos(repos) {
    repoList.innerHTML = '';
    repos.forEach((repo) => {
        const repoCard = document.createElement('div');
        repoCard.className = 'repo-card';
        repoCard.innerHTML = `
            <div class="repo-name">${repo.name}</div>
            <div class="repo-description">${repo.description || 'No description'}</div>
            <div class="repo-stats">⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}</div>`;
            repoList.appendChild(repoCard);

    });
}


