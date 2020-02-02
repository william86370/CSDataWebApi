const Auth = require('./Auth/AuthController.js');
const Users = require('./Data/ClientData.js');
const express = require('express');
const app = express();
const port = 3000;
app.listen(port, () => console.log(`WebAPI app listening on port ${port}!`));


//User Has hit the default Auth Page send List of Commands
app.get('/api/v1/Auth', function (req, res) {
    res.status(200).send({
        AuthApiStatus: 'Online', Usage: {
            CreateAccount: {username: 'Users Username', password: 'Users Password', email: 'Users Email'},
            ResetPassword: {username: 'Users Username'},
            Login: {
                username: 'Users Username',
                password: 'Users Password',
                email: 'Users Email',
                Returns: {oath2: 'Structure Containing ApiKey'}
            },
            TestToken: {token: 'Users ApiToken'},
            NewToken: {token: 'Users ApiToken', salt: 'The salt Sent With Token'},
            Enable2Factor: {token: 'Users ApiToken', Returns: '2Factor Structure for Auth'},
            Login2Factor: {
                token: 'Users ApiToken',
                FactorToken: 'The 2factor Key Generated on Device',
                Returns: 'New Api Token'
            },
            Recover2Factor: {
                username: 'Users Username',
                token: 'Users ApiToken',
                FactorToken: 'The 2factor Key Generated on Device',
                Returns: 'New ApiKey'
            }
        }
    })
});


//User entered create new account
app.get('/api/v1/Auth/CreateAccount', function (req, res) {
    Users.CreateUser(req.query.username, req.query.password, req.query.email, res);
});

app.get('/Auth/Login', function (req, res) {
    let AccountData = Users.GetAccountDataByUserName(req.query.username);
    res.send(Auth.Auth(AccountData, req.query.password));
});
app.get('/api/data/AccountData', function (req, res) {
    //Check for API Key
    let UserData = Users.GetUserByToken(req.query.token);
    if (UserData) {
        //exists
        res.send(UserData);
    } else {
        res.send({status: false, reason: 'Incorrect Token'})
    }
});
app.get('/api', function (req, res) {
    //Check for API Key
    if (Users.ValidateToken(req.query.token)) {
        //exists
        res.status(202).send({status: true, reason: 'Token Accepted'})
    } else {
        res.status(401).send({status: false, reason: 'Incorrect Token'})
    }
});