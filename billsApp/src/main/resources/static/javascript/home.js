const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];
console.log(cookieArr);
console.log(cookieArr[1]);
console.log(document.cookie.split(":"));

console.log(userId)

const submitForm = document.getElementById("bill-form")
const billContainer = document.getElementById("bill-container")


const headers = {
    'Content-Type': 'application/json'
}

const baseUrl = "http://localhost:8080/api/v1/bills/"

const handleSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        name: document.getElementById("name-input").value,
        bill: document.getElementById("bill-input").value,
        dueDate: document.getElementById("due-date").value,
        paidDate: document.getElementById("paid-date").value,
        paid: document.getElementById("paid").value,
        reoccurring: document.getElementById("reoccurring").value,
        image: document.getElementById("image-url").value
    }
    await addBill(bodyObj);
    document.getElementById("name-input").value = ''
    document.getElementById("bill-input").value = ''
    document.getElementById("due-date").value = ''
    document.getElementById("paid-date").value = ''
    document.getElementById("paid").value = ''
    document.getElementById("reoccurring").value = ''
    document.getElementById("image-url").value = ''
}
async function addBill(bodyObj) {
    const response = await fetch(`${baseUrl}user/${userId}`, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err.message))
    if (response.status == 200) {
        return getBills(userId);
    }


}
async function getBills(userId) {
    await fetch(`${baseUrl}user/${userId}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createBillCards(data))
        .catch(err => console.error(err))
}

const createBillCards = (array) => {
    billContainer.innerHTML = ''
    array.forEach(obj => {
        let billCard = document.createElement("div")
        billCard.classList.add("m-2")
        billCard.innerHTML = `
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column  justify-content-between" style="height: available">
                <textarea name="" id="" cols="30" rows="10">${obj.body}</textarea>
               </div>
            </div>
        `
        billContainer.append(billCard);
    })
}



function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}


getBills(userId);

submitForm.addEventListener("submit", handleSubmit)