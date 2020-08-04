var listElement = document.querySelector('#app ul');

var inputElement = document.querySelector('#app input');
var btnEmlement = document.querySelector('#app button');

var repository = [];

function renderElement() {
    listElement.innerHTML = '';

    for (repo of repository) {
        var itemList = document.createElement('li');

        var textItemList = document.createTextNode(repo);

        itemList.appendChild(textItemList);
        listElement.appendChild(itemList);
    }
}

function getUserRepo(userName) {
    repository = [];
    axios.get(`https://api.github.com/users/${userName}/repos`).then((result) => {
        for (repo of result['data']) {
            const { name } = repo;

            repository.push(name);
        }

        renderElement();

    }).catch((err) => console.log(err));
}

function searchUser() {
    if (!inputElement.value) {
        alert('The name cannot be empty');
        return;
    }
    const textValue = inputElement.value;

    getUserRepo(textValue);
    inputElement.value = '';
}

btnEmlement.onclick = searchUser;
renderElement();