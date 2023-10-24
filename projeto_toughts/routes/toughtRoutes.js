const express = require('express');
const ToughtController = require('../controllers/ToughtController');
const router = express.Router();

// helpers
const checkAuth = require("../helpers/auth").checkAuth

//controller

router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.get('/', checkAuth, ToughtController.showToughts);
router.get('/add', checkAuth, ToughtController.createTought);
router.get('/edit/:id', checkAuth, ToughtController.updateTought);
router.post('/edit', checkAuth, ToughtController.updateToughtPost);
router.post('/remove', checkAuth, ToughtController.removeTought);
router.post('/add', checkAuth, ToughtController.createToughtSave);

module.exports = router;