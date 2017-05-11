var express = require('express');
var router = express.Router();
var UserModel = require('../models/users.Model');

/* GET users listing. */
router.get('/', function(req, res, next) {

  UserModel.getUsers(function(error, data)
			{
				//respuesta json
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.json(data);
				}
				//en otro caso mostramos un error
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});    
});

/* POST a NEW user */
router.post('/', function(req, res, next) {

  UserModel.postUsers(req.body,function(error, data)
			{
				//respuesta json
				if ((data.affectedRows > 0 ) && (data.serverStatus == 2) && (data.error == null))
				{
					res.json({
							"status":"OK",
							"msg":data.message,
							"id": data.insertId});
				}
				//en otro caso mostramos un error
				else
				{
					res.json(412,{"msg":"error"});
				}
			});    
});

/* PUT / UPDATE Existing user */
router.put('/:ID_Usuario', function(req, res, next) {
	var id = req.params.ID_Usuario;
	if(!isNaN(id)){
		UserModel.putUsers(id, req.body,function(error, data)
		{
			//respuesta json
			if ((data.error == null) && (data.serverStatus==2) && (data.affectedRows>0))
			{
				res.json({
				"status":"OK",
				"msg":data.message,
				"id": id});
			}

			//en otro caso mostramos un error
			else
			{
				res.json(404,{"msg":"notExist"});
			}
		});    
	}
});

/* DELETE Existing user */
router.delete('/:ID_Usuario', function(req, res, next) {
var id = req.params.ID_Usuario;
	if(!isNaN(id)){
		UserModel.deleteUsers(id,function(error, data)
		{
			//respuesta json
			if ((data.error == null) && (data.serverStatus==2) && (data.affectedRows>0))
			{
				res.json({
						"status":"OK",
						"msg": "deleted!",
						"id": id});
			}
			//en otro caso mostramos un error
			else
			{
				res.json(404,{"msg":"notExist"});
			}
		});    
	}
});

module.exports = router;
