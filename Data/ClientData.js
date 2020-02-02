const Auth = require('../Auth/AuthController.js');
var AllData = [];

//This function will only disclose the AccountData information of a user
exports.GetAccountDataByUserName = (userName) => {
    for (let i = 0; i < AllData.length; i++) {
        //loop until found
        if (AllData[i].AccountData.username === userName) {
            //data match
            return AllData[i].AccountData;
        }
    }
    return {};
};
//With the UserID a call can be made internally to get a user structure
exports.GetUserByID = (ID) => {
    for (let i = 0; i < AllData.length; i++) {
        //loop until found
        if (AllData[i].uuid === ID) {
            //data match
            return AllData[i];
        }
    }
    return {};
};
//This call will return the structure so we can parse the information inside
exports.GetUserByToken = (ApiToken) => {
    for (let i = 0; i < AllData.length; i++) {
        //loop until found
        if (AllData[i].AccountData.oauth2.token === ApiToken) {
            //data match
            return AllData[i];
        }
    }
    return {};
};
//This call Will be used to validate the API token to allow the call to continue
exports.ValidateToken = (ApiToken) => {
    for (let i = 0; i < AllData.length; i++) {
        //loop until found
        if (AllData[i].AccountData.oauth2.token === ApiToken) {
            //data match
            return true
        }
    }
    return false;
};
//THis function creates the new user obj and adds it to the total list of users
exports.CreateUser = (userName, password, email, res) => {
    //run checks on user input
    if (CheckUserExists(userName, email)) {
        res.status(404).send({result: false, data: 'The Username/Email Already Exists'});
        return;
    }
    //check for length
    if (!(userName.length > 1 && password.length > 1 && email.length > 1)) {
        res.status(404).send({result: false, data: 'User Input is to Short'});
        return;
    }
    //Create the new user object
    AllData.push({
        uuid: Auth.GenerateNewUserID(),
        AccountData: {
            username: userName,
            password: Auth.HashPassword(password),
            email: email,
            accounttype: "",
            oauth2: {}
        },
        ProfileData: {}
    });
    return res.status(201).send({result: true, data: AllData[AllData.length - 1].AccountData})
};

//This function will check to see if the username/email is already taken
/**
 * @return {boolean}
 */
function CheckUserExists(userName, email) {
    for (let i = 0; i < AllData.length; i++) {
        //loop until found
        if (AllData[i].AccountData.username === userName || AllData[i].AccountData.email === email) {
            //data match
            return true;
        }
    }
    return false;
}