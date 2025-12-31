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

const usernameInput = document.getElementById("usernameInput")
const contactInput = document.getElementById("contactInput")
const emailInput = document.getElementById("emailInput")
const currentPassword = document.getElementById("currentPassword")
const newPassword = document.getElementById("newPassword")
const newRePassword = document.getElementById("newRe-password")
const passwordError = document.getElementById("passwordError")

const saveBtn = document.getElementById("saveBtn")


const userToken = JSON.parse(localStorage.getItem("userToken")) || JSON.parse(sessionStorage.getItem("userToken")) || ""
const users = JSON.parse(localStorage.getItem("users"))
let loggedUser;

function displayUserInfo() {

    if(userToken){

        loggedUser = users.find(f=> f.id === userToken)


        userName.textContent = loggedUser.username
        userEmail.textContent = loggedUser.email
        if(greetingName) greetingName.textContent = loggedUser.username.split(" ")[0]

        if(username && email){
            username.textContent = loggedUser.username
            email.textContent = loggedUser.email
        }
        if(loggedUser.contact && contact){
            contact.textContent = loggedUser.contact
        }
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

    ul.classList.toggle("d-none")
})


// Admin profile

// edit profile

updateProfile.addEventListener("click", ()=>{
    
    dis.forEach((item)=>{
        item.disabled = false        
    })

    saveBtn.disabled = false

    usernameInput.value = loggedUser.username
    emailInput.value = loggedUser.email
    if(loggedUser.contact)   contactInput.value = loggedUser.contact
})

function cancelDisabled() {

    dis.forEach((item)=>{
        item.disabled = true
        saveBtn.disabled = true
    })

    usernameInput.value = ""
    contactInput.value = ""
    emailInput.value = ""
    currentPassword.value = ""
    newPassword.value = ""
    newRePassword.value = ""

}




async function updateUserDetails (){

    if(!usernameInput.value.trim() && !contactInput.value.trim() && !emailInput.value.trim()){
        alert("invalid input")
        return
    }


    const storedUser = JSON.parse(localStorage.getItem("users"))
    const remainingUser = storedUser.filter(i=> i.id !== loggedUser.id)
    const user = storedUser.find(i=> i.id === loggedUser.id)

    const updatedUser = {...user, username: usernameInput.value.trim(), contact: contactInput.value.trim(), email: emailInput.value.trim()}   
    
    // const updated = localStorage.setItem("users", JSON.stringify())
    const allUsers = [...remainingUser, updatedUser]

    if(JSON.parse(localStorage.getItem("userToken"))){
        localStorage.setItem("users", JSON.stringify(allUsers))
    }else if(JSON.parse(sessionStorage.getItem("userToken"))){
        localStorage.setItem("users", JSON.stringify(allUsers))
    }else{
        alert("Login expired.. Please login again")
    }

    


    // const newLoggedUser = storedUser.find(i=> i.id === loggedUser.id)
    // localStorage.setItem("loggedUser", JSON.stringify(newLoggedUser))
    window.location.reload()
    alert("Info Changed Successfully")
    usernameInput.value = ""
    contactInput.value = ""
    emailInput.value = ""
    
    dis.forEach((i)=> {
        i.disabled = true
    })
}

async function updateUserPass() {
    passwordError.textContent = ""

    if(newPassword.value.length < 8){
        passwordError.textContent = "Password must be up to 8 digits"
        return;
    }

    if(!newPassword.value.trim() && !newRePassword.value.trim() && !currentPassword.value.trim()){
        alert("invalid input")
        return
    }

    if(newPassword.value.trim() !== newRePassword.value.trim()){
        passwordError.textContent = "Password and Retype password does not match"
        return
    }


    
    
    
    
    const storedUser = JSON.parse(localStorage.getItem("users"))
    const remainingUser = storedUser.filter(i=> i.id !== loggedUser.id)
    const user = storedUser.find(i=> i.id === loggedUser.id)
    

    console.log(user.password);
    console.log(currentPassword.password);
    
    if(currentPassword.value.trim() !== user.password){
        passwordError.textContent = "Current password is incorrect"
        return
    }


    const updatedUser = {...user, password: newPassword.value.trim()}   

    // const updated = localStorage.setItem("users", JSON.stringify())
    const allUsers = [...remainingUser, updatedUser]

    if(JSON.parse(localStorage.getItem("userToken"))){
        localStorage.setItem("users", JSON.stringify(allUsers))
    }else if(JSON.parse(sessionStorage.getItem("userToken"))){
        localStorage.setItem("users", JSON.stringify(allUsers))
    }else{
        alert("Login expired.. Please login again")
    }

    


    // const newLoggedUser = storedUser.find(i=> i.id === loggedUser.id)
    // localStorage.setItem("loggedUser", JSON.stringify(newLoggedUser))
    window.location.reload()
    alert("Password Changed Successfully")
    newPassword.value = ""
    newRePassword.value = ""
    currentPassword.value = ""
    passwordError.textContent = ""
    
    dis.forEach((i)=> {
        i.disabled = true
    })
}