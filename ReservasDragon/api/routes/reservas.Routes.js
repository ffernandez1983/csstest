var express = require('express');
var router = express.Router();
var ReservaModel = require('../models/reservas.Model');

/* GET reservas listing. */
router.get('/', function (req, res, next) {

  ReservaModel.getReservas(function (error, data) {
    //respuesta json
    if (typeof data !== 'undefined' && data.length > 0) {
      res.json(data);
    }
    //en otro caso mostramos un error
    else {
      res.json(404, { "msg": "notExist" });
    }
  });
});

/* GET only one reserva by ID_Reserva */
router.get('/:id', function (req, res, next) {

  var id = req.params.id;


  ReservaModel.getReserva(id, function (error, data) {
    //respuesta json
    if (typeof data !== 'undefined' && data.length > 0) {
      res.json(data);
    }

    //en otro caso mostramos un error
    else {
      res.json(404, { "msg": "notExist" });
    }
  });

});

/* Get all reservas of an user */
router.get('/usuario/:id', function (req, res, next) {

  var id = req.params.id;


  ReservaModel.getReservaByUser(id, function (error, data) {
    //respuesta json
    if (typeof data !== 'undefined' && data.length > 0) {
      res.json(data);
    }

    //en otro caso mostramos un error
    else {
      res.json(404, { "msg": "notExist" });
    }
  });

});

/* POST  new Reserva */
router.post('/', function (req, res, next) {

  ReservaModel.postReservas(req.body, function (error, data) {
    //respuesta json
    if ((data.affectedRows > 0) && (data.serverStatus == 2) && (data.error == null)) {
      res.json({
        "status": "OK",
        "msg": data.message,
        "id": data.insertId
      });
    }
    //en otro caso mostramos un error
    else {
      res.json(412, { "msg": "error" });
    }
  });
});

/* PUT / UPDATE Existing Reserva */
router.put('/:ID_Reserva', function (req, res, next) {
  var id = req.params.ID_Reserva;
  if (!isNaN(id)) {
    ReservaModel.putReserva(id, req.body, function (error, data) {
      //respuesta json
      if ((data.error == null) && (data.serverStatus == 2) && (data.affectedRows > 0)) {
        res.json({
          "status": "OK",
          "msg": data.message,
          "id": id
        });
      }

      //en otro caso mostramos un error
      else {
        res.json(404, { "msg": "notExist" });
      }
    });
  }
});

/* DELETE Existing reserva */
router.delete('/:ID_Reserva', function (req, res, next) {
  var id = req.params.ID_Reserva;
  if (!isNaN(id)) {
    ReservaModel.deleteReservas(id, function (error, data) {
      //respuesta json
      if ((data.error == null) && (data.serverStatus == 2) && (data.affectedRows > 0)) {
        res.json({
          "status": "OK",
          "msg": "deleted!",
          "id": id
        });
      }
      //en otro caso mostramos un error
      else {
        res.json(404, { "msg": "notExist" });
      }
    });
  }
});

module.exports = router;