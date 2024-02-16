const express = require('express');
const router = express.Router();
const mainController = require('../controllers/maincontroller');

// app routes

router.get('/', mainController.homePage);
router.get('/about', mainController.about);
router.get('/features', mainController.feature);
router.get('/faq', mainController.faq);


module.exports =router;