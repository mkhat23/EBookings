var express = require('express');
var router = express.Router();
var sessionController = require('../controllers/session');
var session = require('express-session')


router.post('/session', function (req, res) {
    var memberId = req.body.memberId;
    req.session.signedIn = true;
    req.session.memberId = Number.parseInt(memberId);
    sessionController.validateMemberId(memberId, function (err, isValid) {
        if (err) {
            res.status(500).json({error: err});
            return;
        }

        if (isValid) {
            res.status(200).end();
        } else {
            res.status(403).json({error: 'Invalid ID'});
        }
    });
});

router.delete('/session', function (req, res) {
    console.log("Signed in", req.session.signedIn);
    if (req.session.signedIn) {
        req.session.destroy();
        res.status(200).end();
    } else {
        res.status(401).end();
    }
});

router.get('/session', function (req, res) {
    if (req.session.signedIn) {
        res.status(200).json({loggedIn: true});
    }
    else {
        res.status(401).end();
    }
});

module.exports = router;
