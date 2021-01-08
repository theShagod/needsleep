/*
    Clientside Status Messaging
*/
var username = document.querySelector("#username");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var passwordConfirm = document.querySelector("#password-confirm");
var errors = [] //array of error msgs

//checks general password requirements
function cGnrlPassReq (username, password, isLogin=false){
    const SPACE = / /
    if (SPACE.test(username) || SPACE.test(password)){
        errors.push('Spaces are not allowed')
    }
    //username must be greater than 1 character
    if (username.length < 1){
        errors.push('Username must be greater than 1')
    }
    if (username.length > 50){
        errors.push('Username must be less than 50 characters')
    }
    //password what be inbetween exclusive 10 and 50 characters.
    if (password.length < 10){
        errors.push('Password must be greater than 10 characters')
    } else if (password.length > 50) {
        errors.push('Password must be less than 50 characters')
    }
    if(isLogin && errors !== []){
        //if we are in the login, it is not typical to display your password requirements in login
        errors = ['Username/email and/or password not found']
        return;
    }
    
    
}
function displayStatus (){

}

//if passwordConfirm and email don't exist (null) then we are in the login form
if (!passwordConfirm && !email){
    //in login view
    //check if email and password fit signup requirements
    cGnrlPassReq(username, password)
} else {
    //else we are in signup form
    if (password !== passwordConfirm){

    }
    cGnrlPassReq(username, password);

}

