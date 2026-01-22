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

// display user informations
function displayUserInfo() {

    if(userToken){

        loggedUser = users.find(f=> f.id === userToken)


        userName.textContent = loggedUser.username
        userEmail.textContent = loggedUser.email
    }else{
        showModal("User Not logged in, Redirecting to login....", "error")
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


// arm Burger event listener click for the mobile view of the website
armBurger.addEventListener("click", ()=> {
    const ul = document.querySelector("ul")
    if(armBurger.classList.contains("fa-xmark")){
        armBurger.classList.replace("fa-xmark", "fa-bars")
    }else{
        armBurger.classList.replace("fa-bars", "fa-xmark")
    }
    ul.classList.toggle("d-none")
})


// A variable that is an empty array and also payment data from the local storage
let payment = JSON.parse(localStorage.getItem("payment")) || []


// Form event listener to collect the input value in the form
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

    showModal("Payment successfull", "success")

    form.reset()
    
    nameOfMemErr.textContent = ""
    dateJoinErr.textContent = ""
    planErr.textContent = ""
    priceErr.textContent = ""

})


// Function to save to localstorage

function saveToLocalStorage(){
    localStorage.setItem("payment", JSON.stringify(payment))
}



// alert Modal

function showModal(message, status) {
  const modal = document.getElementById("successModal");
  modal.style.display = "flex";

  const modalMain = document.getElementById("modal-main");
  modalMain.textContent = `${status.charAt(0).toUpperCase() + status.slice(1)}!`;

  if(status === "error"){
    modalMain.style.color = "red"
  }else if(status === "success"){
    modalMain.style.color = "green"
  }else{
    modalMain.style.color = "yellow"
  }


  const modalMessage = document.getElementById("modal-message");
  modalMessage.textContent = `${message}`;

  setTimeout(() => {
    modal.style.display = "none";
  }, 8000);
}

// close Modal
function closeModal(){
    modal.style.display = "none"
}