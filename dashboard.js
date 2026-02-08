// DOM

const userName = document.getElementById("userName")
const userEmail = document.getElementById("userEmail")
const armBurger = document.getElementById("arm-burger")


const username = document.getElementById("username")
const email = document.getElementById("email")
const contact = document.getElementById("contact")
const dis = document.querySelectorAll(".dis")
const cancel = document.getElementById("cancel")
const greetingName = document.getElementById("greetingName")
const coachDisplay = document.getElementById("display-coach")
const membersDisplay = document.getElementById("display-members")
const inventoryDisplay = document.getElementById("inventory-display")


const usernameInput = document.getElementById("usernameInput")
const contactInput = document.getElementById("contactInput")
const emailInput = document.getElementById("emailInput")
const currentPassword = document.getElementById("currentPassword")
const newPassword = document.getElementById("newPassword")
const newRePassword = document.getElementById("newRe-password")
const passwordError = document.getElementById("passwordError")

const saveBtn = document.getElementById("saveBtn")

// Get userToken and users from localStorage
const userToken = JSON.parse(localStorage.getItem("userToken")) || JSON.parse(sessionStorage.getItem("userToken")) || ""
const users = JSON.parse(localStorage.getItem("users"))


// Logged in user variable to store user info
let loggedUser;

function displayUserInfo() {

    // if there is userToken

    if(userToken){

        // filter user data with this userToken
        loggedUser = users.find(f => f.id === userToken)

        // Display the loggedUser username and email
        userName.textContent = loggedUser.username
        userEmail.textContent = loggedUser.email

        // if greetingName display the user FirstName
        if(greetingName) greetingName.textContent = loggedUser.username.split(" ")[0]

    }else{
        // Alert modal. the first argument is message and the second one is the the status of the alert
        showModal("User Not logged in, Redirecting to login....", 'error')
        // Redirect to index.html which is signin page
        location.href = "index.html"
    }
}

// Invoke displayUserInfo Function

displayUserInfo()


// Logout Fuctionality

function logout() {
    // check the localstorage if there is userToken or sessionStorage, 
    if(JSON.parse(localStorage.getItem("userToken")) || JSON.parse(sessionStorage.getItem("userToken"))){
        // Remove the token in localStorage
        localStorage.removeItem("userToken")
        sessionStorage.removeItem("userToken")
    }

    // Redirect to index.html. Which is login page
    location.href = "index.html"
}

// For mobile view. we create an event Listener "click" for the armburger button

armBurger.addEventListener("click", ()=> {
    // create an element called "ul"
    const ul = document.querySelector("ul")
    // if armBurger Button class have "fa-xmark" it should change it from "fa-xmark" to "fa-bars"
    if(armBurger.classList.contains("fa-xmark")){
        armBurger.classList.replace("fa-xmark", "fa-bars")
    }else{
        // and vise versa
        armBurger.classList.replace("fa-bars", "fa-xmark")
    }
    // we toggle to add and remove the classlist called "d-none". which we have already style as display none in our css
    ul.classList.toggle("d-none")
})


// Get coach data from localStorage
const coach = JSON.parse(localStorage.getItem("coach"))

// Display coach data
function displayCoach(){
    coachDisplay.innerHTML = ""

    if(coach.length === 0){
        coachDisplay.innerHTML = "No Coach added yet"
        return
    }

    coach
    ?.slice(0, 3)
    ?.forEach((item, i) => {
        const div = document.createElement("div")
        
        div.innerHTML = `
            <span class="circle">${i}</span>
            <p>${item.coachName}</p>
        `
        coachDisplay.appendChild(div)
    })
}

displayCoach()

// Get members data from localStorage
const members = JSON.parse(localStorage.getItem("members"))

// Display members data
function displayMembers(){
    membersDisplay.innerHTML = ""

    if(members.length === 0){
        membersDisplay.innerHTML = "No Members added yet "
        return
    }

    members
    ?.slice(0, 3)
    ?.forEach((item, i) => {
        const div = document.createElement("div")
        div.innerHTML = `
            <div>
                <div class="circle">${i}</div>
            </div>
            <div>
                <p>${item.name}</p>
            </div>
            <div>
                <i class="fa-solid fa-ellipsis-vertical"></i>
            </div>
        `
        membersDisplay.appendChild(div)
    })
}

displayMembers()

// Get inventory data from localStorage

const inventory = JSON.parse(localStorage.getItem("equipment"))

// Display inventory data
function displayInventory(){
    inventoryDisplay.innerHTML = ""

    console.log(inventory);

    if(inventory.length === 0){
        inventoryDisplay.innerHTML = "No Inventory added yet" 
        return
    }
    

    inventory
    ?.slice(0, 3)
    ?.forEach((item, i) => {
        const div = document.createElement("div")
        div.style.display = 'flex'
        div.style.gap = '10px'
        div.innerHTML = `
            <div>
                <div class="circle">${i}</div>
            </div>
            <div>
                <p>${item.equipmentName}</p>
            </div>
        `
        inventoryDisplay.appendChild(div)
    })
}

displayInventory()

// Modal
// show modal function. it receive two parameter. message and status

function showModal(message, status) {
    const modal = document.getElementById("successModal");
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
    const modal = document.getElementById("successModal");
    modal.style.display = "none"
}
