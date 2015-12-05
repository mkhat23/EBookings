var express = require('express');
var router = express.Router();





var data = {}


//TODO static middleware goes here (before routes)


//TODO REST apis go here


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "EBooks", data: data });



});

module.exports = router;




/**********

FOLDER STRUCTURE:

public/
  - index.html
  - main.js
  - style.css

routes/
  - session.js
  - catalogue.js ( getAll() will use controller/catalogue.js's method getAll)
     - router.get('/books', function (req, res) {
     	 var books = catalogueController.getAll();
     	 res.json(books);
       });=
  - ...

controllers/
  - session.js
  - catalogue.js (getAll() does the sql query and returns a javascript object)
  - basket.js

app.js: main entry point, will call the middlewares and routes


*/