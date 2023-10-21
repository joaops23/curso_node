const express = require('express');
const ToughtController = require('../controllers/ToughtController');
const router = express.Router();

// helpers
const checkAuth = require("../helpers/auth").checkAuth

//controller

router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.get('/', ToughtController.showToughts);

module.exports = router;