const url = "https://trabajopractico3-6f33f-default-rtdb.firebaseio.com";

const init = () => {
    fetch(`${url}/users.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            createTable(data);
        })
};
init();

//TABLA
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
        const botonEliminar = document.createElement('button');
        botonEliminar.addEventListener('click', () => {
            eliminar(object);
        });
        botonEliminar.innerText = 'Eliminar';
        botonEliminar.setAttribute('class', 'btn btn-danger');
        const tdElim = document.createElement('td');
        tdElim.appendChild(botonEliminar);
        tr.appendChild(tdElim);

        const botonEditar = document.createElement('button');
        botonEditar.addEventListener('click', () => {
            window.location = `form.html?name=${object}`;
        });
        botonEditar.innerText = 'Editar';
        botonEditar.setAttribute('class', 'btn btn-warning');
        const tdEdit = document.createElement('td');
        tdEdit.appendChild(botonEditar);
        tr.appendChild(tdEdit);

        tbody.appendChild(tr);
        
    }
}


// MODAL
const inputName = document.getElementById("fullName");
const inputEmail = document.getElementById("email");
const inputAddress = document.getElementById("address");
const inputPhone = document.getElementById("phone"); 


const addUser = (event) => {
    event.preventDefault();

    const newUser = {
        fullName: inputName.value,
        email: inputEmail.value,
        address: inputAddress.value,
        phone: inputPhone.value
    }

    fetch(`${url}/users.json`, {
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(newUser),
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    })
}

const cargarForm = (object) => {
    fetch(`${url}/users${object}.json`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            inputName.value = data.name
            inputEmail.value = data.email
            inputAddress.value = data.address
            inputPhone.value = data.phone
        })
}

const reload =() => {
    reload = location.reload();
}

 const eliminar = async(object) => {
    await fetch(`${url}/users/${object}.json`, {
        method: 'DELETE',      
            })
            .then(response => {
                return response.json()
            })
            .catch(error => console.log(error))
            reload()
         }


    
const addUserButton = document.getElementById("saveUser");
addUserButton.addEventListener('click', addUser);

