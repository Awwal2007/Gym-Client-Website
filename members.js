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


let members = JSON.parse(localStorage.getItem("members")) || [];
let filteredMembers = [];



function displayMembers(){
    
    tbody.innerHTML = ""
    
    const data = filteredMembers.length && searchInp.value.trim() ? filteredMembers : members

    if(data.length === 0){
        tbody.innerHTML = "No item found"
        return
    }
    
    data
    .slice()
    // .reverse()
    // .sort((a,b)=>(b.createdAt -a.createdAt))
    .slice(0, select.value)
    .forEach(item => {
        const tr = document.createElement("tr")
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td>${item.date}</td>
            <td>
                <button onclick="edit(${item.id})" class="editBtn">Edit</button>
            </td>
        `
        tbody.appendChild(tr)
    })
    
    
}

displayMembers()

function searchByName(){
    const searchQuery = searchInp.value

    const filtered = members.filter((item) => {
        return item.name.includes(searchQuery)
    })

    filteredMembers = filtered    

    displayMembers()
}

// clear the filtered when nothing is input in the search input

searchInp.addEventListener("input", (e) => {
  if (!e.target.value.trim()) {
    filteredMembers = [];
    displayMembers();
  }
});

