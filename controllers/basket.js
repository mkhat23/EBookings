var connection = require('./db').connection;
var dateFormat = require('dateformat');
var now = new Date();


exports.getBasket = function (basket, callback) {
    var bookRefs = Object.keys(basket);
    //  TODO fetch key [F002] from basket object and then use that to fetch all the info related to that book and change SQL if needs be

    var bookRefString = bookRefs.reduce(function (previousValue, currentValue, index, array) {
        return previousValue + '"' + currentValue + '"' + (index !== array.length - 1 ? ',' : '');
    }, "");


    var sqlQuery = 'SELECT * from books WHERE Book_ref in (' + bookRefString + ');';
    //var sqlQuery = "SELECT * from books WHERE Book_ref = 'F002'";
    console.log(sqlQuery);
    connection.query(sqlQuery, function (err, rows, fields) {
        if (!err) {
            console.log(rows);

            var i;
            for (i = 0; i < rows.length; i++) {
                var bookRef = rows[i].Book_ref;
                var formats = basket[bookRef];
                rows[i].Book_formats = formats;
            }
            callback(null, rows);
        }
        else {
            console.log('Error while performing Query.');
            callback(err);
        }
    });
};

exports.processBasket = function (basket, memberId, callback) {

    //var bookFormatsString = basket[0].Book_formats.reduce(function (previousValue, currentValue, index, array) {
    //    return previousValue + '"' + currentValue + '"' + (index !== array.length - 1 ? ',' : '');
    //}, "");

    var i;
    for (i = 0; i < basket.length; i++) {
        console.log("BASKET ARRAY", basket);

        var bookFormatsString = basket[i].Book_formats.join();
        var sqlValues = [
            [1, dateFormat(now, "yyyy-mm-dd h:MM:ss"), basket[i].Book_ref, basket[i].Book_price, bookFormatsString, memberId]
        ];

        var sqlQuery = 'INSERT INTO orders (Order_id, Order_date, Book_ref, Book_price, Formats_ordered, Member_id) VALUES ?';

        connection.query(sqlQuery, [sqlValues], function (err, order) {
            if (!err) {
                console.log("Order confirmed", order);
                callback(null);
            } else {
                console.log('Error while performing Query.', err, sqlValues, basket);
                callback(err);
            }
        });

    }


};