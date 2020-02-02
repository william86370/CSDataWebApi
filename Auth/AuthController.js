//Auth controller will control the Auth of a user and making sure the data is stored correctly
const crypto = require('crypto');

//This functions hashs the users password for storing
exports.HashPassword = (password) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    return (salt + "$" + hash);
};
//this function generates a random UUID
exports.GenerateNewUserID = () => {
    return crypto.randomBytes(16).toString('base64');
};
//This function Will Log a user in and return oath2
exports.Auth = (AccountData, password) => {
    let passwordFields = AccountData.password.split('$');
    let salt = passwordFields[0];
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    if (hash === passwordFields[1]) {
        //The user Has Passed Password Check
        AccountData.oauth2 = GenerateNewOath2Token(crypto.randomBytes(8).toString('base64'));
        return AccountData.oauth2;
    } else {
        //The user Entered the incorrect Password

    }
};

//This function will create the oath2 structure for Account
function GenerateNewOath2Token(UDID) {
    let NewOath2 = {token: "", salt: "", secret: "", udid: ""};
    let salt = crypto.randomBytes(16).toString('base64');
    NewOath2.token = crypto.createHmac('sha512', salt).update(UDID).digest("base64");
    NewOath2.secret = crypto.randomBytes(16).toString('base64');
    NewOath2.salt = salt;
    NewOath2.udid = UDID;
    return NewOath2;
}