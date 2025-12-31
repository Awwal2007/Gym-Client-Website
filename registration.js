const userName = document.getElementById("userName")
const userEmail = document.getElementById("userEmail")
const form = document.querySelector("form")
const armBurger = document.getElementById("arm-burger")
// form input

const nameOfPartInp = document.getElementById("nameOfPartInp")
const nameOfPartInpErr = document.getElementById("nameOfPartInpErr")
const emailOfPartInp = document.getElementById("emailOfPartInp")
const emailOfPartInpErr = document.getElementById("emailOfPartInpErr")
const planInp = document.getElementById("planInp")
const planInpErr = document.getElementById("planInpErr")
const priceInp = document.getElementById("priceInp")
const priceInpErr = document.getElementById("priceInpErr")
const dateOfJoinInp = document.getElementById("dateOfJoinInp")
const dateOfJoinInpErr = document.getElementById("dateOfJoinInpErr")
const contactNumInp = document.getElementById("contactNumInp")
const contactNumInpErr = document.getElementById("contactNumInpErr")


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

    ul.classList.toggle("d-none")
})


let members = JSON.parse(localStorage.getItem("members")) || []

form.addEventListener("submit", async(e)=> {    
    e.preventDefault()
    nameOfPartInpErr.textContent = ""
    emailOfPartInpErr.textContent = ""
    planInpErr.textContent = ""
    priceInpErr.textContent = ""
    dateOfJoinInpErr.textContent = ""
    contactNumInpErr.textContent = ""

    if(!nameOfPartInp.value.trim()){
        nameOfPartInpErr.textContent = "Name is required"
        return
    }
    if(!emailOfPartInp.value.trim()){
        emailOfPartInpErr.textContent = "Email is required"
        return
    }
    if(!planInp.value.trim()){
        planInpErr.textContent = "Plan is required"
        return
    }
    if(!priceInp.value.trim()){
        priceInpErr.textContent = "Price is required"
        return
    }
    if(!dateOfJoinInp.value.trim()){
        dateOfJoinInpErr.textContent = "Date is required"
        return
    }
    if(!contactNumInp.value.trim()){
        contactNumInpErr.textContent = "Contact is required"
        return
    }


    const id =`SFM${Math.floor(Math.random() * 10000)}${members.length + 1}` 

    console.log(id);

    let details = {
        id: id,
        name: nameOfPartInp.value.trim(),
        email: emailOfPartInp.value.trim(),
        plan: planInp.value.trim(),
        price: priceInp.value.trim(),
        date: dateOfJoinInp.value,
        contact: contactNumInp.value.trim()
    }


    members.push(details)
    await saveMembers()

    alert("Registration successfull")


    form.reset()

    nameOfPartInpErr.textContent = ""
    emailOfPartInpErr.textContent = ""
    planInpErr.textContent = ""
    priceInpErr.textContent = ""
    dateOfJoinInpErr.textContent = ""
    contactNumInpErr.textContent = ""

})



function saveMembers(){
    localStorage.setItem("members", JSON.stringify(members))
}
