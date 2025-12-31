const form = document.getElementById("form")
const errorP = document.getElementById("errorP")
const email = document.getElementById("email")
const password = document.getElementById("password")
const checkBox = document.getElementById("check")

let userDetils = JSON.parse(localStorage.getItem("users")) || []

form.addEventListener("submit", (e)=>{
    e.preventDefault()

    if(!email.value.trim() || !password.value.trim()){
        errorP.textContent = "All fields are required"
        return
    }

    const find = userDetils.find(item =>{
        return item.email === email.value
    })

    console.log(find);
    
    

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


            alert("Login successfull")
            location.href = "dashboard.html";
        }
    }else{
        errorP.textContent = "No account found, create new account. redirecting ..."
        setTimeout(()=>{
            location.href = "signup.html"
        }, 1000)
        return
    }

    errorP.textContent = ""
    form.reset()
})


// const save