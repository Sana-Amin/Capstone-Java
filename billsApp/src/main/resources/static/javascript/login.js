let loginForm = document.getElementById('login-form')
let loginUsername = document.getElementById('login-username')
let loginPassword = document.getElementById('login-password')

const headers = {
    'Content-Type':'application/json'
}

const baseUrl = 'http://localhost:8080/api/v1/users'

const handleSubmit = async (e) =>{
    e.preventDefault()

    let bodyObj = {
        username: loginUsername.value,
        password: loginPassword.value
    }

    const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err.message))

    const responseArr = await response.json()

    if (loginUsername.value == "" || loginPassword.value == "") {
        console.log("user not found!");
        alert("Please enter a valid username or password.");
    } else if (response.status === 200) {
        console.log(responseArr[0])
        document.cookie = `userId=${responseArr[1]}`
        console.log(document.cookie)
    }
        if (responseArr[0] == "Username or password incorrect"){
            alert("Username or password incorrect ")
        }else{
            window.location.replace(responseArr[0])
        }
        console.log(responseArr)
        console.log(response.status)
    //window.location.replace(responseArr[0])

}

loginForm.addEventListener("submit", handleSubmit)
