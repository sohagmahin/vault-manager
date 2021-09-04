const express = require('express');
const mongoose = require('mongoose');

const userSchema = require('../schema/userSchema');
const User = new mongoose.model('User', userSchema);

const router = express.Router();

// GET ALL USER
router.get('/all', async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json({
            data,
            message: 'Signup success'
        })
    } catch {
        res.status(500).json({
            message: 'Signup failed'
        });
    }
});

// POST LOGIN
router.post('/login', async (req, res) => {
    try {
        // const user = new User(req.body);
        const user = await User.findOne({ username: req.body.username })
        if (user) {
            if (req.body.password === user.password) {
                res.status(200).json({
                    message: 'Login successful!'
                });
            } else {
                res.status(401).json({
                    message: 'Authentication failed'
                });
            }
        } else {
            res.status(401).json({
                message: 'Authentication failed'
            });
        }
    } catch {
        res.status(401).json({
            message: 'Authentication failed'
        });
    }
});

// POST SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        const data = await user.save();
        res.status(200).json({
            data,
            message: 'Signup success'
        })
    } catch {
        res.status(500).json({
            message: 'Signup failed'
        });
    }
});

// UPDATE USER
router.put('/:id', async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({
            data,
            message: 'update success'
        });
    } catch (err) {
        res.status(500).json({
            message: 'update failed!'
        });
    }
});

// DELETE USER
router.delete('/:id', async (req, res) => {
    try {
        const data = await User.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            data,
            message: 'delete success'
        });
    } catch (err) {
        res.status(500).json({
            message: 'delete failed!'
        });
    }
});

module.exports = router;