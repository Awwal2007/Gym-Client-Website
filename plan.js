const userName = document.getElementById("userName")
const userEmail = document.getElementById("userEmail")
const armBurger = document.getElementById("arm-burger")

const planNameInp = document.getElementById("planNameInp")
const planAmountInp = document.getElementById("planAmountInp")
const validityInp = document.getElementById("validityInp")
const planValidityErr = document.getElementById("planValidityErr")
const planAmountErr = document.getElementById("planAmountErr")
const planNameErr = document.getElementById("planNameErr")
const tbody = document.querySelector("table tbody")
const saveBtn = document.getElementById("saveBtn")
const submitEdited = document.getElementById("submitEdited")
const cancelBtn = document.getElementById("cancelBtn")
const searchInp = document.getElementById("searchInp")
const searchBtn = document.getElementById("searchBtn")
const form = document.querySelector("form")
const select = document.querySelector("select")





const userToken = JSON.parse(localStorage.getItem("userToken")) || JSON.parse(sessionStorage.getItem("userToken")) || ""
const users = JSON.parse(localStorage.getItem("users"))
let loggedUser;

function displayUserInfo() {

    if(userToken){

        loggedUser = users.find(f=> f.id === userToken)


        userName.textContent = loggedUser.username
        userEmail.textContent = loggedUser.email
        // greetingName.textContent = loggedUser.username.split(" ")[0]
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



let plan = JSON.parse(localStorage.getItem("plan")) || [];
let filteredPlan = [];

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    planNameErr.textContent = ""
    planAmountErr.textContent = ""
    planValidityErr.textContent = ""

    if(!planNameInp.value.trim()){
        planNameErr.style.color = "red"
        planNameErr.textContent = "Plan Name is Required"
        return
    }
    if(!planAmountInp.value.trim()){
        planAmountErr.style.color = "red"
        planAmountErr.textContent = "Plan Amount is Required"
        return
    }
    if(!validityInp.value.trim()){
        planValidityErr.style.color = "red"
        planValidityErr.textContent = "Plan Validity is Required"
        return
    }

    const id = Math.floor(Math.random()*1000)
    const date = new Date()


    let formData = {
        id: id,
        planName: planNameInp.value.trim(),
        planAmount: planAmountInp.value.trim(),
        planValidity: validityInp.value.trim(),
        createdAt: date
    }

    console.log(formData);

    plan.push(formData)
    savePlanToLocalStorage()

    planNameErr.textContent = ""
    planAmountErr.textContent = ""
    planValidityErr.textContent = ""

    form.reset()
    displayPlan(plan)
    
})

function savePlanToLocalStorage (){
    localStorage.setItem("plan", JSON.stringify(plan))
}


function displayPlan(data){
    
    tbody.innerHTML = ""


    if(data.length === 0){
        tbody.innerHTML = "No item match your search"
        return
    }
    
    data
    // .reverse()
    ?.slice(0, select.value)
    ?.forEach(item => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${item.planName}</td>
            <td>${item.planValidity}</td>
            <td>${item.planAmount}</td>
            <td>
                <button onclick="edit(${item.id})" class="editBtn">Edit</button>
            </td>
        `
        tbody.appendChild(tr)
    })
    
    
}

displayPlan(plan)

function searchByName(){
    const searchQuery = searchInp.value.toLowerCase()

    const filtered = plan.filter((item) => {
        return item.planName.toLowerCase().includes(searchQuery)
    })

    filteredPlan = filtered    

    displayPlan(filteredPlan)
}

// clear the filtered when nothing is input in the search input

searchInp.addEventListener("input", (e) => {
  if (!e.target.value.trim()) {
    filteredPlan = [];
  }
});

cancelBtn.addEventListener("click", ()=>{
    submitEdited.style.display = "none"
    saveBtn.style.display = "inline"
    form.reset()
})

select.addEventListener('change', ()=>{
    displayPlan(plan)
})


submitEdited.addEventListener("click", async ()=>{

    planNameErr.textContent = ""
    planAmountErr.textContent = ""
    planValidityErr.textContent = ""

    if(!planNameInp.value.trim()){
        planNameErr.style.color = "red"
        planNameErr.textContent = "Plan Name is Required"
        return
    }
    if(!planAmountInp.value.trim()){
        planAmountErr.style.color = "red"
        planAmountErr.textContent = "Plan Amount is Required"
        return
    }
    if(!validityInp.value.trim()){
        planValidityErr.style.color = "red"
        planValidityErr.textContent = "Plan Validity is Required"
        return
    }
    
    const id = Math.floor(Math.random()*1000)
    const date = new Date()

    let updatedData = {
        id: id,
        planName: planNameInp.value.trim(),
        planAmount: planAmountInp.value.trim(),
        planValidity: validityInp.value.trim(),
        createdAt: date
    }

    plan.push(updatedData)

    await savePlanToLocalStorage()

    form.reset()
    displayPlan()
})


function edit(id){
    submitEdited.style.display = "inline"
    saveBtn.style.display = "none"


    const find = plan.find(item => {
        return item.id === id
    })

    planNameInp.value = find.planName    
    planAmountInp.value = find.planAmount    
    validityInp.value = find.planValidity


    const remainingPlan = plan.filter(item => item.id !== id)
    
    plan = remainingPlan
}


// Modal
const modal = document.getElementById("successModal");

function showModal(message, status) {
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
  }, 4000);
}

function closeModal(){
    modal.style.display = "none"
}


