const Users = require('../Data/ClientData.js');

//This function Helps parse the data inside the Body for the username and password
exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }
        if (!req.body.username) {
            errors.push('Missing username field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing a required field'});
    }
};
//for checking token inputs
exports.hasAuthToken = (req, res, next) => {
    if ((req.body && req.body.token)) {
        //found token
        return next();
    } else {
        return res.status(400).send({error: 'No Token field', value: req.body.token});
    }
};
//for checking if token has valid user
exports.hasAuthValidToken = (req, res, next) => {
    if (Users.ValidateToken(req.body.token)) {
        return next();
    } else {
        return res.status(400).send({error: 'Invalid API Token'});
    }
};

