const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Create a new user
router.post('/user', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all users
router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read user by id
router.get('/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update user by id
router.patch('/user/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'phoneNumber']; // Fields that are allowed to be updated
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete user by id
router.delete('/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/user/login/:email/:password', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email, password: req.params.password });
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;
