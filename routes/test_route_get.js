var express = require('express');
//const body_parser = require('body-parser');
//var jsonParser = body_parser.json()
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send({
        "data": "Hello! It is me, GET response!",
        "info": "1234"
    } );
    console.log("[Status code : " + req.baseUrl + "] - " + res.statusCode + "\n");
});

module.exports = router;