const express = require('express');
const app = express();
const port = 3000;
const crypto = require('crypto');

//This array stores all the user login information
var UserLogin = [];

app.listen(port, () => console.log(`WebAPI app listening on port ${port}!`));

app.get('/CreateAccount', function (req, res) {
    NewAccount(req, res);
});
app.get('/Auth', function (req, res) {
    AuthAccount(req, res);
});
app.get('/api/user/info', function (req, res) {
    GetUserSettings(req, res);
});

function NewAccount(req, res) {
    //Run ValidationChecks on userstrings
    if (!ValidationCheckNewAccount(req.query.username, req.query.password, req.query.email)) {
        res.status(404).send({id: '', response: 'Error in Checking Accountinfo'});
        return;
    }
    //encrypt user password

    //generate new ID
    let NewID = crypto.randomBytes(16).toString('base64');
    //add user to database
    UserLogin.push({
        uuid: NewID,
        username: req.query.username,
        password: req.query.password,
        email: req.query.email,
        oauth2: {}
    });
    res.status(201).send({id: NewID, response: 'New Account Created Successfully'});
}

function AuthAccount(req, res) {
//run validation checks on user input
    if (!ValidationCheckNewAccount(req.query.username, req.query.password, req.query.email)) {
        res.status(404).send({id: '', response: 'Error in AuthInfo'});
        return;
    }
    //hash password and verify
    let user = findByUsername(req.query.username);
    if (!user) {
        res.status(404).send({});
    } else {
        let passwordFields = user.password.split('$');
        let salt = passwordFields[0];
        let hash = crypto.createHmac('sha512', salt).update(req.query.password).digest("base64");
        if (hash === passwordFields[1]) {
            let salt = crypto.randomBytes(16).toString('base64');
            let token = crypto.createHmac('sha512', salt).update(req.query.username).digest("base64");
            user.oauth2 = {token: token, salt: salt};
            res.status(201).send(user.oauth2);
        }
    }
}

function GetUserSettings(req, res) {
    //get user from token
    let user = GetTokenUser(req.query.token);
    res.status(201).send(JSON.stringify(user));
}


function findByUsername(username) {
    for (let i = 0; i < UserLogin.length; i++) {
        if (UserLogin[i].username === username) {
            return UserLogin[i];
        }
    }
    return {};
}

function GetTokenUser(token) {
    for (let i = 0; i < UserLogin.length; i++) {
        if (UserLogin[i].oauth2.token.length > 0) {
            if (UserLogin[i].oauth2.token === token) {
                return UserLogin[i];
            }
        }
        console.log(UserLogin[i].oauth2);
    }
    return {};
}

/**
 * @return {boolean}
 */
function ValidationCheckNewAccount(username, password, email) {
    return true;
}


//This function will handle all Api key calls by allowing the key to be checked
function ApiKeyValid(ApiKey_in) {
//Run checks on API Key input Value

    //get the user object that the kwy belongs to from the database
    return UserLogin.find({oauth2: {token: ApiKey_in}});

}


//This function lisions for the NewAccount Call
app.get('/oauth2/newaccount', function (req, res) {
    res.send(Create_NewUserAccount(req.query.username, req.query.password, req.query.email));
});
//This function is called when a user tries to log into the api
//we return the oauth2 object for the application to store
app.get('/oauth2/login', function (req, res) {
    let Username = req.query.username;
    let Password = req.query.password;
});

//This function will handle the login check for the application
function Login(username, password) {
//check for the username in the database and get the index
    let UsernameIndex = GetUserLoginIndex(username);
    //Check if the username and password are the same
    if (username === UserLogin[UsernameIndex].username && username === UserLogin[UsernameIndex].password) {
        //both are the same Auth the current user
        let TempToken = '';
        UserLogin[UsernameIndex].oauth2 = {};
    }
    //the login was denied return oauth failure
    return -1;
}

/**
 * @return {number}
 */
function GetUserLoginIndex(username) {
    for (let i = 0; i < UserLogin.length; i++) {
        if (username === UserLogin[i].username) {
            return i;
        }
    }
    return -1;
}

//Basic inforamtion storage and usage for Login of user
//Api Will handle Auth of user into Database and assigning each user a UDID
function Create_NewUserAccount(username_in, password_in, email_in) {
    //Run Checks on user input to prevent input error
    if (username_in === {} || password_in === {} || email_in === {}) {
        return {Account: false, Reason: 'Something is blank'}
    }
    //create the user Structure and add the user to the JSON Structure
    UserLogin.push({username: username_in, password: password_in, email: email_in, oauth2: {}});
    //new user has been created Return with a true condition
    return (UserLogin[UserLogin.length - 1]);
}
