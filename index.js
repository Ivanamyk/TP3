const init = () => {
    fetch(`${url}/users.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            createTable(data);
        })
};
init();

const createTable = (data) => {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    for (let object in data) {

        const tr = document.createElement('tr');

        for (let item in data[object]) {
            const td = document.createElement('td');
            td.innerHTML = data[object][item];
            tr.appendChild(td);
        }
        
    }
}