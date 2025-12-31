const username = document.getElementById('username')
const email = document.getElementById("email")
const password = document.getElementById("password")
const reTypePassword = document.getElementById("reTypePassword")
const terms = document.getElementById("terms")
const form = document.getElementById("form")
const usernameErr = document.getElementById("usernameErr")
const emailErr = document.getElementById("emailErr")
const passwordErr = document.getElementById("passwordErr")
const retypePassErr = document.getElementById("retypePassErr")
const checkboxErr = document.getElementById("checkboxErr")
const eyeIcon = document.getElementById("eye-icon")
const eyeIcon2 = document.getElementById("eye-icon2")


let userDetils = JSON.parse(localStorage.getItem("users")) || [];


function saveDetails(){
    localStorage.setItem("users", JSON.stringify(userDetils))
}

function retrieveEmailFromParams(){
    const params = new URLSearchParams(window.location.search)
    const paramsEmail = params.get("email")
    const paramsPassword = params.get("pass")
    if(paramsEmail) email.value = paramsEmail
    if(paramsPassword) password.value = paramsPassword
}

retrieveEmailFromParams()

eyeIcon.addEventListener("click", ()=>{
    if(password.type === "password"){
        password.type = "text"
        eyeIcon.className = "fa-regular fa-eye-slash eye-icon"        
    }else if(password.type === "text"){
        password.type = "password"
        eyeIcon.className = "fa-regular fa-eye eye-icon"
    }
})


eyeIcon2.addEventListener("click", ()=>{
    if(reTypePassword.type === "password"){
        reTypePassword.type = "text"
        eyeIcon2.className = "fa-regular fa-eye-slash eye-icon"      
    }else if(reTypePassword.type === "text"){
        reTypePassword.type = "password"
        eyeIcon2.className = "fa-regular fa-eye eye-icon"        
    }
})


form.addEventListener("submit", (e)=>{
    e.preventDefault()

    usernameErr.textContent = ""
    passwordErr.textContent = ""
    emailErr.textContent = ""
    retypePassErr.textContent = ""

    if(!username.value.trim()){
        usernameErr.textContent = "Username is required"
        return
    }
    if(!email.value.trim()){
        emailErr.textContent = "Email is required"
        return
    }
    if(!password.value.trim()){
        passwordErr.textContent = "Password is required"
        return
    }
    if(!reTypePassword.value.trim()){
        retypePassErr.textContent = "Retype Password is required"
        return
    }


    if(password.value.length < 8){
        passwordErr.textContent = "Password must be up to 8 digits"
        return;
    }

    if(password.value !== reTypePassword.value){
        passwordErr.textContent = "Passwords does not match"
        password.textContent = "Passwords does not match"
        return;
    }

    if(!terms.checked){
        checkboxErr.textContent = "You must accept the terms and conditon"
        return
    }

    const id = new Date * Math.floor(Math.random() * 100)

    let details = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        id: id
    }

    console.log(details.id);
    

    const find = userDetils.find(ele => {
        const exist = ele.email === details.email
        return exist
    })

    if(find){
        emailErr.textContent = "Email already exist"
        return
    }else{
        userDetils.push(details)
        saveDetails()
        alert("Signup Successful")        
    }
    
    location.href = "index.html"
    
    form.reset()

    usernameErr.textContent = ""
    passwordErr.textContent = ""
    emailErr.textContent = ""
    retypePassErr.textContent = ""

})






