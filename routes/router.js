const express = require('express');
const router = express.Router();
const jmski = require('../controller/jamirController');
router.get('/', jmski.ja);

module.exports = router;
