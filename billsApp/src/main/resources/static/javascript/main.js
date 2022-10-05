const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

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

function trueOrFalse(value) {
    if(value == true ){
        return "Yes"
    }else if( value == false){
        return "No"
    }
}


tableBody = document.getElementById("table-body")

const createBillCards = (array) => {

tableBody.innerHTML= ""
    array.forEach(obj => {
        let billRow = `<tr>
     
      <td id = "name-innertext">${obj.name}</td>
      <td id = "billAmount-innertext">$${obj.billAmount}</td>
      <td id = "dueDate-innertext">${obj.dueDate}</td>
      <td id = "paidDate-innertext">${obj.paidDate}</td>

      <td id = "paid-innertext">${trueOrFalse(obj.paid)}</td>
      <td id = "reoccurring-innertext">${trueOrFalse(obj.reoccurring)}</td>
      <td> 
      <button class="btn btn-danger" onclick="handleDelete(${obj.id})">🗑</button>
      </td>
      <td> 
      <button onclick="getBillById(${obj.id})" type="button" class="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#bill-edit-modal">
                        ✎
                        </button>
      </td>
    </tr>`

        tableBody.innerHTML += billRow;
    })
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
    totalBill.innerText = ''
    totalBill.innerText = `Your total bill is $${obj.toFixed(2)}`
}

getBillTotal(userId);

getBills(userId);

updateBillBtn.addEventListener("click", (e)=>{
    let billId = e.target.getAttribute('data-bill-id')
    handleBillEdit(billId);
})