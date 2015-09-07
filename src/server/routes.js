var router = require('express').Router();
var errorResponse = require('./utils/error-response')();
var data = require('./data');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/*', errorResponse.notFoundMiddleware);

router.post('/user/auth', postUserAuth);

module.exports = router;

//////////////

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        errorResponse.send404(req, res, 'person ' + id + ' not found');
    }
}

function postUserAuth(req, res, next) {
    if (req.body.username === '') {
        errorResponse.send400(req, res, 'Username is blank');
    } else if (req.body.password === '') {
        errorResponse.send400(req, res, 'Password is blank');
    } else {
        var user = data.user.filter(function(p) {
            return p.username === req.body.username && p.password === req.body.password;
        })[0];

        if (user) {
            res.status(200).send(user);
        } else {
            errorResponse.send400(req, res, 'Wrong credentials.');
        }
    }
}
