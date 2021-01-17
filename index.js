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
        const tdName = document.createElement('td');
        const tdEmail = document.createElement('td');
        const tdAddress = document.createElement('td');
        const tdPhone = document.createElement('td');
        tdName.innerHTML = data[object].fullName;
        tdEmail.innerHTML = data[object].email;
        tdAddress.innerHTML = data[object].address;
        tdPhone.innerHTML = data[object].phone;
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tr.appendChild(tdAddress);
        tr.appendChild(tdPhone);

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
        botonEditar.innerText = 'Editar';
        botonEditar.setAttribute('class', 'btn btn-warning');
        botonEditar.setAttribute('data-bs-toggle', 'modal');
        botonEditar.setAttribute('data-bs-target', '#ModalEditar');
        const tdEdit = document.createElement('td');
        tdEdit.appendChild(botonEditar);
        tr.appendChild(tdEdit);

        tbody.appendChild(tr);

        botonEditar.addEventListener('click', () => {
            traerDatos(object);
            const editUserButton = document.getElementById("saveUserEdit");
            editUserButton.addEventListener('click', () => {
            editUser(object);
        });
        });  
    }
}


// MODAL
const inputName = document.getElementById("fullName");
const inputEmail = document.getElementById("email");
const inputAddress = document.getElementById("address");
const inputPhone = document.getElementById("phone");

const inputNameEdit = document.getElementById("fullNameEdit");
const inputEmailEdit = document.getElementById("emailEdit");
const inputAddressEdit = document.getElementById("addressEdit");
const inputPhoneEdit = document.getElementById("phoneEdit");

const addUser = async (event) => {
    event.preventDefault();

    const newUser = {
        fullName: inputName.value,
        email: inputEmail.value,
        address: inputAddress.value,
        phone: inputPhone.value
    }

    await fetch(`${url}/users.json`, {
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
    reload()
}

const reload = () => {
    
    reload = window.location.reload();
    return false;
    
}

const eliminar = async (object) => {
    await fetch(`${url}/users/${object}.json`, {
        method: 'DELETE',
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
    reload()
}

const editUser = async (object) => {

    const editUser = {
        fullName: inputNameEdit.value,
        email: inputEmailEdit.value,
        address: inputAddressEdit.value,
        phone: inputPhoneEdit.value
    }

    await fetch(`${url}/users/${object}.json`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(editUser),
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    })
    reload()
}
//Recarga modal al editar 

const traerDatos = (object) => {
    fetch(`${url}/users/${object}.json`, {
        method: "GET",
        headers: {
            'Content-Type': 'Application/json'
        },
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        document.getElementById("fullNameEdit").defaultValue = data.fullName;
        document.getElementById("emailEdit").defaultValue = data.email;
        document.getElementById("addressEdit").defaultValue = data.address;
        document.getElementById("phoneEdit").defaultValue = data.phone;
    })
}

const filtrar = async() => {
    const filtro =inputFiltro.value
    await fetch(`${url}/users.json?orderBy="fullName"&startAt="${filtro}"&endAt="${filtro}\uf8ff"`, {
        method: "GET",
        headers: {
            'Content-Type': 'Application/json',
        },
    }).then((response) => {
        console.log(response.url)
        return response.json()
    }).then((data) => {
        createTable(data)
        console.log(data)
    })

}


const addUserButton = document.getElementById("saveUser");
addUserButton.addEventListener('click', addUser);

const filterButton = document.getElementById("botonFiltro");
filterButton.addEventListener('click', filtrar);

const deleteFilterButton = document.getElementById("botonBorrarFiltro");
deleteFilterButton.addEventListener('click', init);





