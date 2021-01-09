const url = "https://trabajopractico3-6f33f-default-rtdb.firebaseio.com";

// MODAL
const inputName = document.getElementById("fullName");
const inputEmail = document.getElementById("email");
const inputAddress = document.getElementById("address");
const inputPhone = document.getElementById("phone");
// const id = url.searchParams.get('fullName');

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

const cargarForm = (id) => {
    fetch(`${url}users/${id}.json`)
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


const addUserButton = document.getElementById("saveUser");
addUserButton.addEventListener('click', addUser);