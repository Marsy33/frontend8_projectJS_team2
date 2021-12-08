let popup = document.getElementById("popup");

let popupOpen = document.getElementById("popup__open");

let popupClose = document.getElementsByClassName("popup__close")[0];

popupOpen.onclick = function() {
    popup.style.display = "block";
}

popupClose.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}


let modal = document.getElementById("modal");

let modalOpen = document.getElementById("modal__open");

let modalClose = document.getElementsByClassName("modal__close")[0];

modalOpen.onclick = function() {
    popup.style.display = "none";
    modal.style.display = "block";
}

modalClose.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function clearErrorMessagesSignIn() {
    emailErrorMessageSignIn.innerHTML = '';
    passwordErrorMessageSignIn.innerHTML = '';
}

function checkEmailSignIn() {
    let email = document.getElementById("singin__email").value;
    let check = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    let valid = check.test(email);
    if(email =='') {
        emailErrorMessageSignIn.innerHTML = 'This field must not be left empty.';
        return false;
    } else if (valid == false) {
        emailErrorMessageSignIn.innerHTML = 'This field is not correct.';
        return false;
    }
    return true;
}

function checkPasswordSignIn() {
    let password = document.getElementById("signin__password").value;
    if(password =='') {
        passwordErrorMessageSignIn.innerHTML = 'This field must not be left empty.';
        return false;
    } else if (password.length < 8) {
        passwordErrorMessageSignIn.innerHTML = 'Your password is too short.';
        return false;
    }
    return true;
}

function checkSignInForm() {
    clearErrorMessagesSignIn();
    
    let validEmail = checkEmailSignIn();
    let validPassword = checkPasswordSignIn();

    if(validEmail && validPassword) {
        signin_success.innerHTML = `Your Sign In is successful!`;
    }
}


function clearErrorMessages() {
    genderErrorMessage.innerHTML = '';
    firstnameErrorMessage.innerHTML = '';
    surnameErrorMessage.innerHTML = '';
    emailErrorMessage.innerHTML = '';
    passwordErrorMessage.innerHTML = '';
}

function checkGender() {
    let gender = document.getElementsByName("gender");
    for (let i = 0; i < gender.length; i++) {
        if(gender[i].type == "radio" && gender[i].checked) {
            return true;
        }
    } 
    genderErrorMessage.innerHTML = 'Please choose your gender.';
    return false;
}

function checkFirstname() {
    let firstname = document.getElementById("firstname").value;
    if(firstname =='') {
        firstnameErrorMessage.innerHTML = 'This field must not be left empty.';
        return false;
    } 
    return true;
}

function checkSurname() {
    let surname = document.getElementById("surname").value;
    if(surname =='') {
        surnameErrorMessage.innerHTML = 'This field must not be left empty.';
        return false;
    } 
    return true;
}

function checkEmail() {
    let email = document.getElementById("email").value;
    let check = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    let valid = check.test(email);
    if(email =='') {
        emailErrorMessage.innerHTML = 'This field must not be left empty.';
        return false;
    } else if (valid == false) {
        emailErrorMessage.innerHTML = 'This field is not correct.';
        return false;
    }
    return true;
}

function checkPassword() {
    let password = document.getElementById("password").value;
    if(password =='') {
        passwordErrorMessage.innerHTML = 'This field must not be left empty.';
        return false;
    } else if (password.length < 8) {
        passwordErrorMessage.innerHTML = 'Your password is too short.';
        return false;
    }
    return true;
}

function checkRegistrationForm() {
    clearErrorMessages();
    
    let validGender = checkGender();
    let validFirstname = checkFirstname();
    let validSurname = checkSurname();
    let validEmail = checkEmail();
    let validPassword = checkPassword();

    if(validGender && validFirstname && validSurname && validEmail && validPassword) {
        registration_success.innerHTML = `Hello, ${firstname.value} ${surname.value}! Your registration is successful!`;
    }
}