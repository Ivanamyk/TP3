const url = "https://trabajopractico3-6f33f-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const id = params.get('name');

//Cargo tabla
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

        //Boton Eliminar
        const botonEliminar = document.createElement('button');
        botonEliminar.innerText = 'Delete';
        botonEliminar.setAttribute('class', 'btn btn-danger');
        botonEliminar.setAttribute('data-bs-toggle', 'modal');
        botonEliminar.setAttribute('data-bs-target', '#modalBorrar');
        const tdElim = document.createElement('td');
        tdElim.appendChild(botonEliminar);
        tr.appendChild(tdElim);

        const deleteUserButton = document.getElementById("deleteUser");
        deleteUserButton.addEventListener('click', () => {
            eliminar(object);
        });

        // const botonEliminar = document.createElement('button');
        // botonEliminar.addEventListener('click', () => {
        //     eliminar(object);
        // });
        // botonEliminar.innerText = 'Eliminar';
        // botonEliminar.setAttribute('class', 'btn btn-danger');
        // const tdElim = document.createElement('td');
        // tdElim.appendChild(botonEliminar);
        // tr.appendChild(tdElim);


        //Boton Editar
        const botonEditar = document.createElement('button');
        botonEditar.innerText = 'Edit';
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

//Validacion en Modal
const validacion = () => {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const regExEmail = /\w+@\w+\.+(com)$/;
    const regExPhone = /^[0-9\s-]+$/;

    if (fullName.lenght > 50) {
        alert('El Nombre debe contener hasta 50 caracteres.')
        return false;
    }
    if (!regExEmail.test(email)) {
        alert('Email invalido. Intente de nuevo.')
        return false;
    }
    if (address.lenght > 60) {
        alert('La Direccion debe contener hasta 60 caracteres.')
        return false;
    }
    if (!regExPhone.test(phone)) {
        alert('El Telefono debe contener solo números, espacios o guión medio')
        return false;
    }
    else {
        return true;
    }
}

//Funcion Añadir Usuario
const addUser = (event) => {
    event.preventDefault();
    //paso la validacion antes de hacer el POST asi corroboro los datos.
    if (validacion()) {
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
        }).then(init);
    }
}

const reload = () => {
    reload = location.reload();
}
//Funcion Borrar Usuario
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

//Funcion Editar
const editUser = (object) => {
    const editUser = {
        fullName: inputNameEdit.value,
        email: inputEmailEdit.value,
        address: inputAddressEdit.value,
        phone: inputPhoneEdit.value
    }

    fetch(`${url}/users/${object}.json`, {
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(editUser),
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
    }).then(init, location.reload());
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

const addUserButton = document.getElementById("saveUser");
addUserButton.addEventListener('click', addUser);

