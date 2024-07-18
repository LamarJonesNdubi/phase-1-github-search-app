document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            searchUsers(query);
        }
    });

    async function searchUsers(query) {
        const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const data = await response.json();
        displayUsers(data.items);
    }

    function displayUsers(users) {
        userList.innerHTML = '';
        reposList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}" width="50">
                <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
            li.addEventListener('click', () => fetchUserRepos(user.login));
            userList.appendChild(li);
        });
    }

    async function fetchUserRepos(username) {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        const data = await response.json();
        displayRepos(data);
    }

    function displayRepos(repos) {
        reposList.innerHTML = '';
        repos.forEach(repo => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            reposList.appendChild(li);
        });
    }
});
