const express = require('express');
const router = express.Router();
const hbkController = require('../controllers/hbkController.js');

router.get('/bookings', hbkController.getBookings);


router.post('/bookings', hbkController.createBooking);


router.put('/bookings/:id', hbkController.updateBooking);

router.delete('/bookings/:id', hbkController.deleteBooking);

module.exports = router;
