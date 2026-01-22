const userName = document.getElementById("userName")
const userEmail = document.getElementById("userEmail")
const armBurger = document.getElementById("arm-burger")

const equipmentNameInp = document.getElementById("equipmentNameInp")
const statusInp = document.getElementById("statusInp")
const equipmentTotalInp = document.getElementById("equipmentTotalInp")
const equipmentTotalErr = document.getElementById("equipmentTotalErr")
const statusInpErr = document.getElementById("statusInpErr")
const equipmentNameErr = document.getElementById("equipmentNameErr")
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


let equipment = JSON.parse(localStorage.getItem("equipment")) || [];
let filteredEquipment = [];


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
    
    equipmentNameErr.textContent = ""
    statusInpErr.textContent = ""
    equipmentTotalErr.textContent = ""

    if(!equipmentNameInp.value.trim()){
        equipmentNameErr.style.color = "red"
        equipmentNameErr.textContent = "Equipment Name is Required"
        return
    }
    if(!equipmentTotalInp.value.trim()){
        equipmentTotalErr.style.color = "red"
        equipmentTotalErr.textContent = "equipment Amount is Required"
        return
    }
    if(!statusInp.value.trim()){
        statusInpErr.style.color = "red"
        statusInpErr.textContent = "equipment Validity is Required"
        return
    }
    
    const id = Math.floor(Math.random()*1000)
    const date = new Date()
    
    

    let formData = {
        id: id,
        equipmentName: equipmentNameInp.value.trim(),
        equipmentTotal: equipmentTotalInp.value.trim(),
        equipmentStatus: statusInp.value.trim(),
        equipmentImage: imageInpt.files[0],
        createdAt: date
    }

    console.log(formData);

    equipment.push(formData)
    saveEquipmentToLocalStorage()

    equipmentNameErr.textContent = ""
    statusInpErr.textContent = ""
    equipmentTotalErr.textContent = ""
    selectedImageName.textContent = ""
    previewImage.src = ""

    form.reset()
    displayEquipment(equipment)
    closePopUp()
})

function saveEquipmentToLocalStorage (){
    localStorage.setItem("equipment", JSON.stringify(equipment))
}


function displayEquipment(data){
    
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
            <td>${item.equipmentName}</td>
            <td>${item.equipmentStatus}</td>
            <td>${item.equipmentTotal}</td>
            <td>
                <button onclick="edit(${item.id})" class="editBtn">Edit</button>
            </td>
        `
        tbody.appendChild(tr)
    })
    
    
}

displayEquipment(equipment)

function searchByName(){
    const searchQuery = searchInp.value.toLowerCase()

    const filtered = equipment.filter((item) => {
        return item.equipmentName.toLowerCase().includes(searchQuery)
    })

    filteredEquipment = filtered    

    displayEquipment(filteredEquipment)
}

// clear the filtered when nothing is input in the search input

searchInp.addEventListener("input", (e) => {
  if (!e.target.value.trim()) {
    filteredEquipment = [];
  }
});

select.addEventListener('change', ()=>{
    displayEquipment(equipment)
})

cancelBtn.addEventListener("click", ()=>{
    submitEdited.style.display = "none"
    saveBtn.style.display = "inline"
    form.reset()
})


submitEdited.addEventListener("click", async ()=>{
    
    equipmentNameErr.textContent = ""
    equipmentNameErr.textContent = ""
    statusInpErr.textContent = ""

    if(!equipmentNameInp.value.trim()){
        equipmentNameErr.style.color = "red"
        equipmentNameErr.textContent = "equipment Name is Required"
        return
    }
    if(!equipmentTotalInp.value.trim()){
        equipmentTotalErr.style.color = "red"
        equipmentTotalErr.textContent = "equipment Amount is Required"
        return
    }
    if(!statusInp.value.trim()){
        statusInpErr.style.color = "red"
        statusInpErr.textContent = "equipment Validity is Required"
        return
    }
    
    const id = Math.floor(Math.random()*1000)
    const date = new Date()

    let updatedData = {
        id: id,
        equipmentName: equipmentNameInp.value.trim(),
        equipmentTotal: equipmentTotalInp.value.trim(),
        equipmentStatus: statusInp.value.trim(),
        createdAt: date
    }

    equipment.push(updatedData)

    await saveEquipmentToLocalStorage()

    form.reset()
    displayEquipment(equipment)
    closePopUp()
})


function edit(id){
    submitEdited.style.display = "inline"
    saveBtn.style.display = "none"
    openPopUp()


    const find = equipment.find(item => {
        return item.id === id
    })

    equipmentNameInp.value = find.equipmentName    
    equipmentTotalInp.value = find.equipmentTotal    
    statusInp.value = find.equipmentStatus


    const remainingEquipment = equipment.filter(item => item.id !== id)
    
    equipment = remainingEquipment
}




function openPopUp(){
    document.querySelector(".overlay").style.display = "flex"
}
function closePopUp(){
    document.querySelector(".overlay").style.display = "none"
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
