

const express = require('express');
const router = express.Router();
const Booking = require('../model/booking');

router.post('/booking', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/get-booking', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/booking/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).send({ message: 'Booking not found' });
        }
        res.send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/userbooking/:phonenumber', async (req, res) => {
    try {
        const phoneNumber = req.params.phonenumber;
        const bookings = await Booking.find({ phone: phoneNumber });
        res.send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.get('/adminbooking/:id', async (req, res) => {
    try {
        const phoneNumber = req.params.id;
        const bookings = await Booking.find({ admin:phoneNumber });
        res.send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.patch('/booking/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'phone', 'address', 'stationName', 'price', 'time', 'date', 'admin']; // Fields that are allowed to be updated
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!booking) {
            return res.status(404).send({ message: 'Booking not found' });
        }

        res.send(booking);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/booking/:id', async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).send({ message: 'Booking not found' });
        }
        res.send(booking);
    } catch (error) {
        res.status(500).send(error);
    }
});





module.exports = router;
