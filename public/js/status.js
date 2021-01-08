/*
    Clientside Status Messaging
*/
var username = document.querySelector("#username");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var passwordConfirm = document.querySelector("#password-confirm");
var msg = document.querySelector('#msg');
/*
displayStatus
    findErrors          
        cGnrlPassReq
*/

function displayStatus (username, email, password, passwordConfirm){
    if (!msg) throw '#msg not found, this script should only be on the signup and login page which will always have a #msg'; //not on login or signup page
    var errors = findErrors(username, email, password, passwordConfirm);
    if (errors.length < 1) return; //no errors CHANGE SEE MSG IS POSITIVE
    errors.forEach(err => {

    });
}

//detecting errors in inputed fields and returns error array
function findErrors (username, email, password, passwordConfirm){
    //if passwordConfirm and email don't exist (null) then we are in the login form
    if (!passwordConfirm && !email){
        //in login view
        //check if email and password fit signup requirements
        return cGnrlPassReq(username, password, true); //3rd parameter saying that we are in login

    } else {
        let err = cGnrlPassReq(username, password);
        //else we are in signup form
        if (password !== passwordConfirm){
            return ['Passwords don\'t match', ...err]
        }
        return err
        
    }
}

//checks general password requirements and returns error array
function cGnrlPassReq (username, password, isLogin=false){
    let err = [];
    const SPACE = / /
    if (typeof username !== "string" || typeof password !== "string") {
        err.push('Inputs must be strings')
        return;
    }
    if (SPACE.test(username) || SPACE.test(password)){
        err.push('Spaces are not allowed')
    }
    //username must be greater than 1 character
    if (username.length < 1){
        err.push('Username must be greater than 1')
    }
    if (username.length > 50){
        err.push('Username must be less than 50 characters')
    }
    //password what be inbetween exclusive 10 and 50 characters.
    if (password.length < 10){
        err.push('Password must be greater than 10 characters')
    } else if (password.length > 50) {
        err.push('Password must be less than 50 characters')
    }
    if(isLogin && errors !== []){
        //if we are in the login, it is not typical to display your password requirements in login
        err = ['Username/email and/or password not found']
        return err;
    }
    return err;
}

