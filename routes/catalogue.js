var express = require('express');
var router = express.Router();
var catalogueController = require('../controllers/catalogue');

router.get('/catalogue', function (req, res) {

    console.log("Books route call")
    catalogueController.getBooks(function (err, books) {
        if (err) {
            res.status(500).json({error: err});
            return;
        }

        if (books) {
            res.json(books);
        } else {
            res.status(403).json({error: 'Could not retrieve books'});
        }
    });
});

router.delete('/catalogue', function (req, res) {
    res.status(501).end();
});

// router.get('/catalogue', function (req, res) {
//   //TODO get rid of this
//   res.status(200).json({loggedIn: true});
// });

module.exports = router;
