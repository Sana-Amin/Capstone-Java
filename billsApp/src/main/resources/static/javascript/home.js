const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];


console.log(userId)

const submitForm = document.getElementById("bill-form")
const billContainer = document.getElementById("bill-container")

let totalBill = document.getElementById("bill-totalAmount")

let billName = document.getElementById("name-text")
let billDollarAmount = document.getElementById("billAmount-text")
let billDueDate = document.getElementById("dueDate-text")
let billPaidDate = document.getElementById("paidDate-text")
let billPaid = document.getElementById("paid-text")
let billReoccurring = document.getElementById("reoccurring-text")
let updateBillBtn = document.getElementById('update-bill-button')

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
    getBillTotal(userId);
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

async function getBillById(billId){
    await fetch(baseUrl + billId, {
        method: "GET",
        headers: headers
    })
        .then(res => res.json())
        .then(data => populateModal(data))
        .catch(err => console.error(err.message))
}

async function getBillTotal (userId){
    await fetch(`${baseUrl}user/${userId}/total`, {
            method: "Get",
            headers: headers
    })
        .then(res => res.json())
        .then(data => populateTotal(data))
        .catch(err => console.error(err.message))

}


async function handleBillEdit(billId){
    let bodyObj = {
        id: billId,
        name: billName.value,
        billAmount: billDollarAmount.value,
        dueDate: billDueDate.value,
        paidDate: billPaidDate.value,
        paid: billPaid.checked,
        reoccurring: billReoccurring.checked

    }

    await fetch(baseUrl, {
        method: "PUT",
        body: JSON.stringify(bodyObj),
        headers: headers
    })
        .catch(err => console.error(err))

    return getBills(userId);
}


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
                <P id = "name-innertext">${obj.name}</P>
                <P id = "billAmount-innertext">${obj.billAmount}</P>
                <P id = "dueDate-innertext">${obj.dueDate}</P>
                <P id = "paidDate-innertext">${obj.paidDate}</P>
                <P id = "paid-innertext">${obj.paid}</P>
                <P id = "reoccurring-innertext">${obj.reoccurring}</P>
                <div class="d-flex justify-content-between">
                        <button class="btn btn-danger" onclick="handleDelete(${obj.id})">Delete</button>
                        <button onclick="getBillById(${obj.id})" type="button" class="btn btn-primary" 
                        data-bs-toggle="modal" data-bs-target="#bill-edit-modal">
                        Edit
                        </button>
                    </div>
               </div>
            </div>
        `
        billContainer.prepend(billCard);
    })
}

function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

const populateModal = (obj) =>{
    billName.value = ''
    billName.value = obj.name
    billDollarAmount.value = ''
    billDollarAmount.value = obj.billAmount
    billDueDate.value = ''
    billDueDate.value = obj.dueDate
    billPaidDate.value = ''
    billPaidDate.value = obj.paidDate
    billPaid.checked = obj.paid
    billReoccurring.checked = obj.reoccurring
    updateBillBtn.setAttribute('data-bill-id', obj.id)
}

const populateTotal = (obj) => {
    console.log(obj)
    totalBill.innerText = ''
    totalBill.innerText = obj
}

getBillTotal(userId);

getBills(userId);

submitForm.addEventListener("submit", handleSubmit)

updateBillBtn.addEventListener("click", (e)=>{
    let billId = e.target.getAttribute('data-bill-id')
    handleBillEdit(billId);
})