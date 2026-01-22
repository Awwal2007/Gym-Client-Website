const userName = document.getElementById("userName")
const userEmail = document.getElementById("userEmail")
const armBurger = document.getElementById("arm-burger")

const searchInp = document.getElementById("searchInp")
const searchBtn = document.getElementById("searchBtn")
const form = document.querySelector("form")
const select = document.querySelector(".entity select")
const tbody = document.querySelector("table tbody")






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


let members = JSON.parse(localStorage.getItem("members")) || [];
let filteredMembers = [];



function displayMembers(data){
    
    tbody.innerHTML = ""

    if(data.length === 0){
        tbody.innerHTML = "No item match your search"
        return
    }
    
    data
    ?.slice()
    // .reverse()
    // .sort((a,b)=>(b.createdAt -a.createdAt))
    ?.slice(0, select.value)
    .forEach(item => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td>${item.date}</td>
            <td>
                <button onclick="edit('${item.id}')" class="editBtn" >Edit</button>
            </td>
        `
        tbody.appendChild(tr)
    })
    
    
}

displayMembers(members)


select.addEventListener('change', ()=>{
    displayMembers(members)
})


function edit(id){
    // const find = members.find(item => {
    //     return item.id === id
    // })
    console.log(id);
    
    location.href = `registration.html?data=${id}`
}

function searchByName(){
    const searchQuery = searchInp.value.toLowerCase()


    const filtered = members.filter((item) => {
        return item.name.toLowerCase().includes(searchQuery)
    })

    filteredMembers = filtered    

    displayMembers(filteredMembers)
}

// clear the filtered when nothing is input in the search input

searchInp.addEventListener("input", (e) => {
  if (!e.target.value.trim()) {
    filteredMembers = [];
  }
});


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
