const registerForm = document.getElementById('register-form')
const registerUsername = document.getElementById('register-username')
const registerPassword = document.getElementById('register-password')
console.log(registerUsername.value)
console.log(registerPassword.value)
const headers = {
    'Content-Type':'application/json'
}

const baseUrl = 'http://localhost:8080/api/v1/users'

const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        username: registerUsername.value,
        password: registerPassword.value
    }

    const response = await fetch (`${baseUrl}/register`,{
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })

        .catch(err => console.error(err.message))

    const responseArr = await response.json()
    if (registerUsername.value == "" || registerUsername.value == "") {
        console.log("user not found!");
        alert("Please enter a valid username or password.");
    } else if (response.status === 200){
        window.location.replace(responseArr[0])
    }
}

registerForm.addEventListener("submit", handleSubmit)