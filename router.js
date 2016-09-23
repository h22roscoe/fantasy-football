var express = require('express');

var router = express.Router();

router.use('/players', require('./players/router'));

router.use('/teams', require('./teams/router'));

module.exports = router;
