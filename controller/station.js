const express = require('express');
const router = express.Router();
const Station = require('../model/stations');

// Create a new station
router.post('/station', async (req, res) => {
    try {
        const station = new Station(req.body);
        await station.save();
        res.status(201).send(station);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all stations
router.get('/station', async (req, res) => {
    try {
        const stations = await Station.find();
        res.send(stations);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read station by id
router.get('/station/:id', async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        if (!station) {
            return res.status(404).send({ message: 'Station not found' });
        }
        res.send(station);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update station by id
router.patch('/station/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'address', 'price', 'latitude', 'longitude', 'ownerName', 'ownerPhone', 'ownerEmail', 'ownerPassword', 'isapproved']; // Fields that are allowed to be updated
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!station) {
            return res.status(404).send({ message: 'Station not found' });
        }

        res.send(station);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete station by id
router.delete('/station/:id', async (req, res) => {
    try {
        const station = await Station.findByIdAndDelete(req.params.id);
        if (!station) {
            return res.status(404).send({ message: 'Station not found' });
        }
        res.send(station);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.patch('/station/approve/:id', async (req, res) => {
    try {
        const station = await Station.findByIdAndUpdate(req.params.id, { isapproved: true }, { new: true });
        if (!station) {
            return res.status(404).send({ message: 'Station not found' });
        }
        res.send(station);
    } catch (error) {
        res.status(500).send(error);
    }
});



router.patch('/station/reject/:id', async (req, res) => {
    try {
        const station = await Station.findByIdAndDelete(req.params.id);
        if (!station) {
            return res.status(404).send({ message: 'Station not found' });
        }
        res.send(station);
    } catch (error) {
        res.status(500).send(error);
    }
});




router.get('/station/login/:email/:password', async (req, res) => {
    try {
        const station = await Station.findOne({ ownerEmail: req.params.email, ownerPassword: req.params.password });
        if (!station) {
            return res.status(404).send({ message: 'Station not found' });
        }
        res.send(station);
    } catch (error) {
        res.status(500).send(error);
    }
}
);




router.get('/adminstation', async (req, res) => {
    try {
        const stations = await Station.find({ isapproved: false});
        res.send(stations);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;
