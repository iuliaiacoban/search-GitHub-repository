document.addEventListener("DOMContentLoaded", function (event) {
    var search = document.getElementById("repo-search");
    search.addEventListener("keyup", onKeyup);
});

function getRepository(searchRepo) {
    var xhttp = new XMLHttpRequest();
    var url = "https://api.github.com/search/repositories?q=" + searchRepo + " in:name";

    xhttp.open("GET", url, true);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var repoList = JSON.parse(xhttp.responseText);
                renderRepoList(repoList.items);
            }
        }
    }
    xhttp.send();
}

function onKeyup() {
    var search = document.getElementById("repo-search");
    getRepository(search.value);
}

function renderRepoList(repoList) {
    var repoListElem = document.getElementById("repo-list");
    repoListElem.innerHTML = "";
    for (var i = 0; i < repoList.length; i++) {
        var repoListLi = document.createElement("li");
        repoListLi.innerHTML = repoList[i].name;
        repoListElem.appendChild(repoListLi);
    }
}