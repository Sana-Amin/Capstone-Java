const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];


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
        billAmount: document.getElementById("bill-input").value,
        dueDate: document.getElementById("due-date").value,
        paidDate: document.getElementById("paid-date").value,
        paid: document.getElementById("paid").checked,
        reoccurring: document.getElementById("reoccurring").checked,
        // image: document.getElementById("image-url").value
    }
    await addBill(bodyObj);
    document.getElementById("name-input").value = ''
    document.getElementById("bill-input").value = ''
    document.getElementById("due-date").value = ''
    document.getElementById("paid-date").value = ''
    document.getElementById("paid").value = ''
    document.getElementById("reoccurring").value = ''
    // document.getElementById("image-url").value = ''
}
async function addBill(Obj) {
    const response = await fetch(`${baseUrl}user/${userId}`, {
        method: "POST",
        body: JSON.stringify(Obj),
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

async function handleDelete(billId){
    await fetch(baseUrl + billId, {
        method: "DELETE",
        headers: headers
    })
        .catch(err => console.error(err))

    return getBills(userId);
}

// async function getBillById(billId){
//     await fetch(baseUrl + billId, {
//         method: "GET",
//         headers: headers
//     })
//         .then(res => res.json())
//         .then(data => populateModal(data))
//         .catch(err => console.error(err.message))
// }

const createBillCards = (array) => {
    billContainer.innerHTML = ''
    array.forEach(obj => {
        console.log(obj)
        console.log(obj.name)
        let billCard = document.createElement("div")
        billCard.classList.add("m-2")
        billCard.innerHTML = `
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column  justify-content-between" style="height: available">
                <P class = "card-text">${obj.name}</P>
                <P class = "card-text">${obj.dueDate}</P>
                <P class = "card-text">${obj.billAmount}</P>
                <P class = "card-text">${obj.paidDate}</P>
                <P class = "card-text">${obj.paid}</P>
                <P class = "card-text">${obj.reoccurring}</P>
               </div>
               <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
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