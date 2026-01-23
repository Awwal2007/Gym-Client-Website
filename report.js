const tbody = document.querySelector("table tbody")




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

armBurger.addEventListener("click", ()=> {
    const ul = document.querySelector("ul")
    if(armBurger.classList.contains("fa-xmark")){
        armBurger.classList.replace("fa-xmark", "fa-bars")
    }else{
        armBurger.classList.replace("fa-bars", "fa-xmark")
    }
    ul.classList.toggle("d-none")
})

let filteredPayment = [];

const payments = JSON.parse(localStorage.getItem("payment"))

function displayPayment(payment){
    tbody.innerHTML = ""
    if(payment.length === 0){
        tbody.innerHTML = "No item found"
        return
    }

    payment.forEach(item => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.date}</td>
            <td>${item.plan}</td>
            <td>${item.price}</td>
        `
        tbody.appendChild(tr)
    })
}

displayPayment(payments)

function searchByName(){
    const searchQuery = searchInp.value.toLowerCase()



    const filtered = payments.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery)
    })

    filteredPayment = filtered    

    displayPayment(filteredPayment)
}

// clear the filtered when nothing is input in the search input

searchInp.addEventListener("input", (e) => {
  if (!e.target.value.trim()) {
    filteredCoach = [];
  }
});

select.addEventListener('change', ()=>{
    displayPayment(payments)
})


// Modal
const modal = document.getElementById("successModal");

function showModal(message, status) {
  modal.style.display = "flex";

  const modalMain = document.getElementById("modal-main");
  let emoji;

   if(status === "error"){
    modalMain.style.color = "red"
    emoji = "❌"
  }else if(status === "success"){
    modalMain.style.color = "green"
    emoji = "🎉"
  }else{
    modalMain.style.color = "yellow"
  }


  modalMain.textContent = `${emoji}${status.charAt(0).toUpperCase() + status.slice(1)}!`;
  

     if(status === "error"){
    modalMain.style.color = "red"
    emoji = "❌"
  }else if(status === "success"){
    modalMain.style.color = "green"
    emoji = "🎉"
  }else{
    modalMain.style.color = "yellow"
  }




  const modalMessage = document.getElementById("modal-message");
  modalMessage.textContent = `${message}`;

  setTimeout(() => {
    modal.style.display = "none";
  }, 4000);
}

function closeModal(){
    modal.style.display = "none"
}
