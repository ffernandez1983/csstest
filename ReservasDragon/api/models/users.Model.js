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

myuser.postUsers = function(user, callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO Usuarios SET ?', user 
			,function(error, response) {
				if(error)
				{
					throw error;
				}
				else
				{
					callback(null,response);
				}
			});
	}
}

myuser.putUsers = function(id, user, callback)
{
	if (connection) 
	{
		var myQuery = 'UPDATE Usuarios SET Email = '+ connection.escape(user.Email) 
		+ ',' + 'Telefono = ' + connection.escape(user.Telefono) 
		+ 'WHERE ID_Usuario =' + id;
		connection.query(myQuery
			,function(error, response) {
				if(error)
				{
					throw error;
				}
				else
				{
					callback(null,response);
				}
			});
	}
}

myuser.deleteUsers = function(id, callback)
{
	if (connection) 
	{
		var sqlExists = 'SELECT * FROM Usuarios WHERE ID_Usuario = ' + id;
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id del usuario a eliminar
			if(row)
			{
				var sql = 'DELETE FROM Usuarios WHERE ID_Usuario = ' + id;
				connection.query(sql, function(error, result) 
				{
					if(error)
					{
						throw error;
					}
					else
					{
						callback(null,result);
					}
				});
			}
			else
			{
				callback(null,{"msg":"notExist"});
			}
		});
	}
}
module.exports = myuser;