var express = require('express');
var router = express.Router();
var basketController = require('../controllers/basket');
var session = require('express-session')


router.put('/basket/:bookRef', function (req, res) {
    if (req.session.basket === undefined) {
        req.session.basket = {};
    }
    var selectedFormat = req.body.selectedFormats;
    console.log("Formats", selectedFormat);

    req.session.basket[req.params.bookRef] = [selectedFormat];
    //req.session.basket.push(req.params.bookRef);
    res.status(201).end();
});

router.get('/basket', function (req, res) {
    basketController.getBasket(req.session.basket, function (err, books) {
        if (err) {
            console.log("Getting basket", err);
            res.status(500).end();
            return;
        }

        res.json(books);
    });


});

router.post('/basket/checkout', function (req, res) {
        var memberId = req.session.memberId;
        basketController.getBasket(req.session.basket, function (err, basket) {
            if (err) {
                res.status(500).end();
                return;
            }
            basketController.processBasket(basket, memberId, function (err, orderId) {
                if (err) {
                    res.status(500).end();
                    return;
                }
                console.log("Basket processed", basket);
                res.json({orderId: orderId});

            });

        });
});

router.delete('/basket/:bookRef', function (req, res) {
    /*
    var a = {
      hello: 'mandeep'
    }

    a.hello
    >

    a.hello = 'Laurent'

    a[ref] = undefined;
    delete a.hello;

    */
    var basket =  req.session.basket
    var bookRef = req.params.bookRef;

    if (basket) {
        delete basket[bookRef];
        res.status(200).end();
    } else {
        res.status(404).end();
    }

});


//TODO route for deleting item from basket: /basket/:bookRef DONE I THINK

//TODO route GET /basket, this will ask the basket controller to get all the book information from req.session.basket


module.exports = router;
