module.exports = {
    /*
        getErrors
            findErrors          
                cGnrlPassReq
    */
    getErrors: function (username, email, password, passwordConfirm){
        var errors = this.findErrors(username, email, password, passwordConfirm);
        if (!username || !email || !password | !passwordConfirm) return null;
        if (errors.length < 1) return []; //no errors CHANGE SEE MSG IS POSITIVE
        return errors;
    },
    
    //detecting errors in inputed fields and returns error array
    findErrors: function (username, email, password, passwordConfirm){
        //if passwordConfirm and email don't exist (null) then we are in the login form
        if (!passwordConfirm && !email){
            //in login view
            //check if email and password fit signup requirements
            return this.cGnrlPassReq(username, password, true); //3rd parameter saying that we are in login
    
        } else {
            let err = this.cGnrlPassReq(username, password);
            //else we are in signup form
            if (password !== passwordConfirm){
                return ['Passwords don\'t match', ...err]
            }
            return err
            
        }
    },
    
    //checks general password requirements and returns error array
    cGnrlPassReq: function (username, password, isLogin=false){
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
    
};

