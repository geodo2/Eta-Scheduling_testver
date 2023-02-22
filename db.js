var mysql = require('mysql');
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '368712',
  database : 'bobgo',
});
db.connect();

module.exports = db;