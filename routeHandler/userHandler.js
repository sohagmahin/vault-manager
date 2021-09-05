const express = require('express');
const mongoose = require('mongoose');

const userSchema = require('../schema/userSchema');
const User = new mongoose.model('User', userSchema);

const router = express.Router();
const { createHash, compareHash } = require('../helpers/dataEncryption');

// GET ALL USER
router.get('/all', async (req, res) => {
    try {
        const data = await User.find()
            .select({
                password: 0,
                __v: 0
            });
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
            const isValidPassword = await compareHash(req.body.password, user.password);
            if (isValidPassword) {
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

        // look up the user collection to see user have already exist or not.
        const userResult = await User.find({ username: req.body.username });
        if (userResult.length > 0) {
            res.status(401).json({
                message: 'Username already exist!'
            });
            return;
        }

        // encrypt the password
        const hassedPassword = await createHash(req.body.password);
        const user = new User({
            ...req.body,
            password: hassedPassword,
        });

        await user.save();
        res.status(200).json({
            message: 'Signup success'
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json({
            message: 'Signup failed'
        });
    }
});

// UPDATE USER
router.put('/:id', async (req, res) => {

    const updateUser = { ...req.body };
    if (req.body.password) {
        // encrypt the password
        const hassedPassword = await createHash(req.body.password);
        updateUser.password = hassedPassword;
    }
    try {
        const data = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: updateUser },
            { new: true }
        ).select({
            password: 0,
            __v: 0
        });
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
        const data = await User.findByIdAndDelete({ _id: req.params.id })
            .select({
                password: 0,
                __v: 0
            });
        if (data !== null) {
            res.status(200).json({
                data,
                message: 'delete success'
            });
        } else {
            res.status(500).json({
                message: 'delete failed!'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'delete failed!'
        });
    }
});

module.exports = router;