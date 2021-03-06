var router = require('express').Router();
var errorResponse = require('./utils/error-response')();
var jwt = require('jsonwebtoken');
var data = require('./data');
var secret = data.secret;

router.get('/people', getPeople);
router.get('/people/:id', getPerson);
router.get('/item', getItems);
router.get('/item/:id', getItem);
router.get('/*', errorResponse.notFoundMiddleware);

router.post('/auth', postUserAuth);

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

function getItems(req, res, next) {
    res.status(200).send(data.items);
}

function getItem(req, res, next) {
    var id = req.params.id;
    var item = data.items.filter(function(item) {
        return item.id === id;
    })[0];

    if (item) {
        res.status(200).send(item);
    } else {
        errorResponse.send404(req, res, 'item ' + id + ' not found');
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
            var profile = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            };
            var token = jwt.sign(profile, secret, {expiresIn: '1 days'});
            res.json({token: token});
        } else {
            errorResponse.send400(req, res, 'Wrong user or password');
        }
    }
}
