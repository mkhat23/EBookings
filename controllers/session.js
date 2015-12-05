var connection = require('./db').connection;


exports.validateMemberId = function(memberId, callback){
	connection.query('SELECT * from members WHERE Member_id = "' + memberId + '";', function(err, rows, fields) {
		var data;
	  	if (!err){
	    	data = rows;
			console.log(rows);
			var isValid = rows.length > 0;
			// TODO find if memberId is in data

			callback(null, isValid)
		}
	  	else {
	 	   console.log('Error while performing Query.');
	 	   callback(err);
		}
	});
}