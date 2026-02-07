// DOM

const userName = document.getElementById("userName")
const userEmail = document.getElementById("userEmail")
const armBurger = document.getElementById("arm-burger")


const username = document.getElementById("username")
const email = document.getElementById("email")
const contact = document.getElementById("contact")
const updateProfile = document.getElementById("updateProfile")
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
        loggedUser = users.find(f=> f.id === userToken)

        userName.textContent = loggedUser.username
        userEmail.textContent = loggedUser.email
        // if greetingName display the user FirstName
        if(greetingName) greetingName.textContent = loggedUser.username.split(" ")[0]

        // for Admin profile page. display username and email
        if(username && email){
            username.textContent = loggedUser.username
            email.textContent = loggedUser.email
        }
        // for Admin profile page. if there is contact, display it
        if(loggedUser.contact && contact){
            contact.textContent = loggedUser.contact
        }
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




// Admin profile

// edit profile


updateProfile.addEventListener("click", ()=>{
    
    dis.forEach((item)=>{
        item.disabled = false        
    })

    const changeBtn = document.getElementById("change-btn")

    changeBtn.disabled = false
    saveBtn.disabled = false

    usernameInput.value = loggedUser.username
    emailInput.value = loggedUser.email
    if(loggedUser.contact)   contactInput.value = loggedUser.contact
})

// Add disabled from the input and also add disabled to the save button and change button

function cancelDisabled() {

    dis.forEach((item)=>{
        item.disabled = true
    })

    saveBtn.disabled = true

    const changeBtn = document.getElementById("change-btn")
    changeBtn.disabled = true

    usernameInput.value = ""
    contactInput.value = ""
    emailInput.value = ""
    currentPassword.value = ""
    newPassword.value = ""
    newRePassword.value = ""

}



// Update user details
async function updateUserDetails (){
    // Validate the input field
    if(!usernameInput.value.trim() && !contactInput.value.trim() && !emailInput.value.trim()){
        showModal("Invalid Input", "error")
        return
    }

    // get all users in the localstorage
    const storedUser = JSON.parse(localStorage.getItem("users"))
    // get all users except the current logged in user using filter method 
    
    const remainingUser = storedUser.filter(i => i.id !== loggedUser.id)
    
    // get the current user data
    const user = storedUser.find(i=> i.id === loggedUser.id)

    // update user details by using spread operator and add the new details from user input
    const updatedUser = {...user, username: usernameInput.value.trim(), contact: contactInput.value.trim(), email: emailInput.value.trim()}   
    
    // Put the remaining User and the updated user in an array using spread operator
    const allUsers = [...remainingUser, updatedUser]


    // Check if the user is logged in again and save all users to the localStorage
    if(JSON.parse(localStorage.getItem("userToken"))){
        localStorage.setItem("users", JSON.stringify(allUsers))
    }else if(JSON.parse(sessionStorage.getItem("userToken"))){
        localStorage.setItem("users", JSON.stringify(allUsers))
    }else{
        showModal("Login expired.. Please login again", "error")
        return
    }

    


    // Show modal. the first one is message and the second one is the message status
    showModal("Info Changed Successfully", 'success')

    // Reinvoke the displayUserInfo function after it successfull
    displayUserInfo()

    // Clear the input field
    usernameInput.value = ""
    contactInput.value = ""
    emailInput.value = ""
    

    // make all the input disabled
    dis.forEach((i)=> {
        i.disabled = true
    })

}

// Update user password

async function updateUserPass() {
    
    passwordError.textContent = ""
    
    // Check if the password is less than 8 and return an error message
    if(newPassword.value.length < 8){
        passwordError.textContent = "Password must be up to 8 digits"
        return;
    }

    // Validate all the input field
    
    if(!newPassword.value.trim() && !newRePassword.value.trim() && !currentPassword.value.trim()){
        passwordError.textContent = "Invalid Input"
        return
    }

    // Check if the new password and the new retype password is not correct and return and error message
    if(newPassword.value.trim() !== newRePassword.value.trim()){
        passwordError.textContent = "Password and Retype password does not match"
        return
    }
       
    
    
    // Get all users from the localStorage
    const storedUser = JSON.parse(localStorage.getItem("users"))
    // Get all users except the loggedin user
    const remainingUser = storedUser.filter(i=> i.id !== loggedUser.id)
    // Get the loggedin user
    const user = storedUser.find(i=> i.id === loggedUser.id)
    
    
    // Check if the current password is correct with the password user password. If not return an error message 
    if(currentPassword.value.trim() !== user.password){
        passwordError.textContent = "Current password is incorrect"
        return
    }
    
    // update the password
    const updatedUser = {...user, password: newPassword.value.trim()}   
    
    // const updated = localStorage.setItem("users", JSON.stringify())
    // 
    const allUsers = [...remainingUser, updatedUser]
    
    if(JSON.parse(localStorage.getItem("userToken"))){
        localStorage.setItem("users", JSON.stringify(allUsers))
    }else if(JSON.parse(sessionStorage.getItem("userToken"))){
        localStorage.setItem("users", JSON.stringify(allUsers))
    }else{
        showModal("Login expired.. Please login again", "error")
    }
    
    
    
    
    // const newLoggedUser = storedUser.find(i=> i.id === loggedUser.id)
    // localStorage.setItem("loggedUser", JSON.stringify(newLoggedUser))
    window.location.reload()
    showModal("Password Changed Successfully", "success")
    
    newPassword.value = ""
    newRePassword.value = ""
    currentPassword.value = ""
    passwordError.textContent = ""

    const changeBtn = document.getElementById("change-btn")
    changeBtn.disabled = true
    
    dis.forEach((i)=> {
        i.disabled = true
    })
}



// Modal
// show modal function. it receive two parameter. message and status
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



  const modalMessage = document.getElementById("modal-message");
  modalMessage.textContent = `${message}`;

  setTimeout(() => {
    modal.style.display = "none";
  }, 4000);
}

function closeModal(){
    modal.style.display = "none"
}
