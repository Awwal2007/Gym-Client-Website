const form = document.getElementById("form")
const errorP = document.getElementById("errorP")
const email = document.getElementById("email")
const password = document.getElementById("password")
const checkBox = document.getElementById("check")
const eyeIcon = document.getElementById("eye-icon")


let userDetils = JSON.parse(localStorage.getItem("users")) || []

form.addEventListener("submit", async(e)=>{
    e.preventDefault()

    if(!email.value.trim() || !password.value.trim()){
        errorP.textContent = "All fields are required"
        return
    }

    const find = userDetils.find(item =>{
        return item.email === email.value
    })
    
    

    if(find){
        if(find.password !== password.value.trim()){
            errorP.textContent = "Incorrect email or password"
            return;
        }else{            
            const userToken = find.id     
            
            if(!checkBox.checked){
                sessionStorage.setItem("userToken", JSON.stringify(userToken))
            }else{
                localStorage.setItem("userToken", JSON.stringify(userToken))
            }


            await showModal("Login successfull", "success")

            setTimeout(()=>{
                location.href = "dashboard.html";            
            }, 1000)
        }
    }else{
        errorP.textContent = "No account found, create new account. redirecting ..."
        setTimeout(()=>{
            location.href = `signup.html?email=${email.value}&pass=${password.value}`
        }, 1000)
        return
    }

    errorP.textContent = ""
    form.reset()
})


eyeIcon.addEventListener("click", ()=>{
    if(password.type === "password"){
        password.type = "text"
        eyeIcon.className = "fa-regular fa-eye-slash eye-icon"        
    }else if(password.type === "text"){
        password.type = "password"
        eyeIcon.className = "fa-regular fa-eye eye-icon"
    }
})


// modal

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
