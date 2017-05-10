var myuser = {};
//var connection = require('../routes/connection');
//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno

connection = mysql.createConnection(
	{ 
		host: 'localhost', 
		user: 'root',  
		password: '', 
		database: 'db681274381'
	}
);
//obtenemos todos los usuarios
myuser.getUsers = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM Usuarios ORDER BY ID_Usuario', function(error, rows) {
			if(error)
			{
				throw error;
			}
			else
			{
				callback(null,rows);
			}
		});
	}
}
module.exports = myuser;