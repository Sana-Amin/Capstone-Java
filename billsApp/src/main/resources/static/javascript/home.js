const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];




const submitForm = document.getElementById("bill-form")

const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = "http://localhost:8080/api/v1/bills/"

const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        name: document.getElementById("name-input").value,
        billAmount: document.getElementById("bill-input").value,
        dueDate: document.getElementById("due-date").value,
        paidDate: document.getElementById("paid-date").value,
        paid: document.getElementById("paid").checked,
        reoccurring: document.getElementById("reoccurring").checked,

    }
    await addBill(bodyObj);
    document.getElementById("name-input").value = ''
    document.getElementById("bill-input").value = ''
    document.getElementById("due-date").value = ''
    document.getElementById("paid-date").value = ''
    document.getElementById("paid").value = ''
    document.getElementById("reoccurring").value = ''

}
async function addBill(Obj) {
    const response = await fetch(`${baseUrl}user/${userId}`, {
        method: "POST",
        body: JSON.stringify(Obj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        window.location.replace("http://localhost:8080/main.html")
    }
}

 submitForm.addEventListener("submit", handleSubmit)
