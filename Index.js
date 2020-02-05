const Auth = require('./Auth/AuthController.js');
const Users = require('./Data/ClientData.js');
const Middleware = require('./Auth/AuthMiddleware.js');
const ApiHelper = require('./ApiHelper.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`WebAPI app listening on port ${port}!`);
    Users.ReadData();
});
app.use(bodyParser.json());


//User entered create new account
app.post('/api/v1/Auth/CreateAccount', [Middleware.hasAuthValidFields, Users.NewUser]);
//This function will login the User and generate new oath2 token
app.get('/api/v1/Auth/Login', [Middleware.hasAuthValidFields, Auth.Login]);
//This function will login the User and generate new oath2 token
app.post('/api/v1/Auth/Login', [Middleware.hasAuthValidFields, Auth.Login]);
//This call will return the User structure containing all account info
app.get('/api/v1/data/AccountData', [Middleware.hasAuthToken, Middleware.hasAuthValidToken,]);
//This call will return the User structure containing all account info
app.post('/api/v1/data/AccountData', [Middleware.hasAuthToken, Middleware.hasAuthValidToken,]);
//This function Will receive the call to check token
app.get('/api/v1/Auth/TestToken', [Middleware.hasAuthToken, Middleware.hasAuthValidToken, function (req, res) {
    res.status(200).send({result: true, response: "Token Valid"});
}]);
//This function is for updating the users profile with an api key
app.post('/api/v1/data/ProfileData', [Middleware.hasAuthToken, Middleware.hasAuthValidToken, Users.UpdateUserProfile]);
//This function Will receive the call to check token and will return the users profile
app.get('/api/v1/data/ProfileData', [Middleware.hasAuthToken, Middleware.hasAuthValidToken, Users.ViewUserProfile]);

//GET_Request For profile Data
app.get('/api/v2/data/ProfileData', [Middleware.hasAuthToken, Middleware.hasAuthValidToken, Users.ViewUserProfile]);

///api/v2/data/Profile:ID GET=> returns Profile Structure POST=> Adds/modify profile structure

///api/v2/data/Colleagues:ID GET=> Returns a list of Colleagues for that ID POST=> Adds new Colleague to User by Token

