const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const { encryptData, decryptData } = require('../helpers/dataEncryption');
const credientialSchema = require('../schema/credentialSchema');
const Credential = mongoose.model('credential', credientialSchema);

const authCheck = require('../middleware/authCheck');

// GET passmanager data
router.get('/all', authCheck, async (req, res) => {

    try {
        const data = await Credential.find();
        data.map(crd => {
            crd.username = decryptData(crd.username);
            crd.password = decryptData(crd.password);
            return crd;
        });
        res.status(200).json({
            data,
            message: 'success'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
    // res.status(200).json({
    //     message: 'This is get'
    // })
});

// GET passmanager data
router.get('/:id', authCheck, async (req, res) => {

    try {
        const data = await Credential.findOne({ _id: req.params.id });
        data.username = decryptData(data.username);
        data.password = decryptData(data.password);
        res.status(200).json({
            data,
            message: 'success'
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
    // res.status(200).json({
    //     message: 'This is get'
    // })
});

// POST passmanager data
router.post('/', authCheck, async (req, res) => {

    const encrytedUsername = encryptData(req.body.username);
    const enryptedPassword = encryptData(req.body.password);

    const credential = new Credential({
        ...req.body,
        username: encrytedUsername,
        password: enryptedPassword
    });
    try {
        const data = await credential.save();
        data.username = decryptData(data.username);
        data.password = decryptData(data.password);
        res.status(200).json({
            data: data,
            message: 'Credential was inserted successfully!'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Credentail insertion failed!'
        });
    }
});

// PUT passmanager data
router.put('/:id', authCheck, async (req, res) => {

    const updateData = {
        ...req.body,
    }
    // encrypt username and password, if they have in req.body.
    if (req.body.username) updateData.username = encryptData(req.body.username);
    if (req.body.password) updateData.password = encryptData(req.body.password);

    try {
        const data = await Credential.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: updateData },
            { new: true }
        );

        // decrypt the username and password to plain text
        data.username = decryptData(data.username);
        data.password = decryptData(data.password);
        res.status(200).json({
            data,
            message: 'success'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// DELETE passmanager data
router.delete('/:id', authCheck, async (req, res) => {
    try {
        const data = await Credential.findByIdAndDelete({ _id: req.params.id });

        // decrypt the username and password to plain text
        data.username = decryptData(data.username);
        data.password = decryptData(data.password);
        res.status(200).json({
            data,
            message: 'success'
        });
    } catch (error) {
        res.status(500).json({
            data,
            message: 'failed'
        });
    }
});

module.exports = router;