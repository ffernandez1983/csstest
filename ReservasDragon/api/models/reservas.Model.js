var myreserva = {};
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

//GET Todas las Reservas
myreserva.getReservas = function(callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM Reservas ORDER BY ID_Reserva', function(error, rows) {
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

//GET una reserva
myreserva.getReserva = function(id, callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM Reservas WHERE ID_Reserva = ? ', id,
		function(error, rows) {
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

//GET Reservas by user
myreserva.getReservaByUser = function(id, callback)
{
	if (connection) 
	{
		connection.query('SELECT * FROM Reservas WHERE UsuarioId = ? ', id,
		function(error, rows) {
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


myreserva.postReserva = function(reserva, callback)
{
	if (connection) 
	{
		connection.query('INSERT INTO Reservas SET ?', reserva 
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

myreserva.putReserva = function(id, reserva, callback)
{
	if (connection) 
	{
		var myQuery = 'UPDATE Reservas SET FechaAlta = '+ connection.escape(reserva.FechaAlta) 
		+ ',' + 'FechaReserva = ' + connection.escape(reserva.FechaReserva)
        + ',' + 'HoraReserva = ' + connection.escape(reserva.HoraReserva)
        + ',' + 'Verificada = ' +  connection.escape(reserva.Verificada)
        + ',' + 'UsuarioId = ' +  connection.escape(reserva.UsuarioId)
		+ 'WHERE ID_Reserva =' + id;
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

myreserva.deleteReservas = function(id, callback)
{
	if (connection) 
	{
		var sqlExists = 'SELECT * FROM Reservas WHERE ID_Reserva = ' + id;
		connection.query(sqlExists, function(err, row) 
		{
			//si existe la id de la reserva eliminar
			if(row)
			{
				var sql = 'DELETE FROM Reservas WHERE ID_Reserva = ' + id;
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


module.exports = myreserva;