var express = require('express');
var router = express.Router();
var UserModel = require('../models/users.Model');

/* GET users listing. */
router.get('/', function(req, res, next) {

  UserModel.getUsers(function(error, data)
			{
				//si existe el usuario mostramos el formulario
				if (typeof data !== 'undefined' && data.length > 0)
				{
					res.render("index",{ 
						title : "Formulario", 
						info : data,
						length: data.length
					});
				}
				//en otro caso mostramos un error
				else
				{
					res.json(404,{"msg":"notExist"});
				}
			});    
});

module.exports = router;
