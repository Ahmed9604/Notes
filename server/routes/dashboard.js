const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkauth');
const dashController = require('../controllers/dashcontroller');

// dashboard routes

router.get('/dashboard',isLoggedIn, dashController.dashboard);
router.get('/dashboard/item/:id',isLoggedIn, dashController.viewNote);
router.put('/dashboard/item/:id',isLoggedIn, dashController.updateNote);
router.delete('/dashboard/item-delete/:id',isLoggedIn, dashController.deleteNote);

router.get('/dashboard/create',isLoggedIn, dashController.createNote);
router.post('/dashboard/create',isLoggedIn, dashController.submitNote);

router.get('/dashboard/search',isLoggedIn, dashController.searchNote);
router.post('/dashboard/search',isLoggedIn, dashController.showNote);


// router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
// router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewNote);
// router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateNote);
// router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteNote);
// router.get('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNote);
// router.post('/dashboard/add', isLoggedIn, dashboardController.dashboardAddNoteSubmit);
// router.get('/dashboard/search', isLoggedIn, dashboardController.dashboardSearch);
// router.post('/dashboard/search', isLoggedIn, dashboardController.dashboardSearchSubmit);


module.exports = router;