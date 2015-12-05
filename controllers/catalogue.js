var connection = require('./db').connection;


exports.getBooks = function(callback){
	
	var sqlQuery = 'SELECT * from books;';
	connection.query(sqlQuery , function(err, rows, fields) {
		var books;
	  	if (!err){
	    	books = rows;
			console.log(rows);
			var isValid = rows.length > 0;
			// TODO find if memberId is in data

			console.log(books)
			
			callback(null, books);
		}
	  	else {
	 	   console.log('Error while performing Query.', err);
	 	   callback(err);
		}
	});
}