var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    res.send({"data": "Hello! It is me, POST response!"} );
    console.log("[Status code : " + req.baseUrl + "] - " + res.statusCode + "\n");
});

module.exports = router;