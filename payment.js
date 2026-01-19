const form = document.querySelector("form")
const nameOfMemInp = document.getElementById("nameOfMemInp")
const dateJoinInp = document.getElementById("dateJoinInp")
const planInp = document.getElementById("planInp")
const priceInp = document.getElementById("priceInp")

const nameOfMemErr = document.getElementById("nameOfMemErr")
const dateJoinErr = document.getElementById("dateJoinErr")
const planErr = document.getElementById("planErr")
const priceErr = document.getElementById("priceErr")







const userName = document.getElementById("userName")
const userEmail = document.getElementById("userEmail")
const armBurger = document.getElementById("arm-burger")

const userToken = JSON.parse(localStorage.getItem("userToken")) || JSON.parse(sessionStorage.getItem("userToken")) || ""
const users = JSON.parse(localStorage.getItem("users"))
let loggedUser;

function displayUserInfo() {

    if(userToken){

        loggedUser = users.find(f=> f.id === userToken)


        userName.textContent = loggedUser.username
        userEmail.textContent = loggedUser.email
    }else{
        alert("User Not logged in, Redirecting to login....")
        location.href = "index.html"
    }
}

displayUserInfo()


// Logout Fuctionality

function logout() {
    if(JSON.parse(localStorage.getItem("userToken")) || JSON.parse(sessionStorage.getItem("userToken"))){
        localStorage.removeItem("userToken")
        sessionStorage.removeItem("userToken")
    }

    location.href = "index.html"
}


armBurger.addEventListener("click", ()=> {
    const ul = document.querySelector("ul")
    if(armBurger.classList.contains("fa-xmark")){
        armBurger.classList.replace("fa-xmark", "fa-bars")
    }else{
        armBurger.classList.replace("fa-bars", "fa-xmark")
    }
    ul.classList.toggle("d-none")
})

let payment = JSON.parse(localStorage.getItem("payment")) || []


form.addEventListener("submit", async(e)=> {
    e.preventDefault()
    nameOfMemErr.textContent = ""
    dateJoinErr.textContent = ""
    planErr.textContent = ""
    priceErr.textContent = ""


    const paymentData = {
        name: nameOfMemInp.value.trim(),
        date: dateJoinInp.value.trim(),
        plan: planInp.value.trim(),
        price: priceInp.value.trim()
    }


    payment.push(paymentData)

    saveToLocalStorage()

    alert("Payment successfull")

    form.reset()
    
    nameOfMemErr.textContent = ""
    dateJoinErr.textContent = ""
    planErr.textContent = ""
    priceErr.textContent = ""

})


function saveToLocalStorage(){
    localStorage.setItem("payment", JSON.stringify(payment))
}