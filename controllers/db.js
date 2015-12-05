var mysql      = require('mysql');

var exports = module.exports = {	
	connection: undefined,
	init: function () {
		var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '',
		  database : 'eBooks'
		});
		exports.connection = connection;
		connection.connect();
		console.log("DB Initialised", connection);
	}
}