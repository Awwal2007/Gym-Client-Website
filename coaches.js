const userName = document.getElementById("userName")
const userEmail = document.getElementById("userEmail")
const armBurger = document.getElementById("arm-burger")

const coachNameInp = document.getElementById("coachNameInp")
const contactInp = document.getElementById("contactInp")
const validityInp = document.getElementById("validityInp")
const validityInpErr = document.getElementById("validityInpErr")
const contactInpErr = document.getElementById("contactInpErr")
const coachNameErr = document.getElementById("coachNameErr")
const tbody = document.querySelector("table tbody")
const saveBtn = document.getElementById("saveBtn")
const submitEdited = document.getElementById("submitEdited")
const cancelBtn = document.getElementById("cancelBtn")
const searchInp = document.getElementById("searchInp")
const searchBtn = document.getElementById("searchBtn")
const form = document.querySelector("form")
const select = document.querySelector(".entity select")

const imageInpt = document.getElementById("imageInpt")
const selectedImageName = document.getElementById("selectedImageName")
const previewImage = document.getElementById("previewImage")

const addBtn = document.getElementById("addBtn")



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


let coach = JSON.parse(localStorage.getItem("coach")) || [];
let filteredCoach = [];


imageInpt.addEventListener("change", (e)=>{
    

    const file = e.target.files[0]
    selectedImageName.style.maxWidth = "200px"
    selectedImageName.style.textWrap = "wrap"
    selectedImageName.textContent = file ? file.name : "No file chosen"
    if(file){
        previewImage.src = URL.createObjectURL(file);
    }else{
        previewImage.src = ""
    }
})


form.addEventListener("submit", (e)=>{
    e.preventDefault()
    
    coachNameErr.textContent = ""
    contactInpErr.textContent = ""
    validityInpErr.textContent = ""

    if(!coachNameInp.value.trim()){
        coachNameErr.style.color = "red"
        coachNameErr.textContent = "Coach Name is Required"
        return
    }

    if(!contactInp.value.trim()){
        contactInpErr.style.color = "red"
        contactInpErr.textContent = "Coach Contact is Required"
        return
    }

    if(!validityInp.value.trim()){
        validityInpErr.style.color = "red"
        validityInpErr.textContent = "Coach Validity is Required"
        return
    }
    
    const id = Math.floor(Math.random()*1000)
    const date = new Date()
    
    

    let formData = {
        id: id,
        coachName: coachNameInp.value.trim(),
        validityInp: validityInp.value.trim(),
        coachStatus: contactInp.value.trim(),
        coachImage: imageInpt.files[0],
        createdAt: date
    }

    console.log(formData);

    coach.push(formData)
    saveCoachToLocalStorage()

    coachNameErr.textContent = ""
    contactInpErr.textContent = ""
    validityInpErr.textContent = ""
    selectedImageName.textContent = ""
    previewImage.src = ""

    form.reset()
    displayCoach(coach)
    closePopUp()
    showModal("Coach Added Successfully", "success")
})

function saveCoachToLocalStorage (){
    localStorage.setItem("coach", JSON.stringify(coach))
}


function displayCoach(data){
    
    tbody.innerHTML = ""

    if(data.length === 0){
        tbody.innerHTML = "No item match your search"
        return
    }
    
    
    data
    ?.slice()
    ?.reverse()
    // .sort((a,b)=>(b.createdAt -a.createdAt))
    ?.slice(0, select.value)
    .forEach(item => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${item.coachName}</td>
            <td>${item.coachStatus}</td>
            <td>${item.validityInp}</td>
            <td>
                <button onclick="edit(${item.id})" class="editBtn">Edit</button>
            </td>
        `
        tbody.appendChild(tr)
    })
    
    
}

displayCoach(coach)

function searchByName(){
    const searchQuery = searchInp.value.toLowerCase()


    const filtered = coach.filter((item) => {
        return item.coachName.toLowerCase().includes(searchQuery)
    })

    filteredCoach = filtered    

    displayCoach(filteredCoach)
}

// clear the filtered when nothing is input in the search input

searchInp.addEventListener("input", (e) => {
  if (!e.target.value.trim()) {
    filteredCoach = [];
  }
});

cancelBtn.addEventListener("click", ()=>{
    submitEdited.style.display = "none"
    saveBtn.style.display = "inline"
    form.reset()
})


submitEdited.addEventListener("click", async ()=>{
    
    coachNameErr.textContent = ""
    coachNameErr.textContent = ""
    contactInpErr.textContent = ""

    if(!coachNameInp.value.trim()){
        coachNameErr.style.color = "red"
        coachNameErr.textContent = "coach Name is Required"
        return
    }
    if(!validityInp.value.trim()){
        validityInpErr.style.color = "red"
        validityInpErr.textContent = "coach contact is Required"
        return
    }
    if(!contactInp.value.trim()){
        contactInpErr.style.color = "red"
        contactInpErr.textContent = "coach Validity is Required"
        return
    }
    
    const id = Math.floor(Math.random()*1000)
    const date = new Date()

    let updatedData = {
        id: id,
        coachName: coachNameInp.value.trim(),
        validityInp: validityInp.value.trim(),
        coachStatus: contactInp.value.trim(),
        createdAt: date
    }

    coach.push(updatedData)

    saveCoachToLocalStorage()

    form.reset()
    displayCoach(coach)
    closePopUp()
    showModal("Edited Successfully", "success")
})


function edit(id){
    submitEdited.style.display = "inline"
    saveBtn.style.display = "none"
    openPopUp()


    const find = coach.find(item => {
        return item.id === id
    })

    coachNameInp.value = find.coachName    
    validityInp.value = find.validityInp    
    contactInp.value = find.coachStatus


    const remainingCoach = coach.filter(item => item.id !== id)
    
    coach = remainingCoach
}


select.addEventListener('change', ()=>{
    displayCoach(coach)
})



function openPopUp(){
    document.querySelector(".overlay").style.display = "flex"
}

function closePopUp(){
    document.querySelector(".overlay").style.display = "none"
}



// Alert Modal


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