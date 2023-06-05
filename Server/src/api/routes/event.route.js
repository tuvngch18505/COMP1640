const express = require('express')
const router = express.Router()
const EventController = require('../controllers/event.controller')
const { isAdmin } = require('../middlewares/auth.middleware')

router.post('/add', isAdmin, EventController.createEvent)
router.get('/list', EventController.getListEvent)
router.delete('/delete/:id', EventController.deleteEvent)
router.put('/update', isAdmin, EventController.updateEvent)
router.put('/update', isAdmin, EventController.updateEvent)

module.exports = router
