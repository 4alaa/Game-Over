const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
    clearInputs()
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
    clearInputs()
});

// for register
let arrOfMails=[]
if(localStorage.getItem("gameOver")!=null)
{
    arrOfMails=JSON.parse(   localStorage.getItem("gameOver")     )
}
const registerNameInput=document.querySelector("#registerNameInput")
const registerEmailInput=document.querySelector("#registerEmailInput")
const registerPassInput=document.querySelector("#registerPassInput")
const signUpBtn=document.querySelector("#signUpBtn")
class RegisterMails{

    constructor()
    {
        this.name=registerNameInput.value
        this.email=registerEmailInput.value
        this.password=registerPassInput.value
    }
}



function addRegisterMail() {

    
    if(isExist()==false&&nameValidtion()==true&&EmailValidtion()==true
    &&passValidation()==true&&registerEmailInput.value!=""
    &&registerNameInput.value!="")
    {
        arrOfMails.push(new RegisterMails())
        
        localStorage.setItem("gameOver",JSON.stringify(arrOfMails))
        successAlert.classList.remove("d-none")

        console.log(arrOfMails)
    }


}

signUpBtn.addEventListener("click",addRegisterMail)




// Validtion of login and register
const nameAlert=document.querySelector(".nameAlert")
const emailAlert=document.querySelector(".emailAlert")
const successAlert=document.querySelector(".successAlert")
const nameregex=document.querySelector(".nameregex")
const emailRegex=document.querySelector(".emailRegex")
const fillAlert=document.querySelector(".fillAlert")





function isExist() {

    for (let i = 0; i < arrOfMails.length; i++) {
        
        if(arrOfMails[i].email.toLowerCase().trim()==registerEmailInput.value.toLowerCase().trim()&&registerEmailInput.value!="")
        {

            emailAlert.classList.remove("d-none")
            successAlert.classList.add("d-none")
            nameAlert.classList.add("d-none")


            return true
        }
        else if(arrOfMails[i].name.toLowerCase().trim()==registerNameInput.value.toLowerCase().trim()&&registerNameInput.value!="")
        {
            nameAlert.classList.remove("d-none")
            emailAlert.classList.add("d-none")
            successAlert.classList.add("d-none")

            return true
        }

        
    }

    emailAlert.classList.add("d-none")
    nameAlert.classList.add("d-none")

    return false
}



function nameValidtion() {
    let regex=/[a-z].{2,9}/
    if(regex.test(registerNameInput.value))
    {
       nameregex.classList.add("d-none")
       registerNameInput.classList.add("is-valid")
       registerNameInput.classList.remove("is-invalid")
       successAlert.classList.add("d-none")

       return true
    }
    else
    {
        nameregex.classList.remove("d-none")
        registerNameInput.classList.remove("is-valid")
        registerNameInput.classList.add("is-invalid")
        successAlert.classList.add("d-none")

        return false
    }
}
registerNameInput.addEventListener("input",nameValidtion)


function EmailValidtion() {
    let regex=/.+@gmail\.com/i
    if(regex.test(registerEmailInput.value))
    {
       emailRegex.classList.add("d-none")
       registerEmailInput.classList.add("is-valid")
       registerEmailInput.classList.remove("is-invalid")
       successAlert.classList.add("d-none")


       return true
    }
    else
    {
        emailRegex.classList.remove("d-none")
        registerEmailInput.classList.remove("is-valid")
        registerEmailInput.classList.add("is-invalid")
        successAlert.classList.add("d-none")

        return false
    }
}
registerEmailInput.addEventListener("input",EmailValidtion)


function passValidation() {
    let regex=/\w/i
    if(regex.test(registerPassInput.value))
    {
       registerPassInput.classList.add("is-valid")
       registerPassInput.classList.remove("is-invalid")
       successAlert.classList.add("d-none")


       return true
    }
    else
    {
        registerPassInput.classList.remove("is-valid")
        registerPassInput.classList.add("is-invalid")
        successAlert.classList.add("d-none")

        return false
    }
}
registerPassInput.addEventListener("input",passValidation)

// signIn 
const signInEmailInput=document.querySelector("#signInEmail")
const signInpasswordInput=document.querySelector("#signInpassword")
const errorLogin=document.querySelector(".errorLogin")
const signInBtn=document.querySelector("#signInBtn")

function signInWithEmail() {
    
// console.log("sign in")

    if(signInpassword.value==""||signInEmail.value=='')
    {

        fillAlert.classList.remove("d-none")

        return false
    }

    fillAlert.classList.add("d-none")

    for (let i = 0; i < arrOfMails.length; i++) {
        
        if(arrOfMails[i].email.toLowerCase().trim()==signInEmail.value.toLowerCase().trim()
        &&arrOfMails[i].password==signInpasswordInput.value)
        {
            localStorage.setItem("gameUserName",`${arrOfMails[i].name}`)
            location.href='welcome-page.html'
            return true
        }

        
    }
    errorLogin.classList.remove("d-none")
}

signInBtn.addEventListener("click",signInWithEmail)

function clearInputs() {
    nameAlert.classList.add("d-none")
    emailAlert.classList.add("d-none")
    successAlert.classList.add("d-none")
    nameregex.classList.add("d-none")
    emailRegex.classList.add("d-none")
    fillAlert.classList.add("d-none")
    registerNameInput.value=''
    registerEmailInput.value=''
    registerPassInput.value=''
    signInEmailInput.value=''
    signInpasswordInput.value=''
    registerEmailInput.classList.remove("is-valid")
    registerEmailInput.classList.remove("is-invalid")
    registerNameInput.classList.remove("is-valid")
    registerNameInput.classList.remove("is-invalid")
    registerPassInput.classList.remove("is-valid")
    registerPassInput.classList.remove("is-invalid")
    
    errorLogin.classList.add("d-none")

}
clearInputs()

