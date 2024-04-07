const express = require('express');
const router = express.Router();
const Admin = require('../model/admin');


router.post('/admin', async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.get('/get-admin', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.send(admins);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).send({ message: 'Admin not found' });
        }
        res.send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/admin/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['email', 'password']; // Fields that are allowed to be updated
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!admin) {
            return res.status(404).send({ message: 'Admin not found' });
        }

        res.send(admin);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).send({ message: 'Admin not found' });
        }
        res.send(admin);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
